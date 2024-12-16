'use strict';

export function toggleClasses(elements: (HTMLElement | null)[], ...classNames: string[]) {
    elements.forEach(element => {
        classNames.forEach(className => {
            element?.classList.toggle(className);
        });
    });
}
