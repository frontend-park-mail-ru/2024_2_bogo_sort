'use strict';

import { renderCardTemplate } from '../../components/card/card.js';
import { mockCards } from '../../constants/mockData.js';

export class Favourites {
    #element;

    constructor() {
        this.#element = document.createElement('div');
        this.#element.classList.add('favourites');
    }
    render() {
        this.#renderTemplate();
        return this.#element;
    }

    #renderTemplate() {
        const cardsWrapper = document.createElement('div');
        cardsWrapper.classList.add('user-cards');

        mockCards.forEach(card => {
            cardsWrapper.innerHTML += renderCardTemplate(card.title, card.price, card.imageUrl, card.API_URL);
        });    

        this.#element.appendChild(cardsWrapper);
    }
        
}