import { renderUser } from '../../components/user/user.js';
import { renderCardTemplate } from '../../components/card/card.js';
import { checkAuth } from '../../utils/checkAuth.js';
import { BASE_URL } from '../../constants/constants.js';
import { timestampFormatter } from '../../utils/timestampFormatter.js';
import { Settings } from '../../components/settings/settings.js';
import ajax from '../../modules/ajax.js';
import { getUserImageUrl } from '../../utils/getUserImageUrl.js';
import { router } from '../../modules/router.js';
import { logout } from '../../modules/logout.js';
import template from '../../components/orders/orders.hbs'

export class UserPage {

    render(main, location) {
        this.location = location;
        this.#renderTemplate(main);
    }

    async #renderTemplate(main) {
        if(!checkAuth()){
            router.goToPage('/');
        }
        const me = await ajax.get('/me');
        const data = {
            userImageUrl: await getUserImageUrl(me),
            username: me.username,
            timestamp: timestampFormatter(me.created_at, true)
        };

        const wrapper = document.createElement('div');
        wrapper.classList.add('user');
        data.forUser = true;
        wrapper.innerHTML += renderUser(data);

        this.addListeners(wrapper, main);

        if(this.location === 'user' || this.location === 'adverts'){
            this.renderAdverts(wrapper, me, main);
        } else if(this.location === 'settings') {
            this.renderSettings(wrapper, main);
        } else if(this.location === 'orders') {
            this.renderOrders(wrapper, me, main);
        } else {
            router.goToPage('/');
        }
    }

    addListeners(wrapper, main) {
        const advertButton = wrapper.querySelector('.navigation__adverts');
        advertButton?.addEventListener('click', () => {
            router.goToPage('/user/adverts');
        });

        const ordersButton = wrapper.querySelector('.navigation__orders');
        ordersButton?.addEventListener('click', () => {
            router.goToPage('/user/orders');
        });

        const settingsButton = wrapper.querySelector('.navigation__settings');
        settingsButton?.addEventListener('click', () => {
            router.goToPage('/user/settings');
        });

        const logoutButton = wrapper.querySelector('.navigation__logout');
        logoutButton?.addEventListener('click', () => {
            logout();
            router.goToPage('/');
        });
    }

    async renderAdverts(wrapper, me, main) {
        wrapper.querySelector('.navigation__adverts').classList.add('active');
        const container = document.createElement('div');
        container.className = 'user__wrapper';
        const cardsContainer = document.createElement('div');
        cardsContainer.classList.add('user__cards');
        const title = document.createElement('h1');
        title.classList.add('user__title');
        title.textContent = 'Мои объявления';
        container.appendChild(title);

        const cards = await ajax.get(`/adverts/seller/${me.id}`);

        cards.forEach(card => {
            cardsContainer.appendChild(renderCardTemplate(card.title, card.price, card.image_url, BASE_URL, card.id));
        });
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
