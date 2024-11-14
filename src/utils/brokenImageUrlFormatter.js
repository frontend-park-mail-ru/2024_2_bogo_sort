'use strict';

import { BASE_URL } from "../constants/constants.js";

export function makeImageUrl(pathToImage) {
    return BASE_URL + pathToImage;
}