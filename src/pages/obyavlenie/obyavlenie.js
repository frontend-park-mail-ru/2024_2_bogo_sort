import { AdvertComponent } from '../../components/obyavlenie/obyavlenie.js';
import { renderCardTemplate } from '../../components/card/card.js';
import ajax from '../../modules/ajax.js';
import { router } from '../../modules/router.js';

export class AdvertPage {
    render(main, advertId) {
        this.#renderTemplate(main, advertId);
    }

    async #renderTemplate(main, advertId) {
        const advert = new AdvertComponent();

        const wrapper = document.createElement('main');
        wrapper.classList.add('advert-wrapper');

        const requestedAdvert = await advert.addComponent(wrapper, advertId);
        if(requestedAdvert === null){
            router.goToPage('/');
        }
        main.appendChild(wrapper);

        const container = document.createElement('div');
        container.classList.add('advert-cards');

        const cards = await ajax.get(`/adverts/category/${requestedAdvert.advert.category_id}`);
        let cardsWithoutCurrent = 0;

        cards.forEach(element => {
            if(element.preview.id !== requestedAdvert.advert.id && element.preview.status !== 'inactive') {
                container.appendChild(renderCardTemplate(element.preview.title, element.preview.price, element.preview.image_id, element.preview.id, element.is_saved, element.preview.seller_id));
                cardsWithoutCurrent++;
            }
        });
        if(cardsWithoutCurrent === 0 || requestedAdvert.advert.status !== 'active'){
            wrapper.querySelector('.recomended').remove();

            return;
        }
        wrapper.appendChild(container);
    }
}
