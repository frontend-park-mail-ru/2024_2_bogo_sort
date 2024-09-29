'use strict'

import { signupData, loginData } from './authData.js';
import { validateEmail, validatePassword } from '../../utils/validation.js';
import { Ajax } from '../../utils/ajax.js';
import { toggleClasses } from '../../utils/toggleClasses.js';

const ajax = new Ajax('/api')

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
            if (data?.code === 0) {
                errorElement.textContent = data.status;
                return;
            }
            errorElement.textContent = '';
            closeLoginForm();
            updateToLoggedIn(data);
        });
}

export function showAuthForm(data) {
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

    overlay.addEventListener('click', () => toggleClasses([overlay, authForm], 'not_active', 'active'), {once: true});

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
            data = loginData;
            const AUTH_FORM_ANIMATION_DELAY = 170;
            toggleClasses([authForm.getElementsByClassName('auth')[0], authForm.getElementsByClassName('features')[0]], 'expand');
            setTimeout(() => updateForm(authForm, data), AUTH_FORM_ANIMATION_DELAY);
        } else {
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

function updateToLoggedIn(data) {
    const header = document.querySelector('header');
    const loginButton = header.querySelector('.enter');
    if (loginButton) {
        loginButton.textContent = data.email;
        loginButton.classList.remove('enter');
        loginButton.classList.add('user-profile');
        loginButton.addEventListener('click', logoutUser);
    }
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

function checkLoggedInStatus() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'user') {
            try {
                const user = JSON.parse(decodeURIComponent(value));
                updateToLoggedIn(user);
                return;
            } catch (error) {
                console.error('Error parsing user cookie:', error);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', checkLoggedInStatus);

function logoutUser() {
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    const header = document.querySelector('header');
    const userProfileButton = header.querySelector('.user-profile');
    if (userProfileButton) {
        userProfileButton.textContent = 'Выйти';
        userProfileButton.classList.remove('user-profile');
        userProfileButton.classList.add('enter');
    }
}
