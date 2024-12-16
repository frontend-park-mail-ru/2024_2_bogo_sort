import template from './modalWithOverlay.hbs';
import { ModalWithOverlayTemplateData } from './modalWithOverlayTypes';

export function renderModalWithOverlay(data: ModalWithOverlayTemplateData) {
    const templateHtml = template({title: data.title, info: data.info, select: data.select, selectLabel: data.selectLabel, selectName: data.selectName, selectOptions: data.selectOptions, inputs: data.inputs, buttonText: data.buttonText});
    const parent = document.createElement('div');
    parent.innerHTML = templateHtml;
    const element = parent.firstElementChild;
    return element;
}