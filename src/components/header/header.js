import { showAuthForm } from '../auth/auth.js';
import { loginData } from '../../constants/constants.js';
import { checkAuth } from '../../utils/checkAuth.js';
import { logoutUser } from '../auth/auth.js';
import { headerData } from '../../constants/constants.js'
// import { Ajax } from '../../utils/ajax.js';
import ajax from '../../utils/ajax.js';
import { BACKEND_URL } from '../../constants/constants.js';
import { getCategoryIdByName } from '../../utils/getCategoryIdByName.js';

// const ajax = new Ajax(BACKEND_URL);

/**
 * Represents a header component.
 */
class Header {
    #wrapper;
    // #data;

    /**
     * Creates an instance of the Header class.
     */
    constructor() {
        // this.#data = ajax.get('/me'); 
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
        // const categories = ajax.get('/categories');
        // for(let i = 0; i < headerData.category.length; i++) {
        //     headerData.category[i].redirectUrl = '/category/' + getCategoryIdByName(headerData.category[i].name, categories);
        // }
        data.checkAuth = checkAuth();
        data.userName = localStorage.getItem('name');
        data.userImgUrl = localStorage.getItem('imageUrl') === 'undefined' ? '../../static/images/user_avatar.webp' : localStorage.getItem('imageUrl');
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
                showAuthForm(loginData);
            }
        });

        const listButton = this.#wrapper.querySelector('.header__list-button');
        const list = this.#wrapper.querySelector('.header__list');

        listButton?.addEventListener('click', () => {
            if(list.classList.contains('not-active')) {
                list.classList.remove('not-active');

                return;
            } 
            list.classList.add('not-active');
        })

        const menuButton = this.#wrapper.querySelector('.user-menu');
        const userMenu = this.#wrapper.querySelector('.user-menu__menu');

        menuButton?.addEventListener('click', () => {
            if(userMenu?.classList.contains('not-active')) {
                userMenu.classList.remove('not-active');

                return;
            } 
            userMenu?.classList.add('not-active');
        })

        
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