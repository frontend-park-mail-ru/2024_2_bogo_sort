'use strict';

import header from '../header/header.js';
import { signupData, loginData, BACKEND_BASE_URL } from '../../constants/constants.js';
import { validateEmail, validatePassword } from '../../utils/validation.js';
import ajax from '../../modules/ajax.js';
import { toggleClasses } from '../../utils/toggleClasses.js';
import { checkAuth } from '../../utils/checkAuth.js';
import { getUserImageUrl } from '../../utils/getUserImageUrl.js';

export class AuthComponent {
    /**
     * Renders the authentication template using Handlebars.
     *
     * @param {Object} data - The data to be passed to the template.
     * @returns {string} The rendered HTML string of the authentication template.
     */
    renderAuthTemplate(data) {
        const template = Handlebars.templates['auth.hbs'];

        return template({ title: data.title, info: data.info, inputs: data.inputs, buttontitle: data.buttontitle, pretext: data.pretext, anchortext: data.anchortext });
    }

    /**
     * Handles form submission for either registration or login.
     *
     * @param {Object} formData - The data collected from the form inputs.
     * @param {boolean} isRegistration - Indicates if the form is for registration or login.
     * @param {HTMLElement} errorElement - The element where error messages will be displayed.
     */
    handleFormSubmission(formData, isRegistration, errorElement) {
        const endpoint = isRegistration ? '/signup' : '/login';
        const errorMessage = isRegistration ? 'Ошибка регистрации!' : 'Ошибка авторизации!';
        const errors = new Set();

        if (isRegistration && formData.password !== formData.confirmPassword) {
            errors.add('confirmPassword');
        }

        if (!validateEmail(formData.email)) {
            errors.add('email');
        }

        if (!validatePassword(formData.password)) {
            errors.add('password');
            if(isRegistration) {
                errors.add('confirmPassword');
            }
        }

        if(errors.size !== 0){
            this.displayInputErrors(errors, errorElement);

            return;
        }

        ajax.post(endpoint, formData)
            .then(data => {
                if (data?.code !== undefined) {
                    errorElement.textContent = errorMessage;

                    return;
                }
                errorElement.textContent = '';
                this.updateToLoggedIn();
                this.closeLoginForm();
            });
    }

