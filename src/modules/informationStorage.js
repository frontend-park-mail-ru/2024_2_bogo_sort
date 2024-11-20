import { pipe } from './pipe.js';
import { BACKEND_BASE_URL, BASE_URL } from '../constants/constants.js';
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
        this.#userImageUrl = await this.getUserImageUrl(this.#user);
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
        this.#userImageUrl = await this.getUserImageUrl(this.#user);
    }

    getUserImgUrl() {
        return this.#userImageUrl;
    }

    async getUserImageUrl(user) {
        if(!user.avatar_id){
            return;
        }
        const path = await ajax.get(`/files/${user.avatar_id}`);
    
        return BASE_URL + path;
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
