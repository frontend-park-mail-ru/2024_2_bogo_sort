'use strict';

/**
 * Checks if user is logged in
 * @returns {boolean} Is user logged in.
 */
export function checkAuth() {
    return document.cookie.split(';').some((item) => item.trim().startsWith('session_id='));
}

/**
 * Get the session ID from the cookie
 * @returns {string|null} The session ID or null if not found
 */
export function getSessionId() {
    const match = document.cookie.match(/session_id=([^;]+)/);
    return match ? match[1] : null;
}