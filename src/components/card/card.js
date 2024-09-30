'use strict';

export function renderCardTemplate(title, price, image_url) {
    const template = Handlebars.templates['card.hbs'];
    return template({title, price, image_url});
}