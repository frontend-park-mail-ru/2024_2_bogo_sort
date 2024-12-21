import { informationStorage } from '@modules/informationStorage.ts';
import { renderUser } from '@components/user/user.ts';
import { renderCardTemplate } from '@components/card/card.ts';
import { timestampFormatter } from '@utils/timestampFormatter.ts';
import { Settings } from '@components/settings/settings.ts';
import ajax from '@modules/ajax.ts';
import { router } from '@modules/router.ts';
import { logout } from '@modules/logout.ts';
import { renderEmptyPlaceholder } from '@components/emptyPlaceholder/emptyPlaceholder.ts';
import { UserTemplateData } from '@components/user/userTypes.ts';
import { User } from '@constants/sharedTypes.ts';
import { ResponseAdvertCards, ResponseMyAdverts, ResponsePurchases} from '@modules/ajaxTypes.ts';
import { EmptyPlaceholderTemplateData } from '@components/emptyPlaceholder/emptyPlaceholderTypes.ts';
import { OrdersTemplateData } from '@components/orders/ordersTypes.ts';
import { renderOrders } from '@components/orders/orders.ts';

export class UserPage {
    location: string | null = null;

    render(main: HTMLElement, location: string) {
        this.location = location;
        this.#renderTemplate(main);
    }

    #renderTemplate(main: HTMLElement) {
        if(!informationStorage.isAuth()){
            router.goToPage('/');
        }
        const me = informationStorage.getUser();
        if(!me) {
            router.goToPage('/');

            return;
        }
        let userImgUrl = informationStorage.getUserImgUrl();
        userImgUrl ??= '';
        const data: UserTemplateData = {
            userImageUrl: userImgUrl,
            username: me.username,
            forUser: true,
            timestamp: timestampFormatter(me?.created_at, true)  
        };
        

        const wrapper = document.createElement('div');
        wrapper.classList.add('user');
        wrapper.innerHTML += renderUser(data);

        if(this.location === 'user' || this.location === 'adverts'){
            this.renderAdverts(wrapper, main);
        } else if(this.location === 'settings') {
            this.renderSettings(wrapper, main);
        } else if(this.location === 'orders') {
            this.renderOrders(wrapper, me, main);
        } else if(this.location === 'favourites') {
            this.renderFavourites(wrapper, main);
        } else {
            router.goToPage('/');
        }

