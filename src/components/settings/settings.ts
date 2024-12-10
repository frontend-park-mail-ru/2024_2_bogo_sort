import { informationStorage } from '../../modules/informationStorage.ts';
import ajax from '../../modules/ajax.ts';
import { pipe } from '../../modules/pipe.ts';
import { validateEmail } from '../../utils/validation.ts';
import { formatPhone } from '../../utils/formatPhone.ts';
import { router } from '../../modules/router.ts';
import template from './settings.hbs';
import { User } from '../../constants/sharedTypes.ts';
import { SettingsData } from './settingsTypes.ts';
import { ResponseUser } from '../../modules/ajaxTypes.ts';

export class Settings {
    me: User | null = null;

    renderSettings() {
        return template();
    }

    previewImage(upload: Event) {
        const inputFile = upload.target as HTMLInputElement;
        const file = inputFile.files?.[0];
        if(file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const preview = document.querySelector('.settings-form__upload-box-image') as HTMLImageElement;
                if (e.target?.result && typeof e.target.result === 'string') {
                    preview.src = e.target.result;
                }
            };

            reader.readAsDataURL(file);
        }
    }

    fillData(wrapper: HTMLElement) {
        this.me = informationStorage.getUser();
        if(this.me){
            (wrapper.querySelector('.settings-form__name-input') as HTMLInputElement).value = this.me.username;
            (wrapper.querySelector('.settings-form__email-input') as HTMLInputElement).value = this.me.email;
            (wrapper.querySelector('.settings-form__phone-input') as HTMLInputElement).value = this.me.phone === '' ? '' : formatPhone(this.me.phone);
            const userImgUrl = informationStorage.getUserImgUrl();
            if(userImgUrl){
                (wrapper.querySelector('.settings-form__upload-box-image') as HTMLImageElement).src = userImgUrl;
            }
        }

        this.addListeners(wrapper);
    }

    addListeners(wrapper: HTMLElement) {
        const fileInput = wrapper.querySelector('.settings-form__image-input');
        fileInput?.addEventListener('change', (upload) => {
            const img = wrapper.querySelector('.settings-form__upload-box-image');
            const text = wrapper.querySelector('.settings-form__upload-box-text');
            const additional = wrapper.querySelector('.settings-form__upload-box-text-additional');
            img?.classList.add('big');
            text?.classList.add('not-active');
            additional?.classList.add('not-active');
            this.previewImage(upload);
        });

        const phoneInput = wrapper.querySelector('.settings-form__phone-input') as HTMLInputElement | null;
        phoneInput?.addEventListener('input', () => {
            phoneInput.value = formatPhone(phoneInput.value);
        });

        this.addSubmitFormListener(wrapper);
    }

    addSubmitFormListener(wrapper: HTMLElement) {
        const form = wrapper.querySelector('.settings-form');

        form?.addEventListener('submit', (event) => {
            event.preventDefault();

            const data: SettingsData = {
                username: '',
                email: '',
                phone: '',
                id: ''
            };

            const usernameInput = wrapper.querySelector('.settings-form__name-input') as HTMLInputElement;
            data.username = usernameInput.value;

            const emailInput = wrapper.querySelector('.settings-form__email-input') as HTMLInputElement;
            data.email = emailInput.value;

            const phoneInput = wrapper.querySelector('.settings-form__phone-input') as HTMLInputElement;
            const pattern = /\+7\s*\(\s*(\d{3})\s*\)\s*(\d{3})-(\d{2})-(\d{2})/;
            const replacement = '+7$1$2$3$4';
            data.phone = phoneInput.value.replace(pattern, replacement);

            if(this.me){
                data.id = this.me.id;
            }

            this.handleFormSubmission(data);
        });
    }

    async handleFormSubmission(data: SettingsData) {
        const errors = new Set<string>();

        if(data.username.length > 50 || data.username.length === 0){
            errors.add('username');
        }

        if(!validateEmail(data.email)) {
            errors.add('email');
        }

        if(data.phone.length !== 12 && data.phone.length !== 0) {
            errors.add('phone');
        }

        if(errors.size !== 0) {
            this.displayInputErrors(errors);

            return;
        }

        await ajax.put('/profile', data);

        const imageInput = document.querySelector('.settings-form__image-input') as HTMLInputElement;
        const image = imageInput.files?.[0];
        if(image){
            const formData = new FormData();
            formData.append('image', image);
            await ajax.imagePut(`/user/${this.me?.id}/image`, formData);
        }
        const me = await ajax.get<ResponseUser>('/me');
        informationStorage.setUser(me);
        pipe.executeCallback('updateHeader');
        router.goToPage('/user/settings');
    }

    displayInputErrors(errors: Set<string>) {
        const inputs = [];
        if(errors.has('username')) {
            const nameInput = document.querySelector('.settings-form__name-input') as HTMLElement;
            nameInput.classList.add('error');
            inputs.push(nameInput);
        }

        if(errors.has('email')) {
            const emailInput = document.querySelector('.settings-form__email-input') as HTMLElement;
            emailInput.classList.add('error');
            inputs.push(emailInput);
        }

        if(errors.has('phone')) {
            const phoneInput = document.querySelector('.settings-form__phone-input') as HTMLElement;
            phoneInput.classList.add('error');
            inputs.push(phoneInput);
        }

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('error');
            });
        });
    }
}
