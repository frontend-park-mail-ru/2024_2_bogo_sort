import template from './user.hbs';
import { UserTemplateData } from './userTypes.ts';

export function renderUser(data: UserTemplateData) {
    return template( { userImageUrl: data.userImageUrl, username: data.username, timestamp: data.timestamp, forUser: data.forUser});
}
