import { AdvertComponent } from '../../components/obyavlenie/obyavlenie.js';
import { renderCardTemplate } from '../../components/card/card.js';
import ajax from '../../modules/ajax.js';
import { BASE_URL } from '../../constants/constants.js';
import { router } from '../../modules/router.js';

export class AdvertPage {
    render(main, advertId) {
        this.#renderTemplate(main, advertId);
    }

    async #renderTemplate(main, advertId) {
        const advert = new AdvertComponent();

        const wrapper = document.createElement('main');
        wrapper.classList.add('advert-wrapper');
        main.appendChild(wrapper);

        const requestedAdvert = await advert.addComponent(wrapper, advertId);
        if(requestedAdvert === null){
            router.goToPage('/');
        }

        const container = document.createElement('div');
        container.classList.add('cards');

        const cards = await ajax.get(`/adverts/category/${requestedAdvert.category_id}`);
        let cardsWithoutCurrent = 0;

        cards.forEach(element => {
            if(element.id !== requestedAdvert.id && element.status !== 'inactive') {
                container.appendChild(renderCardTemplate(element.title, element.price, element.image_url, BASE_URL, element.id));
                cardsWithoutCurrent++;
            }
        });
        if(cardsWithoutCurrent === 0 || requestedAdvert.status !== 'active'){
            wrapper.querySelector('.recomended').remove();

            return;
        }
        wrapper.appendChild(container);
    }
}
