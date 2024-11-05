'use strict';

import { MainPage } from './pages/main/main.js';
import { LogInPage } from './pages/login/login.js';
import { SignUpPage } from './pages/signup/signup.js';
import { UserPage } from './pages/user/user.js';

const base = document.getElementById('root');

const main = new MainPage();
base?.appendChild(main.render());

window.addEventListener('load', () => {
    switch(window.location.pathname) {
        case '/login':
            const loginPage = new LogInPage();
            base.innerHTML = '';
            base.appendChild(loginPage.render());
            break;
        case '/signup':
            const signupPage = new SignUpPage();
            base.innerHTML = '';
            base.appendChild(signupPage.render());
            break;
        case '/user':
            const userPage = new UserPage();
            base.innerHTML = '';
            base.appendChild(userPage.render());
            break;
    }
});
