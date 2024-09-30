'use strict';

import { showAuthForm } from "../../components/auth/auth.js";
import { loginData } from '../../components/auth/authData.js';

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
        showAuthForm(loginData);
    }
}
