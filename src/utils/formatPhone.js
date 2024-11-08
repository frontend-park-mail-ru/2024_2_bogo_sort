'use strict';

export function formatPhone(phone) {
    phone = phone.replace(/\D/g, '');

    if (phone.length > 11) phone = phone.substring(0, 11);

    if (phone.length === 0) {
        phone = '';
    } else if (phone.length <= 1) {
        phone = `+${phone}`;
    } else if (phone.length <= 4) {
        phone = `+${phone[0]}-${phone.slice(1)}`;
    } else if (phone.length <= 7) {
        phone = `+${phone[0]}-${phone.slice(1, 4)}-${phone.slice(4)}`;
    } else if (phone.length <= 9) {
        phone = `+${phone[0]}-${phone.slice(1, 4)}-${phone.slice(4, 7)}-${phone.slice(7)}`;
    } else {
        phone = `+${phone[0]}-${phone.slice(1, 4)}-${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9)}`;
    }
    return phone;
}