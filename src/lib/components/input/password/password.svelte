<!--
    @component

    Password lets the user to securely enter a password. It presents as a
    one-line plain text editor control where the text is obscured so that
    it cannot be read. It replaces each character with a symbol such as the
    asterisk ("*") or a dot ("•").
-->
<script>
    import { createEventForwarder } from '../../../utils/forward-events.js';
    import { setContext } from 'svelte';
    import { validate } from '../validate';
    import { writable } from 'svelte/store';

    /**
     * Guidance to the browser on information expected in the field.
     * Helps UserAgent automate filling form field values.
     *
     * @type {"off" | "on" | string}
     */
    export let autocomplete = '';

    /**
     * When true, the password input will have input focus when the page loads.
     *
     * @type {boolean}
     */
    export let autofocus = false;

    /**
     * A function that takes a validity state string and returns an error message.
     *
     * @type {((error: string, input: HTMLInputElement) => string) | undefined}
     */
    export let error = undefined;

    /**
     * The id of the form to associate with the text input
     *
     * @type {string | undefined}
     */
    export let form = undefined;

    /**
     * A function that returns the validity of the input.
     *
     * @type {((input: HTMLInputElement) => string) | undefined}
     */
    export let invalid = undefined;

    /**
     * The id of a <datalist> element located in the same document.
     *
     * @type {string}
     */
    export let list = '';

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
    export let name = '';

    /**
     * Text that appears in the form control when it has no value set
     *
     * @type {string}
     */
    export let placeholder = '';

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
    export let value = '';

    const forward = createEventForwarder();
    const validationMessageStore = writable('');

    setContext('validation-message', validationMessageStore);
</script>

<!--
	Svelte a11y check doesn't check nested labels-input pairs 🙄
 	See https://github.com/sveltejs/svelte/issues/5300
-->
<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
    <div class="label-text">
        <slot name="label"/>
    </div>
    <div class="container">
        <!-- svelte-ignore a11y-autofocus -->
        <input bind:value use:forward type='password'
            {autocomplete} {autofocus} {form} {list} {maxlength} {minlength}
            {name} {placeholder} {readonly} {required}
            use:validate={{ invalid, error, validationMessageStore }}/>
    </div>
    <slot name="hint"></slot>
</label>

<style>
    label {
        display: inline-block;
        width: var(--br-input-password-root-width);
    }
    .label-text:not(:empty) {
        margin-block: var(--br-input-password-root-label-margin-block);
        position: var(--br-input-password-root-label-position);
        height: var(--br-input-password-root-label-height);
        width: var(--br-input-password-root-label-width);
        overflow: var(--br-input-password-root-label-overflow);
    }
    input {
        border: none;
        outline: 0;
        padding-block: var(--br-input-password-root-padding-block);
        padding-inline: var(--br-input-password-root-padding-inline);
        color: var(--br-input-password-root-font-color);
        background-color: transparent;
        flex-grow: 1;
    }
    .container {
        display: flex;
        border: var(--br-input-password-root-border);
        border-radius: var(--br-input-password-root-border-radius);
        background-color: var(--br-input-password-root-background-color);
        height: var(--br-input-password-root-height);
        width: 100%;
        transition: var(--br-input-password-root-transition);
    }
    .container:hover:not(:focus-within) {
        box-shadow: var(--br-input-password-root-hover-box-shadow);
        border: var(--br-input-password-root-hover-border);
    }
    .container:focus-within {
        box-shadow: var(--br-input-password-root-focus-box-shadow);
        border: var(--br-input-password-root-focus-border);
    }
</style>
