'use strict';

import { showAuthForm } from "../../components/auth/auth.js";
import { signupData } from "../../constants/constants.js";
import { toggleClasses } from "../../utils/toggleClasses.js";

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
        showAuthForm(signupData);
        this.#expandAuthWrapper();
    }

    /**
     * Expands the authentication wrapper.
     */
    #expandAuthWrapper() {
        const authForm = document.querySelector('.form_wrapper');
        toggleClasses([authForm.getElementsByClassName('auth')[0], authForm.getElementsByClassName('features')[0]], 'expand');
    }
}


