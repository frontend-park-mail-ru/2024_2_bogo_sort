'use strict';
import { router } from '../../modules/router.js';
import template from './card.hbs';
/**
 * Renders the card template using Handlebars.
 *
 * @param {string} title - Card title.
 * @param {string} price - Card price.
 * @param {string} imageUrl - Card imageUrl.
 * @param {string} apiUrl - API URL.
 * @returns {string} The rendered HTML string of the card template.
 */
export function renderCardTemplate(title, price, imageUrl, baseUrl, id) {

    const cardTemplate = template({title, price, imageUrl, baseUrl});
    const parentTemp = document.createElement('div');
    parentTemp.innerHTML += cardTemplate;
    parentTemp.firstChild.addEventListener('click', () => {
        router.goToPage(`/advert/${id}`);
    });

    return parentTemp.firstChild;
}
