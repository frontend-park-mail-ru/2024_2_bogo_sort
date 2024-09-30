'use strict';

import { showAuthForm } from "../../components/auth/auth.js";
import { signupData } from '../../components/auth/authData.js';
import { toggleClasses } from "../../utils/toggleClasses.js";

export class SignUpPage {

    render() {
        this.#renderTemplate();
    }

    #renderTemplate() {
        showAuthForm(signupData);
        this.#expandAuthWrapper();
    }

    #expandAuthWrapper() {
        const authForm = document.querySelector('.auth_wrapper');
        toggleClasses([authForm.getElementsByClassName('auth')[0], authForm.getElementsByClassName('features')[0]], 'expand');
    }
}


