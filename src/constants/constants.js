'use strict';

export const loginData = {
    title: 'Авторизация',
    info: 'Войдите в свой аккаунт',
    inputs: [
        {
            form: 'login',
            type: 'text',
            class: 'input_email',
            name: 'email',
            placeholder: 'Email'
        },
        {
            form: 'login',
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
            form: 'signup',
            type: 'text',
            class: 'input_email',
            name: 'email',
            placeholder: 'Email'
        },
        {
            form: 'signup',
            type: 'password',
            class: 'input_password',
            name: 'password',
            placeholder: 'Пароль'
        },
        {
            form: 'signup',
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

export const BACKEND_URL = 'https://warm-coast-96136-d78b5be652e4.herokuapp.com/api/v1';

export const IMAGE_URL = 'https://warm-coast-96136-d78b5be652e4.herokuapp.com';
