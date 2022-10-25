/**
 * @param {CSSStyleDeclaration} computedStyle
 * @param {string} property
 */
export function getPropertyValueNumber(computedStyle, property) {
	return parseInt(computedStyle.getPropertyValue(property)) || 0;
}

/**
	 * @param {Element} element
	 * @param {string} prop
	 */
export function getStyle(element, prop) {
	const computedStylesheet = getComputedStyle(element);
	return getPropertyValueNumber(computedStylesheet, prop);
}

/**
 * @param {Element} element
 * @param {string} prop
 */
export function getPseudoStyle(element, prop, pseudo = ':before') {
	const computedStylesheet = getComputedStyle(element, pseudo);
	return getPropertyValueNumber(computedStylesheet, prop);
}
