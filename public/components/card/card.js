'use strict';

export function renderCardTemplate(title, price) {
    const template = Handlebars.templates['card.hbs'];
    return template({title, price});
}