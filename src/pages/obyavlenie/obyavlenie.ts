import { AdvertComponent } from '@components/obyavlenie/obyavlenie.ts';
import { renderCardTemplate } from '@components/card/card.ts';
import ajax from '@modules/ajax.ts';
import { router } from '@modules/router.ts';
import { ResponseAdvertCards } from '@modules/ajaxTypes.ts';

export class AdvertPage {
    render(main: HTMLElement, advertId: string) {
        this.#renderTemplate(main, advertId);
    }

    async #renderTemplate(main: HTMLElement, advertId: string) {
        const advert = new AdvertComponent();

        const wrapper = document.createElement('main');
        wrapper.classList.add('advert-wrapper');

        const requestedAdvert = await advert.addComponent(wrapper, advertId);
        if(requestedAdvert === null){
            router.goToPage('/');
        }
        main.appendChild(wrapper);

        const container = document.createElement('div');
        container.classList.add('advert-cards');

        const cards = await ajax.get<ResponseAdvertCards>(`/adverts/category/${requestedAdvert?.advert.category_id}`);
        let cardsWithoutCurrent = 0;

        cards.forEach(element => {
            if(element.preview.id !== requestedAdvert?.advert.id && element.preview.status !== 'inactive') {
                container.appendChild(renderCardTemplate(element.preview.title, element.preview.price, element.preview.image_id, element.preview.id, element.is_saved, element.preview.seller_id, element.preview.promoted_until));
                cardsWithoutCurrent++;
            }
        });
        if(cardsWithoutCurrent === 0 || requestedAdvert?.advert.status !== 'active'){
            wrapper.querySelector('.recomended')?.remove();

            return;
        }
        wrapper.appendChild(container);
    }
}
