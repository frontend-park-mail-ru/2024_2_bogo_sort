'use strict';

import { showLoginForm } from "../../components/auth/auth.js";

export class LogIn{

    render() {
        this.#renderTemplate();
    }

    #renderTemplate() {
        const signupData = {
            title: 'Регистрация',
            info: 'Создайте новый аккаунт',
            inputs: [
                {
                    type: 'email',
                    class: 'authorization_input',
                    name: 'email',
                    placeholder: 'Email'
                },
                {
                    type: 'password',
                    class: 'authorization_input',
                    name: 'password',
                    placeholder: 'Пароль'
                },
                {
                    type: 'password',
                    class: 'authorization_input',
                    name: 'password_confirm',
                    placeholder: 'Подтвердите пароль'
                }
            ],
            buttontitle: 'Зарегистрироваться',
            pretext: 'Уже есть аккаунт?',
            anchortext: 'Войти'
        };
        showLoginForm(signupData);
    }
}


