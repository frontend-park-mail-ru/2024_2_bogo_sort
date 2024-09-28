'use strict';


export function validEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^s\@]+$/;
    return re.test(email);
}