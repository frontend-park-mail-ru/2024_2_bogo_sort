import { renderCardTemplate } from '@components/card/card.ts';
import ajax from '@modules/ajax.ts';
import { ResponseAdvertCards } from '@modules/ajaxTypes.ts';

export class SearchPage {
    searchQuery: string | null = null;

    render(main: HTMLElement, searchQuery: string) {
        this.searchQuery = searchQuery;
        this.#renderTemplate(main);
    }

    async #renderTemplate(main: HTMLElement) {
        const wrapper = document.createElement('main');
        wrapper.className = 'cards-wrapper';

        const title = document.createElement('h1');
        title.textContent = `Объявления по запросу "${this.searchQuery}"`;
        title.className = 'category-title';
        wrapper.appendChild(title);

        const searchAdverts = await ajax.get<ResponseAdvertCards>(`/search?query=${this.searchQuery}`);
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
