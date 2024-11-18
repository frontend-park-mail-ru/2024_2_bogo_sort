import { pipe } from '../../modules/pipe.js';
import { informationStorage } from '../../modules/informationStorage.js';
import { checkAuth } from '../../utils/checkAuth.js';
import { headerData } from '../../constants/constants.js';
import { router } from '../../modules/router.js';
import { logout } from '../../modules/logout.js';

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
        this.#wrapper.innerHTML = Handlebars.templates['header.hbs']({ category: data.category, checkAuth: data.checkAuth, userName: data.userName, userImgUrl: data.userImgUrl, menuItems: data.menuItems });
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
            router.goToPage('/create');
        });

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

        if(userMenu || list) {
            window.addEventListener('mousedown', (event) => {
                if(!list?.contains(event.target) && !listButton?.contains(event.target)) {
                    list.classList.add('not-active');
                }

                if(!userMenu?.contains(event.target) && !menuButton?.contains(event.target)) {
                    userMenu?.classList.add('not-active');
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
