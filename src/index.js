'use strict';

import { MainPage } from './pages/main/main.js';
import { LogInPage } from '../pages/login/login.js';
import { SignUpPage } from '../pages/signup/signup.js';
import { LogOutPage } from '../pages/logout/logout.js';
import { AdvertPage } from '../pages/obyavlenie/obyavlenie.js';
import { CreateAdvertPage } from './pages/advertCreate/advertCreate.js';
import { CartPage } from './pages/cart/cart.js';
import { CategoryPage } from './pages/category/category.js';
import { AdvertEditPage } from './pages/advertEdit/advertEdit.js';
import { UserPage } from './pages/user/user.js';
import { SellerPage } from './pages/seller/seller.js';
import './utils/hbsHelpers.js';

const base = document.getElementById('root');
const main = new MainPage();



window.addEventListener('load', () => {
    let path = window.location.pathname;
    let numberOfSlashes = 0;
    for(const char of path) {
        numberOfSlashes += Number(char === '/'); 
    }
    if(numberOfSlashes > 1) {
        path = path.slice(0, path.indexOf('/', 1));
    }

    switch(path) {
        case '/':
            main.render();
            break;
        case '/login':
            main.render();
            const loginPage = new LogInPage();
            loginPage.render();
            break;
        case '/signup':
            main.render();
            const signupPage = new SignUpPage();
            signupPage.render();
            break;
        case '/logout':
            main.render();
            const logoutPage = new LogOutPage();
            logoutPage.render();
            break;
        case '/advert':
            const advertPage = new AdvertPage();
            advertPage.render();
            break;
        case '/create':
            const createPage = new CreateAdvertPage();
            createPage.render();
            break;
        case '/cart':
            const cartPage = new CartPage();
            cartPage.render();
            break;
        case '/category':
            const categoryPage = new CategoryPage();
            categoryPage.render();
            break;
        case '/change':
            const changeAdvertPage = new AdvertEditPage();
            changeAdvertPage.render();
            break;
        case '/user':
            const userPage = new UserPage();
            userPage.render();
            break;
        case '/seller':
            const sellerPage = new SellerPage();
            sellerPage.render();
            break;
    }
});
