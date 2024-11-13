import { CreateAdvert } from "../../components/createAdvert/createAdvert.js";
import { headerData } from "../../constants/constants.js";
import ajax from "../../modules/ajax.js";
import { initHeaderAndMain } from "../../utils/initHeaderAndMain.js";
import { IMAGE_URL } from "../../constants/constants.js";

export class ChangeAdvertPage {
    render() {
        const advertId = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length);
        const main = initHeaderAndMain();
        const template = new CreateAdvert();
        const wrapper = document.createElement('div');
        wrapper.classList.add('create-advert');

        let createAdvertCategories = headerData.category;
        createAdvertCategories.forEach(item => {
            item.id = item.redirectUrl.slice(item.redirectUrl.lastIndexOf('/') + 1, item.redirectUrl.length);
        });
        wrapper.innerHTML += template.renderAdvertCreation({category: createAdvertCategories});

        wrapper.querySelector('.create-advert__title').innerText = 'Редактирование объявления';

        main.appendChild(wrapper);
        this.fillData(advertId, wrapper);
        template.addSubmitFormListener(advertId);

        this.addListeners(wrapper, template);
    }

    async fillData(advertId, wrapper) {
        const advert = await ajax.get(`/adverts/${advertId}`);
        const select = wrapper.querySelector('.advert-form__select');
        select.value = advert.category_id;

        wrapper.querySelector('.advert-form__name-input').value = advert.title;
        wrapper.querySelector('.advert-form__price-input').value = advert.price;
        wrapper.querySelector('.advert-form__description-input').value = advert.description;
        wrapper.querySelector('.advert-form__address-input').value = advert.location;
        wrapper.querySelector('.advert-form__upload-box-image').classList.add('big');
        wrapper.querySelector('.advert-form__upload-box-text').classList.add('not-active');
        wrapper.querySelector('.advert-form__upload-box-text-additional').classList.add('not-active');
        wrapper.querySelector('.advert-form__upload-box-image').src = IMAGE_URL + advert.image_url;

        wrapper.querySelector('.advert-form__submit').textContent = 'Сохранить изменения';
    }

    addListeners(wrapper, template) {
        const fileInput = wrapper.querySelector('.advert-form__image-input');
        fileInput?.addEventListener('change', (upload) => {
            const img = wrapper.querySelector('.advert-form__upload-box-image');
            const text = wrapper.querySelector('.advert-form__upload-box-text');
            const additional = wrapper.querySelector('.advert-form__upload-box-text-additional');
            img.classList.add('big');
            text.classList.add('not-active');
            additional.classList.add('not-active');
            template.previewImage(upload);
        });

        const inputNumber = wrapper.querySelector('.advert-form__price-input');

        inputNumber?.addEventListener('input', () => {
            inputNumber.value = template.trimNumber(inputNumber.value, 11);
        })
    }
}