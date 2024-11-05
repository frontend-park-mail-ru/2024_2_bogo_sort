'use strict';

export function getCategoryIdByName(name, catgories) {
    for(const category of catgories) {
        if(category.Title === name) {
            return category.ID;
        }
    }
}