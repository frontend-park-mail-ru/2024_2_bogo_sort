'use strict';

import { showLoginForm } from "../auth/auth.js";
import { loginData } from "../auth/authData.js";

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
            showLoginForm(loginData);
        });
    }

    #renderTemplate() {
        this.#wrapper.innerHTML = Handlebars.templates['header.hbs']();
    }
}