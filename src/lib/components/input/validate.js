import { listen } from 'svelte/internal';

/**
 * @template T
 * @param {T extends (HTMLInputElement | HTMLTextAreaElement) ? T : never} input
 * @param {((input: T) => string)} invalid
 * @param {((error: string, input: T) => string)} error
 */
function setValidationMessage(input, invalid, error) {
	if (input.disabled) return;

	// Set customValidity to user-provided error. Otherwise set to empty string
	// to reset customValidity, telling the browser to run built-in validation
	const customValidityCheck = invalid(input);
	let customValidityError = '';
	if (customValidityCheck) {
		customValidityError = error(customValidityCheck, input)
				|| 'The value you entered for this field is invalid.';
	}

	input.setCustomValidity(customValidityError);
}

/**
 * @template T
 * @param {T extends (HTMLInputElement | HTMLTextAreaElement) ? T : never} input
 * @param {{
 *     invalid?: (input: T) => string,
 *     error?: (error: string, input: T) => string,
 * }} options
 */
export function validate(input, options) {
	const noop = () => '';
	let { invalid = noop, error = noop } = options;

	/** @type {{ (): void; }[]} */
	const cleanupQueue = [
		listen(input, 'blur', _validate, { capture: true }),
		listen(input, 'invalid', handleInvalid, { capture: true }),
		input.form
			? listen(input.form, 'submit', handleSubmit, { capture: true })
			: noop,
	];

	listen(input, 'blur', () => {
		cleanupQueue.push(listen(input, 'input', _validate, { capture: true }));
	}, { once: true });

	function _validate() {
		setValidationMessage(input, invalid, error);
		const validate = new CustomEvent('validate', {
			bubbles: true,
			detail: {
				validationMessage: input.validationMessage,
			},
		});
		input.dispatchEvent(validate);
	}

	/**
	 * @param {HTMLFormElement} form
	 */
	function focusInvalidInput(form) {
		const firstInvalidInput
			= /** @type {HTMLInputElement} */ (form.querySelector(':invalid'));
		firstInvalidInput.focus();
	}

	/**
	 * @param {Event} event
	 */
	function handleInvalid(event) {
		_validate();
		// Do not show native validation prompt
		event.preventDefault();
		if (input.form) {
			focusInvalidInput(input.form);
		} else {
			input.focus();
		}
	}

	/**
	 * @param {Event} event
	 */
	function handleSubmit(event) {
		_validate();
		// Input has error, prevent form submission
		if (input.validationMessage) {
			event.preventDefault();
			focusInvalidInput(/** @type {HTMLFormElement} */(input.form));
		}
	}

	return {
		/**
		 * @param {{
 		 *     invalid?: (input: T) => string,
		 *     error?: (error: string, input: T) => string,
		 * }} options
		 */
		update(options) {
			({ invalid = noop, error = noop } = options);
		},
		destroy() {
			cleanupQueue.forEach((fn) => fn());
		},
	};
}
