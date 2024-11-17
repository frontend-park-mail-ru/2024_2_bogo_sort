'use strict';

import { pipe } from './modules/pipe.js';
import { informationStorage } from './modules/informationStorage.js';
import header from './components/header/header.js';
import { AuthComponent } from './components/auth/auth.js';
import { MainPage } from './pages/main/main.js';
import { LogInPage } from '../pages/login/login.js';
import { SignUpPage } from '../pages/signup/signup.js';
import { AdvertPage } from '../pages/obyavlenie/obyavlenie.js';
import { CreateAdvertPage } from './pages/advertCreate/advertCreate.js';
import { CartPage } from './pages/cart/cart.js';
import { CategoryPage } from './pages/category/category.js';
import { AdvertEditPage } from './pages/advertEdit/advertEdit.js';
import { UserPage } from './pages/user/user.js';
import { SellerPage } from './pages/seller/seller.js';
import { router } from './modules/router.js';
import { ROUTES, PIPE_NAMES } from './constants/constants.js';
import './utils/hbsHelpers.js';

pipe.init(PIPE_NAMES);
pipe.registerNewCallback('updateHeader', changeHeader);
pipe.registerNewCallback('showAuthForm', showAuthForm);

function changeHeader() {
    return header.changeHeader();
}

function showAuthForm() {
    const authComponent = new AuthComponent();
    return authComponent.showAuthForm();
}

const main = initHeaderAndMain();
router.init(ROUTES, main);
router.addNewRouteWithRender('/', renderMain);
router.addNewRouteWithRender('/advert', renderAdvert);
router.addNewRouteWithRender('/create', renderCreateAdvert);
router.addNewRouteWithRender('/cart', renderCart);
router.addNewRouteWithRender('/category', renderCategory);
router.addNewRouteWithRender('/edit', renderAdvertEdit);
router.addNewRouteWithRender('/user', renderUser);
router.addNewRouteWithRender('/seller', renderSeller);
router.addNewRouteWithRender('/login', renderLogIn);
router.addNewRouteWithRender('/signup', renderSignUp);

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

function renderSignUp() {
    const signUpPage = new SignUpPage();
    return signUpPage.render();
}

window.addEventListener('load', () => {
    const path = window.location.pathname;

    router.goToPage(path);
});

await informationStorage.init();

window.addEventListener('popstate', () => {
    router.goToPage(location.pathname, true);
});

document.addEventListener('click', event => {
    const target = event.target;

    if(target.tagName === 'A') {
        event.preventDefault();
        router.goToPage(target.pathname);
    }

    //костыль для иконок категорий, без этого страница перезагружается
    if(target.className === 'list__icon') {
        event.preventDefault();
        router.goToPage(target.parentNode.pathname);
    }
});

function initHeaderAndMain() {
    const root = document.querySelector('#root');
    const main = document.createElement('div');
    main.classList.add('main');
    root.appendChild(main);
    main.appendChild(header.render());

    return main;
}
