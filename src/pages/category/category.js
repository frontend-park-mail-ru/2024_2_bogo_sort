import { renderCardTemplate } from '../../components/card/card.js';
import ajax from '../../modules/ajax.js';
import { BASE_URL } from '../../constants/constants.js';

export class CategoryPage {
    category;

    render(main, category) {
        this.category = category;
        this.#renderTemplate(main);
    }

    async #renderTemplate(main) {
        const wrapper = document.createElement('main');
        wrapper.className = 'cards-wrapper';

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

        wrapper.appendChild(title);

        container.classList.add('cards');

        cards.forEach(element => {
            if(element.preview.status === 'active') {
                container.appendChild(renderCardTemplate(element.preview.title, element.preview.price, element.preview.image_id, element.preview.id, element.is_saved, element.preview.seller_id));
            }
        });
        wrapper.appendChild(container);
        main.appendChild(wrapper);
    }
}
