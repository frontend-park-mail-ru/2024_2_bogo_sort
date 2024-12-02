'use strict';
import { pipe } from './modules/pipe.ts';
import { informationStorage } from './modules/informationStorage.ts';
import header from './components/header/header.ts';
import { AuthComponent } from './components/auth/auth.ts';
import { MainPage } from './pages/main/main.ts';
import { LogInPage } from './pages/login/login.ts';
import { SignUpPage } from './pages/signup/signup.ts';
import { AdvertPage } from './pages/obyavlenie/obyavlenie.ts';
import { CreateAdvertPage } from './pages/advertCreate/advertCreate.ts';
import { CartPage } from './pages/cart/cart.ts';
import { CategoryPage } from './pages/category/category.ts';
import { AdvertEditPage } from './pages/advertEdit/advertEdit.ts';
import { UserPage } from './pages/user/user.ts';
import { SellerPage } from './pages/seller/seller.ts';
import { SearchPage } from './pages/search/search.ts';
import { router } from './modules/router.ts';
import { ROUTES, PIPE_NAMES, signupData } from './constants/constants.ts';
import './utils/hbsHelpers.js';

pipe.init(PIPE_NAMES);
pipe.registerNewCallback('updateHeader', changeHeader);
pipe.registerNewCallback('disableCreateAdvertButton', disableCreateAdvertButton);
pipe.registerNewCallback('enableCreateAdvertButton', enableCreateAdvertButton);
pipe.registerNewCallback('showAuthForm', showAuthForm);
pipe.registerNewCallback('showSignupForm', showSignupForm);
pipe.registerNewCallback('disableCreateAdvertButton', disableCreateAdvertButton);
pipe.registerNewCallback('enableCreateAdvertButton', enableCreateAdvertButton);

function changeHeader() {
    return header.changeHeader();
}

function disableCreateAdvertButton() {
    return header.disableCreateAdvertButton();
}

function enableCreateAdvertButton() {
    return header.enableCreateAdvertButton();
}

function showAuthForm() {
    const authComponent = new AuthComponent();

    return authComponent.showAuthForm();
}

function showSignupForm() {
    const authComponent = new AuthComponent();

    return authComponent.showAuthForm(signupData);
}

function disableCreateAdvertButton() {
    return header.disableCreateAdvertButton();
} 


function enableCreateAdvertButton() {
    return header.enableCreateAdvertButton();
}

const main = initHeaderAndMain();
const routingEvent = new CustomEvent('pageChange');
router.init(ROUTES, main, routingEvent);
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
router.addNewRouteWithRender('/search', renderSearch);

function renderMain(main: HTMLElement) {
    const mainPage = new MainPage();

    return mainPage.render(main);
}

function renderAdvert(main: HTMLElement, advertId?: string) {
    if(!advertId) {
        return renderMain(main);
    }

    const advertPage = new AdvertPage();

    return advertPage.render(main, advertId);
}

function renderCreateAdvert(main: HTMLElement) {
    const createPage = new CreateAdvertPage();

    return createPage.render(main);
}

function renderCart(main: HTMLElement) {
    const cartPage = new CartPage();

    return cartPage.render(main);
}

function renderCategory(main: HTMLElement, categoryId?: string) {
    if(!categoryId){
        return renderMain(main);
    }

    const categoryPage = new CategoryPage();

    return categoryPage.render(main, categoryId);
}

function renderAdvertEdit(main: HTMLElement, advertId?: string) {
    if(!advertId) {
        return renderMain(main);
    }
    const advertEditPage = new AdvertEditPage();

    return advertEditPage.render(main, advertId);
}

function renderUser(main: HTMLElement, location?: string) {
    if(!location) {
        return renderMain(main);
    }
    const userPage = new UserPage();

    return userPage.render(main, location);
}

function renderSeller(main: HTMLElement, sellerId?: string) {
    if(!sellerId){
        return renderMain(main);
    }
    const sellerPage = new SellerPage();

    return sellerPage.render(main, sellerId);
}

function renderLogIn(main: HTMLElement) {
    const loginPage = new LogInPage();

    return loginPage.render(main);
}

function renderSignUp(main: HTMLElement) {
    const signUpPage = new SignUpPage();

    return signUpPage.render(main);
}

function renderSearch(main: HTMLElement, searchQuery?: string){
    if(!searchQuery){
        return renderMain(main);
    }
    const searchPage = new SearchPage();

    return searchPage.render(main, searchQuery);
}

window.addEventListener('load', async () => {
    const path = window.location.pathname;

    // if('serviceWorker' in navigator) {
    //     navigator.serviceWorker.register('/sw.js');
    // }

    await informationStorage.init();

    router.goToPage(path);
});




window.addEventListener('popstate', () => {
    router.goToPage(location.pathname, true);
});

document.addEventListener('click', event => {
    const target = event.target as HTMLAnchorElement;

    if(target.tagName === 'A') {
        event.preventDefault();
        router.goToPage(target.pathname);
    }

    //костыль для иконок категорий, без этого страница перезагружается
    if(target.className === 'list__icon') {
        event.preventDefault();
        router.goToPage((target.parentNode as HTMLAnchorElement).pathname);
    }
});

if(window.matchMedia('(max-width: 1000px)').matches){
    window.addEventListener('pageChange', () => {
        const [path, _] = router.getRouteAndParams(window.location.pathname);
        if(path === '/create' || path === '/edit' || path === '/cart' || path === '/user'){
            pipe.executeCallback('disableCreateAdvertButton');
        } else {
            pipe.executeCallback('enableCreateAdvertButton');
        }
    });
}

function initHeaderAndMain() {
    const root = document.querySelector('#root');
    const main = document.createElement('div');
    main.classList.add('main');
    root?.appendChild(main);
    main.appendChild(header.render());

    return main;
}

