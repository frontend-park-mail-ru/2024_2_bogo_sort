'use strict'

import { signupData, loginData, BACKEND_URL } from '../../constants/constants.js';
import { validateEmail, validatePassword } from '../../utils/validation.js';
import { Ajax } from '../../utils/ajax.js';
import { toggleClasses } from '../../utils/toggleClasses.js';
import { checkAuth } from '../../utils/checkAuth.js';

// const ajax = new Ajax('http://127.0.0.1:8080/api/v1');
const ajax = new Ajax(BACKEND_URL);

/**
 * Renders the authentication template using Handlebars.
 * 
 * @param {Object} data - The data to be passed to the template.
 * @returns {string} The rendered HTML string of the authentication template.
 */
export function renderAuthTemplate(data) {
    const template = Handlebars.templates['auth.hbs'];
    return template({ title: data.title, info: data.info, inputs: data.inputs, buttontitle: data.buttontitle, pretext: data.pretext, anchortext: data.anchortext });
}

/**
 * Handlebars helper to check equality of two values and additional conditions.
 * 
 * @param {*} a - First value to compare.
 * @param {*} b - Second value to compare.
 * @param {*} c - Third value for additional condition.
 * @param {*} d - Fourth value for additional condition.
 * @returns {boolean} True if a equals b and c equals d, otherwise false.
 */
Handlebars.registerHelper('eq', function (a, b, c, d) {
    return a === b && c === d;
});

/**
 * Handles form submission for either registration or login.
 * 
 * @param {Object} formData - The data collected from the form inputs.
 * @param {boolean} isRegistration - Indicates if the form is for registration or login.
 * @param {HTMLElement} errorElement - The element where error messages will be displayed.
 */
function handleFormSubmission(formData, isRegistration, errorElement) {
    const endpoint = isRegistration ? '/signup' : '/login';
    const errorMessage = isRegistration ? 'Ошибка регистрации!' : 'Ошибка авторизации!';

    if (isRegistration && formData.password !== formData.confirmPassword) {
        errorElement.textContent = 'Пароли не совпадают';
        return;
    }

    if (!validateEmail(formData.email)) {
        errorElement.textContent = 'Неправильный email';
        return;
    }

    if (!validatePassword(formData.password)) {
        errorElement.textContent = 'Неправильный пароль';
        return;
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

/**
 * Displays the authentication form based on the provided data.
 * 
 * @param {Object} data - The data needed to render the auth form.
 * @param {string} data.title - The title of the authentication form.
 */
export function showAuthForm(data) {
    if(checkAuth()){
        history.pushState(null, '', '/');
        return;
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

/**
 * Adds a click event listener to the submit button of the authentication form.
 * 
 * @param {HTMLElement} authForm - The authentication form element.
 * @param {Object} data - The data needed for form processing.
 */
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

/**
 * Changes the authentication form between login and registration modes based on user interaction.
 * 
 * @param {HTMLElement} registerLink - The link element that triggers the change.
 * @param {Object} data - The current data for the authentication form.
 * @param {HTMLElement} authForm - The authentication form element being modified.
 */
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

/**
 * Updates the authentication form with new data.
 * 
 * @param {HTMLElement} authForm - The authentication form element to be updated.
 * @param {Object} data - The data used to render the authentication template.
 */
function updateForm(authForm, data) {
    authForm.innerHTML = renderAuthTemplate(data);
    changeForm(authForm.getElementsByClassName('link')[0], data, authForm);
    addSubmitClickListener(authForm, data);
}

/**
 * Updates the header to reflect that the user is logged in.
 */
function updateToLoggedIn() {
    const header = document.querySelector('header');
    const headerButton = header.querySelector('.header_button');

    headerButton.textContent = 'Выйти';

    const headerButtonClone = headerButton.cloneNode(true);
    headerButtonClone.addEventListener('click', logoutUser);

    header.replaceChild(headerButtonClone, headerButton);
}

/**
 * Closes the login form and removes it from the DOM.
 */
function closeLoginForm() {
    history.pushState(null, '', '/');
    const overlay = document.querySelector('.overlay');
    const loginForm = document.querySelector('.login_form');

    if (overlay && loginForm) {
        overlay.classList.add('not_active');
        loginForm.classList.add('not_active');

        overlay.remove();
        loginForm.remove();
    }
}

/**
 * Logs out the user by sending a request to the server and updating the UI.
 * 
 * @async
 * @returns {Promise<void>}
 */
export async function logoutUser() {
    const header = document.querySelector('header');
    const headerButton = header?.querySelector('.header_button');

    const token = localStorage.getItem('jwt');
    const data = await ajax.post('/logout', null, {'Authorization': `Bearer ${token}`})
    if(data.code !== undefined){
        console.log('logout error');
        return;
    }
    localStorage.removeItem('jwt');
    
    headerButton.textContent = 'Войти';
    const headerButtonClone = headerButton.cloneNode(true);
    headerButtonClone.addEventListener('click', () => {
        showAuthForm(loginData);
    });
    
    header.replaceChild(headerButtonClone, headerButton);
}
