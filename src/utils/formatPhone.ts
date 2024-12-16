'use strict';

export function formatPhone(phone: string) {
    phone = phone.replace(/\D/g, '');

    if (phone.length > 11) phone = phone.substring(0, 11);
    if (!phone.startsWith('7') && phone !== '') {
        phone = '7' + phone;
    }
    let formattedNumber = '+7';
    if (phone.length > 1) formattedNumber += ' (' + phone.substring(1, 4);
    if (phone.length >= 5) formattedNumber += ') ' + phone.substring(4, 7);
    if (phone.length >= 8) formattedNumber += '-' + phone.substring(7, 9);
    if (phone.length >= 10) formattedNumber += '-' + phone.substring(9, 11);

    return formattedNumber;
}
