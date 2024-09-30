'use strict';

import { showAuthForm } from "../../components/auth/auth.js";
import { loginData } from "../../constants/constants.js";

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
