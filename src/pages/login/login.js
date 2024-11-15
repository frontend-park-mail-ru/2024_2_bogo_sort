'use strict';

import { AuthComponent } from '../../components/auth/auth.js';
import { loginData } from '../../constants/constants.js';

/**
 * Represents the login page.
 */
export class LogInPage {

    /**
     * Renders the login page.
     */
    render() {
        this.#renderTemplate();
    }

    /**
     * Renders the authentication.
     */
    #renderTemplate() {
        const auth = new AuthComponent();
        auth.showAuthForm(loginData);
    }
}
