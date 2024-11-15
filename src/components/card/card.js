'use strict';
import routing from '../../modules/routing.js';
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

    const template = Handlebars.templates['card.hbs']({title, price, imageUrl, baseUrl});
    const parentTemp = document.createElement('div');
    parentTemp.innerHTML += template;
    parentTemp.firstChild.addEventListener('click', () => {
        routing.goToPage(`/advert/${id}`);
    });

    return parentTemp.firstChild;
}
