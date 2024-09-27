'use strict';

import { renderAuthTemplate } from "../../components/auth/auth.js";

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
        const signupData = {
            title: 'Регистрация',
            info: 'Создайте новый аккаунт',
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
                },
                {
                    type: 'password',
                    class: 'authorization_input',
                    placeholder: 'Подтвердите пароль'
                }
            ],
            buttontitle: 'Зарегистрироваться',
            pretext: 'Уже есть аккаунт?',
            anchortext: 'Войти'
        };
        
    }
}


