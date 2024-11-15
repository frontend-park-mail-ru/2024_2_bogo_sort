'use strict';

import { AuthComponent } from '../../components/auth/auth.js';
import { signupData } from '../../constants/constants.js';
import { toggleClasses } from '../../utils/toggleClasses.js';

/**
 * Represents the sign-up page of the application.
 */
export class SignUpPage {

    /**
     * Renders the sign-up page by calling the template rendering function.
     */
    render() {
        this.#renderTemplate();
    }

    /**
     * Renders the sign-up form template and expands the authentication wrapper.
     */
    #renderTemplate() {
        this.auth = new AuthComponent();
        this.auth.showAuthForm(signupData);
        this.#expandAuthWrapper();
    }

    /**
     * Expands the authentication wrapper.
     */
    #expandAuthWrapper() {
        this.auth.expandAuthForm();
    }
}


