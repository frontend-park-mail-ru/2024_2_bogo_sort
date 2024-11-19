import ajax from '../../modules/ajax.js';
import { informationStorage } from '../../modules/informationStorage.js';
import { timestampFormatter } from '../../utils/timestampFormatter.js';
import { AuthComponent } from '../../components/auth/auth.js';
import { loginData } from '../../constants/constants.js';
import { informationStorage } from '../../modules/informationStorage.js';
import { router } from '../../modules/router.js';
import template from './obyavlenie.hbs';
import { pipe } from '../../modules/pipe.js';

export class AdvertComponent {
    auth;
    seller;
    inCart;

    constructor() {import { makeImageUrl } from '../../utils/brokenImageUrlFormatter.js';

        this.auth = new AuthComponent();
    }

    async addComponent(wrapper, advertId) {
        await ajax.post(`/adverts/viewed/${advertId}`);

        const advert = await ajax.get(`/adverts/${advertId}`);

        const seller = await ajax.get(`/seller/${advert.advert.seller_id}`);

        const sellerUser = await ajax.get(`/profile/${seller.user_id}`);

        this.seller = seller;
        let me;
        if(informationStorage.isAuth()) {
            me = informationStorage.getUser();
            this.myAdvert = sellerUser.id === me.id;
            if(advert.advert.status === 'inactive' && !this.myAdvert) {
                return null;
            }
        }

        if(me) {
            await this.checkIfInCart(advert, me, wrapper);
        }

        const categories = await informationStorage.getCateogies();

        this.isLiked = advert.is_saved;
        const data = {
            isLiked: this.isLiked,
            title: advert.advert.title,
            imageUrl: informationStorage.getImageUrl(advert.advert.image_id),
            description: advert.advert.description,
            price: advert.advert.price,
            views: advert.advert.views_number,
            likes: advert.advert.saves_number,

            category: categories.find(obj => obj.ID === advert.advert.category_id)?.Title,
            categoryUrl: `/category/${advert.advert.category_id}`,

            isAuthor: this.myAdvert ? this.myAdvert && advert.advert.status !== 'inactive': false,
            reserved: advert.advert.status === 'reserved' && !this.myAdvert,
            inactive: advert.advert.status === 'inactive',
            normal: advert.advert.status === 'active' && !this.myAdvert,
            inCart: this.inCart,

            sellerName: sellerUser.username,
            sellerImgUrl: informationStorage.getImageUrl(sellerUser.avatar_id),
            sellerPhone: sellerUser.phone,
            sellerTimestamp: timestampFormatter(sellerUser.created_at, true),

            location: advert.advert.location,
            createdAt: timestampFormatter(advert.advert.created_at, false),
        };

        wrapper.innerHTML += this.renderAdTemplate(data);

        if(data.inactive) {
            wrapper.querySelector('.advert')?.classList.add('inactive');
        }

        this.addListeners(wrapper, advert.advert.id, me?.id);

        return advert;
    }

    renderAdTemplate(data) {
        data.sellerPhone = data.sellerPhone === '' ? 'не указан' : data.sellerPhone;

        return template({ title: data.title, description: data.description, price: data.price, reserved: data.reserved, inactive: data.inactive, inCart: data.inCart, isLiked: data.isLiked,
            category: data.category, categoryUrl: data.categoryUrl, isAuthor: data.isAuthor, sellerName: data.sellerName, sellerTimestamp: data.sellerTimestamp, normal: data.normal, views: data.views,
            sellerPhone: data.sellerPhone, location: data.location, createdAt: data.createdAt, rating: data.rating, imageUrl: data.imageUrl, sellerImgUrl: data.sellerImgUrl, likes: data.likes });
    }

