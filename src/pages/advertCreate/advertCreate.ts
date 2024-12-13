import { CreateAdvert } from '@components/advertCreate/advertCreate.ts';
import { headerData } from '@constants/constants.ts';
import { informationStorage } from '@modules/informationStorage.ts';
import { router } from '@modules/router.ts';
import { Category } from '@constants/sharedTypes.ts';
import { renderEmptyPlaceholder } from '@components/emptyPlaceholder/emptyPlaceholder.ts';
import { EmptyPlaceholderTemplateData } from '@components/emptyPlaceholder/emptyPlaceholderTypes.ts';

export class CreateAdvertPage {
    #advert: CreateAdvert | undefined; 

    render(main: HTMLElement) {
        if(!informationStorage.isAuth()){
            router.goToPage('/login');

            return;
        } else if(!informationStorage.getUser()?.phone) {
            const overlay = document.createElement('div');
            overlay.className = 'overlay active';
            const data: EmptyPlaceholderTemplateData = {
                imagePath: '@static/images/phone.svg',
                text:'Дополните информацию о себе, чтобы покупатели могли с вами связться',
                buttonText: 'Перейти в настройки',
                redirectUrl: '/user/settings'
            }
            const emptyPlaceholder = renderEmptyPlaceholder(data);
            if(emptyPlaceholder){
                emptyPlaceholder.classList.add('fullScreen');
                overlay.appendChild(emptyPlaceholder);
            }
            main.appendChild(overlay);
            return; 
        }
        this.#advert = new CreateAdvert();
        this.#renderTemplate(main);
    }

    #renderTemplate(main: HTMLElement) {
        const createAdvertCategories = headerData.category;
        createAdvertCategories.forEach((item: Category) => {
            item.id = item.redirectUrl.slice(item.redirectUrl.lastIndexOf('/') + 1, item.redirectUrl.length);
        });
        const data = { category: createAdvertCategories, imagePreview: false };

        const wrapper = document.createElement('div');
        wrapper.classList.add('create-advert');
        wrapper.innerHTML += this.#advert?.renderAdvertCreation(data);
        main.appendChild(wrapper);

        this.#addListeners(wrapper);
    }

    #addListeners(wrapper: HTMLElement) {
        this.#advert?.addFileAndNumberInputListeners(wrapper);
        this.#advert?.addSubmitFormListener();
    }
}
