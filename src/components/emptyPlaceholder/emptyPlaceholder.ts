import temlpate from './emptyPlaceholder.hbs';
import { router } from '../../modules/router.ts';
import { EmptyPlaceholderTemplateData } from './emptyPlaceholderTypes.ts';

export function renderEmptyPlaceholder(data: EmptyPlaceholderTemplateData) {
    const temp = document.createElement('div');
    temp.innerHTML += temlpate({ imagePath: data.imagePath, text: data.text, buttonText: data.buttonText});
    const placeholder = temp.querySelector('.placeholder');
    placeholder?.querySelector('.placeholder__button')?.addEventListener('click', () => {
        router.goToPage(data.redirectUrl);
    });

    return placeholder;
}
