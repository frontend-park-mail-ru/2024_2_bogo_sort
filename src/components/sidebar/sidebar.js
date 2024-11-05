'use strict';

export class Sidebar {
    #element;
    #updateTitle;

    constructor(updateTitle) {
        this.#element = document.createElement('div');
        this.#element.classList.add('sidebar');
        this.#updateTitle = updateTitle;
    }

    render() {
        this.#element.innerHTML = Handlebars.templates['sidebar.hbs']();
        this.#addListeners();
        return this.#element;
    }

    #addListeners() {
        const buttons = this.#element.querySelectorAll('.item');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const newTitle = button.textContent;
                this.#updateTitle(newTitle);
            });
        });
    }
}
