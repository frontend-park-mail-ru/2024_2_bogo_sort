'use strict'

export function renderAuthTemplate(title, info, buttontitle, pretext, anchortext) {
    const template = Handlebars.templates['auth.hbs'];
    return template({title, info, buttontitle, pretext, anchortext});
}

