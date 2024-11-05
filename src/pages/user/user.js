'use strict';

import { Header } from '../../components/header/header.js';
import { Sidebar } from '../../components/sidebar/sidebar.js';
import { renderCardTemplate } from '../../components/card/card.js';
import { mockCards } from '../../constants/mockData.js';

export class UserPage {
    #element;

    constructor() {
        this.#element = document.createElement('div');
        this.#element.classList.add('user');
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

        const sidebar = new Sidebar(this.updateTitle.bind(this));
        container.appendChild(sidebar.render());
        
        const main = document.createElement('div');
        main.classList.add('user-main');

        this.titleElement = document.createElement('h1');
        this.titleElement.textContent = 'Мои объявления';
        main.appendChild(this.titleElement);

        // const cardsWrapper = document.createElement('div');
        // cardsWrapper.classList.add('user-cards');

        // mockCards.forEach(card => {
        //     cardsWrapper.innerHTML += renderCardTemplate(card.title, card.price, card.imageUrl, card.API_URL);
        // });
        
        // main.appendChild(cardsWrapper);
        container.appendChild(main);
        page.appendChild(container);
        this.#element.appendChild(page);
    }

    updateTitle(newTitle) {
        this.titleElement.textContent = newTitle;
    }
}
