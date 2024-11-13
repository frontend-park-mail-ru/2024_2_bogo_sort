'use strict';

import { brokenImageUrlForamtter } from "../../utils/brokenImageUrlFormatter.js";


export class Cart {
    renderCart(data){
        if(data.adverts){
            for(const advert of data.adverts) {
                advert.image_url = brokenImageUrlForamtter(advert.image_url);
            }
        }
        data.numberOfItems = data.numberOfItems + this.getProductWord(data.numberOfItems);
        return Handlebars.templates['cart.hbs']({ notEmpty: data.notEmpty, imgUrl: data.imgUrl, adverts: data.adverts, numberOfItems: data.numberOfItems, totalPrice: data.totalPrice });
    }


    popItem(event) {
        const parent = event.target.parentElement;
        parent.classList.add('non-visible');
        setTimeout(() => parent.parentElement.removeChild(parent), 650);
    }

    updateQuantityAndCost(wrapper) {
    const itemsElement = wrapper.querySelector('.cart__items');

    const adverts = wrapper.querySelectorAll('.adverts');
    const itemsInner = itemsElement.innerHTML;
    itemsElement.innerHTML = String(adverts.length) + this.getProductWord(adverts.length) + itemsInner.slice(itemsInner.indexOf('<'), itemsInner.length);

    let totalCost = 0;
    adverts.forEach(advert => {
        let strCost = advert.querySelector('.adverts__price').innerText
        totalCost += Number(strCost.slice(0, strCost.length - 1));
    });

    wrapper.querySelector('.cart__price').innerText = String(totalCost) + '₽';
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