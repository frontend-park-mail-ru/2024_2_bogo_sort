import { pipe } from '../../modules/pipe.ts';
import { informationStorage } from '../../modules/informationStorage.ts';
import { headerData } from '../../constants/constants.ts';
import { router } from '../../modules/router.ts';
import { logout } from '../../modules/logout.ts';
import template from './header.hbs';

class Header {
    #wrapper;

    constructor() {
        this.#wrapper = document.createElement('header');
        this.#wrapper.classList.add('header');
    }

    render() {
        this.#renderTemplate();
        this.#addListeners();

        return this.#wrapper;
    }

    #getData() {
        const data = headerData;
        data.checkAuth = informationStorage.isAuth();
        const user = informationStorage.getUser();
        if(user){
            data.userName = user.username;
        }
        data.userImgUrl = informationStorage.getUserImgUrl();

        return data;
    }

    /**
     * Renders the header template.
     */
    #renderTemplate() {
        const data = this.#getData();
        this.#wrapper.innerHTML = template({ category: data.category, checkAuth: data.checkAuth, userName: data.userName, userImgUrl: data.userImgUrl, menuItems: data.menuItems });
    }

    /**
     * Adds event listeners to the header elements.
     */
    #addListeners() {
        const headerButton = this.#wrapper.querySelector('.header__button');

        headerButton?.addEventListener('click', () => {
            if(informationStorage.isAuth()){
                logout();
            } else {
                pipe.executeCallback('showAuthForm');
            }
        });

        const createAdvertButton = this.#wrapper.querySelector('.header__create-advert-button');
        createAdvertButton?.addEventListener('click', () => {
            if(!informationStorage.isAuth()){
                pipe.executeCallback('showAuthForm');

                return;
            }
            router.goToPage('/create');
        });

        if(window.matchMedia('(max-width: 1000px)').matches) {
            let lastScrollTop = 0;
            window.addEventListener('scroll', () => {
                const currentScrollTop = window.scrollY;
                if(!createAdvertButton?.classList.contains('at-bottom') && currentScrollTop > lastScrollTop) {
                    createAdvertButton?.classList.add('at-bottom');
                } else if(createAdvertButton?.classList.contains('at-bottom') && currentScrollTop <= lastScrollTop) {
                    createAdvertButton.classList.remove('at-bottom');
                }
                lastScrollTop = currentScrollTop;
            });
        }

        const logoutButton = this.#wrapper.querySelector('.menu__link-logout');
        logoutButton?.addEventListener('click', event => {
            event.preventDefault();
            logout();
        });

        const listButton = this.#wrapper.querySelector('.header__list-button');
        const list = this.#wrapper.querySelector('.header__list');

        listButton?.addEventListener('click', () => {
            if(list?.classList.contains('not-active')) {
                list.classList.remove('not-active');

                return;
            }

            list?.classList.add('not-active');
        });

        list?.addEventListener('click', () => {
            list.classList.add('not-active');
        });

        list?.addEventListener('click', () => {
            list.classList.add('not-active');
        });

        const menuButton = this.#wrapper.querySelector('.user-menu');
        const userMenu = this.#wrapper.querySelector('.user-menu__menu');

        menuButton?.addEventListener('click', () => {
            if(userMenu?.classList.contains('not-active')) {
                userMenu.classList.remove('not-active');

                return;
            }

            userMenu?.classList.add('not-active');
        });

        const searchbar = this.#wrapper.querySelector('.searchbar');
        const searchButton = this.#wrapper.querySelector('.searchbar__find-button');
        const searchInput = this.#wrapper.querySelector('.searchbar__input');
        searchInput?.addEventListener('focus', () => {
            if(searchbar?.classList.contains('focus')) {
                searchbar.classList.remove('focus');
            } else {
                searchbar?.classList.add('focus');
            }
            if(searchButton?.classList.contains('focus')) {
                searchButton.classList.remove('focus');
            } else {
                searchButton?.classList.add('focus');
            }
        });

        searchbar?.addEventListener('submit', (event) => {
            event.preventDefault();
            const query = (searchInput as HTMLInputElement).value;
            if(query.length !== 0){
                router.goToPage(`/search/${query}`);
            }
        });

        if(userMenu || list) {
            window.addEventListener('mousedown', (event) => {
                if(!list?.contains(event.target as Node) && !listButton?.contains(event.target as Node)) {
                    list?.classList.add('not-active');
                }

                if(!userMenu?.contains(event.target as Node) && !menuButton?.contains(event.target as Node)) {
                    userMenu?.classList.add('not-active');
                }

                if(!searchInput?.contains(event.target as Node) && !searchbar?.contains(event.target as Node) && !searchButton?.contains(event.target as Node)) {
                    searchButton?.classList.remove('focus');
                    searchbar?.classList.remove('focus');
                }
            });
        }
    }

    changeHeader() {
        this.#renderTemplate();
        this.#addListeners();
    }

    disableCreateAdvertButton() {
        const button = this.#wrapper.querySelector('.header__create-advert-button');
        if(!button?.classList.contains('not-active')){
            button?.classList.add('not-active');
        }
    }

    enableCreateAdvertButton() {
        const button = this.#wrapper.querySelector('.header__create-advert-button');
        if(button?.classList.contains('not-active')){
            button?.classList.remove('not-active');
        }
    }
}

export default new Header();
