'use strict';

import { showAuthForm } from "../../components/auth/auth.js";
import { loginData } from '../../components/auth/authData.js';

export class LogInPage {

    render() {
        this.#renderTemplate();
    }
    #renderTemplate() {
        showAuthForm(loginData);
    }
}

