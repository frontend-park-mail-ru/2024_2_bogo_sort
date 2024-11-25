import { pipe } from './pipe.js';
import { BACKEND_BASE_URL, IMAGE_URL } from '../constants/constants.js';
import ajax from './ajax.js';

class InformationStorage {
    #inited = false;
    #isAuth;
    #csrf;
    #user;
    #userImageUrl;
    #meSeller;
    categories;

    async init() {
        this.#inited = true;
        this.#user = await ajax.get('/me');
        if(this.#user.code) {
            this.#isAuth = false;
            this.#user = null;

            return;
        }

        this.#isAuth = true; 
        await this.proceedAuthenticated();
    }

    async proceedAuthenticated() {
        if(!this.#inited){
            return;
        }
        this.#isAuth = true;
        this.#csrf = await ajax.getCSRF();
        this.#user = await ajax.get('/me');
        this.#meSeller = await ajax.get(`/seller/user/${this.#user.id}`);
        this.#userImageUrl = this.getImageUrl(this.#user.avatar_id);
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

    getMeSeller() {
        return this.#meSeller;
    }

    async setUser(user) {
        this.#user = user;
        this.#userImageUrl = this.getImageUrl(this.#user.avatar_id);
    }

    setUsername(username) {
        this.#user.username = username;
    }

    getUserImgUrl() {
        return this.#userImageUrl;
    }

    getImageUrl(imageId) {
        return IMAGE_URL + imageId;
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
