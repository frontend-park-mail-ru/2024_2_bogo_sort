import { AdvertComponent } from '../../components/obyavlenie/obyavlenie.js';
import { renderCardTemplate } from '../../components/card/card.js';
import { initHeaderAndMain } from '../../utils/initHeaderAndMain.js';
import ajax from '../../modules/ajax.js';
import { BACKEND_BASE_URL, BASE_URL } from '../../constants/constants.js';

export class AdvertPage {
    render() {
        const advertId = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length);
        this.#renderTemplate(advertId);
    }

    async #renderTemplate(advertId) {
        const advert = new AdvertComponent();

        const main = initHeaderAndMain();

        const wrapper = document.createElement('main');
        wrapper.classList.add('advert-wrapper');
        main.appendChild(wrapper);

        const requestedAdvert = await advert.addComponent(wrapper, advertId);
        if(requestedAdvert === null){
            window.location.href = '/';
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
