import { initHeaderAndMain } from '../../utils/initHeaderAndMain.js';
import { Cart } from '../../components/cart/cart.js';
import ajax from '../../modules/ajax.js';
import { BASE_URL } from '../../constants/constants.js';

export class CartPage {
    cartId;
    adverts;

    render(main) {
        this.#renderTemplate(main);
        this.cartComponent = new Cart();
    }

    async #renderTemplate(main) {
        const userId = localStorage.getItem('id');
        const cartExists = await ajax.get(`/cart/exists/${userId}`);
        let data = {};
        if(cartExists.exists) {
            const cart = await ajax.get(`/cart/user/${userId}`);
            this.cartId = cart.id;

            this.adverts = await ajax.get(`/adverts/cart/${cart.id}`);

            data = {adverts: this.adverts};
            data.notEmpty = this.adverts?.length > 0;
            data.numberOfItems = this.adverts.length;
            data.totalPrice = 0;
            this.adverts.forEach(advert => {
                data.totalPrice += Number(advert.price);
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

        if(this.adverts) {
            const items = wrapper.querySelectorAll('.adverts');
            for(let i = 0; i < this.adverts.length; i++){
                items[i].addEventListener('click', (event) => {
                    if(event.target === wrapper.querySelector('.adverts__remove')){
                        return;
                    }
                    window.location.href = `/advert/${this.adverts[i].id}`;
                });
            }
        }

        this.#addListeners(wrapper);
    }

    #addListeners(wrapper) {
        const removeButtonList = wrapper.querySelectorAll('.adverts__remove');
        removeButtonList?.forEach(removeButton => {
            removeButton.addEventListener('click', (event) => {
                const advertId = removeButton.parentNode.dataset.advertId;
                const data = {
                    advert_id: advertId,
                    cart_id: this.cartId
                };
                ajax.delete('/cart/delete', data);
                this.adverts = this.cartComponent.popItem(wrapper, event, this.adverts);
            });
        });

        const goBuyButton = wrapper.querySelector('.cart__empty-button');
        goBuyButton?.addEventListener('click', () => {
            window.location.href = '/';
        });

        const buyButton = wrapper.querySelector('.cart__buy-button');
        buyButton?.addEventListener('click', async () => {
            await ajax.post('/purchase', {
                'cart_id': this.cartId,
                'payment_method': 'cash',
                'delivery_method': 'pickup'
            });
            window.location.href = '/user/orders';
        });
    }
}
