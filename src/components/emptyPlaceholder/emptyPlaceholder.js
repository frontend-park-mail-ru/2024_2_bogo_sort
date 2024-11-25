import temlpate from './emptyPlaceholder.hbs';
import { router } from '../../modules/router';

export function renderEmptyPlaceholder(data) {
    const temp = document.createElement('div');
    temp.innerHTML += temlpate({ imagePath: data.imagePath, text: data.text, buttonText: data.buttonText});
    const placeholder = temp.querySelector('.placeholder');
    placeholder.querySelector('.placeholder__button')?.addEventListener('click', () => {
        router.goToPage(data.redirectUrl);
    });

    return placeholder;
}
