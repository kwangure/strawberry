import { element } from "svelte/internal";

/**
 * Get a localized message for a control does not satisfy the 'min' validation constraint
 *
 * @param {string | number} currentValue
 * @param {string | number} maxValue
 */
export function max(currentValue, maxValue) {
    const input = element("input");
    input.type = "number";
    input.value = String(currentValue);
    input.maxLength = Number(maxValue);
    input.blur();
    return input.validationMessage;
}

/**
 * Get a localized message for a control does not satisfy the 'minlength' validation constraint
 *
 * @param {number} currentLength
 * @param {number} maxLength
 */
export function maxlength(currentLength, maxLength) {
    const input = element("input");
    input.value = "o".repeat(currentLength);
    input.maxLength = maxLength;
    input.blur();
    return input.validationMessage;
}

/**
 * Get a localized message for a control does not satisfy the 'min' validation constraint
 *
 * @param {string | number} currentValue
 * @param {string | number} minValue
 */
 export function min(currentValue, minValue) {
    const input = element("input");
    input.type = "number";
    input.value = String(currentValue);
    input.minLength = Number(minValue);
    input.blur();
    return input.validationMessage;
}

/**
 * Get a localized message for a control does not satisfy the 'maxlength' validation constraint
 *
 * @param {number} currentLength
 * @param {number} minLength
 */
export function minlength(currentLength, minLength) {
    const input = element("input");
    input.value = "o".repeat(currentLength);
    input.minLength = minLength;
    input.blur();
    return input.validationMessage;
}

/**
 * Get a localized message for a control does not satisfy the 'required' validation constraint
 */
 export function required() {
    const input = element("input");
    input.required = true;
    input.blur();
    return input.validationMessage;
}