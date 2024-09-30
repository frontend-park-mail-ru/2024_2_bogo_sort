'use strict';

/**
 * Toggles the specified class names on the given elements.
 *
 * @param {HTMLElement[]} elements - An array of HTML elements on which to toggle classes.
 * @param {...string} classNames - One or more class names to toggle on each element.
 */
export function toggleClasses(elements, ...classNames) {
    elements.forEach(element => {
        classNames.forEach(className => {
            element.classList.toggle(className);
        });
    });
}
