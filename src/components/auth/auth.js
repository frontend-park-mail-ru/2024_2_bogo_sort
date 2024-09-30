'use strict'

import { signupData, loginData } from './authData.js';
import { validateEmail, validatePassword } from '../../utils/validation.js';
import { Ajax } from '../../utils/ajax.js';
import { toggleClasses } from '../../utils/toggleClasses.js';
import { checkAuth } from '../../utils/checkAuth.js';

const ajax = new Ajax('http://127.0.0.1:8080/api/v1')

export function renderAuthTemplate(data) {
    const template = Handlebars.templates['auth.hbs']; 
    return template({title: data.title, info: data.info, inputs: data.inputs, buttontitle: data.buttontitle, pretext: data.pretext, anchortext: data.anchortext});
}

function handleFormSubmission(formData, isRegistration, errorElement) {
    const endpoint = isRegistration ? '/signup' : '/login';
    const errorMessage = isRegistration ? 'Ошибка регистрации!' : 'Ошибка авторизации!';

    if (!validateEmail(formData.email)) {
        errorElement.textContent = isRegistration ? 'Неправильный email' : 'Проверьте введенные данные';
        return;
    }
    if (!validatePassword(formData.password)) {
        errorElement.textContent = isRegistration ? 'Пароль не соответствует требованиям' : 'Проверьте введенные данные';
        return;
    }

    if(isRegistration){
        if(formData.password !== formData.confirmPassword) {
            errorElement.textContent = 'Пароли не совпадают';
            return;
        } else {
            formData = {email: formData.email, password: formData.password};
        }
    }

    ajax.post(endpoint, formData)
        .then(data => {
            if (data?.code !== undefined) {
                errorElement.textContent = errorMessage;
                return;
            }
            localStorage.setItem('jwt', data.token);
            errorElement.textContent = '';
            closeLoginForm();
            updateToLoggedIn();
        });
}

export function showAuthForm(data) {
    if(checkAuth()){
        logoutUser();
    }
    history.pushState(null, '', data.title === 'Авторизация' ? '/login' : '/signup');

    let overlay = document.getElementById('overlay');
    let authForm = document.getElementById('login_form');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.id = 'overlay';
        document.getElementById('root').appendChild(overlay);

        authForm = document.createElement('div');
        authForm.className = 'login_form';
        authForm.id = 'login_form';
        authForm.innerHTML = renderAuthTemplate(data);
        document.getElementById('root').appendChild(authForm);
        overlay.classList.add('active');
        authForm.classList.add('active');

        addSubmitClickListener(authForm, data);
        const registerLink = authForm.getElementsByClassName('link')[0];
        changeForm(registerLink, data, authForm);
    } else {
        toggleClasses([overlay, authForm], 'not_active', 'active');
    }

    overlay.addEventListener('click', () => {
        toggleClasses([overlay, authForm], 'not_active', 'active');
        history.pushState(null, '', '/');
        updateForm(authForm, loginData);
    }, {once: true});

}

function addSubmitClickListener(authForm, data) {
    const submitButton = authForm.querySelector('.authorization_enter');
    const errorElement = authForm.querySelector('.authorization_error');
    
    submitButton.addEventListener('click', () => {
        errorElement.textContent = '';
        
        const inputs = authForm.querySelectorAll('input');
        const formData = {};
        inputs.forEach(input => {
            formData[input.name] = input.value;
        });

        handleFormSubmission(formData, data.title === 'Регистрация', errorElement);
    });
}

function changeForm(registerLink, data, authForm) {
    registerLink.addEventListener('click', () => {
        if (data.inputs.length > 2) {
            history.pushState(null, '', '/login');
            data = loginData;
            const AUTH_FORM_ANIMATION_DELAY = 170;
            toggleClasses([authForm.getElementsByClassName('auth')[0], authForm.getElementsByClassName('features')[0]], 'expand');
            setTimeout(() => updateForm(authForm, data), AUTH_FORM_ANIMATION_DELAY);
        } else {
            history.pushState(null, '', '/signup');
            data = signupData;
            updateForm(authForm, data);
            const REGISTER_FORM_ANIMATION_DELAY = 10;
            setTimeout(() => {
                toggleClasses([authForm.getElementsByClassName('auth')[0], authForm.getElementsByClassName('features')[0]], 'expand');
            }, REGISTER_FORM_ANIMATION_DELAY);
        }
    });
}

function updateForm(authForm, data) {
    authForm.innerHTML = renderAuthTemplate(data);
    changeForm(authForm.getElementsByClassName('link')[0], data, authForm);
    addSubmitClickListener(authForm, data);
}

function updateToLoggedIn() {
    const header = document.querySelector('header');
    const headerButton = header.querySelector('.header_button');

    headerButton.textContent = 'Выйти';

    const headerButtonClone = headerButton.cloneNode(true);
    headerButtonClone.addEventListener('click', logoutUser);

    header.replaceChild(headerButtonClone, headerButton);
}

function closeLoginForm() {
    const overlay = document.querySelector('.overlay');
    const loginForm = document.querySelector('.login_form');
    
    if (overlay && loginForm) {
        overlay.classList.add('not_active');
        loginForm.classList.add('not_active');
    
        overlay.remove();
        loginForm.remove();
    }
}

export function logoutUser() {
    const header = document.querySelector('header');
    const headerButton = header.querySelector('.header_button');

    const token = localStorage.getItem('jwt');
    ajax.post('/logout', null, {'Authorization': `Bearer ${token}`})
    .catch(error => {
        console.log(error);
        return;
    });
    
    
    headerButton.textContent = 'Войти';
    const headerButtonClone = headerButton.cloneNode(true);
    headerButtonClone.addEventListener('click', () => {
        showAuthForm(loginData);
    });
    
    header.replaceChild(headerButtonClone, headerButton);
}
