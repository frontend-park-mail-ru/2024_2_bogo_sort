'use strict';

import header from '../../components/header/header.js';


export function initHeaderAndMain() {
    const root = document.querySelector('#root');
    const main = document.createElement('div');
    main.classList.add('main');
    root.appendChild(main);
    main.appendChild(header.render());

    return main;
}
