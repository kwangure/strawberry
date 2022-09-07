/**
 * @param {CSSStyleDeclaration} computedStyle
 * @param {string} property
 */
export function getStyleValue(computedStyle, property) {
	return parseInt(computedStyle.getPropertyValue(property)) || 0;
}
