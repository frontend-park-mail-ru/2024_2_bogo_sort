'use strict';

export const ROUTES = {
    '/': {
        href: '/',
        name: 'mainPage'
    },
    '/login': {
        href: '/login',
        name: 'loginPage'
    },
    '/signup': {
        href: '/signup',
        name: 'signupPage'
    },
    '/logout': {
        href: '/logout',
        name: 'logout'
    },
    '/advert': {
        href: '/advert/:id',
        name: 'advertPage'
    },
    '/create': {
        href: '/create',
        name: 'advertCreatePage'
    },
    '/cart': {
        href: '/cart',
        name: 'cartPage'
    },
    '/category': {
        href: '/categpry/:id',
        name: 'categoryPage'
    },
    '/edit': {
        href: '/edit/:id',
        name: 'advertEditPage'
    },
    '/user': {
        href: '/user/:id',
        name: 'userPage'
    },
    '/seller': {
        href: '/seller/:id',
        name: 'sellerPage'
    }
};

export const loginData = {
    title: 'Авторизация',
    info: 'Войдите в свой аккаунт',
    inputs: [
        {
            form: 'login',
            type: 'text',
            class: 'input__email',
            name: 'email',
            placeholder: 'Email'
        },
        {
            form: 'login',
            type: 'password',
            class: 'input__password',
            name: 'password',
            placeholder: 'Пароль'
        }
    ],
    buttontitle: 'Войти',
    pretext: 'Нет аккаунта?',
    anchortext: 'Зарегистрироваться'
};

export const signupData = {
    title: 'Регистрация',
    info: 'Создайте новый аккаунт',
    inputs: [
        {
            form: 'signup',
            type: 'text',
            class: 'input__email',
            name: 'email',
            placeholder: 'Email'
        },
        {
            form: 'signup',
            type: 'password',
            class: 'input__password',
            name: 'password',
            placeholder: 'Пароль'
        },
        {
            form: 'signup',
            type: 'password',
            class: 'input__password',
            name: 'confirmPassword',
            placeholder: 'Подтвердите пароль'
        }
    ],
    buttontitle: 'Зарегистрироваться',
    pretext: 'Уже есть аккаунт?',
    anchortext: 'Войти'
};

export const headerData = {
    category: [
        {
            name: 'Женский гардероб',
            iconUrl: '../../static/images/list-icons/user-female.svg',
            redirectUrl: '/category/d4d10f10-4f9a-4bd5-ab1e-d2fc3ed35748'
        }, {
            name: 'Мужской гардероб',
            iconUrl: '../../static/images/list-icons/user-male.svg',
            redirectUrl: '/category/d49a98a6-f041-4432-b255-f23d4a97edde'
        }, {
            name: 'Детский гардероб',
            iconUrl: '../../static/images/list-icons/baby.svg',
            redirectUrl: '/category/f21963b7-fd2b-4770-97f0-8dfac77c6155'
        }, {
            name: 'Детские товары',
            iconUrl: '../../static/images/list-icons/puzzle.svg',
            redirectUrl: '/category/97f4f702-5412-4588-8e53-b682499df8c7'
        }, {
            name: 'Стройматериалы и инструменты',
            iconUrl: '../../static/images/list-icons/paint-roller.svg',
            redirectUrl: '/category/1a4f92f6-c6f5-4930-91e8-163ec679ed0d'
        }, {
            name: 'Компьютерная техника',
            iconUrl: '../../static/images/list-icons/phone.svg',
            redirectUrl: '/category/aeeb6c57-b428-450c-8049-fbb942aa0d1c'
        }, {
            name: 'Для дома и дачи',
            iconUrl: '../../static/images/list-icons/sofa.svg',
            redirectUrl: '/category/e310f974-9ea8-4e78-ad86-4fb49c92842a'
        }, {
            name: 'Бытовая техника',
            iconUrl: '../../static/images/list-icons/bulb.svg',
            redirectUrl: '/category/c513af49-3189-49cf-aed5-6a23465b5056'
        }, {
            name: 'Спорт и отдых',
            iconUrl: '../../static/images/list-icons/dribbble.svg',
            redirectUrl: '/category/cb905cad-0bd2-42fd-a3da-712ea07d8a8b'
        }, {
            name: 'Хобби и развлечения',
            iconUrl: '../../static/images/list-icons/paint-brush-2.svg',
            redirectUrl: '/category/fe767d7e-5754-45b3-9a35-7015ff103aee'
        }, {
            name: 'Красота и здоровье',
            iconUrl: '../../static/images/list-icons/tooth.svg',
            redirectUrl: '/category/4368d269-9710-448c-8d99-0f76b8e4eb30'
        }
    ],

    menuItems: [
        {
            name: 'Корзина',
            iconUrl: '../../static/images/user-menu-icons/cart.svg',
            redirectUrl: '/cart'
        },
        {
            name: 'Мои объявления',
            iconUrl: '../../static/images/user-menu-icons/adverts.svg',
            redirectUrl: '/user/adverts'
        },
        {
            name: 'Мои заказы',
            iconUrl: '../../static/images/user-menu-icons/orders.svg',
            redirectUrl: '/user/orders'
        },
        {
            name: 'Настройки',
            iconUrl: '../../static/images/user-menu-icons/6.svg',
            redirectUrl: '/user/settings'
        },
        {
            name: 'Выйти',
            iconUrl: '../../static/images/user-menu-icons/Sign_out.svg',
            redirectUrl: '#'
        },
    ],
};

export const BACKEND_BASE_URL = 'http://127.0.0.1:8080/api/v1';
// export const BACKEND_BASE_URL = 'http://5.188.141.136:8080/api/v1';

export const BASE_URL = 'http://127.0.0.1:8080/';
// export const IMAGE_URL = 'http://5.188.141.136:8080/';
