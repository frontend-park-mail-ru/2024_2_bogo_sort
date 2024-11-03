'use strict';

import { Header } from '../../components/header/header.js';
import { Sidebar } from '../../components/sidebar/sidebar.js';

export class UserPage {
    #element;

    constructor() {
        this.#element = document.createElement('div');
        this.#element.classList.add('contents');
    }

    render() {
        this.#renderTemplate();

        return this.#element;
    }

    async #renderTemplate() {
        const header = new Header();
        this.#element.appendChild(header.render());

        const sidebar = new Sidebar();
        this.#element.appendChild(sidebar.render());

        return this.#element;
    }
}
