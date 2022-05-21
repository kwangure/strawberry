<script>
    import Container from "../Container.svelte";
    import { createEventForwarder } from "../../../utils/forward-events.js";
    import { focusElement } from "../actions";
    import { listen } from "svelte/internal";
    import { slide } from "svelte/transition";

    /**
     * Whether to hide the input label.
     *
     * @type {boolean}
     */
    export let hideLabel = false;
    /**
     * The initial value of the component.
     * @type {string | undefined}
     */
    export let value = "";
    /**
     * Whether the input is focused.
     *
     * @type {boolean}
     */
    export let focus = false;
    /**
     * A function that returns the validity of the input.
     * @type {((input: InputInfo) => string | Promise<string>) | undefined}
     */
    export let invalid = undefined;
    /**
     * A function that returns the validity of the input.
     * @type {((error: string, input: InputInfo) => string | Promise<string>) | undefined}
     */
    export let error = undefined;

    const forward = createEventForwarder();

    /**
     * @typedef {{
     *     max: string;
     *     min: string;
     *     maxLength: number;
     *     minLength: number;
     *     type: string;
     *     value: string;
     * }} InputInfo
     * @typedef {{
    *     invalid?: (input: InputInfo) => string  | Promise<string>,
    *     error?: (error: string, input: InputInfo) => string | Promise<string>,
    * }} ValidateOptions
    * @param {HTMLInputElement} input
    * @param {ValidateOptions} options
    */
    function validate(input, options) {
        const noop = () => "";
        let { invalid = noop, error = noop } = options;
        /**
         * @param {HTMLInputElement} input
         */
        async function _validate(input) {
            if (input.disabled) return "";
            input.dataset.invalid = "false";
            for (const validityCheck in input.validity) {
                // 'valid' is the only non-error boolean on HTMLInputElement ValidityState
                if (validityCheck === "valid") continue;

                // @ts-ignore
                if (input.validity[validityCheck]) {
                    return _error(validityCheck)
                }
            }

            const customValidityCheck = await invalid(_input(input));
            return (customValidityCheck) ? _error(customValidityCheck) : "";
        }

        /**
        * @param {string} invalidType
        */
        async function _error(invalidType) {
            const errorString = await error(invalidType, _input(input));
            if (errorString) return errorString;

            switch (invalidType) {
                case "valueMissing":
                    return "Please fill out this field.";
                case "typeMismatch":
                    if (input.type === "email") {
                        return "Please enter an email address.";
                    }
                    if (input.type === "url") {
                        return "Please enter a URL.";
                    }
                case "tooShort":
                    return `Input length should be ${input.minLength} characters or more. You are currently using ${input.value.length} characters.`;
                case "tooLong":
                    return `Input length should be less than ${input.maxLength} characters. You are currently using ${input.value.length} characters.`;
                case "badInput":
                    return "Please enter a number.";
                case "stepMismatch":
                    return "Please select a valid value.";
                case "rangeOverflow":
                    return `Input value should not be more than ${input.max}.`;
                case "rangeUnderflow":
                    return `Input value should not be less than ${input.min}.`;
                case "patternMismatch":
                    return "Please match the requested format.";

            }

            // If all else fails, return a generic catchall error
            return "The value you entered for this field is invalid.";
        }

        /**
        * @param {HTMLInputElement} input
        */
        function _input(input) {
            return {
                max: input.max,
                min: input.min,
                maxLength: input.maxLength,
                minLength: input.minLength,
                type: input.type,
                value: input.value,
            };
        }

        // Show error onblur. Hide error onblur and oninput.
        /**
        * @type {() => void}
        */
        let unlisten2;
        const unlisten = listen(input, "blur", async () => {
            isInvalid = await _validate(input);
            input.dataset.invalid = String(!!isInvalid);
            if (isInvalid) {
                unlisten2 = listen(input, "input", async () => {
                    isInvalid = await _validate(input);
                    if (!isInvalid) unlisten2();
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

    /**
    * @type {string}
    */
    let isInvalid = "";
</script>

<Container {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <div class="container">
        <input class="text-input" bind:value use:forward use:validate={{ invalid, error }}
            on:keydown type="text" id={labelId} use:focusElement={focus} {...$$restProps}>
        {#if $$slots.postfix}
            <div class="postfix-wrapper">
                <slot name="postfix"/>
            </div>
        {/if}
    </div>
    {#if isInvalid}
        <div class="invalid" transition:slide>
            {isInvalid}
        </div>
    {/if}
</Container>

<style>
    @import "../css/input.css";
    @import "../css/container.css";
    @import "../css/postfix.css";
</style>

<script context="module">
    export const docs = true;
</script>