    /**
     * Displays input errors.
     *
     * @param {Map} errors - Map containing form errors.
     * @param {HTMLElement} errorElement - The element where error messages will be displayed.
     */
    displayInputErrors(errors, errorElement) {
        const authForm = document.querySelector('.auth');
        let inputs = [];
        if(errors.has('email')) {
            const inputEmail = authForm?.querySelector('.input__email');
            inputEmail?.classList.add('error');
            inputs.push(inputEmail);
        }
        if(errors.has('password')) {
            const inputPassword = authForm?.querySelector('.input__password');
            inputPassword?.classList.add('error');
            inputs.push(inputPassword);
        }
        if(errors.has('confirmPassword')) {
            const inputConfirmPassword = authForm?.querySelectorAll('.input__password')[1];
            inputConfirmPassword?.classList.add('error');
            inputs.push(inputConfirmPassword);
        }

        errorElement.innerText = 'Проверьте введенные данные';

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('error');
                if(!inputs.some((input) => input.classList.contains('error'))){
                    errorElement.innerText = '';
                }
            });
        });

    }

    /**
     * Displays the authentication form based on the provided data.
     *
     * @param {Object} data - The data needed to render the auth form.
     */
    showAuthForm(data) {
        if(checkAuth()){
            history.pushState(null, '', '/');

            return;
        }
        const initalUrl = window.location.pathname;
        history.pushState(null, '', data.title === 'Авторизация' ? '/login' : '/signup');

        let overlay = document.getElementById('overlay');
        let authForm = document.getElementById('login-form');

        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'overlay';
            overlay.id = 'overlay';
            document.getElementById('root').appendChild(overlay);

            authForm = document.createElement('div');
            authForm.className = 'login-form';
            authForm.id = 'login-form';
            authForm.innerHTML = this.renderAuthTemplate(data);
            document.getElementById('root').appendChild(authForm);
            overlay.classList.add('active');
            authForm.classList.add('active');

            this.addSubmitFormListener(authForm, data);
            this.addInputEventListeners();
            const registerLink = authForm.getElementsByClassName('link')[0];
            this.changeForm(registerLink, data, authForm);
        } else {
            toggleClasses([overlay, authForm], 'not-active', 'active');
        }

        overlay?.addEventListener('click', () => {
            toggleClasses([overlay, authForm], 'not-active', 'active');
            this.closeLoginForm(initalUrl);
            this.updateForm(authForm, loginData);
        }, {once: true});

    }

    /**
     * Adds event listeners on form inputs for errors display.
     */
    addInputEventListeners() {
        const inputWrapper = document.querySelector('.auth__input-wrapper');

        inputWrapper?.querySelectorAll('.form__tooltip input').forEach(input => {
            input?.addEventListener('blur', () => {
                const label = input.parentElement.querySelector('.input__label');
                if(input.value !== '') {
                    label?.classList.add('filled');
                } else {
                    label?.classList.remove('filled');
                }
            });
        });

        inputWrapper?.querySelectorAll('.form__tooltip .input__eye').forEach(eye => {
            eye.addEventListener('click', () => {
                this.togglePasswordVisibility(eye);
            });
        });
    }

    /**
     * Toggles password visibility.
     *
     * @param {HTMLElement} eye - Element containing eye image.
     */
    togglePasswordVisibility(eye) {
        eye.classList.toggle('visible');
        const input = eye.parentElement.querySelector('input');

        if(input?.getAttribute('type') === 'password') {
            input.setAttribute('type', 'text');

            return;
        }
        input?.setAttribute('type', 'password');
    }

    /**
     * Adds a click event listener to the submit button of the authentication form.
     *
     * @param {HTMLElement} authForm - The authentication form element.
     * @param {Object} data - The data needed for form processing.
     */
    addSubmitFormListener(authForm, data) {
        const form = authForm.querySelector('.form-wrapper');
        const errorElement = authForm.querySelector('.auth__error');

        form?.addEventListener('submit', (event) => {
            event.preventDefault();
            errorElement.textContent = '';

            const inputs = authForm.querySelectorAll('input');
            const formData = {};
            inputs?.forEach(input => {
                formData[input.name] = input.value;
            });

            this.handleFormSubmission(formData, data.title === 'Регистрация', errorElement);
        });
    }

    /**
     * Changes the authentication form between login and registration modes based on user interaction.
     *
     * @param {HTMLElement} registerLink - The link element that triggers the change.
     * @param {Object} data - The current data for the authentication form.
     * @param {HTMLElement} authForm - The authentication form element being modified.
     */
    changeForm(registerLink, data, authForm) {
        registerLink.addEventListener('click', () => {
            if (data.inputs.length > 2) {
                history.pushState(null, '', '/login');
                data = loginData;
                const AUTH_FORM_ANIMATION_DELAY = 170;
                toggleClasses([authForm.getElementsByClassName('auth-wrapper')[0], authForm.getElementsByClassName('features')[0]], 'expand');
                setTimeout(() => this.updateForm(authForm, data), AUTH_FORM_ANIMATION_DELAY);
            } else {
                history.pushState(null, '', '/signup');
                data = signupData;
                this.updateForm(authForm, data);
                const REGISTER_FORM_ANIMATION_DELAY = 10;
                setTimeout(() => {
                    toggleClasses([authForm.getElementsByClassName('auth-wrapper')[0], authForm.getElementsByClassName('features')[0]], 'expand');
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
    updateForm(authForm, data) {
        authForm.innerHTML = this.renderAuthTemplate(data);
        this.changeForm(authForm.getElementsByClassName('link')[0], data, authForm);
        this.addSubmitFormListener(authForm, data);
        this.addInputEventListeners();
    }

    /**
     * Updates the header to reflect that the user is logged in.
     */
    async updateToLoggedIn() {
        let user = await ajax.get('/me');
        user.username === '' ? 'Пользователь' : user.username;

        localStorage.setItem('id', user.id);
        localStorage.setItem('name', user.username);
        localStorage.setItem('imageUrl', await getUserImageUrl(user));

        header.changeHeader();
    }

    expandAuthForm() {
        const authForm = document.querySelector('.form-wrapper');
        toggleClasses([authForm?.getElementsByClassName('auth-wrapper')[0], authForm?.getElementsByClassName('features')[0]], 'expand');
    }

    /**
     * Closes the login form.
     */
    closeLoginForm(initalUrl) {
        const overlay = document.querySelector('.overlay');
        const loginForm = document.querySelector('.login-form');

        if (overlay && loginForm) {
            overlay?.classList.add('not-active');
            loginForm?.classList.add('not-active');
        }
        if(!initalUrl) {
            history.pushState(null, '', '/');

            return;
        }
        history.pushState(null, '', `${initalUrl}`);
    }
};
