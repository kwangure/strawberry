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
     * @type {((error: string, input: HTMLInputElement) => string | Promise<string>) | undefined}
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
     * @type {((input: HTMLInputElement) => string | Promise<string>) | undefined}
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
    *     invalid?: (input: HTMLInputElement) => string  | Promise<string>,
    *     error?: (error: string, input: HTMLInputElement) => string | Promise<string>,
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
