import { informationStorage } from '../../modules/informationStorage.js';
import ajax from '../../modules/ajax.js';
import { pipe } from '../../modules/pipe.js';
import { validateEmail } from '../../utils/validation.js';
import { formatPhone } from '../../utils/formatPhone.js';
import { router } from '../../modules/router.js';
import template from './settings.hbs';

export class Settings {
    renderSettings() {
        return template();
    }

    previewImage(upload) {
        const file = upload.target.files[0];
        if(file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const preview = document.querySelector('.settings-form__upload-box-image');
                preview.src = e.target.result;
            };

            reader.readAsDataURL(file);
        }
    }

    fillData(wrapper) {
        this.me = informationStorage.getUser();
        wrapper.querySelector('.settings-form__name-input').value = this.me.username;
        wrapper.querySelector('.settings-form__email-input').value = this.me.email;
        wrapper.querySelector('.settings-form__phone-input').value = this.me.phone === '' ? '' : formatPhone(this.me.phone);
        wrapper.querySelector('.settings-form__upload-box-image').src = informationStorage.getUserImgUrl();

        this.addListeners(wrapper);
    }

    addListeners(wrapper) {
        const fileInput = wrapper.querySelector('.settings-form__image-input');
        fileInput?.addEventListener('change', (upload) => {
            const img = wrapper.querySelector('.settings-form__upload-box-image');
            const text = wrapper.querySelector('.settings-form__upload-box-text');
            const additional = wrapper.querySelector('.settings-form__upload-box-text-additional');
            img.classList.add('big');
            text.classList.add('not-active');
            additional.classList.add('not-active');
            this.previewImage(upload);
        });

        const phoneInput = wrapper.querySelector('.settings-form__phone-input');
        phoneInput?.addEventListener('input', () => {
            phoneInput.value = formatPhone(phoneInput.value);
        });

        this.addSubmitFormListener(wrapper);
    }

    addSubmitFormListener(wrapper) {
        const form = wrapper.querySelector('.settings-form');

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const inputs = wrapper.querySelectorAll('input');
            const data = {};
            inputs.forEach(input => {
                if(input.type !== 'file') {
                    if(input.name === 'Phone' && input.value !== ''){
                        const pattern = /\+7\s*\(\s*(\d{3})\s*\)\s*(\d{3})-(\d{2})-(\d{2})/;
                        const replacement = '+7$1$2$3$4';
                        data[input.name] = input.value.replace(pattern, replacement);
                    } else {
                        data[input.name] = input.value;
                    }
                }
            });

            data['ID'] = this.me.id;

            this.handleFormSubmission(data);
        });
    }

    async handleFormSubmission(data) {
        const errors = new Set();

        if(data['Username'].length > 50 || data['Username'].length === 0){
            errors.add('username');
        }

        if(!validateEmail(data['Email'])) {
            errors.add('email');
        }

        if(data['Phone'].length !== 12 && data['Phone'].length !== 0) {
            errors.add('phone');
        }

        if(errors.size !== 0) {
            this.displayInputErrors(errors);

            return;
        }

        await ajax.put('/profile', data);

        const imageInput = document.querySelector('.settings-form__image-input');
        const image = imageInput.files[0];
        const formData = new FormData();
        formData.append('image', image);
        if(image){
            await ajax.imagePut(`/user/${this.me.id}/image`, formData);
        }
        const me = await ajax.get('/me');
        informationStorage.setUser(me);
        pipe.executeCallback('updateHeader');
        router.goToPage('/user/settings');
    }

    displayInputErrors(errors) {
        const inputs = [];
        if(errors.has('username')) {
            const nameInput = document.querySelector('.settings-form__name-input');
            nameInput.classList.add('error');
            inputs.push(nameInput);
        }

        if(errors.has('email')) {
            const emailInput = document.querySelector('.settings-form__email-input');
            emailInput.classList.add('error');
            inputs.push(emailInput);
        }

        if(errors.has('phone')) {
            const phoneInput = document.querySelector('.settings-form__phone-input');
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
