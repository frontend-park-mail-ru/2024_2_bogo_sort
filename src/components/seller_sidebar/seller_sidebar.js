'use strict';

export class SellerSidebar {
    #element;

    constructor() {
        this.#element = document.createElement('div');
        this.#element.classList.add('seller-sidebar');
    }

    render() {
        this.#element.innerHTML = Handlebars.templates['seller_sidebar.hbs']();
        return this.#element;
    }
}
