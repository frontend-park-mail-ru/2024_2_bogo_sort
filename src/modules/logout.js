'use strict';

import { informationStorage } from './informationStorage.js';
import header from '../components/header/header.js';
import ajax from './ajax.js';

export function logout() {
    ajax.post('/logout');
    informationStorage.setUser(null);
    header.changeHeader();
}
