import iframeTemplate from '../../components/iframe/iframe.hbs';

export function renderIframe(src) {

    const div = document.createElement('div');
    div.classList.add('csat__iframe-wrapper');
    div.innerHTML += iframeTemplate({ src: src });
    div.querySelector('.csat__close-button')?.addEventListener('click', () => {
        div.style = 'display: none';
    });

    return div;
}