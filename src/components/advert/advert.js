// import { Ajax } from "../../utils/ajax.js";
import ajax from "../../utils/ajax.js";
import { timestampFormatter } from "../../utils/timestampFormatter.js";
import { showAuthForm } from '../../components/auth/auth.js';
import { loginData } from '../../constants/constants.js';
import { BACKEND_URL, IMAGE_URL } from "../../constants/constants.js";
import { brokenImageUrlForamtter } from "../../utils/brokenImageUrlFormatter.js";
import { checkAuth } from "../../utils/checkAuth.js";

// const ajax = new Ajax(BACKEND_URL);

export class AdvertComponent {

    async addComponent(wrapper, advertId) {
        const advert = await ajax.get(`/adverts/${advertId}`);

        const sellerId = await ajax.get(`/seller/${advert.seller_id}`);

        const seller = await ajax.get(`/profile/${sellerId.user_id}`);
        
        let me;
        if(checkAuth()) {
            me = await ajax.get('/me');
        }

        const categories = await ajax.get('/categories');

        const data = {
            title: advert.title,
            imageUrl: brokenImageUrlForamtter(advert.image_url),
            description: advert.description,
            price: advert.price,

            category: categories.find(obj => obj.ID === advert.category_id)?.Title,
            categoryUrl: `/category/${advert.category_id}`,
            isAuthor: me ? me.id === seller.id : false, 

            sellerName: seller.username.length > 0 ? seller.username : 'Пользователь',
            sellerImgUrl: '../../static/images/user_avatar.webp',
            sellerPhone: seller.phone,
            sellerTimestamp: timestampFormatter(seller.created_at, true),

            location: advert.location,
            createdAt: timestampFormatter(advert.created_at, false),
        } 

        wrapper.innerHTML += this.renderAdTemplate(data);

        if(advert.status !== 'active') {
            this.applyAdvertStatus(wrapper, advert.status);
        }

        this.addListeners(wrapper, advert.id, me?.id);
        
        return advert;
    }

    renderAdTemplate(data) {
        return Handlebars.templates['advert.hbs']({ title: data.title, description: data.description, price: data.price, 
            category: data.category, categoryUrl: data.categoryUrl, isAuthor: data.isAuthor, sellerName: data.sellerName, sellerTimestamp: data.sellerTimestamp, 
            sellerPhone: data.sellerPhone, location: data.location, createdAt: data.createdAt, rating: data.rating, imageUrl: data.imageUrl, sellerImgUrl: data.sellerImgUrl });
    }

    applyAdvertStatus(wrapper, status) {
        const title = wrapper.querySelector('.advert__title');
        if(status === 'inactive') {
            wrapper.querySelector('.advert__buttons')?.remove();
            wrapper.querySelector('.recomended')?.remove();
            title.textContent += ' (Объявление закрыто)';
            wrapper.querySelector('.advert')?.classList.add('inactive');
            return;
        }

        title.textContent += ' (Зарезервированно)';
        wrapper.querySelector('.buttons__add-to-cart').remove();
    }

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
        })

        const disableButton = wrapper.querySelector('.buttons__disable');
        const numberButton = wrapper.querySelector('.buttons__show-phone-number');

        const toggleOverlay = () => {
            if(overlay?.classList.contains('active')) {
                overlay.classList.remove('active');

                return;
            }
            overlay?.classList.add('active')
        }

        disableButton?.addEventListener('click', toggleOverlay);
        numberButton?.addEventListener('click', toggleOverlay);

        let once = userId ? true : false;
        const addToCartButton = wrapper.querySelector('.buttons__add-to-cart');
        addToCartButton?.addEventListener('click', async () => {
            if(!userId) {
                showAuthForm(loginData);
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
                overlay?.classList.add('active')
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
        closeAdvertButton?.addEventListener('click', () => {
            ajax.put(`/adverts/${advertId}/status?status=inactive`);
            toggleOverlay();
        }, {once: true});

        const changeButton = wrapper.querySelector('.buttons__change');
        changeButton?.addEventListener('click', () => {
            window.location.href = `/change/${advertId}`;
        });
    }
};