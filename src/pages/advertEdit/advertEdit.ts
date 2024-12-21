import { CreateAdvert } from '@components/advertCreate/advertCreate.ts';
import { headerData, IMAGE_URL } from '@constants/constants.ts';
import ajax from '@modules/ajax.ts';
import { ResponseAdvert } from '@modules/ajaxTypes.ts';
import { informationStorage } from '@modules/informationStorage.ts';
import { router } from '@modules/router.ts';

export class AdvertEditPage {
    render(main: HTMLElement, advertId: string) {
        const template = new CreateAdvert();
        const wrapper = document.createElement('div');
        wrapper.classList.add('create-avert');

        const createAdvertCategories = headerData.category;
        createAdvertCategories.forEach(item => {
            item.id = item.redirectUrl.slice(item.redirectUrl.lastIndexOf('/') + 1, item.redirectUrl.length);
        });
        wrapper.innerHTML += template.renderAdvertCreation({category: createAdvertCategories, imagePreview: true});

        const titleElement = wrapper.querySelector<HTMLElement>('.create-avert__title');
        if(titleElement){
            titleElement.innerText = 'Редактирование объявления';
        }
        main.appendChild(wrapper);
        this.fillData(advertId, wrapper);
        this.addListeners(wrapper, template, advertId);

    }

    async fillData(advertId: string, wrapper: HTMLElement) {
        const advert = await ajax.get<ResponseAdvert>(`/adverts/${advertId}`);
        if(informationStorage.getMeSeller()?.id !== advert.advert.seller_id) {
            router.goToPage('/');
        }
        const select = wrapper.querySelector<HTMLSelectElement>('.avert-form__select');
        if(select){
            select.value = advert.advert.category_id;
        }
        const nameInput = wrapper.querySelector<HTMLInputElement>('.avert-form__name-input');
        if(nameInput){
            nameInput.value = advert.advert.title;
        }
        const priceInput = wrapper.querySelector<HTMLInputElement>('.avert-form__price-input');
        if(priceInput){
            priceInput.value = String(advert.advert.price);
        }
        const descriptionInput = wrapper.querySelector<HTMLInputElement>('.avert-form__description-input');
        if(descriptionInput){
            descriptionInput.value = advert.advert.description;
        }
        const addressInput = wrapper.querySelector<HTMLInputElement>('.avert-form__address-input')
        if(addressInput){
            addressInput.value = advert.advert.location;
        }
        const imageElement =  wrapper.querySelector<HTMLImageElement>('.avert-form__upload-box-image');
        if(imageElement){
            imageElement.src = IMAGE_URL + advert.advert.image_id;
        }
        const submitButton = wrapper.querySelector<HTMLButtonElement>('.avert-form__submit');
        if(submitButton){
            submitButton.textContent = 'Сохранить изменения';
        }
    }

    addListeners(wrapper: HTMLElement, template: CreateAdvert, advertId: string) {
        template.addSubmitFormListener(advertId);
        template.addFileAndNumberInputListeners(wrapper);
    }
}
