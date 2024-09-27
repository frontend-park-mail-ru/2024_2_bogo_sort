'use strict';

import { renderAuthTemplate } from "../auth/auth.js";

export class LogIn{
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#renderTemplate();
        return this.#parent;
    }
    #renderTemplate() {
        const info = [
            {
                title: 'Регистрация',
                info: 'Создание аккаунта',
                buttontitle: 'Зарегистрироваться',
                pretext: 'Есть аккаунт?',
                anchortext: 'Войти',
            }
        ]
    }
}


