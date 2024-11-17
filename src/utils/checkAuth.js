'use strict';

import { informationStorage } from '../modules/informationStorage.js';

/**
 * Checks if user is logged in
 * @returns {boolean} Is user logged in.
 */
export function checkAuth() {
    return informationStorage.isAuth();
}
