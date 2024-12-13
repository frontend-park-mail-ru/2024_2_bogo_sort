import { renderCardTemplate } from '@components/card/card.ts';
import ajax from '@modules/ajax.ts';
import { ResponseAdvertCards, ResponseCategories } from '@modules/ajaxTypes.ts';

export class CategoryPage {
    category: string | null = null;

    render(main: HTMLElement, category: string) {
        this.category = category;
        this.#renderTemplate(main);
    }

    async #renderTemplate(main: HTMLElement) {
        const wrapper = document.createElement('main');
        wrapper.className = 'cards-wrapper';

        const title = document.createElement('h1');
        title.className = 'category-title';
        const categories = await ajax.get<ResponseCategories>('/categories');
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


        const cards = await ajax.get<ResponseAdvertCards>(`/adverts/category/${this.category}`);

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
