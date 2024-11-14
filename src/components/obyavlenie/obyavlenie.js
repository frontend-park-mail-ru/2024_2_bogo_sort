import ajax from '../../modules/ajax.js';
import { timestampFormatter } from '../../utils/timestampFormatter.js';
import { AuthComponent } from '../../components/auth/auth.js';
import { loginData } from '../../constants/constants.js';
import { makeImageUrl } from '../../utils/brokenImageUrlFormatter.js';
import { checkAuth } from '../../utils/checkAuth.js';
import { getUserImageUrl } from '../../utils/getUserImageUrl.js';

export class AdvertComponent {
    auth;
    seller;
    inCart;

    constructor() {
        this.auth = new AuthComponent();
    }

    async addComponent(wrapper, advertId) {
        const advert = await ajax.get(`/adverts/${advertId}`);

        const seller = await ajax.get(`/seller/${advert.seller_id}`);

        const sellerUser = await ajax.get(`/profile/${seller.user_id}`);

        this.seller = seller;
        let me;
        if(checkAuth()) {
            me = await ajax.get('/me');
            this.myAdvert = sellerUser.id === me.id;
            if(advert.status === 'inactive' && !this.myAdvert) {
                return null;
            }
        }

        if(me) {
            await this.checkIfInCart(advert, me, wrapper);
        }

        const categories = await ajax.get('/categories');

        const data = {
            title: advert.title,
            imageUrl: makeImageUrl(advert.image_url),
            description: advert.description,
            price: advert.price,

            category: categories.find(obj => obj.ID === advert.category_id)?.Title,
            categoryUrl: `/category/${advert.category_id}`,

            isAuthor: this.myAdvert ? this.myAdvert && advert.status !== 'inactive': false,
            reserved: advert.status === 'reserved' && !this.myAdvert,
            inactive: advert.status === 'inactive',
            normal: advert.status === 'active' && !this.myAdvert,
            inCart: this.inCart,

            sellerName: sellerUser.username.length > 0 ? sellerUser.username : 'Пользователь',
            sellerImgUrl: await getUserImageUrl(sellerUser),
            sellerPhone: sellerUser.phone,
            sellerTimestamp: timestampFormatter(sellerUser.created_at, true),

            location: advert.location,
            createdAt: timestampFormatter(advert.created_at, false),
        };

        wrapper.innerHTML += this.renderAdTemplate(data);

        if(data.inactive) {
            wrapper.querySelector('.advert')?.classList.add('inactive');
        }

        this.addListeners(wrapper, advert.id, me?.id);

        return advert;
    }

    renderAdTemplate(data) {
        data.sellerPhone = data.sellerPhone === '' ? 'не указан' : data.sellerPhone;

        return Handlebars.templates['obyavlenie.hbs']({ title: data.title, description: data.description, price: data.price, reserved: data.reserved, inactive: data.inactive, inCart: data.inCart,
            category: data.category, categoryUrl: data.categoryUrl, isAuthor: data.isAuthor, sellerName: data.sellerName, sellerTimestamp: data.sellerTimestamp, normal: data.normal,
            sellerPhone: data.sellerPhone, location: data.location, createdAt: data.createdAt, rating: data.rating, imageUrl: data.imageUrl, sellerImgUrl: data.sellerImgUrl });
    }

    // applyAdvertStatus(wrapper, status) {
    //     const title = wrapper.querySelector('.advert__title');
    //     if(status === 'inactive') {
    //         title.textContent += ' (объявление закрыто)';
    //         wrapper.querySelector('.advert')?.classList.add('inactive');
    //         return;
    //     }

    //     title.textContent += ' (зарезервировано)';
    // }

    addListeners(wrapper, advertId, userId) {
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
                window.location.href = '/cart';

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
            window.location.href = '/cart';
        });

        const closeAdvertButton = wrapper.querySelector('.modal__close');
        closeAdvertButton?.addEventListener('click', async () => {
            await ajax.put(`/adverts/${advertId}/status?status=inactive`);
            toggleOverlay();
            window.location.href = window.location.href;
        }, {once: true});

        const changeButton = wrapper.querySelector('.buttons__change');
        changeButton?.addEventListener('click', () => {
            window.location.href = `/change/${advertId}`;
        });

        const deleteButton = wrapper.querySelector('.modal__delete');
        deleteButton?.addEventListener('click', async () => {
            await ajax.delete(`/adverts/${advertId}`, null);
            window.location.href = '/';
        });

        const seller = wrapper.querySelector('.seller');
        seller?.addEventListener('click', () => {
            window.location.href = `/seller/${this.seller.id}`;
        });
    }

    async checkIfInCart(advert, me, wrapper) {
        const cart = await ajax.get(`/cart/user/${me.id}`);

        if(cart.adverts){
            for(const cartAdvert of cart.adverts) {
                if(cartAdvert.id === advert.id){
                    this.inCart = true;
                }
            }
        }
    }
};
