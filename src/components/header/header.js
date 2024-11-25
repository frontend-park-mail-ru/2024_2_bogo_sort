import { pipe } from '../../modules/pipe.js';
import { informationStorage } from '../../modules/informationStorage.js';
import { checkAuth } from '../../utils/checkAuth.js';
import { headerData } from '../../constants/constants.js';
import { router } from '../../modules/router.js';
import { logout } from '../../modules/logout.js';
import template from './header.hbs';

/**
 * Represents a header component.
 */
class Header {
    #wrapper;

    /**
     * Creates an instance of the Header class.
     */
    constructor() {
        this.#wrapper = document.createElement('header');
        this.#wrapper.classList.add('header');
    }

    /**
     * Renders the header component and sets up event listeners.
     *
     * @returns {HTMLElement} The rendered header element.
     */
    render() {
        this.#renderTemplate();
        this.#addListeners();

        return this.#wrapper;
    }

    #getData() {
        const data = headerData;
        data.checkAuth = informationStorage.isAuth();
        data.userName = informationStorage.getUser()?.username;
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
            if(checkAuth()){
                logoutUser();
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
                let currentScrollTop = window.scrollY;
                if(!createAdvertButton.classList.contains('at-bottom') && currentScrollTop > lastScrollTop) {
                    createAdvertButton.classList.add('at-bottom');
                } else if(createAdvertButton.classList.contains('at-bottom') && currentScrollTop <= lastScrollTop) {
                    createAdvertButton.classList.remove('at-bottom');
                }
                lastScrollTop = currentScrollTop;
            })
        }

        const logoutButton = this.#wrapper.querySelector('.menu__link-logout');
        logoutButton?.addEventListener('click', event => {
            event.preventDefault();
            logout();
        });

        const listButton = this.#wrapper.querySelector('.header__list-button');
        const list = this.#wrapper.querySelector('.header__list');

        listButton?.addEventListener('click', () => {
            if(list.classList.contains('not-active')) {
                list.classList.remove('not-active');

                return;
            }

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
                searchbar.classList.add('focus');
            }
            if(searchButton?.classList.contains('focus')) {
                searchButton.classList.remove('focus');
            } else {
                searchButton.classList.add('focus');
            }
        });

        searchbar?.addEventListener('submit', (event) => {
            event.preventDefault();
            const query = searchInput?.value;
            if(query.length !== 0){
                router.goToPage(`/search/${query}`);
            }
        })

        if(userMenu || list) {
            window.addEventListener('mousedown', (event) => {
                if(!list?.contains(event.target) && !listButton?.contains(event.target)) {
                    list.classList.add('not-active');
                }

                if(!userMenu?.contains(event.target) && !menuButton?.contains(event.target)) {
                    userMenu?.classList.add('not-active');
                }

                if(!searchInput?.contains(event.target) && !searchbar?.contains(event.target) && !searchButton?.contains(event.target)) {
                    searchButton.classList.remove('focus');
                    searchbar.classList.remove('focus');
                }
            });
        }

        
    }

    changeHeader() {
        this.#renderTemplate();
        this.#addListeners();
    }
}

export default new Header();
