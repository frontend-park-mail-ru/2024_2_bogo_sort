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
        const loginData = {
            title: 'Авторизация',
            info: 'Войдите в свой аккаунт',
            inputs: [
                {
                    type: 'email',
                    class: 'authorization_input',
                    placeholder: 'Email'
                },
                {
                    type: 'password',
                    class: 'authorization_input',
                    placeholder: 'Пароль'
                }
            ],
            buttontitle: 'Войти',
            pretext: 'Нет аккаунта?',
            anchortext: 'Зарегистрироваться'
        };
    }
}