    addListeners(wrapper, advertId, userId) {
        const addToFavourites = wrapper.querySelector('.advert__add-to-favourites');
        const likeButton = addToFavourites.querySelector('.advert__like-button');
        
        addToFavourites?.addEventListener('click', async () => {
            if(!informationStorage.isAuth()){
                pipe.executeCallback('showAuthForm');

                return;
            }
            const likes = wrapper.querySelector('#likes');
            if(this.isLiked && likeButton?.classList.contains('liked')) {
                const response = await ajax.delete(`/adverts/saved/${advertId}`);
                if(response.code === 400){
                    return;
                }
                likeButton.classList.remove('liked');
                this.isLiked = false;
                likes.innerText = String(Number(likes.innerText) - 1);
                addToFavourites.firstElementChild.innerText = 'Добавить в избранное';
            } else if(!this.isLiked && !likeButton?.classList.contains('liked')) {
                const response = await ajax.post(`/adverts/saved/${advertId}`);
                if(response.code === 400){
                    return;
                }
                likeButton.classList.add('liked');
                this.isLiked = true;
                likes.innerText = String(Number(likes.innerText) + 1);
                addToFavourites.firstElementChild.innerText = 'Убрать из избранного';
            }
        });

        const overlay = wrapper.querySelector('.advert__overlay');

        overlay?.addEventListener('click', (event) => {
            if(event.target === overlay){
                const goToCart = wrapper.querySelector('.modal__go-to-cart');
                if(!goToCart?.classList.contains('not-active')){
                    goToCart?.classList.add('not-active');
                    wrapper.querySelector('.modal__buyer-content')?.classList.remove('not-active');
                }
                overlay.classList.remove('active');
            }
        });

        const disableButton = wrapper.querySelector('.buttons__disable');
        const numberButton = wrapper.querySelector('.buttons__show-phone-number');

        const toggleOverlay = () => {
            if(overlay?.classList.contains('active')) {
                overlay.classList.remove('active');

                return;
            }
            overlay?.classList.add('active');
        };

        disableButton?.addEventListener('click', toggleOverlay);
        numberButton?.addEventListener('click', toggleOverlay);

        const once = userId ? true : false;
        const addToCartButton = wrapper.querySelector('.buttons__add-to-cart');
        addToCartButton?.addEventListener('click', async () => {
            if(!userId) {
                this.auth.showAuthForm(loginData);

                return;
            }
            if(this.inCart){
                router.goToPage('/cart');

                return;
            }

            const data = {
                'advert_id': advertId,
                'user_id': userId
            };

            const response = await ajax.post('/cart/add', data);
            if(response.code !== 400) {
                const goToCart = wrapper.querySelector('.modal__go-to-cart');
                const buyerContent = wrapper.querySelector('.modal__buyer-content');
                goToCart?.classList.remove('not-active');
                buyerContent?.classList.add('not-active');
                overlay?.classList.add('active');
                addToCartButton.innerText = 'Товар уже в корзине';
            } else {
                addToCartButton.innerText = 'Товар уже в корзине';
            }
        }, {once: once});

        const goToCartButton = wrapper.querySelector('.modal__go-to-cart-button');
        goToCartButton?.addEventListener('click', () => {
            router.goToPage('/cart');
        });

        const closeAdvertButton = wrapper.querySelector('.modal__close');
        closeAdvertButton?.addEventListener('click', async () => {
            await ajax.put(`/adverts/${advertId}/status?status=inactive`);
            toggleOverlay();
            router.goToPage(`/advert/${advertId}`);
        }, {once: true});

        const changeButton = wrapper.querySelector('.buttons__change');
        changeButton?.addEventListener('click', () => {
            router.goToPage(`/edit/${advertId}`);
        });

        const deleteButton = wrapper.querySelector('.modal__delete');
        deleteButton?.addEventListener('click', async () => {
            await ajax.delete(`/adverts/${advertId}`, null);
            router.goToPage('/');
        });

        const seller = wrapper.querySelector('.seller');
        seller?.addEventListener('click', () => {
            router.goToPage(`/seller/${this.seller.id}`);
        });
    }

    async checkIfInCart(advert, me, wrapper) {
        const cartExists = await ajax.get(`/cart/exists/${me.id}`)
        if(!cartExists) {
            this.inCart = false;
            
            return;
        }
        const cart = await ajax.get(`/cart/user/${me.id}`);

        if(cart.adverts){
            for(const cartAdvert of cart.adverts) {
                if(cartAdvert.preview.id === advert.advert.id){
                    this.inCart = true;
                }
            }
        }
    }
};
