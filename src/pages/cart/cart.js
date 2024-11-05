'use strict';

import { initHeaderAndMain } from '../../utils/initHeaderAndMain.js';
import { renderCart, updateQuantityAndCost, popItem } from '../../components/cart/cart.js';
import ajax from '../../utils/ajax.js';
// import { Ajax } from '../../utils/ajax.js';
import { BACKEND_URL, IMAGE_URL } from '../../constants/constants.js';

// const ajax = new Ajax(BACKEND_URL);

export class CartPage {
    cartId;

    render() {
        this.#renderTemplate();
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
        } else {
            data.notEmpty = false;
        }
        data.imgUrl = IMAGE_URL;


        const wrapper = document.createElement('div');
        wrapper.classList.add('cart');
        wrapper.innerHTML += renderCart(data);
        main.appendChild(wrapper);

        if(data.notEmpty) {
            updateQuantityAndCost(wrapper);
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
                popItem(event, wrapper);
                setTimeout(() => updateQuantityAndCost(wrapper), 650);
            });
        });

        const goBuyButton = wrapper.querySelector('.cart__empty-button');
        goBuyButton?.addEventListener('click', () => {
            window.location.href = '/';
        });

        const buyButton = wrapper.querySelector('.cart__buy-button');
        buyButton?.addEventListener('click', () => {
            ajax.post('/purchase', { 
                'cart_id': this.cartId,
                'payment_method': 'cash',
                'delivery_method': 'pickup'
            });
            window.location.href = '/';
        });
    }
}