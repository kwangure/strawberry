import { listen } from "svelte/internal";

/**
 * @param {HTMLInputElement} input
 * @param {(input: HTMLInputElement) => string} invalid
 * @param {(error: string, input: HTMLInputElement) => string} error
 */
function getErrorMessage(input, invalid, error) {
    if (input.disabled) return "";
    input.dataset.invalid = "false";
    if (input.validity.valid) {
        const customValidityCheck = invalid(input);
        let customValidityError = "";
        if (customValidityCheck) {
            customValidityError = error(customValidityCheck, input)
                || "The value you entered for this field is invalid.";
        }
        input.setCustomValidity(customValidityError)
    }
    return input.validationMessage;
}

/**
 * @typedef {{
 *     invalid?: (input: HTMLInputElement) => string,
 *     error?: (error: string, input: HTMLInputElement) => string,
 *     errorMessage: import("svelte/store").Writable<string>,
 * }} ValidateOptions
 * @param {HTMLInputElement} input
 * @param {ValidateOptions} options
 */
export function validate(input, options) {
    const noop = () => "";
    let { invalid = noop, error = noop, errorMessage } = options;

    function setErrorMessage() {
        const message = getErrorMessage(input, invalid, error);
        errorMessage.set(message);
        return Boolean(message);
    }

    /** @type {{ (): void; }[]} */
    const unsubscribers = [];
    listen(input, "blur", () => {
        unsubscribers.push(listen(input, "input", setErrorMessage));
    }, { once: true})

    unsubscribers.push(listen(input, "blur", setErrorMessage));
    unsubscribers.push(listen(input, "invalid", (event) => {
        // Do not show native validation prompt
        event.preventDefault();
        setErrorMessage();
        if (input.form) {
            const firstInvalidInput = /** @type {HTMLInputElement} */(input.
                form.querySelector(":invalid"));
            firstInvalidInput.focus();
        } else {
            input.focus();
        }
    }));

    if (input.form) {
        unsubscribers.push(listen(input.form, "submit", async (event) => {
            const hasError = setErrorMessage();
            if (hasError) {
                event.preventDefault();
            }
        }));
    }

    return {
        /**
         * @param {ValidateOptions} options
         */
        update(options) {
            ({ invalid = noop, error = noop } = options);
        },
        destroy() {
            unsubscribers.forEach((fn) => fn());
        },
    };
}