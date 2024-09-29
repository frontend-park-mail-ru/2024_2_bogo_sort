'use strict';

export function toggleClasses(elements, ...classNames) {
    elements.forEach(element => {
        classNames.forEach(className => {
            element.classList.toggle(className);
        });
    });
}
