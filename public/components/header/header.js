'use strict';

import { showLoginForm } from "../auth/auth.js";

export class Header {
    #wrapper

    constructor() {
        this.#wrapper = document.createElement('div');
    }

    render() {
        this.#renderTemplate();
        this.#addListeners();
        return this.#wrapper;
    }

    #addListeners() {
        const enterButton = this.#wrapper.getElementsByClassName('enter')[0];
        enterButton.addEventListener('click', () => {
            const loginData = {
                title: 'Авторизация',
                info: 'Войдите в свой аккаунт',
                inputs: [
                    {
                        type: 'email',
                        class: 'input_email',
                        name: 'email',
                        placeholder: 'Email'
                    },
                    {
                        type: 'password',
                        class: 'input_password',
                        name: 'password',
                        placeholder: 'Пароль'
                    }
                ],
                buttontitle: 'Войти',
                pretext: 'Нет аккаунта?',
                anchortext: 'Зарегистрироваться'
            };
            showLoginForm(loginData);
        });
    }

    #renderTemplate() {
        this.#wrapper.innerHTML = Handlebars.templates['header.hbs']();
    }
}