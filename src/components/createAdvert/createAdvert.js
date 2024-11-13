import ajax from '../../modules/ajax.js';

export class CreateAdvert {
    form;

    renderAdvertCreation(data){
        return Handlebars.templates['createAdvert.hbs']({ category: data.category });
    }

    previewImage(upload) {
        const file = upload.target.files[0];
        if(file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const preview = document.querySelector('.advert-form__upload-box-image');
                preview.src = e.target.result;
            };

            reader.readAsDataURL(file);
        }
    }

    trimNumber(number, maxLength) {
        return number.slice(0, maxLength);
    }

    addSubmitFormListener(updateAdvertId) {
        this.form = document.querySelector('.advert-form');

        this.form?.addEventListener('submit', async (event) => {
            event.preventDefault();

            const inputs = this.form.querySelectorAll('input');
            const data = {};
            inputs?.forEach(input => {
                if(input.type !== 'file') {
                    data[input.name] = input.value;
                }
            });

            const select = this.form.querySelector('select');
            data['category_id'] = select.value;

            const textArea = this.form.querySelector('textarea');
            data[textArea.name] = textArea.value;

            const userId = localStorage.getItem('id');

            const seller = await ajax.get(`/seller/user/${userId}`)
            data['seller_id'] = seller.id;
            data['has_delivery'] = false;
            data['status'] = 'active';

            this.handleFormSubmission(data, updateAdvertId);
        })
    }

    async handleFormSubmission(data, updateAdvertId = null) {
        const errors = new Set();
    
        if(data['title'].length > 45 || data['title'].length === 0) {
            errors.add('title');
        }

        if(data['price'].length > 6 || data['price'].length === 0 || Number(data['price']) < 0 ) {
            errors.add('price');
        }

        if(data['description'].length > 3000 || data['description'].length === 0) {
            errors.add('description');
        }

        if(data['location'].length > 150 || data['location'].length === 0) {
            errors.add('location');
        }

        if(errors.size !== 0) {
            this.displayInputErrors(errors);
            
            return;
        }

        data['price'] = Number(data['price']);

        let advert = {};
        if(updateAdvertId){
            await ajax.put(`/adverts/${updateAdvertId}`, data);
            advert.id = updateAdvertId;
        } else {
            advert = await ajax.post('/adverts', data);
        }

        const imageInput = this.form.querySelector('.advert-form__image-input');
        const image = imageInput.files[0];
        const formData = new FormData();
        formData.append('image', image);
        await ajax.imagePut(`/adverts/${advert.id}/image`, formData);

        window.location.href = `/advert/${advert.id}`;
    }

    displayInputErrors(errors) {
        let inputs = [];
        if(errors.has('title')) {
            const titleInput = this.form.querySelector('.advert-form__name-input');
            titleInput?.classList.add('error');
            inputs.push(titleInput);
        }

        if(errors.has('price')) {
            const priceInput = this.form.querySelector('.advert-form__price-input');
            priceInput?.classList.add('error');
            inputs.push(priceInput);
        }

        if(errors.has('description')) {
            const descriptionInput = this.form.querySelector('.advert-form__description-input');
            descriptionInput?.classList.add('error');
            inputs.push(descriptionInput);
        }

        if(errors.has('location')) {
            const locationInput = this.form.querySelector('.advert-form__address-input');
            locationInput?.classList.add('error');
            inputs.push(locationInput);
        }

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('error');
            });
        });
    }
};