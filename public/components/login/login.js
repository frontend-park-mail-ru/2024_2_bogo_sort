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
                title: 'Авторизация',
                info: 'Вход в аккаунт',
                buttontitle: 'Войти',
                pretext: 'Нет аккаунта?',
                anchortext: 'Зарегистрируйтесь',
            }
        ]
    }
}


