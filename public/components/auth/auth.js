'use strict'

const signupData  = {
    title: 'Регистрация',
    info: 'Создайте новый аккаунт',
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
        },
        {
            type: 'password',
            class: 'input_password',
            placeholder: 'Подтвердите пароль'
        }
    ],
    buttontitle: 'Зарегистрироваться',
    pretext: 'Уже есть аккаунт?',
    anchortext: 'Войти'
};

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

export function renderAuthTemplate(title, info, inputs, buttontitle, pretext, anchortext) {
    const template = Handlebars.templates['auth.hbs'];
    return template({title, info, inputs, buttontitle, pretext, anchortext});
}

export function showLoginForm(data) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.getElementsByClassName('base')[0].appendChild(overlay);
    

    const loginForm = document.createElement('div');
    loginForm.className = 'login_form';
    loginForm.innerHTML = renderAuthTemplate(data.title, data.info, data.inputs, data.buttontitle, data.pretext, data.anchortext);
    document.body.appendChild(loginForm);

    overlay.classList.add('active');
    loginForm.classList.add('active');

    overlay.addEventListener('click', () => {
        overlay.classList.toggle('not_active');
        loginForm.classList.toggle('not_active');
    });

    const registerLink = loginForm.getElementsByClassName('link')[0];
    changeForm(registerLink, data, loginForm);
}

function changeForm(registerLink, data, loginForm) {
    registerLink.addEventListener('click', () => {
        if (data.inputs.length > 2) {
            data = loginData;
            loginForm.getElementsByClassName('auth')[0].classList.remove('expand');
            loginForm.getElementsByClassName('features')[0].classList.remove('expand');
            setTimeout( () => {
                loginForm.innerHTML = renderAuthTemplate(data.title, data.info, data.inputs, data.buttontitle, data.pretext, data.anchortext);
                changeForm(loginForm.getElementsByClassName('link')[0], data, loginForm);
            }, 220);
        } else {
            data = signupData;
            loginForm.innerHTML = renderAuthTemplate(data.title, data.info, data.inputs, data.buttontitle, data.pretext, data.anchortext);
            setTimeout( () => {
                loginForm.getElementsByClassName('auth')[0].classList.add('expand');
                loginForm.getElementsByClassName('features')[0].classList.add('expand');
            }, 10);
            changeForm(loginForm.getElementsByClassName('link')[0], data, loginForm);
        }
    });
    
}