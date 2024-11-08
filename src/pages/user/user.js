import { initHeaderAndMain } from '../../utils/initHeaderAndMain.js';
import { renderUser } from '../../components/user/user.js';
import { renderCardTemplate, addCardListeners } from '../../components/card/card.js';
import { checkAuth } from '../../utils/checkAuth.js';
import { IMAGE_URL } from '../../constants/constants.js';
import { timestampFormatter } from '../../utils/timestampFormatter.js'
import { Settings } from '../../components/settings/settings.js';
import ajax from '../../utils/ajax.js';
import { getUserImageUrl } from '../../utils/getUserImageUrl.js';

export class UserPage {

    render() {
        this.location =  window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length);
        this.#renderTemplate();
    }

    async #renderTemplate() {
        const main = initHeaderAndMain();
        if(!checkAuth()){
            window.location.href = '/';
        }
        const me = await ajax.get('/me');
        const data = {
            userImageUrl: await getUserImageUrl(me),
            username: me.username,
            timestamp: timestampFormatter(me.created_at, true)
        }

        const wrapper = document.createElement('div');
        wrapper.classList.add('user');
        data.forUser = true;
        wrapper.innerHTML += renderUser(data);

        this.addListeners(wrapper);

        if(this.location === 'user' || this.location === 'adverts'){
            this.renderAdverts(wrapper, me, main);
        } else if(this.location === 'settings') {
            this.renderSettings(wrapper, me, main);
        } else if(this.location === 'orders') {
            this.renderOrders(wrapper, me, main);
        } else {
            window.location.href = '/';
        }
    }

    addListeners(wrapper) {
        const advertButton = wrapper.querySelector('.navigation__adverts');
        advertButton?.addEventListener('click', () => {
            window.location.href = '/user/adverts';
        });

        const ordersButton = wrapper.querySelector('.navigation__orders');
        ordersButton?.addEventListener('click', () => {
            window.location.href = '/user/orders';
        })

        const settingsButton = wrapper.querySelector('.navigation__settings');
        settingsButton?.addEventListener('click', () => {
            window.location.href = '/user/settings';
        })

        const logoutButton = wrapper.querySelector('.navigation__logout');
        logoutButton?.addEventListener('click', () => {
            window.location.href = '/logout';
        })
    }

    async renderAdverts(wrapper, me, main) {
        wrapper.querySelector('.navigation__adverts').classList.add('active');
        const container = document.createElement('div');
        const cardsContainer = document.createElement('div');
        cardsContainer.classList.add('user__cards');
        const title = document.createElement('h1');
        title.classList.add('user__title');
        title.textContent = 'Мои объявления';
        container.appendChild(title);

        const cards = await ajax.get(`/adverts/seller/${me.id}`);
        // if(cards.length === 0){

        // }
        cards.forEach(card => {
            cardsContainer.innerHTML += renderCardTemplate(card.title, card.price, card.image_url, IMAGE_URL);
        })
        container.appendChild(cardsContainer);
        wrapper.appendChild(container);
        main.appendChild(wrapper);
        addCardListeners(cards);
    }

    renderSettings(wrapper, me, main) {
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

        container.innerHTML += Handlebars.templates['orders.hbs']({orders: orders, notEmpty});
        container.querySelector('.orders__empty-button')?.addEventListener('click', () => {
            window.location.href = '/';
        });
        wrapper.appendChild(container);
        main.appendChild(wrapper);
    }
}