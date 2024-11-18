'use strict';

const Handlebars = require('handlebars/runtime');

/**
 * Handlebars helper to check equality of two values and additional conditions.
 *
 * @param {*} a - First value to compare.
 * @param {*} b - Second value to compare.
 * @param {*} c - Third value for additional condition.
 * @param {*} d - Fourth value for additional condition.
 * @returns {boolean} True if a equals b and c equals d, otherwise false.
 */
Handlebars.registerHelper('eq', function (a, b, c, d) {
    return a === b && c === d;
});

/**
 * Handlebars helper to check equality.
 *
 * @param {*} a - First value to compare.
 * @param {*} b - Second value for additional condition.
 * @param {*} c - Third value for additional condition.
 * @returns {boolean} True if a equals b or c equals d, otherwise false.
 */
Handlebars.registerHelper('eq-or', function (a, b, c) {
    return a === b || a === c;
});

module.exports = Handlebars;
