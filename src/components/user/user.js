'use strict';

export function renderUser(data) {
    return Handlebars.templates['user.hbs']( { userImageUrl: data.userImageUrl, username: data.username, timestamp: data.timestamp, forUser: data.forUser});
}
