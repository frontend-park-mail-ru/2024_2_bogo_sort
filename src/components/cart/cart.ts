import { AdvertCards } from '../../constants/sharedTypes.ts';
import { informationStorage } from '../../modules/informationStorage.ts';
import template from './cart.hbs';
import { CartTemplateData } from './cartTypes.ts';


export class Cart {
    renderCart(data: CartTemplateData){
        if(data.adverts){
            for(const advert of data.adverts) {
                advert.image_url = informationStorage.getImageUrl(advert.preview.image_id);
            }
        }
        data.numberOfItems = data.numberOfItems + this.getProductWord(Number(data.numberOfItems));

        return template({ notEmpty: data.notEmpty, imgUrl: data.imgUrl, adverts: data.adverts, numberOfItems: data.numberOfItems, totalPrice: data.totalPrice });
    }


    popItem(wrapper: HTMLElement, event: Event, adverts: AdvertCards) {
        const parent = (event.target as HTMLElement).parentElement?.parentElement;
        parent?.classList.add('non-visible');
        setTimeout(() => parent?.parentElement?.removeChild(parent), 650);
        if(!parent?.dataset.advertId){
            return adverts;
        }
        return this.updateQuantityAndCost(wrapper, parent.dataset.advertId, adverts);
    }

    updateQuantityAndCost(wrapper: HTMLElement, advertId: string, adverts: AdvertCards) {
        const itemsElement = wrapper.querySelector('.cart__items');

        adverts = adverts.filter(advert => advert.preview.id !== advertId);
        if(itemsElement){
            const itemsInner = itemsElement.innerHTML;
            itemsElement.innerHTML = String(adverts.length) + this.getProductWord(adverts.length) + itemsInner.slice(itemsInner.indexOf('<'), itemsInner.length);
        }

        let totalCost = 0;
        adverts.forEach(advert => {
            totalCost += Number(advert.preview.price);
        });

        (wrapper.querySelector('.cart__price') as HTMLElement).innerText = String(totalCost) + '₽';

        return adverts;
    }

    getProductWord(quantity: number) {
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
