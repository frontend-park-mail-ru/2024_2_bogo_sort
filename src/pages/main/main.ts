import { renderCardTemplate } from '@components/card/card.ts';
import ajax from '@modules/ajax.ts';
import { ResponseAdvertCards } from '@modules/ajaxTypes.ts';

export class MainPage {
    noMoreCards = false;
    loadedCards: number = 0;

    render(main: HTMLElement) {
        this.#renderTemplate(main);
    }

    async #renderTemplate(main: HTMLElement) {
        const wrapper = document.createElement('main');
        wrapper.className = 'cards-wrapper';

        const title = document.createElement('h1');
        title.className = 'category-title';
        title.textContent = 'Все объявления';

        wrapper.appendChild(title);

        const cards = await ajax.get<ResponseAdvertCards>('/adverts?limit=30&offset=0');

        this.noMoreCards = false;
        this.loadedCards = cards.length;

        const container = document.createElement('div');

        container.classList.add('cards');

        cards.forEach(element => {
            if(element.preview.status !== 'inactive'){
                container.appendChild(renderCardTemplate(element.preview.title, element.preview.price, element.preview.image_id, element.preview.id, element.is_saved, element.preview.seller_id, element.preview.promoted_until));
            }
        });

        wrapper.appendChild(container);
        main.appendChild(wrapper);

        const loadOffset = 300;
        document.addEventListener('scroll', () => {
            if((window.innerHeight + window.scrollY + loadOffset) >= document.body.offsetHeight) {
                if(!this.noMoreCards){
                    this.#addCards(container);
                }
            }
        });
    }

    async #addCards(container: HTMLElement) {
        const newCards = await ajax.get<ResponseAdvertCards>(`/adverts?limit=30&offset=${this.loadedCards}`);
        if(newCards.code === 400) {
            this.noMoreCards = true;

            return;
        }

        newCards.forEach(element => {
            if(element.preview.status !== 'inactive'){
                container.appendChild(renderCardTemplate(element.preview.title, element.preview.price, element.preview.image_id, element.preview.id, element.is_saved, element.preview.seller_id, element.preview.promoted_until));
            }
        });

        if(newCards.length < 30) {
            this.noMoreCards = true;

            return;
        }
        this.loadedCards += newCards.length;
    }
}
