import { informationStorage } from '../../modules/informationStorage.ts';
import ajax from '../../modules/ajax.ts';
import { timestampFormatter } from '../../utils/timestampFormatter.ts';
import { renderUser } from '../../components/user/user.ts';
import { renderCardTemplate } from '../../components/card/card.ts';
import { ResponseAdvertCards, ResponseSeller, ResponseUser } from '../../modules/ajaxTypes.ts';
import { UserTemplateData } from '../../components/user/userTypes.ts';

export class SellerPage {
    sellerId: string | null = null;

    render(main: HTMLElement, sellerId: string) {
        this.sellerId = sellerId;
        this.renderTemplate(main);
    }

    async renderTemplate(main: HTMLElement) {
        const seller = await ajax.get<ResponseSeller>(`/seller/${this.sellerId}`);
        const userSeller = await ajax.get<ResponseUser>(`/profile/${seller.user_id}`);

        const data: UserTemplateData = {
            userImageUrl: informationStorage.getImageUrl(userSeller.avatar_id),
            username: userSeller.username,
            timestamp: timestampFormatter(userSeller.created_at, true),
            forUser: false
        };

        const wrapper = document.createElement('div');
        wrapper.classList.add('user');
        wrapper.innerHTML += renderUser(data);

        const container = document.createElement('div');
        container.classList.add('user__cards');

        const cards = await ajax.get<ResponseAdvertCards>(`/adverts/seller/${seller.id}`);

        cards.forEach(card => {
            container.appendChild(renderCardTemplate(card.preview.title, card.preview.price, card.preview.image_id, card.preview.id, card.is_saved, card.preview.seller_id));
        });

        wrapper.appendChild(container);
        main.appendChild(wrapper);
    }
}
