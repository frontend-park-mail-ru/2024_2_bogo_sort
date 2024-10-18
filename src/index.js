'use strict';

import { MainPage } from './pages/main/main.js';
import { LogInPage } from '../pages/login/login.js';
import { SignUpPage } from '../pages/signup/signup.js';

const base = document.getElementById('root');

const main = new MainPage();
base?.appendChild(main.render());

window.addEventListener('load', () => {
    switch(window.location.pathname) {
        case '/login':
            const loginPage = new LogInPage();
            loginPage.render();
            break;
        case '/signup':
            const signupPage = new SignUpPage();
            signupPage.render();
            break;
        }
});
