import { CreateAdvert } from '../../components/advertCreate/advertCreate.js';
import { headerData } from '../../constants/constants.js';

export class CreateAdvertPage {
    #advert;

    render(main) {
        this.#advert = new CreateAdvert();
        this.#renderTemplate(main);
    }

    #renderTemplate(main) {
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
