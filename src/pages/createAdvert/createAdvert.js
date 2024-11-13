import { initHeaderAndMain } from '../../utils/initHeaderAndMain.js';
import { CreateAdvert } from '../../components/createAdvert/createAdvert.js';
import ajax from '../../modules/ajax.js';
import { BACKEND_URL, IMAGE_URL, headerData } from '../../constants/constants.js';

export class CreateAdvertPage {
    #advert;

    render() {
        this.#advert = new CreateAdvert();
        this.#renderTemplate();
    }

    #renderTemplate() {
        const main = initHeaderAndMain();
        let createAdvertCategories = headerData.category;
        createAdvertCategories.forEach(item => {
            item.id = item.redirectUrl.slice(item.redirectUrl.lastIndexOf('/') + 1, item.redirectUrl.length);
        });
        const categories = { category: createAdvertCategories };

        const wrapper = document.createElement('div');
        wrapper.classList.add('create-advert');
        wrapper.innerHTML += this.#advert.renderAdvertCreation(categories);
        main.appendChild(wrapper);
        
        this.#addListeners(wrapper);
    }

    #addListeners(wrapper) {
        const fileInput = wrapper.querySelector('.advert-form__image-input');
        fileInput?.addEventListener('change', (upload) => {
            const img = wrapper.querySelector('.advert-form__upload-box-image');
            const text = wrapper.querySelector('.advert-form__upload-box-text');
            const additional = wrapper.querySelector('.advert-form__upload-box-text-additional');
            img.classList.add('big');
            text.classList.add('not-active');
            additional.classList.add('not-active');
            this.#advert.previewImage(upload);
        });

        const inputNumber = wrapper.querySelector('.advert-form__price-input');

        inputNumber?.addEventListener('input', () => {
            inputNumber.value = this.#advert.trimNumber(inputNumber.value, 11);
        })

        this.#advert.addSubmitFormListener();
    }
}