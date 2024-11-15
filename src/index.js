'use strict';

import { MainPage } from './pages/main/main.js';
import { LogInPage } from '../pages/login/login.js';
import { SignUpPage } from '../pages/signup/signup.js';
import { logout } from './modules/logout.js';
import { AdvertPage } from '../pages/obyavlenie/obyavlenie.js';
import { CreateAdvertPage } from './pages/advertCreate/advertCreate.js';
import { CartPage } from './pages/cart/cart.js';
import { CategoryPage } from './pages/category/category.js';
import { AdvertEditPage } from './pages/advertEdit/advertEdit.js';
import { UserPage } from './pages/user/user.js';
import { SellerPage } from './pages/seller/seller.js';
import routing from './modules/routing.js';
import { ROUTES } from './constants/constants.js';
import './utils/hbsHelpers.js';

routing.init(ROUTES);
routing.addNewRouteWithRender('/', renderMain);
routing.addNewRouteWithRender('/advert', renderAdvert);
routing.addNewRouteWithRender('/create', renderCreateAdvert);
routing.addNewRouteWithRender('/cart', renderCart);
routing.addNewRouteWithRender('/category', renderCategory);
routing.addNewRouteWithRender('/edit', renderAdvertEdit);
routing.addNewRouteWithRender('/user', renderUser);
routing.addNewRouteWithRender('/seller', renderSeller);
routing.addNewRouteWithRender('/login', renderLogIn);
routing.addNewRouteWithRender('/logout', renderLogOut);
routing.addNewRouteWithRender('/signup', renderSignUp);

function renderMain(main) {
    const mainPage = new MainPage();
    return mainPage.render(main);
}

function renderAdvert(main, advertId) {
    const advertPage = new AdvertPage();
    return advertPage.render(main, advertId);
}

function renderCreateAdvert(main) {
    const createPage = new CreateAdvertPage();
    return createPage.render(main);
}

function renderCart(main) {
    const cartPage = new CartPage();
    return cartPage.render(main);
}

function renderCategory(main, categoryId) {
    const categoryPage = new CategoryPage();
    return categoryPage.render(main, categoryId);
}

function renderAdvertEdit(main, advertId) {
    const advertEditPage = new AdvertEditPage();
    return advertEditPage.render(main, advertId);
}

function renderUser(main, location) {
    const userPage = new UserPage();
    return userPage.render(main, location);
}

function renderSeller(main, sellerId) {
    const sellerPage = new SellerPage();
    return sellerPage.render(main, sellerId);
}

function renderLogIn() {
    const loginPage = new LogInPage();
    return loginPage.render();
}

function renderLogOut(main) {
    const mainPage = new MainPage();
    logout();
    return mainPage.render(main);
}

function renderSignUp() {
    const signUpPage = new SignUpPage();
    return signUpPage.render();
}

window.addEventListener('load', () => {
    const path = window.location.pathname;

    routing.goToPage(path);
});

window.addEventListener('popstate', event => {
    routing.goToPage(location.pathname, true);
});

document.addEventListener('click', event => {
    const target = event.target;

    if(target.tagName === 'A') {
        event.preventDefault();
        routing.goToPage(target.pathname);
    }

    //костыль для иконок категорий, без этого страница перезагружается
    if(target.className === 'list__icon') {
        event.preventDefault();
        routing.goToPage(target.parentNode.pathname);
    }
});