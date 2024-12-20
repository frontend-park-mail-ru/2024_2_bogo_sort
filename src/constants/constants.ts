import { ModalWithOverlayTemplateData } from "@components/modalWithOverlay/modalWithOverlayTypes.ts";
import { HeaderData } from "./sharedTypes.ts";

export const BACKEND_BASE_URL = 'http://127.0.0.1:8080/api/v1';
// export const BACKEND_BASE_URL = 'https://emporium-bs.ru/api/v1';
// export const BACKEND_BASE_URL = 'http://5.188.141.136:8080/api/v1';

export const BASE_URL = 'http://127.0.0.1:8080/';
// export const BASE_URL = 'https://emporuim-bs.ru/';
// export const BASE_URL = 'http://5.188.141.136:8080/';

export const IMAGE_URL = 'http://127.0.0.1:8080/api/v1/files/stream/';
// export const IMAGE_URL = 'https://emporium-bs.ru/api/v1/files/stream/';
// export const IMAGE_URL = 'http://5.188.141.136:8080/api/v1/files/stream/';

export const ROUTES = {
    '/': {
        href: '/',
        name: 'mainPage',
        render: () => {}
    },
    '/login': {
        href: '/login',
        name: 'loginPage',
        render: () => {}
    },
    '/signup': {
        href: '/signup',
        name: 'signupPage',
        render: () => {}
    },
    '/item': {
        href: '/item/:id',
        name: 'advertPage',
        render: () => {}
    },
    '/create': {
        href: '/create',
        name: 'advertCreatePage',
        render: () => {}
    },
    '/cart': {
        href: '/cart',
        name: 'cartPage',
        render: () => {}
    },
    '/category': {
        href: '/categpry/:id',
        name: 'categoryPage',
        render: () => {}
    },
    '/edit': {
        href: '/edit/:id',
        name: 'advertEditPage',
        render: () => {}
    },
    '/user': {
        href: '/user/:id',
        name: 'userPage',
        render: () => {}
    },
    '/seller': {
        href: '/seller/:id',
        name: 'sellerPage',
        render: () => {}
    },
    '/search': {
        href: '/search/:query',
        name: 'searchPage',
        render: () => {}
    }
};

