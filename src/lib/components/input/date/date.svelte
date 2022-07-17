<!-- TODO: Add a component description here. See button for example -->
<script>
    import '../../../css/styles.js';
    import { createEventForwarder } from '../../../utils/forward-events.js';
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
     * When true, the datetime input will have input focus when the page loads.
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
     * When true, the input cannot be edited or focused.
     *
     * @type {boolean}
     */
    export let disabled = false;

    /**
     * The ID of the form element that the datetime input is associated with.
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
     * A date string representing the latest date to accept.
     *
     * @type {string}
     */
    export let max = '';

    /**
     * A date string representing the earliest date to accept
     *
     * @type {string}
     */
    export let min = '';

    /**
     * The name of the date input. Submitted with its parent form as part of a name/value pair.
     *
     * @type {string}
     */
    export let name = '';

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
     * The granularity in days that the date input value must adhere to
     *
     * @type {number}
     */
    export let step = 1;

    /**
     * A string representing a date in YYYY-MM-DD format
     *
     * @type {string}
     */
    export let value = '';

    const forward = createEventForwarder();
    const errorMessage = writable('');
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
        <input {autocomplete} {autofocus} {disabled} {form} {list} {max} {min}
            {name} {readonly} {required} {step}
            bind:value use:forward use:validate={{ invalid, error, errorMessage }}
            type="date">
    </div>
    <div class="hint" class:invalid={$errorMessage}>
        {#if $errorMessage}
            {$errorMessage}
        {:else}
            <slot name="hint"/>
        {/if}
    </div>
</label>

<style>
    @import "../css/picker_indicator.css";

    label {
        display: inline-block;
        width: var(--br-input-date-width);
    }
    .label-text:not(:empty) {
        margin-block: var(--br-input-date-label-margin-block);
        position: var(--br-input-date-label-position);
        height: var(--br-input-date-label-height);
        width: var(--br-input-date-label-width);
        overflow: var(--br-input-date-label-overflow);
    }
    input::-webkit-calendar-picker-indicator {
        background-image: var(--br-input-date-background-image);
    }
    input {
        border: none;
        outline: 0;
        padding-block: var(--br-input-date-padding-block);
        padding-inline: var(--br-input-date-padding-inline);
        color: var(--br-input-date-text-color);
        background-color: transparent;
        flex-grow: 1;
    }
    .container {
        display: flex;
        border: var(--br-input-date-border);
        border-radius: var(--br-input-date-border-radius);
        background-color: var(--br-input-date-background-color);
        height: var(--br-input-date-height);
        width: 100%;
        transition: var(--br-input-date-transition);
    }
    .container:hover:not(:focus-within) {
        box-shadow: var(--br-input-date-hover-box-shadow);
        border: var(--br-input-date-hover-border);
    }
    .container:focus-within {
        box-shadow: var(--br-input-date-focus-box-shadow);
        border: var(--br-input-date-focus-border);
    }
    .hint:not(:empty) {
        margin-block: var(--br-input-date-hint-margin-block);
        margin-inline: var(--br-input-date-hint-margin-inline);
        color: var(--br-input-date-hint-text-color);
        font-size: var(--br-input-date-hint-font-size);
    }
    /* Use pseudoselector to match '.hint' specificity */
    .invalid:not(:empty) {
        color: var(--br-input-date-hint-invalid-text-color);
    }
</style>
