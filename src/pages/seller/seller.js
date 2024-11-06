'use strict';

import { Header } from '../../components/header/header.js';
import { SellerSidebar } from '../../components/seller_sidebar/seller_sidebar.js';
import { renderCardTemplate } from '../../components/card/card.js';
import { mockCards } from '../../constants/mockData.js';

export class SellerPage {
    #element;

    constructor() {
        this.#element = document.createElement('div');
        this.#element.classList.add('seller');
    }

    render() {
        this.#renderTemplate();
        return this.#element;
    }

    #renderTemplate() {
        const header = new Header();
        this.#element.appendChild(header.render());

        const page = document.createElement('div');
        page.classList.add('user-page');

        const container = document.createElement('div');
        container.classList.add('contents');

        const sidebar = new SellerSidebar();
        container.appendChild(sidebar.render());
        
        const main = document.createElement('div');
        main.classList.add('user-main');

        const title = document.createElement('div');
        title.classList.add('user-title');

        this.titleElement = document.createElement('h1');
        this.titleElement.textContent = 'Актуальные';
        title.appendChild(this.titleElement);
        this.titleElement = document.createElement('h2');
        this.titleElement.textContent = 'Завершенные';
        title.appendChild(this.titleElement);

        const cardsWrapper = document.createElement('div');
        cardsWrapper.classList.add('user-cards');

        mockCards.forEach(card => {
            cardsWrapper.innerHTML += renderCardTemplate(card.title, card.price, card.imageUrl, card.API_URL);
        });

        main.appendChild(title);
        main.appendChild(cardsWrapper);
        container.appendChild(main);
        page.appendChild(container);
        this.#element.appendChild(page);
    }
}
