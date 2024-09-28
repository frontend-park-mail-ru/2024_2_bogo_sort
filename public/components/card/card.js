'use strict';

export function renderCardTemplate(title, price, location) {
    const template = Handlebars.templates['card.hbs'];
    return template({title, price, location});
}