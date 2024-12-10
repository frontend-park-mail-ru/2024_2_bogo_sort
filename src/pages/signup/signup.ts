'use strict';

import { MainPage } from '../main/main.ts';
import { pipe } from '../../modules/pipe.ts';

export class SignUpPage {

    render(main: HTMLElement) {
        this.#renderTemplate(main);
    }

    
    #renderTemplate(main: HTMLElement) {
        const mainPage = new MainPage();
        mainPage.render(main);
        pipe.executeCallback('showSignupForm');
    }

}


