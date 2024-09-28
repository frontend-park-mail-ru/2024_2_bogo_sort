'use strict';
export const loginData = {
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

export const signupData = {
    title: 'Регистрация',
    info: 'Создайте новый аккаунт',
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
        },
        {
            type: 'password',
            class: 'input_password',
            name: 'confirmPassword',
            placeholder: 'Подтвердите пароль'
        }
    ],
    buttontitle: 'Зарегистрироваться',
    pretext: 'Уже есть аккаунт?',
    anchortext: 'Войти'
};
