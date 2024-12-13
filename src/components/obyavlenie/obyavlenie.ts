import ajax from '@modules/ajax.ts';
import { informationStorage } from '@modules/informationStorage.ts';
import { timestampFormatter } from '@utils/timestampFormatter.ts';
import { router } from '@modules/router.ts';
import template from './obyavlenie.hbs';
import { pipe } from '@modules/pipe.ts';
import { Seller, User } from '@constants/sharedTypes.ts';
import { ResponseCartExists, ResponseCart, ResponseAdvert, ResponseSeller, ResponseUser } from '@modules/ajaxTypes.ts';
import { Advert, AdvertTemplateData } from './obyavlenieTypes.ts';

export class AdvertComponent {
    seller: Seller | null;
    inCart: boolean;
    myAdvert: boolean;
    isLiked: boolean;

    constructor() {
        this.inCart = false;
        this.seller = null;
        this.myAdvert = false;
        this.isLiked = false;
    }

    async addComponent(wrapper: HTMLElement, advertId: string) {
        await ajax.post(`/adverts/viewed/${advertId}`, null);

        const advert = await ajax.get<ResponseAdvert>(`/adverts/${advertId}`);

        const seller = await ajax.get<ResponseSeller>(`/seller/${advert.advert.seller_id}`);

        const sellerUser = await ajax.get<ResponseUser>(`/profile/${seller.user_id}`);

        this.seller = seller;
        let me;
        if(informationStorage.isAuth()) {
            me = informationStorage.getUser();
            this.myAdvert = sellerUser.id === me?.id;
            if(advert.advert.status === 'inactive' && !this.myAdvert) {
                return null;
            }
        }

        if(me) {
            await this.checkIfInCart(advert, me);
        }

        this.isLiked = advert.is_saved;
        const categories = await informationStorage.getCateogies();
        const category = categories?.find(obj => obj.ID === advert.advert.category_id);

        const data: AdvertTemplateData = {
            isLiked: this.isLiked,
            title: advert.advert.title,
            imageUrl: informationStorage.getImageUrl(advert.advert.image_id),
            description: advert.advert.description,
            price: advert.advert.price,
            views: advert.advert.views_number,
            likes: advert.advert.saves_number,

            category: category?.Title ? category.Title : categories ? categories[0].Title : 'Категория',
            categoryUrl: `/category/${advert.advert.category_id}`,

            isAuthor: this.myAdvert ? this.myAdvert && advert.advert.status !== 'inactive': false,
            reserved: advert.advert.status === 'reserved' && !this.myAdvert,
            inactive: advert.advert.status === 'inactive',
            normal: advert.advert.status === 'active' && !this.myAdvert,
            inCart: this.inCart,

            sellerName: sellerUser.username === '' ? 'Пользователь' : sellerUser.username,
            sellerImgUrl: informationStorage.getImageUrl(sellerUser.avatar_id),
            sellerPhone: sellerUser.phone,
            sellerTimestamp: timestampFormatter(sellerUser.created_at, true),

            location: advert.advert.location,
            createdAt: timestampFormatter(advert.advert.created_at, false),
        };

        wrapper.innerHTML += this.renderAdTemplate(data);

        if(window.matchMedia('(max-width: 1000px)').matches) {
            const sellerSection = wrapper.querySelector('.seller');
            if(sellerSection)
                wrapper.querySelector('.description')?.appendChild(sellerSection);

            const titleWrapper = wrapper.querySelector('.advert__title-wrapper');
            if(titleWrapper)
                wrapper.querySelector('.advert__price')?.insertAdjacentElement('afterend', titleWrapper);
        }

        if(data.inactive) {
            wrapper.querySelector('.advert')?.classList.add('inactive');
        }

        this.addListeners(wrapper, advert.advert.id, me?.id);

        return advert;
    }

    renderAdTemplate(data: AdvertTemplateData) {
        data.sellerPhone = data.sellerPhone === '' ? 'не указан' : data.sellerPhone;

        return template({ title: data.title, description: data.description, price: data.price, reserved: data.reserved, inactive: data.inactive, inCart: data.inCart, isLiked: data.isLiked,
            category: data.category, categoryUrl: data.categoryUrl, isAuthor: data.isAuthor, sellerName: data.sellerName, sellerTimestamp: data.sellerTimestamp, normal: data.normal, views: data.views,
            sellerPhone: data.sellerPhone, location: data.location, createdAt: data.createdAt, imageUrl: data.imageUrl, sellerImgUrl: data.sellerImgUrl, likes: data.likes });
    }

    addListeners(wrapper: HTMLElement, advertId: string, userId: string | undefined) {
        const addToFavourites = wrapper.querySelector<HTMLElement>('.advert__add-to-favourites');
        const likeButton = addToFavourites?.querySelector('.advert__like-button');
        
        addToFavourites?.addEventListener('click', async () => {
            if(!informationStorage.isAuth()){
                pipe.executeCallback('showAuthForm');

                return;
            }
            const likes = wrapper.querySelector<HTMLElement>('#likes');
            if(this.isLiked && likeButton?.classList.contains('liked') && likes) {
                const response = await ajax.delete(`/adverts/saved/${advertId}`, null);
                if(response.code === 400){
                    return;
                }
                likeButton.classList.remove('liked');
                this.isLiked = false;
                likes.innerText = String(Number(likes.innerText) - 1);
                if(addToFavourites.firstElementChild){
                    (addToFavourites.firstElementChild as HTMLElement).innerText = 'Добавить в избранное';
                }
            } else if(!this.isLiked && !likeButton?.classList.contains('liked') && likes) {
                const response = await ajax.post(`/adverts/saved/${advertId}`, null);
                if(response.code === 400){
                    return;
                }
                likeButton?.classList.add('liked');
                this.isLiked = true;
                likes.innerText = String(Number(likes.innerText) + 1);
                if(addToFavourites.firstElementChild){
                    (addToFavourites.firstElementChild as HTMLElement).innerText = 'Убрать из избранного';
                }
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
        const addToCartButton = wrapper.querySelector<HTMLElement>('.buttons__add-to-cart');
        addToCartButton?.addEventListener('click', async () => {
            if(!userId) {
                pipe.executeCallback('showAuthForm');

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
            await ajax.put(`/adverts/${advertId}/status?status=inactive`, null);
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

        if(informationStorage.getUser()){
            const seller = wrapper.querySelector<HTMLElement>('.seller');
            if(!seller) {
                return;
            }
            seller.style.cursor = 'pointer';
            seller?.addEventListener('click', () => {
                router.goToPage(`/seller/${this.seller?.id}`);
            });
        }
    }

    async checkIfInCart(advert: Advert, me: User) {
        const cartId = await ajax.get<ResponseCartExists>(`/cart/exists/${me.id}`);
        if(cartId.cart_id === '00000000-0000-0000-0000-000000000000') {
            this.inCart = false;
            
            return;
        }
        const cart = await ajax.get<ResponseCart>(`/cart/${cartId.cart_id}`);

        if(cart.cart_purchases){
            for(const purchase of cart.cart_purchases){
                for(const cartAdvert of purchase.adverts) {
                    if(cartAdvert.preview.id === advert.advert.id){
                        this.inCart = true;
                    }
                }
            }
        }
    }
};
