'use strict'

import { renderCardTemplate } from "../../components/card/card.js";
import { Header } from "../../components/header/header.js";
import { Ajax } from "../../utils/ajax.js";

// const ajax = new Ajax('http://127.0.0.1:8080/api/v1');
const ajax = new Ajax('https://warm-coast-96136-d78b5be652e4.herokuapp.com/api/v1')

/**
 * Represents the main page of the application.
 */
export class MainPage {
    #element;

    /**
     * Initializes a new instance of the MainPage class.
     */
    constructor() {
        this.#element = document.createElement('div');
        this.#element.classList.add('main');
    }

    /**
     * Renders the main page and returns the main container element.
     * 
     * @returns {HTMLElement} The main container element with the rendered content.
     */
    render() {
        this.#renderTemplate();
        return this.#element;
    }

    /**
     * Renders the template for the main page.
     * 
     * Fetches card data from the API, creates a header, and appends
     * card elements to the main container.
     */
    async #renderTemplate() {

        const cards = await ajax.get('/adverts');

        const header = new Header();

        this.#element.appendChild(header.render());

        const container = document.createElement('div');
        const containerWrapper = document.createElement('div');

        container.classList.add('cards');

        containerWrapper.classList.add('cards_wrapper');
        containerWrapper.appendChild(container);

        cards.forEach(element => {
            container.innerHTML += renderCardTemplate(element.title, element.price, element.image_url);
        });
        this.#element.appendChild(containerWrapper);
    }
}
