'use strict';

export class Sidebar {
    #element;

    constructor() {
        this.#element = document.createElement('div');
        this.#element.classList.add('sidebar');
    }

    render() {
        this.#element.innerHTML = Handlebars.templates['sidebar.hbs']();
        return this.#element;
    }
}
