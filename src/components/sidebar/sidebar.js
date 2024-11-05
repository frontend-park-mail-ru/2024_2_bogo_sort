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

                if (button.id === 'favouritesButton') {
                    this.favouritesListener();
                } else if (button.id === 'settingsButton') {
                    this.settingsListener();
                } else if (button.id === 'myAdvertsButton') {
                    this.myAdvertsListener();
                } else if (button.id === 'myOrdersButton') {
                    this.myOrdersListener();
                }
            });
        });
    }

    addSettingsListener(listener) {
        this.settingsListener = listener;
    }

    addFavouritesListener(listener) {
        this.favouritesListener = listener;
    }

    addMyOrdersListener(listener) {
        this.myOrdersListener = listener;
    }

    addMyAdvertsListener(listener) {
        this.myAdvertsListener = listener;
    }
}
