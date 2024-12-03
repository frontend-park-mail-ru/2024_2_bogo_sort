import { informationStorage } from '../../modules/informationStorage.js';
import { renderUser } from '../../components/user/user.js';
import { renderCardTemplate } from '../../components/card/card.js';
import { BASE_URL } from '../../constants/constants.js';
import { timestampFormatter } from '../../utils/timestampFormatter.js';
import { Settings } from '../../components/settings/settings.js';
import ajax from '../../modules/ajax.js';
import { router } from '../../modules/router.js';
import { logout } from '../../modules/logout.js';
import template from '../../components/orders/orders.hbs';
import { renderEmptyPlaceholder } from '../../components/emptyPlaceholder/emptyPlaceholder.js';

export class UserPage {

    render(main, location) {
        this.location = location;
        this.#renderTemplate(main);
    }

    #renderTemplate(main) {
        if(!informationStorage.isAuth()){
            router.goToPage('/');
        }
        const me = informationStorage.getUser();
        const data = {
            userImageUrl: informationStorage.getUserImgUrl(),
            username: me.username,
            timestamp: timestampFormatter(me.created_at, true)
        };

        const wrapper = document.createElement('div');
        wrapper.classList.add('user');
        data.forUser = true;
        wrapper.innerHTML += renderUser(data);

        if(this.location === 'user' || this.location === 'adverts'){
            this.renderAdverts(wrapper, main);
        } else if(this.location === 'settings') {
            this.renderSettings(wrapper, main);
        } else if(this.location === 'orders') {
            this.renderOrders(wrapper, me, main);
        } else if(this.location === 'favourites') {
            this.renderFavourites(wrapper, me, main);
        } else {
            router.goToPage('/');
        }

        this.addListeners(wrapper, me, main);
    }

    addListeners(wrapper, me, main) {
        const advertButton = wrapper.querySelector('.navigation__adverts');
        advertButton?.addEventListener('click', () => {
            this.location = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length);
            wrapper.querySelector(`.navigation__${this.location}`)?.classList.remove('active');
            main.lastChild.lastChild.remove();
            router.pushPageWithoutRedirect('/user/adverts', true);
            this.renderAdverts(wrapper, main);
        });

        const ordersButton = wrapper.querySelector('.navigation__orders');
        ordersButton?.addEventListener('click', () => {
            this.location = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length);
            wrapper.querySelector(`.navigation__${this.location}`)?.classList.remove('active');
            main.lastChild.lastChild.remove();
            router.pushPageWithoutRedirect('/user/orders', true);
            this.renderOrders(wrapper, me, main);
        });

        const favouritesButton = wrapper.querySelector('.navigation__favourites');
        favouritesButton?.addEventListener('click', () => {
            this.location = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length);
            wrapper.querySelector(`.navigation__${this.location}`)?.classList.remove('active');
            main.lastChild.lastChild.remove();
            router.pushPageWithoutRedirect('/user/favourites', true);
            this.renderFavourites(wrapper, me, main);
        });

        const settingsButton = wrapper.querySelector('.navigation__settings');
        settingsButton?.addEventListener('click', () => {
            this.location = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length);
            wrapper.querySelector(`.navigation__${this.location}`)?.classList.remove('active');
            main.lastChild.lastChild.remove();
            router.pushPageWithoutRedirect('/user/settings', true);
            this.renderSettings(wrapper, main);
        });

        const logoutButton = wrapper.querySelector('.navigation__logout');
        logoutButton?.addEventListener('click', () => {
            logout();
            router.goToPage('/');
        });
    }

    async renderAdverts(wrapper, main) {
        wrapper.querySelector('.navigation__adverts').classList.add('active');
        const container = document.createElement('div');
        container.className = 'user__adverts';
        const cardsContainer = document.createElement('div');
        cardsContainer.classList.add('user__cards');
        const title = document.createElement('h1');
        title.classList.add('user__title');
        title.textContent = 'Мои объявления';
        container.appendChild(title);

        const cards = await ajax.get('/adverts/my');

        if(cards.length === 0) {
            const data = {
                imagePath: '/static/images/Photos_empty.svg',
                text: 'Здесь будут отображаться ваши объявления',
                buttonText: 'Разместить объявление',
                redirectUrl: '/create'
            };
            const placeholder = renderEmptyPlaceholder(data);
            cardsContainer.appendChild(placeholder);
        } else {
            cards.forEach(element => {
                cardsContainer.appendChild(renderCardTemplate(element.preview.title, element.preview.price, element.preview.image_id, element.preview.id, element.is_saved, element.preview.seller_id));
            });
        }
        container.appendChild(cardsContainer);
        wrapper.appendChild(container);
        main.appendChild(wrapper);
    }

    async renderFavourites(wrapper, me, main) {
        wrapper.querySelector('.navigation__favourites').classList.add('active');
        const container = document.createElement('div');
        container.className = 'user__adverts';
        const cardsContainer = document.createElement('div');
        cardsContainer.classList.add('user__cards');
        const title = document.createElement('h1');
        title.classList.add('user__title');
        title.textContent = 'Избранное';
        container.appendChild(title);

        const cards = await ajax.get('/adverts/saved');

        if(cards.length === 0) {
            const data = {
                imagePath: '/static/images/like.svg',
                text: 'Здесь будут отображаться ваши избранные объявления',
                buttonText: 'Перейти к объявлениям',
                redirectUrl: '/'
            };
            const placeholder = renderEmptyPlaceholder(data);
            cardsContainer.appendChild(placeholder);
        } else {
            cards.forEach(element => {
                cardsContainer.appendChild(renderCardTemplate(element.preview.title, element.preview.price, element.preview.image_id, element.preview.id, element.is_saved, element.preview.seller_id));
            });
        }
        container.appendChild(cardsContainer);
        wrapper.appendChild(container);
        main.appendChild(wrapper);
    }

    renderSettings(wrapper, main) {
        wrapper.querySelector('.navigation__settings').classList.add('active');
        const container = document.createElement('div');
        container.classList.add('user__settings');
        const settings = new Settings();
        container.innerHTML += settings.renderSettings();
        wrapper.appendChild(container);
        main.appendChild(wrapper);
        settings.fillData(wrapper);
    }

    async renderOrders(wrapper, me, main) {
        wrapper.querySelector('.navigation__orders').classList.add('active');
        const container = document.createElement('div');
        container.classList.add('user__orders');
        const orders = await ajax.get(`/purchase/${me.id}`);
        let notEmpty = true;
        if(!orders) {
            notEmpty = false;
        } else {
            orders.forEach(order => {
                switch(order.status) {
                    case 'pending':
                        order.status = 'В ожидании';
                        break;
                    case 'in_progress':
                        order.status = 'Активен';
                        break;
                    case 'completed':
                        order.status = 'Завершен';
                        break;
                    case 'canceled':
                        order.status = 'Отменен';
                        break;
                }
            });
        }

        container.innerHTML += template({orders: orders, notEmpty});
        container.querySelector('.orders__empty-button')?.addEventListener('click', () => {
            router.goToPage('/');
        });
        wrapper.appendChild(container);
        main.appendChild(wrapper);
    }
}
