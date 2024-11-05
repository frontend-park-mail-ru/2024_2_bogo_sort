import { AdvertComponent } from '../../components/advert/advert.js';
import { renderCardTemplate, addCardListeners } from '../../components/card/card.js';
import { initHeaderAndMain } from '../../utils/initHeaderAndMain.js';
import ajax from '../../utils/ajax.js';
// import { Ajax } from '../../utils/ajax.js';
import { BACKEND_URL, IMAGE_URL } from '../../constants/constants.js';

// const ajax = new Ajax(BACKEND_URL);

export class AdvertPage {
    render() {
        const advertId = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length);
        this.#renderTemplate(advertId);
    }

    async #renderTemplate(advertId) {
        const advert = new AdvertComponent();

        const main = initHeaderAndMain();

        const wrapper = document.createElement('main')
        wrapper.classList.add('advert-wrapper');
        main.appendChild(wrapper);
        
        const requestedAdvert = await advert.addComponent(wrapper, advertId);

        const container = document.createElement('div');
        container.classList.add('cards');

        const cards = await ajax.get(`/adverts/category/${requestedAdvert.category_id}`);
        let cardsWithoutCurrent = [];

        cards.forEach(element => {
            if(element.id !== requestedAdvert.id && element.status !== 'inactive') {
                container.innerHTML += renderCardTemplate(element.title, element.price, element.image_url, IMAGE_URL);
                cardsWithoutCurrent.push(element);
            }
        });
        if(cardsWithoutCurrent.length === 0 || requestedAdvert.status !== 'active'){
            wrapper.querySelector('.recomended').remove();
            return;
        } 
        wrapper.appendChild(container);
        addCardListeners(cardsWithoutCurrent);
    }
}
