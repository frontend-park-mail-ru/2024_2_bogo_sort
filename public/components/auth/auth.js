'use strict'

export function renderAuthTemplate(title, info, inputs, buttontitle, pretext, anchortext) {
    const template = Handlebars.templates['auth.hbs'];
    return template({title, info, inputs, buttontitle, pretext, anchortext});
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

    const loginForm = document.createElement('div');
    loginForm.className = 'login-form';
    loginForm.innerHTML = renderAuthTemplate(loginData.title, loginData.info, loginData.inputs, loginData.buttontitle, loginData.pretext, loginData.anchortext);
    document.body.appendChild(loginForm);

    overlay.classList.add('active');
    loginForm.classList.add('active');
}

