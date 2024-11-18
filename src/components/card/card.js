'use strict';
import { router } from '../../modules/router.js';
import template from './card.hbs';
<<<<<<< HEAD
import { IMAGE_URL } from '../../constants/constants.js';
import ajax from '../../modules/ajax.js';
import { informationStorage } from '../../modules/informationStorage.js';
import { pipe } from '../../modules/pipe.js';
=======
>>>>>>> de94471 (TP-14c added webpack, babel and service worker)
/**
 * Renders the card template using Handlebars.
 *
 * @param {string} title - Card title.
 * @param {string} price - Card price.
 * @param {string} imageUrl - Card imageUrl.
 * @param {string} apiUrl - API URL.
 * @returns {string} The rendered HTML string of the card template.
 */
export function renderCardTemplate(title, price, imageId, id, isLiked, sellerId) {

    const baseUrl = IMAGE_URL;
    const isAuthor = informationStorage.getMeSeller()?.id === sellerId;
    const cardTemplate = template({title, price, imageId, baseUrl, isLiked, isAuthor});
    const parentTemp = document.createElement('div');
    parentTemp.innerHTML += cardTemplate;
    const card = parentTemp.firstChild;
    const likeButton = card.querySelector('.card__like-button');
    const path = likeButton?.querySelector('path');
    card.addEventListener('click', async (event) => {
        if(event.target === likeButton || event.target === path){
            if(!informationStorage.isAuth()){
                pipe.executeCallback('showAuthForm');
    
                return;
            }
            if(likeButton.classList.contains('active')) {
                const response = await ajax.delete(`/adverts/saved/${id}`);
                if(response.code !== 400) {
                    likeButton.classList.remove('active');
                }
                
                return;
            }
            const respone = await ajax.post(`/adverts/saved/${id}`);
            if(respone.code !== 400) {
                likeButton.classList.add('active');
            }
            
            return;
        }
        router.goToPage(`/advert/${id}`);
    });

    return card;
}
