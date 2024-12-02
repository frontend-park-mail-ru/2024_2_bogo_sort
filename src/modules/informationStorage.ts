import { pipe } from './pipe.ts';
import { IMAGE_URL } from '../constants/constants.ts';
import ajax from './ajax.ts';
import { Categories, Seller, User } from '../constants/sharedTypes.ts';
import { ResponseCategories, ResponseSellerUser, ResponseUser } from './ajaxTypes.ts';

class InformationStorage {
    #inited = false;
    #isAuth: boolean = false;
    #csrf: string | null = null;
    #user: User | null = null;
    #userImageUrl: string | null = null;
    #meSeller: Seller | undefined;
    categories: ResponseCategories | undefined;

    async init() {
        this.#inited = true;
        const response = await ajax.get<ResponseUser>('/me');
        if(response.code === 400) {
            this.#isAuth = false;
            this.#user = null;

            return;
        } else {
            this.#user = response; 
        }

        this.#isAuth = true;
        await this.proceedAuthenticated();
    }

    async proceedAuthenticated() {
        if(!this.#inited){
            return;
        }
        this.#isAuth = true;
        this.#user = await ajax.get<ResponseUser>('/me');
        this.#csrf = await ajax.getCSRF();
        this.#meSeller = await ajax.get<ResponseSellerUser>(`/seller/user/${this.#user.id}`);
        this.#userImageUrl = this.getImageUrl(this.#user.avatar_id);
        pipe.executeCallback('updateHeader');
    }

    getCSRF() {
        return this.#csrf;
    }

    async getCateogies() {
        this.categories ??= await ajax.get<ResponseCategories>('/categories') as ResponseCategories;

        return this.categories;
    }

    getUser() {
        return this.#user;
    }

    getMeSeller() {
        return this.#meSeller;
    }

    setUser(user: User | null) {
        this.#user = user;
        this.#userImageUrl = this.getImageUrl(this.#user?.avatar_id);
    }

    setUsername(username: string) {
        if(this.#user){
            (this.#user as User).username = username;
        }
    }

    getUserImgUrl() {
        return this.#userImageUrl;
    }

    getImageUrl(imageId: string | undefined) {
        return IMAGE_URL + imageId;
    }

    isAuth() {
        return this.#isAuth;
    }

    changeToNotAuthenticated(response: Response) {
        if(response.headers.get('x-authenticated') !== 'false') {
            return;
        }
        this.#isAuth = false;
        this.#user = null;
        pipe.executeCallback('updateHeader');
    }
}

export const informationStorage = new InformationStorage();
