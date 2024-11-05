'use strict';

/**
 * Checks if user is logged in
 * @returns {boolean} Is user logged in.
 */
export function checkAuth() {
    return localStorage.getItem('id') !== null;
}
