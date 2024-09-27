'use strict'

export function renderAuthTemplate(title, info, buttontitle, pretext, anchortext) {
    const template = Handlebars.templates['auth.hbs'];
    return template({title, info, buttontitle, pretext, anchortext});
}

export function showLoginForm() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

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

    const loginForm = document.createElement('div');
    loginForm.className = 'login-form';
    loginForm.innerHTML = renderAuthTemplate(loginData);
    document.body.appendChild(loginForm);

    overlay.classList.add('active');
    loginForm.classList.add('active');
}

