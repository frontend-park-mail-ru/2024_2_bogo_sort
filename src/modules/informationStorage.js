import { pipe } from './pipe.js';
import { BACKEND_BASE_URL } from '../constants/constants.js';
import { getUserImageUrl } from '../utils/getUserImageUrl.js';
import ajax from './ajax.js';

class InformationStorage {
    #inited = false;
    #isAuth;
    #csrf;
    #user;
    #userImageUrl;
    categories;

    async init() {
        this.#inited = true;
        await fetch(`${BACKEND_BASE_URL}/adverts?limit=1&offset=0`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => {
            this.#isAuth = res.headers.get('x-authenticated') === 'true' ? true : false;
        });

        if(this.#isAuth) {
            await this.proceedAuthenticated();
        }
    }

    async proceedAuthenticated() {
        if(!this.#inited){
            return;
        }
        this.#isAuth = true;
        this.#csrf = await ajax.getCSRF();
        this.#user = await ajax.get('/me');
        this.#userImageUrl = await getUserImageUrl(this.#user);
        pipe.executeCallback('updateHeader');
    }

    getCSRF() {
        return this.#csrf;
    }

    async getCateogies() {
        this.categories ??= await ajax.get('/categories');

        return this.categories;
    }

    getUser() {
        return this.#user;
    }

    async setUser(user) {
        this.#user = user;
        this.#userImageUrl = await getUserImageUrl(this.#user);
    }

    setUsername(username) {
        this.#user.username = username;
    }

    getUserImgUrl() {
        return this.#userImageUrl;
    }

    isAuth() {
        return this.#isAuth;
    }

    changeToNotAuthenticated(response) {
        if(response.headers.get('x-authenticated') !== 'false') {
            return;
        }
        this.#isAuth = false;
        this.#user = null;
        pipe.executeCallback('updateHeader');
    }
}

export const informationStorage = new InformationStorage();