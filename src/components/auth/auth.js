'use strict'

import { signupData, loginData } from './authData.js';
import { validEmail, validPassword } from '../../modules/validation.js';

export function renderAuthTemplate(title, info, inputs, buttontitle, pretext, anchortext) {
    const template = Handlebars.templates['auth.hbs'];
    return template({title, info, inputs, buttontitle, pretext, anchortext});
}

function toggleClasses(elements, ...classNames) {
    elements.forEach(element => {
        classNames.forEach(className => {
            element.classList.toggle(className);
        });
    });
}

function handleFormSubmission(formData, isRegistration, errorElement) {
    const endpoint = isRegistration ? '/api/register' : '/api/login';
    const errorMessage = isRegistration ? 'Ошибка регистрации!' : 'Ошибка авторизации!';

    if (!validEmail(formData.email)) {
        errorElement.textContent = 'Неправильный email';
        return;
    }
    if (!validPassword(formData.password)) {
        errorElement.textContent = 'Неправильный пароль';
        return;
    }

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            errorElement.textContent = '';
            closeLoginForm();
            if (isRegistration) {
                showAuthForm(loginData);
            } else {
                updateToLoggedIn(data.user);
                document.cookie = `user=${JSON.stringify(data.user)}; path=/; max-age=86400`;
            }
        } else {
            errorElement.textContent = errorMessage;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        errorElement.textContent = errorMessage;
    });
}

export function showAuthForm(data) {
    let overlay = document.getElementsByClassName('overlay')[0];
    let authForm = document.getElementsByClassName('login_form')[0];

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.getElementsByClassName('base')[0].appendChild(overlay);

        authForm = document.createElement('div');
        authForm.className = 'login_form';
        authForm.innerHTML = renderAuthTemplate(data.title, data.info, data.inputs, data.buttontitle, data.pretext, data.anchortext);
        document.body.appendChild(authForm);
        overlay.classList.add('active');
        authForm.classList.add('active');
    } else {
        toggleClasses([overlay, authForm], 'not_active', 'active');
    }

    overlay.addEventListener('click', () => toggleClasses([overlay, authForm], 'not_active', 'active'));

    const registerLink = authForm.getElementsByClassName('link')[0];
    changeForm(registerLink, data, authForm);

    addSubmitClickListener(authForm, data);
}

function addSubmitClickListener(authForm, data) {
    const submitButton = authForm.querySelector('.authorization_enter');
    const errorElement = authForm.querySelector('.authorization_error');
    
    submitButton.addEventListener('click', () => {
        errorElement.textContent = '';
        
        const inputs = authForm.querySelectorAll('input');
        const formData = {};
        inputs.forEach(input => {
            formData[input.name || input.type] = input.value;
        });

        handleFormSubmission(formData, data.inputs.length > 2, errorElement);
    }, {once: true});
}

function changeForm(registerLink, data, authForm) {
    registerLink.addEventListener('click', () => {
        if (data.inputs.length > 2) {
            data = loginData;
            toggleClasses([authForm.getElementsByClassName('auth')[0], authForm.getElementsByClassName('features')[0]], 'expand');
            setTimeout(() => updateForm(authForm, data), 220);
        } else {
            data = signupData;
            updateForm(authForm, data);
            setTimeout(() => {
                toggleClasses([authForm.getElementsByClassName('auth')[0], authForm.getElementsByClassName('features')[0]], 'expand');
            }, 10);
        }
    });
}

function updateForm(authForm, data) {
    authForm.innerHTML = renderAuthTemplate(data.title, data.info, data.inputs, data.buttontitle, data.pretext, data.anchortext);
    changeForm(authForm.getElementsByClassName('link')[0], data, authForm);
    addSubmitClickListener(authForm, data);
}

function updateToLoggedIn(user) {
    const header = document.querySelector('header');
    const loginButton = header.querySelector('.enter');
    if (loginButton) {
        loginButton.textContent = user.email;
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
