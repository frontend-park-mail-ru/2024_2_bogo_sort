'use strict';
import { router } from '@modules/router.ts';
import template from './card.hbs';
import { IMAGE_URL } from '@constants/constants.ts';
import ajax from '@modules/ajax.ts';
import { informationStorage } from '@modules/informationStorage.ts';
import { pipe } from '@modules/pipe.ts';


export function renderCardTemplate(title: string, price: number, imageId: string, id: string, isLiked: boolean, sellerId: string, promoted: string) {
    const baseUrl = IMAGE_URL;
    const isAuthor = informationStorage.getMeSeller()?.id === sellerId;
    
    const cardTemplate = template({title, price, imageId, baseUrl, isLiked, isAuthor});
    const parentTemp = document.createElement('div');
    parentTemp.innerHTML += cardTemplate;
    const card = parentTemp.firstElementChild as HTMLElement;

    if(promoted.slice(0, 10) !== '0001-01-01') {
        card.classList.add('promoted');
    }

    const likeButton = card?.querySelector('.card__like-button');
    const path = likeButton?.querySelector('path');
    card.addEventListener('click', async (event) => {
        if(event.target === likeButton || event.target === path){
            if(!informationStorage.isAuth()){
                pipe.executeCallback('showAuthForm');

                return;
            }
            if(likeButton?.classList.contains('active')) {
                const response = await ajax.delete(`/adverts/saved/${id}`, null);
                if(response.code !== 400) {
                    likeButton.classList.remove('active');
                }

                return;
            }

            const respone = await ajax.post(`/adverts/saved/${id}`, null);
            if(respone.code !== 400) {
                likeButton?.classList.add('active');
            }

            return;
        }
        router.goToPage(`/item/${id}`);
    });

    return card;
}
