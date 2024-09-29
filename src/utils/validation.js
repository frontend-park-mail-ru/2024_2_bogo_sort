'use strict';

export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export function validPassword(password) {
    const passwordRegex = /^.{8,}$/;
    return passwordRegex.test(password);
}