        this.addListeners(wrapper, me, main);
    }

    addListeners(wrapper: HTMLElement, me: User, main: HTMLElement) {
        const advertButton = wrapper.querySelector('.navigation__averts');
        advertButton?.addEventListener('click', () => {
            this.location = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length);
            wrapper.querySelector(`.navigation__${this.location}`)?.classList.remove('active');
            main.lastChild?.lastChild?.remove();
            router.pushPageWithoutRedirect('/user/adverts');
            this.renderAdverts(wrapper, main);
        });

        const ordersButton = wrapper.querySelector('.navigation__orders');
        ordersButton?.addEventListener('click', () => {
            this.location = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length);
            wrapper.querySelector(`.navigation__${this.location}`)?.classList.remove('active');
            main.lastChild?.lastChild?.remove();
            router.pushPageWithoutRedirect('/user/orders');
            this.renderOrders(wrapper, me, main);
        });

        const favouritesButton = wrapper.querySelector('.navigation__favourites');
        favouritesButton?.addEventListener('click', () => {
            this.location = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length);
            wrapper.querySelector(`.navigation__${this.location}`)?.classList.remove('active');
            main.lastChild?.lastChild?.remove();
            router.pushPageWithoutRedirect('/user/favourites');
            this.renderFavourites(wrapper, main);
        });

        const settingsButton = wrapper.querySelector('.navigation__settings');
        settingsButton?.addEventListener('click', () => {
            this.location = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length);
            wrapper.querySelector(`.navigation__${this.location}`)?.classList.remove('active');
            main.lastChild?.lastChild?.remove();
            router.pushPageWithoutRedirect('/user/settings');
            this.renderSettings(wrapper, main);
        });

        const logoutButton = wrapper.querySelector('.navigation__logout');
        logoutButton?.addEventListener('click', () => {
            logout();
            router.goToPage('/');
        });
    }

    async renderAdverts(wrapper: HTMLElement, main: HTMLElement) {
        wrapper.querySelector('.navigation__averts')?.classList.add('active');
        const container = document.createElement('div');
        container.className = 'user__averts';
        const cardsContainer = document.createElement('div');
        cardsContainer.classList.add('user__cards');
        const title = document.createElement('h1');
        title.classList.add('user__title');
        title.textContent = 'Мои объявления';
        container.appendChild(title);

        const cards = await ajax.get<ResponseMyAdverts>(`/adverts/my`);

        if(cards.length === 0) {
            const data = {
                imagePath: '/static/images/Photos_empty.svg',
                text: 'Здесь будут отображаться ваши объявления',
                buttonText: 'Разместить объявление',
                redirectUrl: '/create'
            };
            const placeholder = renderEmptyPlaceholder(data);
            if(placeholder){
                cardsContainer.appendChild(placeholder);
            }
        } else {
            cards.forEach(element => {
                cardsContainer.appendChild(renderCardTemplate(element.preview.title, element.preview.price, element.preview.image_id, element.preview.id, false, element.preview.seller_id, element.preview.promoted_until));
            });
        }
        container.appendChild(cardsContainer);
        wrapper.appendChild(container);
        main.appendChild(wrapper);
    }

    async renderFavourites(wrapper: HTMLElement, main: HTMLElement) {
        wrapper.querySelector('.navigation__favourites')?.classList.add('active');
        const container = document.createElement('div');
        container.className = 'user__averts';
        const cardsContainer = document.createElement('div');
        cardsContainer.classList.add('user__cards');
        const title = document.createElement('h1');
        title.classList.add('user__title');
        title.textContent = 'Избранное';
        container.appendChild(title);

        const cards = await ajax.get<ResponseAdvertCards>(`/adverts/saved`);

        if(cards.length === 0) {
            const data: EmptyPlaceholderTemplateData = {
                imagePath: '/static/images/like.svg',
                text: 'Здесь будут отображаться ваши избранные объявления',
                buttonText: 'Перейти к объявлениям',
                redirectUrl: '/'
            };
            const placeholder = renderEmptyPlaceholder(data);
            if(placeholder){
                cardsContainer.appendChild(placeholder);
            }
        } else {
            cards.forEach(element => {
                cardsContainer.appendChild(renderCardTemplate(element.preview.title, element.preview.price, element.preview.image_id, element.preview.id, element.is_saved, element.preview.seller_id, element.preview.promoted_until));
            });
        }
        container.appendChild(cardsContainer);
        wrapper.appendChild(container);
        main.appendChild(wrapper);
    }

    renderSettings(wrapper: HTMLElement, main: HTMLElement) {
        wrapper.querySelector('.navigation__settings')?.classList.add('active');
        const container = document.createElement('div');
        container.classList.add('user__settings');
        const settings = new Settings();
        container.innerHTML += settings.renderSettings();
        wrapper.appendChild(container);
        main.appendChild(wrapper);
        settings.fillData(wrapper);
    }

    async renderOrders(wrapper: HTMLElement, me: User, main: HTMLElement) {
        wrapper.querySelector('.navigation__orders')?.classList.add('active');
        const container = document.createElement('div');
        container.classList.add('user__orders');
        const orders = await ajax.get<ResponsePurchases>(`/purchase/${me.id}`);
        let notEmpty = true;
        if(!orders) {
            notEmpty = false;
        }
        const data: OrdersTemplateData = {
            notEmpty: notEmpty,
            orders: orders
        }
        container.innerHTML += await renderOrders(data);
        container.querySelector('.orders__empty-button')?.addEventListener('click', () => {
            router.goToPage('/');
        });
        wrapper.appendChild(container);
        main.appendChild(wrapper);
    }
}
