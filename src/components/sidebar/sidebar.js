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
        const myAdvertsButton = this.#wrapper.querySelector('.item:nth-child(1)');
        const myOrdersButton = this.#wrapper.querySelector('.item:nth-child(2)');
        const myFavouritesButton = this.#wrapper.querySelector('.item:nth-child(3)');
        const mySettingsButton = this.#wrapper.querySelector('.item:nth-child(4)');

        myAdvertsButton.addEventListener('click', this.myAdverts);
        myOrdersButton.addEventListener('click', this.myOrders);
        myFavouritesButton.addEventListener('click', this.myFavourites);
        mySettingsButton.addEventListener('click', this.mySettings);
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
