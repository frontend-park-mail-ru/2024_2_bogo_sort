'use strict';

import template from './sidebar.hbs';

export class Sidebar {
    #wrapper;

    constructor() {
        this.#wrapper = document.createElement('aside');
        this.#wrapper.classList.add('sidebar');
    }

    render() {
        this.#renderTemplate();
        this.#addListeners();
        return this.#wrapper;
    }

    #renderTemplate() {
        this.#wrapper.innerHTML = template();
    }

    #addListeners() {
        const buttons = this.#wrapper.getElementsByClassName('item');

        if (buttons.length >= 4) {
            buttons[0].addEventListener('click', this.myAdverts);
            buttons[1].addEventListener('click', this.myOrders);
            buttons[2].addEventListener('click', this.myFavourites);
            buttons[3].addEventListener('click', this.mySettings);
        }
    }

    myAdverts() {
        console.log('Мои объявления');
    }

    myOrders() {
        console.log('Мои заказы');
    }

    myFavourites() {
        console.log('Избранное');
    }

    mySettings() {
        console.log('Настройки');
    }
}
