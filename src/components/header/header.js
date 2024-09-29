'use strict';

import { showAuthForm } from "../auth/auth.js";
import { loginData } from "../auth/authData.js";

export class Header {
    #wrapper

    constructor() {
        this.#wrapper = document.createElement('header');
    }

    render() {
        this.#renderTemplate();
        this.#addListeners();
        return this.#wrapper;
    }

    #addListeners() {
        const headerButton = this.#wrapper.getElementsByClassName('header_button')[0];
        headerButton.addEventListener('click', () => {
            showAuthForm(loginData);
        });
    }

    #renderTemplate() {
        this.#wrapper.innerHTML = Handlebars.templates['header.hbs']();
    }
}