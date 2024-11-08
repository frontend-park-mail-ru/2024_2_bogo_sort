import { IMAGE_URL } from "../../constants/constants.js";
import ajax from "../../utils/ajax.js";
import header from '../../components/header/header.js'
import { validateEmail } from "../../utils/validation.js";
import { getUserImageUrl } from '../../utils/getUserImageUrl.js';
import { formatPhone } from "../../utils/formatPhone.js";

export class Settings {
    renderSettings() {
        return Handlebars.templates['settings.hbs']();
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

    async fillData(wrapper) {
        this.me = await ajax.get('/me');
        wrapper.querySelector('.settings-form__name-input').value = this.me.username;
        wrapper.querySelector('.settings-form__email-input').value = this.me.email;
        wrapper.querySelector('.settings-form__phone-input').value = this.me.phone;
        wrapper.querySelector('.settings-form__upload-box-image').classList.add('big');
        wrapper.querySelector('.settings-form__upload-box-text').classList.add('not-active');
        wrapper.querySelector('.settings-form__upload-box-text-additional').classList.add('not-active');
        wrapper.querySelector('.settings-form__upload-box-image').src = await getUserImageUrl(this.me);

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
                    if(input.name === 'Phone'){
                        data[input.name] = input.value.split('-').join('');
                    } else {
                        data[input.name] = input.value;
                    }
                }
            });

            data['ID'] = this.me.id;

            this.handleFormSubmission(data);
        })
    }

    async handleFormSubmission(data) {
        const errors = new Set();

        if(data['Username'].length > 50 || data['Username'].length === 0){
            errors.add('username');
        }

        if(!validateEmail(data['Email'])) {
            errors.add('email');
        }

        if(data['Phone'].length !== 12) {
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
            localStorage.setItem('imageUrl', await getUserImageUrl(data));
        }
        localStorage.setItem('name', data.Username);
        header.render();
        window.location.href = '/user/settings';
    }

    displayInputErrors(errors) {
        let inputs = [];
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