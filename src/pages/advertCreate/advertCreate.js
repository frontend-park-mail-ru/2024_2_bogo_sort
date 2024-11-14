import { initHeaderAndMain } from '../../utils/initHeaderAndMain.js';
import { CreateAdvert } from '../../components/advertCreate/advertCreate.js';
import ajax from '../../modules/ajax.js';
import { BACKEND_BASE_URL, BASE_URL, headerData } from '../../constants/constants.js';

export class CreateAdvertPage {
    #advert;

    render() {
        this.#advert = new CreateAdvert();
        this.#renderTemplate();
    }

    #renderTemplate() {
        const main = initHeaderAndMain();
        const createAdvertCategories = headerData.category;
        createAdvertCategories.forEach(item => {
            item.id = item.redirectUrl.slice(item.redirectUrl.lastIndexOf('/') + 1, item.redirectUrl.length);
        });
        const data = { category: createAdvertCategories, imagePreview: false };

        const wrapper = document.createElement('div');
        wrapper.classList.add('create-advert');
        wrapper.innerHTML += this.#advert.renderAdvertCreation(data);
        main.appendChild(wrapper);

        this.#addListeners(wrapper);
    }

    #addListeners(wrapper) {
        this.#advert.addFileAndNumberInputListeners(wrapper);
        this.#advert.addSubmitFormListener();
    }
}
