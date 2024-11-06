import { IMAGE_URL } from "../constants/constants.js";
import ajax from "./ajax.js";

export async function getUserImageUrl(user) {
    const path = await ajax.get(`/files/${user.avatar_id}`);
    return IMAGE_URL + path;
}