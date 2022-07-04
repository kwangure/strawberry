<script>
    import Container from "../Container.svelte";
    import { createEventForwarder } from "../../../utils/forward-events.js";
    import { focusElement } from "../actions";
    import { listen } from "svelte/internal";
    import { slide } from "svelte/transition";

    /**
     * Guidance to the browser on information expected in the field.
     * Helps UserAgent automate filling form field values.
     *
     * @type {"off" | "on" | string}
     */
    export let autocomplete = "";

    /**
     * Whether select should have input focus when the page loads.
     *
     * @type {boolean}
     */
    export let autofocus = false;

    /**
     * A function that returns the validity of the input.
     * @type {((error: string, input: InputInfo) => string | Promise<string>) | undefined}
     */
    export let error = undefined;

    /**
     * The id of the form to associate with the text input
     *
     * @type {string | undefined}
     */
    export let form = undefined;

    /**
     * Whether to hide the input label.
     *
     * @type {boolean}
     */
    export let hideLabel = false;

    /**
     * A function that returns the validity of the input.
     * @type {((input: InputInfo) => string | Promise<string>) | undefined}
     */
    export let invalid = undefined;

    /**
     * The id of a <datalist> element located in the same document.
     *
     * @type {string}
     */
    export let list = "";

    /**
     * The maximum number of characters allowed in the element.
     *
     * @type {number}
     */
    export let maxlength = -1;

    /**
     * The minimum number of characters allowed in the element.
     *
     * @type {number}
     */
    export let minlength = -1;

    /**
     * The name of the name input. Submitted with its parent form as part of a name/value pair.
     *
     * @type {string}
     */
    export let name = "";

    /**
     * Text that appears in the form control when it has no value set
     *
     * @type {string}
     */
    export let placeholder = "";

    /**
     * When true, the user cannot edit the value of the input
     *
     * @type {boolean}
     */
    export let readonly = false;

    /**
     * When true, indicates that the user must input a value before the parent form can be submitted.
     *
     * @type {boolean}
     */
    export let required = false;

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
        <!-- svelte-ignore a11y-autofocus -->
        <input class="text-input" bind:value use:forward use:validate={{ invalid, error }}
            on:keydown type="text" id={labelId} use:focusElement={focus}
            {autocomplete} {autofocus} {form} {list} {maxlength} {minlength}
            {name} {placeholder} {readonly} {required}>
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
