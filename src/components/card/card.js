'use strict';

/**
 * Renders the card template using Handlebars.
 *
 * @param {string} title - Card title.
 * @param {string} price - Card price.
 * @param {string} imageUrl - Card imageUrl.
 * @param {string} apiUrl - API URL.
 * @returns {string} The rendered HTML string of the card template.
 */
export function renderCardTemplate(title, price, imageUrl, apiUrl) {

    const template = Handlebars.templates['card.hbs'];

    return template({title, price, imageUrl, apiUrl});
}

export function addCardListeners(cardsJSON) {
    const cards = document.querySelectorAll('.card');
    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            window.location.href = `http://localhost:8008/advert/${cardsJSON[i].id}`;
        });
    }
}