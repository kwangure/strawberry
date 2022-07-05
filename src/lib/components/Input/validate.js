import { listen } from "svelte/internal";

/**
 * @param {HTMLInputElement} input
 * @param {(input: HTMLInputElement) => string  | Promise<string>} invalid
 * @param {(error: string, input: HTMLInputElement) => string | Promise<string>} error
 */
 async function getErrorMessage(input, invalid, error) {
    if (input.disabled) return "";
    input.dataset.invalid = "false";
    if (input.validity.valid) {
        const customValidityCheck = await invalid(input);
        let customValidityError = "";
        if (customValidityCheck) {
            customValidityError = (await error(customValidityCheck, input))
                || "The value you entered for this field is invalid.";
        }
        input.setCustomValidity(customValidityError)
    }
    return input.validationMessage;
}

/**
 * @typedef {{
 *     invalid?: (input: HTMLInputElement) => string  | Promise<string>,
 *     error?: (error: string, input: HTMLInputElement) => string | Promise<string>,
 *     errorMessage: import("svelte/store").Writable<string>,
 * }} ValidateOptions
 * @param {HTMLInputElement} input
 * @param {ValidateOptions} options
 */
export function validate(input, options) {
    const noop = () => "";
    let { invalid = noop, error = noop, errorMessage } = options;

    async function setErrorMessage() {
        const message = await getErrorMessage(input, invalid, error);
        errorMessage.set(message);
    }

    /** @type {{ (): void; }[]} */
    const unsubscribers = [];
    listen(input, "blur", () => {
        unsubscribers.push(listen(input, "input", setErrorMessage));
    }, { once: true})

    unsubscribers.push(listen(input, "blur", setErrorMessage));
    unsubscribers.push(listen(input, "invalid", setErrorMessage));

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