import { BASE_URL } from '../constants/constants.js';
import ajax from '../modules/ajax.js';

export async function getUserImageUrl(user) {
    const path = await ajax.get(`/files/${user.avatar_id}`);
    return BASE_URL + path;
}