'use strict';

import header from '../components/header/header.js';
import ajax from './ajax.js';

export function logout() {
    ajax.post('/logout');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('imageUrl');
    history.pushState(null, '', '/');
    header.changeHeader();
}
