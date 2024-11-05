'use strict';

export class MyOrders {
    #element;

    constructor() {
        this.#element = document.createElement('div');
        this.#element.classList.add('orders');
    }

    render() {
        this.#renderTemplate();
        return this.#element;
    }

    #renderTemplate() {
        this.#element.innerHTML = Handlebars.templates['orders.hbs']();
    }
}
