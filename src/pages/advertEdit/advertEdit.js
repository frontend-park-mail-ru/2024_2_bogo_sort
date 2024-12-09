import { CreateAdvert } from '../../components/advertCreate/advertCreate.js';
import { headerData, IMAGE_URL } from '../../constants/constants.js';
import ajax from '../../modules/ajax.js';
import { informationStorage } from '../../modules/informationStorage.js';
import { router } from '../../modules/router.js';

export class AdvertEditPage {
    render(main, advertId) {
        const template = new CreateAdvert();
        const wrapper = document.createElement('div');
        wrapper.classList.add('create-advert');

        const createAdvertCategories = headerData.category;
        createAdvertCategories.forEach(item => {
            item.id = item.redirectUrl.slice(item.redirectUrl.lastIndexOf('/') + 1, item.redirectUrl.length);
        });
        wrapper.innerHTML += template.renderAdvertCreation({category: createAdvertCategories, imagePreview: true});

        wrapper.querySelector('.create-advert__title').innerText = 'Редактирование объявления';

        main.appendChild(wrapper);
        this.fillData(advertId, wrapper);
        this.addListeners(wrapper, template, advertId);

    }

    async fillData(advertId, wrapper) {
        const advert = await ajax.get(`/adverts/${advertId}`);
        if(informationStorage.getMeSeller().id !== advert.advert.seller_id) {
            router.goToPage('/');
        }
        const select = wrapper.querySelector('.advert-form__select');
        select.value = advert.advert.category_id;

        wrapper.querySelector('.advert-form__name-input').value = advert.advert.title;
        wrapper.querySelector('.advert-form__price-input').value = advert.advert.price;
        wrapper.querySelector('.advert-form__description-input').value = advert.advert.description;
        wrapper.querySelector('.advert-form__address-input').value = advert.advert.location;
        wrapper.querySelector('.advert-form__upload-box-image').src = IMAGE_URL + advert.advert.image_id;

        wrapper.querySelector('.advert-form__submit').textContent = 'Сохранить изменения';
    }

    addListeners(wrapper, template, advertId) {
        template.addSubmitFormListener(advertId);
        template.addFileAndNumberInputListeners(wrapper);
    }
}
