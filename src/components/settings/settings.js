'use strict';

export class Settings {
    #element;

    constructor() {
        this.#element = document.createElement('div');
        this.#element.classList.add('settings');
    }

    render() {
        this.#renderTemplate();
        return this.#element;
    }

    #renderTemplate() {
        this.#element.innerHTML = Handlebars.templates['settings.hbs']();
    }
}
