'use strict';

import { IMAGE_URL } from "../constants/constants.js";

export function brokenImageUrlForamtter(imageUrl) {
    if(imageUrl.match(new RegExp('\\.', 'g'))?.length > 1) {
        return IMAGE_URL + imageUrl.slice(0, imageUrl.lastIndexOf('/'));
    }
    return IMAGE_URL + imageUrl;
}