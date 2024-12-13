import { Cart } from '@components/cart/cart.ts';
import ajax from '@modules/ajax.ts';
import { BASE_URL, placeOrderData } from '@constants/constants.ts';
import { router } from '@modules/router.ts';
import { informationStorage } from '@modules/informationStorage.ts';
import { AdvertCards } from '@constants/sharedTypes.ts';
import { ResponseAdvertCards, ResponseCart, ResponseCartExists } from '@modules/ajaxTypes.ts';
import { CartTemplateData } from '@components/cart/cartTypes.ts';
import { renderModalWithOverlay } from '@components/modalWithOverlay/modalWithOverlay.ts';

export class CartPage {
    cartId: string | null = null;
    adverts: AdvertCards | null = null;
    cartComponent: Cart | null = null;

    render(main: HTMLElement) {
        if(!informationStorage.isAuth()) {
            router.goToPage('/login');
        }
        this.#renderTemplate(main);
        this.cartComponent = new Cart();
    }

    async #renderTemplate(main: HTMLElement) {
        const userId = informationStorage.getUser()?.id;
        const cart = await ajax.get<ResponseCartExists>(`/cart/exists/${userId}`);
        const cartId = cart.cart_id;
        let data: CartTemplateData = {
            notEmpty: false,
            imgUrl: '',
            adverts: [],
            numberOfItems: '',
            totalPrice: ''
        }
        if(cartId !== '00000000-0000-0000-0000-000000000000') {
            this.cartId = cartId;

            this.adverts = await ajax.get<ResponseAdvertCards>(`/adverts/cart/${cartId}`);
            data.adverts = this.adverts;
            data.notEmpty = this.adverts?.length > 0;
            data.numberOfItems = String(this.adverts.length);
            let totalPrice = 0;
            this.adverts.forEach(advert => {
                totalPrice += Number(advert.preview.price);
            });
            data.totalPrice = String(totalPrice);
        } else {
            data.notEmpty = false;
        }
        data.imgUrl = BASE_URL;


        const wrapper = document.createElement('div');
        wrapper.classList.add('cart');
        wrapper.innerHTML += this.cartComponent?.renderCart(data);
        main.appendChild(wrapper);

        this.#addListeners(wrapper, main);
    }

    #addListeners(wrapper: HTMLElement, main: HTMLElement) {
        const removeButtons = wrapper.querySelectorAll('.adverts__remove-button');
        const likeButtons = wrapper.querySelectorAll('.adverts__like-button');

        if(this.adverts) {
            const items = wrapper.querySelectorAll('.adverts');
            this.adverts.forEach((advert, number) => {
                items[number].addEventListener('click', async (event) => {
                    if(event.target === removeButtons[number]) {
                        return;
                    } else if(event.target === likeButtons[number] || event.target === likeButtons[number].children[0]) {
                        if(advert.is_saved && likeButtons[number].classList.contains('liked')) {
                            const deleteQuery = await ajax.delete(`/adverts/saved/${advert.preview.id}`, null);
                            if(deleteQuery.code !== 400) {
                                likeButtons[number].classList.remove('liked');
                                advert.is_saved = false;
                            }

                            return;
                        } else if(!advert.is_saved && !likeButtons[number].classList.contains('liked')) {
                            const likeQuery = await ajax.post(`/adverts/saved/${advert.preview.id}`, null);
                            if(likeQuery.code !== 400) {
                                likeButtons[number].classList.add('liked');
                                advert.is_saved = true;
                            }

                            return;
                        }
                    } else {
                        router.goToPage(`/advert/${advert.preview.id}`);
                    }
                });
            });
        }

        removeButtons?.forEach(removeButton => {
            removeButton.addEventListener('click', async (event) => {
                const advertId = (removeButton.parentNode?.parentNode as HTMLElement).dataset.advertId;
                const data = {
                    advert_id: advertId,
                    cart_id: this.cartId
                };
                await ajax.delete('/cart/delete', data);
                if(this.cartComponent && this.adverts){
                    this.adverts = this.cartComponent.popItem(wrapper, event, this.adverts);
                    if(this.adverts.length === 0){
                        setTimeout(() => router.goToPage('/cart'), 650);
                    }
                }
            });
        });

        const goBuyButton = wrapper.querySelector('.cart__empty-button');
        goBuyButton?.addEventListener('click', () => {
            router.goToPage('/');
        });

        const buyButton = wrapper.querySelector('.cart__buy-button');
        buyButton?.addEventListener('click', () => {
            this.placeOrder(wrapper);
            
        });
    }

    placeOrder(wrapper: HTMLElement) {
        const overlay = wrapper.querySelector('.modal-window__overlay');
        if(overlay){
            overlay.classList.toggle('active');

            return;
        }
        const modal = renderModalWithOverlay(placeOrderData);
        if(!modal){
            return;
        }
        modal.classList.add('active');
        modal.addEventListener('click', (event: Event) => {
            if(event.target !== modal){
                return;
            }
            modal.classList.remove('active'); 
        });

        const form = modal.querySelector('form');
        const addressInput = modal.querySelector<HTMLInputElement>('#address');
        const select = modal.querySelector<HTMLSelectElement>('.modal-form__select');
        select?.addEventListener('change', (event: Event) => {
            const addressLabel = modal.querySelector('#address-label');
            if((event.target as HTMLSelectElement).value === 'pickup') {
                addressLabel?.classList.add('disabled');
                addressInput?.classList.add('disabled');
                addressInput?.attributes.removeNamedItem('required');
                form?.classList.add('small');
            } else if(addressLabel?.classList.contains('disabled')){
                form?.classList.remove('small')
                setTimeout(() => {;
                    addressLabel?.classList.remove('disabled');
                    addressInput?.classList.remove('disabled');
                    if(addressInput)
                        addressInput.required = true;
                }, 50);
            }
        });

        form?.addEventListener('submit', async (event: Event) => {
            event.preventDefault();
            const deliveryMethod = select?.value;
            const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll('.modal-form__input');
            let error = false;
            inputs.forEach(input => {
                if(deliveryMethod === 'delivery' && input.value === '') {
                    input.classList.add('error');
                    input.addEventListener('input', () => {
                        input.classList.remove('error');
                    });
                    error = true;
                } else if(input.id === 'name' && input.value === '') {
                    input.classList.add('error');
                    input.addEventListener('input', () => {
                        input.classList.remove('error');
                    });
                    error = true;
                }
            });
            if(error) {
                return;
            }
            let address = '';
            if(deliveryMethod === 'delivery' && addressInput) {
                address = addressInput.value;
            }
            const userId = informationStorage.getUser()?.id;
            await ajax.post(`/purchase/${userId}`, {
                'cart_id': this.cartId,
                'payment_method': 'cash',
                'delivery_method': deliveryMethod,
                'address': address,
                'user_id': userId
            });
            router.goToPage('/user/orders');
        });
        wrapper.appendChild(modal);
    }
}
