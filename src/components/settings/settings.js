import { IMAGE_URL } from "../../constants/constants.js";
import ajax from "../../utils/ajax.js";
import header from '../../components/header/header.js'
import { validateEmail } from "../../utils/validation.js";
import { getUserImageUrl } from '../../utils/getUserImageUrl.js';

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
        this.addSubmitFormListener(wrapper);
    }

    addSubmitFormListener(wrapper) {
        const form = wrapper.querySelector('.settings-form');

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const inputs = wrapper.querySelectorAll('input');
            const data = this.me;
            inputs.forEach(input => {
                if(input.type !== 'file') {
                    data[input.name] = input.value;
                }
            });

            this.handleFormSubmission(data);
        })
    }

    async handleFormSubmission(data) {
        const errors = new Set();

        if(data['username'].length > 50 || data['username'].length === 0){
            errors.add('username');
        }

        if(!validateEmail(data['email'])) {
            errors.add('email');
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
        localStorage.setItem('name', data.username);
        localStorage.setItem('imageUrl', await getUserImageUrl(data));
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

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('error');
            });
        });
    }
}