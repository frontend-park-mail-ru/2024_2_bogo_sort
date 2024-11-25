import { CreateAdvert } from '../../components/advertCreate/advertCreate.js';
import { headerData } from '../../constants/constants.js';
import { informationStorage } from '../../modules/informationStorage.js';
import { router } from '../../modules/router.js';

export class CreateAdvertPage {
    #advert;

    render(main) {
        if(!informationStorage.isAuth()){
            router.goToPage('/login');

            return;
        }
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
