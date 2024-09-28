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

    #renderTemplate() {
        const info = [
            {
                title: 'rfhnj',
                price: '12$',
            },
            {
                title: 'mnoke',
                price: '32&',
            },
            {
                title: 'Карточка товара',
                price: '600$',
            },
            {
                title: 'Карточка товара',
                price: '600$',
            },
            {
                title: 'Карточка товара',
                price: '600$',
            },
            {
                title: 'Карточка товара',
                price: '600$',
            },
        ]
        // const headerWrapper = document.createElement('div');
        // headerWrapper.classList.add('header');
        const header = new Header();
        //header.render();
        this.#element.appendChild(header.render());
        // this.#element.appendChild(header);

        const container = document.createElement('div');
        const containerWrapper = document.createElement('div');

        container.classList.add('cards');

        containerWrapper.classList.add('cards_wrapper');
        containerWrapper.appendChild(container);  
         
        info.forEach(element => {
            container.innerHTML += renderCardTemplate(element.title, element.price);
        });
        this.#element.appendChild(containerWrapper);
    }
}
