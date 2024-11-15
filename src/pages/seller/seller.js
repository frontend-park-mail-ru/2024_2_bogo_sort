import { BASE_URL } from '../../constants/constants.js';
import ajax from '../../modules/ajax.js';
import { initHeaderAndMain } from '../../utils/initHeaderAndMain.js';
import { timestampFormatter } from '../../utils/timestampFormatter.js';
import { renderUser } from '../../components/user/user.js';
import { renderCardTemplate } from '../../components/card/card.js';
import { getUserImageUrl } from '../../utils/getUserImageUrl.js';

export class SellerPage {
    render(main, sellerId) {
        this.sellerId = sellerId;
        this.renderTemplate(main);
    }

    async renderTemplate(main) {
        const seller = await ajax.get(`/seller/${this.sellerId}`);
        const userSeller = await ajax.get(`/profile/${seller.user_id}`);

        const data = {
            userImageUrl: await getUserImageUrl(userSeller),
            username: userSeller.username,
            timestamp: timestampFormatter(userSeller.created_at, true)
        };

        const wrapper = document.createElement('div');
        wrapper.classList.add('user');
        data.forUser = false;
        wrapper.innerHTML += renderUser(data);

        const container = document.createElement('div');
        container.classList.add('user__cards');

        const cards = await ajax.get(`/adverts/seller/${userSeller.id}`);

        cards.forEach(card => {
            container.appendChild(renderCardTemplate(card.title, card.price, card.image_url, BASE_URL, card.id));
        });

        wrapper.appendChild(container);
        main.appendChild(wrapper);
    }
}
