'use strict';

import { Header } from '../../components/header/header.js';
import { Sidebar } from '../../components/sidebar/sidebar.js';

export class UserPage {
    #element;

    constructor() {
        this.#element = document.createElement('div');
        this.#element.classList.add('user-page');
    }

    render() {
        this.#renderTemplate();
        return this.#element;
    }

    #renderTemplate() {
        const header = new Header();
        this.#element.appendChild(header.render());

        const main = document.createElement('div');
        main.classList.add('user-main');

        const container = document.createElement('div');
        container.classList.add('contents');

        const sidebar = new Sidebar();
        container.appendChild(sidebar.render());

        main.appendChild(container);
        this.#element.appendChild(main);
    }
}
