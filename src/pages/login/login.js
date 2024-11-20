'use strict';

import { MainPage } from '../main/main.js';
import { pipe } from '../../modules/pipe.js';
/**
 * Represents the login page.
 */
export class LogInPage {

    /**
     * Renders the login page.
     */
    render(main) {
        this.#renderTemplate(main);
    }

    /**
     * Renders the authentication.
     */
    #renderTemplate(main) {
        const mainPage = new MainPage();
        mainPage.render(main);
        pipe.executeCallback('showAuthForm');
    }
}
