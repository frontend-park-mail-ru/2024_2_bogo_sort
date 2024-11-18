'use strict';

import { makeImageUrl } from '../../utils/brokenImageUrlFormatter.js';
import template from './cart.hbs';


export class Cart {
    renderCart(data){
        if(data.adverts){
            for(const advert of data.adverts) {
                advert.image_url = makeImageUrl(advert.image_url);
            }
        }
        data.numberOfItems = data.numberOfItems + this.getProductWord(data.numberOfItems);

        return template({ notEmpty: data.notEmpty, imgUrl: data.imgUrl, adverts: data.adverts, numberOfItems: data.numberOfItems, totalPrice: data.totalPrice });
    }


    popItem(wrapper, event, adverts) {
        const parent = event.target.parentElement;
        parent.classList.add('non-visible');
        setTimeout(() => parent.parentElement.removeChild(parent), 650);

        return this.updateQuantityAndCost(wrapper, parent.dataset.advertId, adverts);
    }

    updateQuantityAndCost(wrapper, advertId, adverts) {
        const itemsElement = wrapper.querySelector('.cart__items');

        adverts = adverts.filter(advert => advert.id !== advertId);
        const itemsInner = itemsElement.innerHTML;
        itemsElement.innerHTML = String(adverts.length) + this.getProductWord(adverts.length) + itemsInner.slice(itemsInner.indexOf('<'), itemsInner.length);

        let totalCost = 0;
        adverts.forEach(advert => {
            totalCost += Number(advert.price);
        });

        wrapper.querySelector('.cart__price').innerText = String(totalCost) + '₽';

        return adverts;
    }

    getProductWord(quantity) {
        if(quantity % 100 >= 11 && quantity % 100 <= 14) {
            return ' товаров';
        }

        const last = quantity % 10;
        if(last === 1) {
            return ' товар';
        } else if(last >= 2 && last <= 4) {
            return ' товара';
        }

        return ' товаров';
    }
};
