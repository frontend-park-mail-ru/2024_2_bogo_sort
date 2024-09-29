'use strict';

import { showAuthForm } from "../../components/auth/auth.js";
import { signupData } from '../../components/auth/authData.js';

export class SignUp{

    render() {
        this.#renderTemplate();
    }

    #renderTemplate() {
        showAuthForm(signupData);
    }
}


