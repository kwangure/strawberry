/**
 * It's `true` if it is running in a browser environment or `false` if it is not
 * (SSR).
 * @example
 * const title = canUseDOM ? document.title : "";
 */
export const canUseDOM = typeof window !== 'undefined' && Boolean(window.document?.createElement);

const buttonInputTypes = [
	'button',
	'color',
	'file',
	'image',
	'reset',
	'submit',
];

/**
 * Checks whether `element` is a native HTML button element.
 *
 * @example
 * isButton(document.querySelector('button')); // true
 * isButton(document.querySelector('input[type="button"]')); // true
 * isButton(document.querySelector('div')); // false
 * isButton(document.querySelector('input[type="text"]')); // false
 * isButton(document.querySelector('div[role="button"]')); // false
 *
 * @param {HTMLElement} element
 * @return {element is HTMLInputElement | HTMLButtonElement}
 */
export function isButton(element) {
	if (isHTMLButtonElement(element)) return true;
	if (isHTMLInputElement(element) && element.type) {
		return buttonInputTypes.indexOf(element.type) !== -1;
	}
	return false;
}

/**
 * Checks whether `element` is disabled.
 *
 * @example
 * isDisabled(document.querySelector('button[disabled]')); // true
 * isButton(document.querySelector('div[aria-disabled="true"]')); // true
 * isButton(document.querySelector('div')); // false
 * isButton(document.querySelector('input[type="text"]')); // false
 * isButton(document.querySelector('div[role="button"]')); // false
 *
 * @param {HTMLElement} element
 */
export function isDisabled(element) {
	if (
		(isHTMLInputElement(element) || isHTMLButtonElement(element))
		&& element.disabled
	) {
		return true;
	}
	return element.ariaDisabled === 'true';
}

/**
 * Checks whether `element` is a native HTML button element.
 *
 * @example
 * isHTMLButtonElement(document.querySelector('button')); // true
 * isHTMLButtonElement(document.querySelector('div')); // false
 *
 * @param {HTMLElement} element
 * @returns {element is HTMLButtonElement}
 */
export function isHTMLButtonElement(element) {
	const tagName = element.tagName.toLowerCase();
	return tagName === 'button';
}

/**
 * Checks whether `element` is a native HTML input element.
 *
 * @example
 * isHTMLInputElement(document.querySelector('input')); // true
 * isHTMLInputElement(document.querySelector('div')); // false
 *
 * @param {HTMLElement} element
 * @returns {element is HTMLInputElement}
 */
export function isHTMLInputElement(element) {
	const tagName = element.tagName.toLowerCase();
	return tagName === 'input';
}

/**
 * Check whether the given element is a text field, where text field is defined
 * by the ability to select within the input.
 *
 * @example
 * isTextField(document.querySelector('div')); // false
 * isTextField(document.querySelector('input')); // true
 * isTextField(document.querySelector('input[type="button"]')); // false
 * isTextField(document.querySelector('textarea'));
 *
 * @link {https://github.com/ariakit/ariakit/blob/59e47b2a852cf2e43b16756e54be270a09d1bb61/packages/ariakit-utils/src/dom.ts#L172}
 *
 * @param {HTMLElement} element
 * @returns {element is HTMLInputElement | HTMLTextAreaElement}
 */
export function isTextField(element) {
	try {
		const isTextInput = element instanceof HTMLInputElement
			&& element.selectionStart !== null;
		const isTextArea = element.tagName === 'TEXTAREA';
		return isTextInput || isTextArea || false;
	} catch (error) {
		// Safari throws an exception when trying to get `selectionStart` on
		// non-text <input> elements (which, understandably, don't have the text
		// selection API). We catch this via a try/catch block, as opposed to a more
		// explicit check of the element's input types, because of Safari's
		// non-standard behavior. This also means we don't have to worry about the
		// list of input types that support `selectionStart` changing as the HTML
		// spec evolves over time.
		return false;
	}
}
