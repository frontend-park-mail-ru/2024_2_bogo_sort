'use strict';

import { MainPage } from '../main/main.js';
import { pipe } from '../../modules/pipe.js';
/**
 * Represents the sign-up page of the application.
 */
export class SignUpPage {

    /**
     * Renders the sign-up page by calling the template rendering function.
     */
    render(main) {
        this.#renderTemplate(main);
    }

    /**
     * Renders the sign-up form template and expands the authentication wrapper.
     */
    #renderTemplate(main) {
        const mainPage = new MainPage();
        mainPage.render(main);
        pipe.executeCallback('showSignupForm');
    }

    // /**
    //  * Expands the authentication wrapper.
    //  */
    // #expandAuthWrapper() {
    //     this.auth.expandAuthForm();
    // }
}


