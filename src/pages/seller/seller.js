import { informationStorage } from '../../modules/informationStorage.js';
import ajax from '../../modules/ajax.js';
import { timestampFormatter } from '../../utils/timestampFormatter.js';
import { renderUser } from '../../components/user/user.js';
import { renderCardTemplate } from '../../components/card/card.js';

export class SellerPage {
    render(main, sellerId) {
        this.sellerId = sellerId;
        this.renderTemplate(main);
    }

    async renderTemplate(main) {
        const seller = await ajax.get(`/seller/${this.sellerId}`);
        const userSeller = await ajax.get(`/profile/${seller.user_id}`);

        const data = {
            userImageUrl: informationStorage.getImageUrl(userSeller.avatar_id),
            username: userSeller.username,
            timestamp: timestampFormatter(userSeller.created_at, true)
        };

        const wrapper = document.createElement('div');
        wrapper.classList.add('user');
        data.forUser = false;
        wrapper.innerHTML += renderUser(data);

        const container = document.createElement('div');
        container.classList.add('user__cards');

        const cards = await ajax.get(`/adverts/seller/${seller.id}`);

        cards.forEach(card => {
            container.appendChild(renderCardTemplate(card.preview.title, card.preview.price, card.preview.image_id, card.preview.id));
        });

        wrapper.appendChild(container);
        main.appendChild(wrapper);
    }
}
