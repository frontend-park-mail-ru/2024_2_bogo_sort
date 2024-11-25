'use strict';

import template from './user.hbs';

export function renderUser(data) {
    return template( { userImageUrl: data.userImageUrl, username: data.username, timestamp: data.timestamp, forUser: data.forUser});
}
