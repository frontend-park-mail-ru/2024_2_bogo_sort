'use strict';

import { showAuthForm } from '../auth/auth.js';
import { loginData } from '../../constants/constants.js';
import { checkAuth } from '../../utils/checkAuth.js';
import { logoutUser } from '../auth/auth.js';

/**
 * Represents a header component.
 */
export class Header {
    #wrapper;

    /**
     * Creates an instance of the Header class.
     */
    constructor() {
        this.#wrapper = document.createElement('header');
        this.#wrapper.classList.add('header');
    }

    /**
     * Renders the header component and sets up event listeners.
     *
     * @returns {HTMLElement} The rendered header element.
     */
    render() {
        this.#renderTemplate();
        this.#addListeners();

return this.#wrapper;
    }

    /**
     * Renders the header template.
     */
    #renderTemplate() {
        this.#wrapper.innerHTML = Handlebars.templates['header.hbs']();
        if(checkAuth()) {
            const headerButton = this.#wrapper.querySelector('.header__button');
            headerButton.textContent = 'Выйти';
        }
    }

    /**
     * Adds event listeners to the header elements.
     */
    #addListeners() {
        const headerButton = this.#wrapper.querySelector('.header__button');
        headerButton.addEventListener('click', () => {
            if(checkAuth()){
                logoutUser();
            } else {
                showAuthForm(loginData);
            }
        });
    }
}
