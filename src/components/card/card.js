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
