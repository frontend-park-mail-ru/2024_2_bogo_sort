import { renderCardTemplate } from '../../components/card/card.js';
import ajax from '../../modules/ajax.js';
import { BACKEND_URL, IMAGE_URL } from '../../constants/constants.js';
import { initHeaderAndMain } from '../../utils/initHeaderAndMain.js';

export class CategoryPage {
    category;

    render() {
        this.category = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length);
        this.#renderTemplate();
    }

    async #renderTemplate() {
        const main = initHeaderAndMain();

        const title = document.createElement('h1');
        title.className = 'category-title';
        const categories = await ajax.get('/categories');
        for(const category of categories) {
            if(category.ID === this.category) {
                title.textContent = category.Title;
                break;
            }
        }

        const container = document.createElement('div');

        if(title.textContent === '') {
            title.textContent = 'Такой категории не существует';
            main.appendChild(title);
            return;
        }


        const cards = await ajax.get(`/adverts/category/${this.category}`);
        
        main.appendChild(title);

        container.classList.add('cards');

        cards.forEach(element => {
            if(element.status === 'active') {
                container.appendChild(renderCardTemplate(element.title, element.price, element.image_url, IMAGE_URL, element.id));
            }
        });
        main.appendChild(container);
    }
}