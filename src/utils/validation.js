'use strict';

/**
 * Validates an email address using a regular expression.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validates a password based on specific criteria:
 * - At least 8 characters long and at most 20 characters long
 * - Must contain at least one uppercase letter
 * - Must contain at least one digit
 * - Must contain at least one special character (e.g., !@#$%^&*)
 *
 * @param {string} password - The password to validate.
 * @returns {boolean} True if the password is valid, false otherwise.
 */
export function validatePassword(password) {
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/u;
    return re.test(password);
}
