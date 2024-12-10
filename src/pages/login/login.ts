'use strict';

import { MainPage } from '../main/main.ts';
import { pipe } from '../../modules/pipe.ts';

export class LogInPage {
    render(main: HTMLElement) {
        this.#renderTemplate(main);
    }

    #renderTemplate(main: HTMLElement) {
        const mainPage = new MainPage();
        mainPage.render(main);
        pipe.executeCallback('showAuthForm');
    }
}
