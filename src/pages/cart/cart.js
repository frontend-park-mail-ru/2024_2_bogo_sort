import { initHeaderAndMain } from '../../utils/initHeaderAndMain.js';
import { Cart } from '../../components/cart/cart.js';
import ajax from '../../modules/ajax.js';
import { IMAGE_URL } from '../../constants/constants.js';

export class CartPage {
    cartId;

    render() {
        this.#renderTemplate();
        this.cartComponent = new Cart(); 
    }

    async #renderTemplate() {
        const main = initHeaderAndMain();
        const userId = localStorage.getItem('id');
        const cartExists = await ajax.get(`/cart/exists/${userId}`);
        let data = {}, adverts;
        if(cartExists.exists) {
            const cart = await ajax.get(`/cart/user/${userId}`)
            this.cartId = cart.id;
            
            adverts = await ajax.get(`/adverts/cart/${cart.id}`)

            data = {adverts: adverts};
            data.notEmpty = adverts?.length > 0;
            data.numberOfItems = adverts.length;
            data.totalPrice = 0;
            adverts.forEach(advert => {
                data.totalPrice += Number(advert.price);
            });
            data.totalPrice = String(data.totalPrice);
        } else {
            data.notEmpty = false;
        }
        data.imgUrl = IMAGE_URL;


        const wrapper = document.createElement('div');
        wrapper.classList.add('cart');
        wrapper.innerHTML += this.cartComponent.renderCart(data);
        main.appendChild(wrapper);

        if(adverts) {
            const items = wrapper.querySelectorAll('.adverts');
            for(let i = 0; i < adverts.length; i++){
                items[i].addEventListener('click', (event) => {
                    if(event.target === wrapper.querySelector('.adverts__remove')){
                        return;
                    }
                    window.location.href = `/advert/${adverts[i].id}`;
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
                this.cartComponent.popItem(event, wrapper);
                setTimeout(() => this.cartComponent.updateQuantityAndCost(wrapper), 650);
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