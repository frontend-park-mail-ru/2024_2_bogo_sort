'use strict';

import { showLoginForm } from "../../components/auth/auth.js";
import { loginData } from '../../components/auth/authData.js';

export class LogIn{

    render() {
        this.#renderTemplate();
    }
    #renderTemplate() {
        showLoginForm(loginData);
    }
}


