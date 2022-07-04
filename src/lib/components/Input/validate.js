import { listen } from "svelte/internal";

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
    /**
     * @param {HTMLInputElement} input
     */
    async function _validate(input) {
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

    // Show error onblur. Hide error onblur and oninput.
    /**
    * @type {() => void}
    */
    let unlisten2;
    const unlisten = listen(input, "blur", async () => {
        errorMessage.set(await _validate(input));
        input.dataset.invalid = String(!!errorMessage);
        if (errorMessage) {
            unlisten2 = listen(input, "input", async () => {
                errorMessage.set(await _validate(input));
                if (!errorMessage) unlisten2();
            });
        }
    });

    return {
        /**
         * @param {ValidateOptions} options
         */
        update(options) {
            ({ invalid = noop, error = noop } = options);
        },
        destroy() {
            unlisten();
            unlisten2?.();
        },
    };
}