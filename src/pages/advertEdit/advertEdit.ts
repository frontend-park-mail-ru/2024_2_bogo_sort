import { CreateAdvert } from '../../components/advertCreate/advertCreate.ts';
import { headerData, IMAGE_URL } from '../../constants/constants.ts';
import ajax from '../../modules/ajax.ts';
import { ResponseAdvert } from '../../modules/ajaxTypes.ts';
import { informationStorage } from '../../modules/informationStorage.ts';
import { router } from '../../modules/router.ts';

export class AdvertEditPage {
    render(main: HTMLElement, advertId: string) {
        const template = new CreateAdvert();
        const wrapper = document.createElement('div');
        wrapper.classList.add('create-advert');

        const createAdvertCategories = headerData.category;
        createAdvertCategories.forEach(item => {
            item.id = item.redirectUrl.slice(item.redirectUrl.lastIndexOf('/') + 1, item.redirectUrl.length);
        });
        wrapper.innerHTML += template.renderAdvertCreation({category: createAdvertCategories, imagePreview: true});

        (wrapper.querySelector('.create-advert__title') as HTMLElement).innerText = 'Редактирование объявления';

        main.appendChild(wrapper);
        this.fillData(advertId, wrapper);
        this.addListeners(wrapper, template, advertId);

    }

    async fillData(advertId: string, wrapper: HTMLElement) {
        const advert = await ajax.get<ResponseAdvert>(`/adverts/${advertId}`);
        if(informationStorage.getMeSeller()?.id !== advert.advert.seller_id) {
            router.goToPage('/');
        }
        const select = wrapper.querySelector('.advert-form__select') as HTMLSelectElement;
        select.value = advert.advert.category_id;

        (wrapper.querySelector('.advert-form__name-input') as HTMLInputElement).value = advert.advert.title;
        (wrapper.querySelector('.advert-form__price-input') as HTMLInputElement).value = String(advert.advert.price);
        (wrapper.querySelector('.advert-form__description-input') as HTMLInputElement).value = advert.advert.description;
        (wrapper.querySelector('.advert-form__address-input') as HTMLInputElement).value = advert.advert.location;
        (wrapper.querySelector('.advert-form__upload-box-image') as HTMLImageElement).src = IMAGE_URL + advert.advert.image_id;

        (wrapper.querySelector('.advert-form__submit') as HTMLButtonElement).textContent = 'Сохранить изменения';
    }

    addListeners(wrapper: HTMLElement, template: CreateAdvert, advertId: string) {
        template.addSubmitFormListener(advertId);
        template.addFileAndNumberInputListeners(wrapper);
    }
}
