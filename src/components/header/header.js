'use strict';

import { showAuthForm } from "../auth/auth.js";
import { loginData } from "../auth/authData.js";
import { checkAuth } from "../../utils/checkAuth.js";
import { logoutUser } from "../auth/auth.js";

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
        const headerButton = this.#wrapper.querySelector('.header_button');
        headerButton.addEventListener('click', () => {
            if(checkAuth()){
                logoutUser();
            } else {
                showAuthForm(loginData);
            }
        });
    }

    #renderTemplate() {
        this.#wrapper.innerHTML = Handlebars.templates['header.hbs']();
        if(checkAuth()) {
            const headerButton = this.#wrapper.querySelector('.header_button');
            headerButton.textContent = 'Выйти';
        }
    }
}