export const PIPE_NAMES = {
    'updateHeader': {
        callback: null,
    },
    'showAuthForm': {
        callback: null,
    },
    'showSignupForm': {
        callback: null,
    },
    'disableCreateAdvertButton': {
        callback: null,
    },
    'enableCreateAdvertButton': {
        callback: null,
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
    buttonTitle: 'Войти',
    pretext: 'Нет аккаунта?',
    anchorText: 'Зарегистрироваться'
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
    buttonTitle: 'Зарегистрироваться',
    pretext: 'Уже есть аккаунт?',
    anchorText: 'Войти'
};

export const headerData: HeaderData = {
    checkAuth: false,
    userName: null,
    userImgUrl: null,
    cartItems: 0,
    cartItemsClass: '',
    category: [
        {
            name: 'Женский гардероб',
            iconUrl: '../../static/images/list-icons/user-female.svg',
            redirectUrl: '/category/d4d10f10-4f9a-4bd5-ab1e-d2fc3ed35748',
            id: 'd4d10f10-4f9a-4bd5-ab1e-d2fc3ed35748',
        }, {
            name: 'Мужской гардероб',
            iconUrl: '../../static/images/list-icons/user-male.svg',
            redirectUrl: '/category/d49a98a6-f041-4432-b255-f23d4a97edde',
            id: 'd49a98a6-f041-4432-b255-f23d4a97edde'
        }, {
            name: 'Детский гардероб',
            iconUrl: '../../static/images/list-icons/baby.svg',
            redirectUrl: '/category/f21963b7-fd2b-4770-97f0-8dfac77c6155',
            id: 'f21963b7-fd2b-4770-97f0-8dfac77c6155',
        }, {
            name: 'Детские товары',
            iconUrl: '../../static/images/list-icons/puzzle.svg',
            redirectUrl: '/category/97f4f702-5412-4588-8e53-b682499df8c7',
            id: '97f4f702-5412-4588-8e53-b682499df8c7'
        }, {
            name: 'Стройматериалы и инструменты',
            iconUrl: '../../static/images/list-icons/paint-roller.svg',
            redirectUrl: '/category/1a4f92f6-c6f5-4930-91e8-163ec679ed0d',
            id: '1a4f92f6-c6f5-4930-91e8-163ec679ed0d'
        }, {
            name: 'Компьютерная техника',
            iconUrl: '../../static/images/list-icons/phone.svg',
            redirectUrl: '/category/aeeb6c57-b428-450c-8049-fbb942aa0d1c',
            id: 'aeeb6c57-b428-450c-8049-fbb942aa0d1c'
        }, {
            name: 'Для дома и дачи',
            iconUrl: '../../static/images/list-icons/sofa.svg',
            redirectUrl: '/category/e310f974-9ea8-4e78-ad86-4fb49c92842a',
            id: 'e310f974-9ea8-4e78-ad86-4fb49c92842a'
        }, {
            name: 'Бытовая техника',
            iconUrl: '../../static/images/list-icons/bulb.svg',
            redirectUrl: '/category/c513af49-3189-49cf-aed5-6a23465b5056',
            id: 'c513af49-3189-49cf-aed5-6a23465b5056'
        }, {
            name: 'Спорт и отдых',
            iconUrl: '../../static/images/list-icons/dribbble.svg',
            redirectUrl: '/category/cb905cad-0bd2-42fd-a3da-712ea07d8a8b',
            id: 'cb905cad-0bd2-42fd-a3da-712ea07d8a8b'
        }, {
            name: 'Хобби и развлечения',
            iconUrl: '../../static/images/list-icons/paint-brush-2.svg',
            redirectUrl: '/category/fe767d7e-5754-45b3-9a35-7015ff103aee',
            id: 'fe767d7e-5754-45b3-9a35-7015ff103aee'
        }, {
            name: 'Красота и здоровье',
            iconUrl: '../../static/images/list-icons/tooth.svg',
            redirectUrl: '/category/4368d269-9710-448c-8d99-0f76b8e4eb30',
            id: '4368d269-9710-448c-8d99-0f76b8e4eb30'
        }
    ],

    menuItems: [
        {
            name: 'Корзина',
            iconUrl: '../../static/images/user-menu-icons/cart.svg',
            redirectUrl: '/cart',
            engName: 'cart'
        },
        {
            name: 'Мои объявления',
            iconUrl: '../../static/images/user-menu-icons/adverts.svg',
            redirectUrl: '/user/adverts',
            engName: 'adverts',
        },
        {
            name: 'Мои заказы',
            iconUrl: '../../static/images/user-menu-icons/orders.svg',
            redirectUrl: '/user/orders',
            engName: 'orders'
        },
        {
            name: 'Избранное',
            iconUrl: '../../static/images/user-menu-icons/like.svg',
            redirectUrl: '/user/favourites',
            engName: 'favourites'
        },
        {
            name: 'Настройки',
            iconUrl: '../../static/images/user-menu-icons/6.svg',
            redirectUrl: '/user/settings',
            engName: 'settings'
        },
        {
            name: 'Выйти',
            iconUrl: '../../static/images/user-menu-icons/Sign_out.svg',
            redirectUrl: '/',
            engName: 'logout'
        },
    ],
};

export const placeOrderData: ModalWithOverlayTemplateData = {
    title: 'Оформление заказа',
    info: 'Введите данные для оформления заказа',
    select: true,
    selectLabel: 'Вид доставки',
    selectOptions: [
        {
            name: 'Доставка',
            value: 'delivery'
        },
        {
            name: 'Заберу у продавца',
            value: 'pickup'
        },
    ],
    selectName: 'delivery_method',
    inputs: [
        {
            name: 'name',
            label: 'ФИО получателя',
            type: 'text',
            placeholder: 'Иванов Иван Иванович'
        },
        {
            name: 'address',
            label: 'Адрес доставки',
            type: 'text',
            placeholder: 'г.Москва, ул.Пушкина, д.15 к.1'
        } 
    ],
    buttonText: 'Оформить заказ'
}
