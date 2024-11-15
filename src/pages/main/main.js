import { renderCardTemplate } from '../../components/card/card.js';
import ajax from '../../modules/ajax.js';
import { BACKEND_BASE_URL, BASE_URL } from '../../constants/constants.js';
import { initHeaderAndMain } from '../../utils/initHeaderAndMain.js';

/**
 * Represents the main page of the application.
 */
export class MainPage {

    /**
     * Renders the main page and returns the main container element.
     *
     * @returns {HTMLElement} The main container element with the rendered content.
     */
    render(main) {
        this.#renderTemplate(main);
    }

    /**
     * Renders the template for the main page.
     *
     * Fetches card data from the API, creates a header, and appends
     * card elements to the main container.
     */
    async #renderTemplate(main) {
        const wrapper = document.createElement('main');
        wrapper.className = 'cards-wrapper';

        const title = document.createElement('h1');
        title.className = 'category-title';
        title.textContent = 'Все объявления';

        wrapper.appendChild(title);

        const cards = await ajax.get('/adverts?limit=30&offset=0');

        this.noMoreCards = false;
        this.loadedCrads = cards.length;

        const container = document.createElement('div');

        container.classList.add('cards');

        cards.forEach(element => {
            if(element.status !== 'inactive'){
                container.appendChild(renderCardTemplate(element.title, element.price, element.image_url, BASE_URL, element.id));
            }
        });

        wrapper.appendChild(container);
        main.appendChild(wrapper);

        document.addEventListener('scroll', () => {
            if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                if(!this.noMoreCards){
                    this.#addCards(container);
                }
            }
        });
    }

    async #addCards(container) {
        const newCards = await ajax.get(`/adverts?limit=30&offset=${this.loadedCrads}`);
        if(newCards.code === 400) {
            this.noMoreCards = true;

            return;
        }

        newCards.forEach(card => {
            if(card.status !== 'inactive'){
                container.appendChild(renderCardTemplate(card.title, card.price, card.image_url, BASE_URL));
            }
        });

        if(newCards.length < 30) {
            this.noMoreCards = true;

            return;
        }
        this.loadedCrads += newCards.length;
    }
}
