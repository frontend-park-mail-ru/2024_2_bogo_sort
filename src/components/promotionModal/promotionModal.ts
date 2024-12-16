import template from './promotionModal.hbs';

export function renderPromotionModal() {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML += template();
    const promotionModalElement = tempDiv.firstElementChild;
    return promotionModalElement;
}