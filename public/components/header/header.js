'use strict';

import { LogIn } from "../../pages/login/login.js";

export class Header {
    #wrapper

    constructor() {
        this.#wrapper = document.createElement('div');
    }

    render() {
        this.#renderTemplate();
        this.#addListeners();
        return this.#wrapper;
    }

    #addListeners() {
        const enterButton = this.#wrapper.getElementsByClassName('enter')[0];
        enterButton.addEventListener('click', () => {
            const login = new LogIn();
            login.render();
        });
    }

    #renderTemplate() {
        this.#wrapper.innerHTML = Handlebars.templates['header.hbs']();
    }
}