import { renderCardTemplate, addCardListeners } from '../../components/card/card.js';
import ajax from '../../utils/ajax.js';
// import { Ajax } from '../../utils/ajax.js';
import { BACKEND_URL, IMAGE_URL } from '../../constants/constants.js';
import { initHeaderAndMain } from '../../utils/initHeaderAndMain.js';

// const ajax = new Ajax(BACKEND_URL);

/**
 * Represents the main page of the application.
 */
export class MainPage {

    /**
     * Renders the main page and returns the main container element.
     *
     * @returns {HTMLElement} The main container element with the rendered content.
     */
    render() {
        this.#renderTemplate();
    }

    /**
     * Renders the template for the main page.
     *
     * Fetches card data from the API, creates a header, and appends
     * card elements to the main container.
     */
    async #renderTemplate() {
        const main = initHeaderAndMain();

        const title = document.createElement('h1');
        title.className = 'category-title';
        title.textContent = 'Все объявления';
        main.appendChild(title);

        const cards = await ajax.get('/adverts?limit=30&offset=0');

        const container = document.createElement('div');

        container.classList.add('cards');

        let noInactiveCards = [];
        cards.forEach(element => {
            if(element.status !== 'inactive'){
                container.innerHTML += renderCardTemplate(element.title, element.price, element.image_url, IMAGE_URL);
                noInactiveCards.push(element);
            }
        });
        main.appendChild(container);
        addCardListeners(noInactiveCards);
    }
}
