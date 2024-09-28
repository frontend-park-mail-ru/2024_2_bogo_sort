'use strict';

import { showLoginForm } from "../../components/auth/auth.js";
import { signupData } from '../../components/auth/authData.js';

export class LogIn{

    render() {
        this.#renderTemplate();
    }

    #renderTemplate() {
        showLoginForm(signupData);
    }
}


