import { Cart } from '../../components/cart/cart.js';
import ajax from '../../modules/ajax.js';
import { BASE_URL } from '../../constants/constants.js';
import { router } from '../../modules/router.js';
import { informationStorage } from '../../modules/informationStorage.js';
import { renderIframe } from '../../components/iframe/iframe.js';

export class CartPage {
    cartId;
    adverts;

    render(main) {
        if(!informationStorage.isAuth()) {
            router.goToPage('/login');
        }
        this.#renderTemplate(main);
        this.cartComponent = new Cart();
    }

    async #renderTemplate(main) {
        const userId = informationStorage.getUser()?.id;
        const cart = await ajax.get(`/cart/exists/${userId}`);
        const cartId = cart.cart_id;
        let data = {};
        if(cartId) {
            this.cartId = cartId;

            this.adverts = await ajax.get(`/adverts/cart/${cartId}`);

            data = {adverts: this.adverts};
            data.notEmpty = this.adverts?.length > 0;
            data.numberOfItems = this.adverts.length;
            data.totalPrice = 0;
            this.adverts.forEach(advert => {
                data.totalPrice += Number(advert.preview.price);
            });
            data.totalPrice = String(data.totalPrice);
        } else {
            data.notEmpty = false;
        }
        data.imgUrl = BASE_URL;


        const wrapper = document.createElement('div');
        wrapper.classList.add('cart');
        wrapper.innerHTML += this.cartComponent.renderCart(data);
        main.appendChild(wrapper);
        setTimeout(() => {
            main.appendChild(renderIframe('/csat/mainPage'));
        }, 60000);

        this.#addListeners(wrapper);
    }

    #addListeners(wrapper) {
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
                            const deleteQuery = await ajax.delete(`/adverts/saved/${advert.preview.id}`);
                            if(deleteQuery.code !== 400) {
                                likeButtons[number].classList.remove('liked');
                                advert.is_saved = false;
                            }

                            return;
                        } else if(!advert.is_saved && !likeButtons[number].classList.contains('liked')) {
                            const likeQuery = await ajax.post(`/adverts/saved/${advert.preview.id}`);
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
                const advertId = removeButton.parentNode.dataset.advertId;
                const data = {
                    advert_id: advertId,
                    cart_id: this.cartId
                };
                await ajax.delete('/cart/delete', data);
                this.adverts = this.cartComponent.popItem(wrapper, event, this.adverts);
            });
        });

        const goBuyButton = wrapper.querySelector('.cart__empty-button');
        goBuyButton?.addEventListener('click', () => {
            router.goToPage('/');
        });

        const buyButton = wrapper.querySelector('.cart__buy-button');
        buyButton?.addEventListener('click', async () => {
            await ajax.post('/purchase', {
                'cart_id': this.cartId,
                'payment_method': 'cash',
                'delivery_method': 'pickup',
                'address': ''
            });
            router.goToPage('/user/orders');
        });
    }
}
