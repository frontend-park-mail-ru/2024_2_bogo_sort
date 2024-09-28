'use strict';

import { showLoginForm } from "../../components/auth/auth.js";

export class LogIn{

    render() {
        this.#renderTemplate();
    }
    #renderTemplate() {
        const loginData = {
            title: 'Авторизация',
            info: 'Войдите в свой аккаунт',
            inputs: [
                {
                    type: 'email',
                    class: 'input_email',
                    placeholder: 'Email'
                },
                {
                    type: 'password',
                    class: 'input_password',
                    placeholder: 'Пароль'
                }
            ],
            buttontitle: 'Войти',
            pretext: 'Нет аккаунта?',
            anchortext: 'Зарегистрироваться'
        };
        showLoginForm(loginData);
    }
}


