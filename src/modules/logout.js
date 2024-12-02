'use strict';

import { informationStorage } from './informationStorage.js';
import header from '../components/header/header.js';
import ajax from './ajax.js';
import { pipe } from './pipe.js';

export function logout() {
    ajax.post('/logout');
    informationStorage.setUser(null);
    pipe.executeCallback('updateHeader');
}
