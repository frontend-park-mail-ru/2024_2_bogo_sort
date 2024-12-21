import { informationStorage } from '@modules/informationStorage.ts';
import ajax from '@modules/ajax.ts';
import { router } from '@modules/router.ts';
import template from './advertCreate.hbs';
import { AdvertCreateFormData, AdvertCreateTemplateData } from './advertCreateTypes.ts';
import { ResponseAdvertPost, ResponseSeller } from '@modules/ajaxTypes.ts';

export class CreateAdvert {
    form: Element | null = null;

    renderAdvertCreation(data: AdvertCreateTemplateData){
        return template({ category: data.category, imagePreview: data.imagePreview });
    }

    previewImage(upload: Event) {
        const inputFile = upload.target as HTMLInputElement;
        const file = inputFile.files?.[0];
        if(file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const preview = document.querySelector<HTMLImageElement>('.avert-form__upload-box-image');
                if (e.target?.result && typeof e.target.result === 'string' && preview) {
                    preview.src = e.target.result;
                }
            };

            reader.readAsDataURL(file);
        }
    }

    addFileAndNumberInputListeners(wrapper: HTMLElement) {
        const fileInput = wrapper.querySelector('.avert-form__image-input');
        fileInput?.addEventListener('change', (upload: Event) => {
            const img = wrapper.querySelector('.avert-form__upload-box-image');
            const text = wrapper.querySelector('.avert-form__upload-box-text');
            const additional = wrapper.querySelector('.avert-form__upload-box-text-additional');
            img?.classList.add('big');
            text?.classList.add('not-active');
            additional?.classList.add('not-active');
            this.previewImage(upload);
        });

        const inputNumber = wrapper.querySelector<HTMLInputElement>('.avert-form__price-input');

        inputNumber?.addEventListener('input', () => {
            inputNumber.value = this.trimNumber(inputNumber.value, 11);
        });
    }

    trimNumber(number: string, maxLength: number): string {
        return number.slice(0, maxLength);
    }

    addSubmitFormListener(updateAdvertId: string | null = null) {
        this.form = document.querySelector('.avert-form');

        this.form?.addEventListener('submit', async (event) => {
            event.preventDefault();

            const titleInput = this.form?.querySelector<HTMLInputElement>('#name');
            
            const priceInput = this.form?.querySelector<HTMLInputElement>('#price');
            
            const locationInput = this.form?.querySelector<HTMLInputElement>('#address');
            
            const select = this.form?.querySelector<HTMLSelectElement>('select');

            const textArea = this.form?.querySelector<HTMLTextAreaElement>('textarea');

            const userId = informationStorage.getUser()?.id;

            let seller = informationStorage.getMeSeller();
            if(!seller){
                seller = await ajax.get<ResponseSeller>(`seller/user/${userId}`);
            }

            let data: AdvertCreateFormData | null = {
                title: titleInput ? titleInput.value : '',
                price: priceInput ? priceInput.value: '',
                location: locationInput ? locationInput.value : '',
                category_id: select ? select.value : '',
                description: textArea ? textArea.value : '',
                seller_id: seller.id,
                has_delivery: false,
                status: 'active'
            };

            this.handleFormSubmission(data, updateAdvertId);
        });
    }

    async handleFormSubmission(data: AdvertCreateFormData, updateAdvertId: string | null = null) {
        const errors = new Set<string>();
        if(data.title.length > 45 || data.title.length === 0) {
            errors.add('title');
        }

        if(typeof data.price === 'string' && (data.price.length > 6 || data.price.length === 0 || Number(data.price) < 0)) {
            errors.add('price');
        }

        if(data.description.length > 3000 || data.description.length === 0) {
            errors.add('description');
        }

        if(data.location.length > 150 || data.location.length === 0) {
            errors.add('location');
        }

        if(errors.size !== 0) {
            this.displayInputErrors(errors);

            return;
        }

        data.price = Number(data.price);

        let advertId: string;

        if(updateAdvertId){
            await ajax.put(`/adverts/${updateAdvertId}`, data);
            advertId = updateAdvertId;
        } else {
            advertId = (await ajax.post<ResponseAdvertPost, AdvertCreateFormData>('/adverts', data) as ResponseAdvertPost).id;
        }

        const imageInput = this.form?.querySelector('.avert-form__image-input') as HTMLInputElement;
        const image = imageInput.files?.[0];
        if(image){
            const formData = new FormData();
            formData.append('image', image);
            await ajax.imagePut(`/adverts/${advertId}/image`, formData);
        }

        router.goToPage(`/item/${advertId}`);
    }

    displayInputErrors(errors: Set<string>) {
        const inputs = [];
        if(errors.has('title')) {
            const titleInput = this.form?.querySelector('.avert-form__name-input');
            titleInput?.classList.add('error');
            inputs.push(titleInput);
        }

        if(errors.has('price')) {
            const priceInput = this.form?.querySelector('.avert-form__price-input');
            priceInput?.classList.add('error');
            inputs.push(priceInput);
        }

        if(errors.has('description')) {
            const descriptionInput = this.form?.querySelector('.avert-form__description-input');
            descriptionInput?.classList.add('error');
            inputs.push(descriptionInput);
        }

        if(errors.has('location')) {
            const locationInput = this.form?.querySelector('.avert-form__address-input');
            locationInput?.classList.add('error');
            inputs.push(locationInput);
        }

        inputs.forEach(input => {
            input?.addEventListener('input', () => {
                input.classList.remove('error');
            });
        });
    }
};
