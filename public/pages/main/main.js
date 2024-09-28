'use strict'
import { renderCardTemplate } from "../../components/card/card.js";
import { Header } from "../../components/header/header.js";
export class Main{
    #element;

    constructor() {
        this.#element = document.createElement('div');
        this.#element.classList.add('main');
    }

    render() {
        this.#renderTemplate();
        return this.#element;
    }

    async #renderTemplate() {
        const response = await fetch('/api/cards', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        });
        const cards = await response.json();

        const header = new Header();

        this.#element.appendChild(header.render());

        const container = document.createElement('div');
        const containerWrapper = document.createElement('div');

        container.classList.add('cards');

        containerWrapper.classList.add('cards_wrapper');
        containerWrapper.appendChild(container);  
         
        cards.forEach(element => {
            container.innerHTML += renderCardTemplate(element.title, element.price);
        });
        this.#element.appendChild(containerWrapper);
    }
}