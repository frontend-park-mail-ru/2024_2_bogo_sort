import { renderCardTemplate } from '../../components/card/card.js';
import ajax from '../../modules/ajax.js';

export class SearchPage {
    searchQuery;

    render(main, searchQuery) {
        this.searchQuery = searchQuery;
        this.#renderTemplate(main);
    }

    async #renderTemplate(main) {
        const wrapper = document.createElement('main');
        wrapper.className = 'cards-wrapper';

        const title = document.createElement('h1');
        title.textContent = `Объявления по запросу "${this.searchQuery}"`;
        title.className = 'category-title';
        wrapper.appendChild(title);

        const searchAdverts = await ajax.get(`/search?query=${this.searchQuery}`);
        const container = document.createElement('div');

        container.classList.add('cards');

        searchAdverts.forEach(element => {
            if(element.preview.status !== 'inactive') {
                container.appendChild(renderCardTemplate(element.preview.title, element.preview.price, element.preview.image_id, element.preview.id, element.is_saved, element.preview.seller_id));
            }
        });
        wrapper.appendChild(container);
        main.appendChild(wrapper);
    }
}
