<!-- TODO: Add a component description here. See button for example -->
<script>
    import '../../../css/styles.js';
    import { createEventForwarder } from '$lib/utils/forward-events.js';
    import { validate } from '../validate';
    import { writable } from 'svelte/store';

    /**
     * Guidance to the browser on information expected in the field.
     * Helps UserAgent automate filling form field values.
     *
     * @type {"off" | "on" | undefined}
     */
    export let autocomplete = undefined;

    /**
     * When true, the datetime input will have input focus when the page loads.
     *
     * @type {boolean | undefined}
     */
    export let autofocus = undefined;

    /**
     * A function that takes a validity state string and returns an error message.
     *
     * @type {((error: string, input: HTMLInputElement) => string) | undefined}
     */
    export let error = undefined;

    /**
     * When true, prevents the user from interacting with the input.
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
     * @type {string | undefined}
     */
    export let list = undefined;

    /**
     * A date string representing the latest date to accept.
     *
     * @type {string | undefined}
     */
    export let max = undefined;

    /**
     * A date string representing the earliest date to accept
     *
     * @type {string | undefined}
     */
    export let min = undefined;

    /**
     * The name of the datetime input. Submitted with its parent form as part of a name/value pair.
     *
     * @type {string | undefined}
     */
    export let name = undefined;

    /**
     * Indicates that the user should not be able to edit the value of the input
     *
     * @type {boolean | undefined}
     */
    export let readonly = undefined;

    /**
     * The granularity that the input value should adhere to
     *
     * @type {number | undefined}
     */
    export let step = undefined;

    /**
     * A string representing a date and time (in the local time zone)
     *
     * @type {string | undefined}
     */
    export let value = undefined;

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
        <input {autocomplete} {autofocus} {disabled} {form}
            {list} {max} {min} {name} {readonly} {step}
            bind:value use:forward use:validate={{ invalid, error, errorMessage }}
            type="datetime-local">
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
        width: var(--br-input-datetime-width);
    }
    .label-text:not(:empty) {
        margin-block: var(--br-input-datetime-label-margin-block);
        position: var(--br-input-datetime-label-position);
        height: var(--br-input-datetime-label-height);
        width: var(--br-input-datetime-label-width);
        overflow: var(--br-input-datetime-label-overflow);
    }
    input::-webkit-calendar-picker-indicator {
        background-image: var(--br-input-datetime-background-image);
    }
    input {
        border: none;
        outline: 0;
        padding-block: var(--br-input-datetime-padding-block);
        padding-inline: var(--br-input-datetime-padding-inline);
        color: var(--br-input-datetime-text-color);
        background-color: transparent;
        flex-grow: 1;
    }
    .container {
        display: flex;
        border: var(--br-input-datetime-border);
        border-radius: var(--br-input-datetime-border-radius);
        background-color: var(--br-input-datetime-background-color);
        height: var(--br-input-datetime-height);
        width: 100%;
        transition: var(--br-input-datetime-transition);
    }
    .container:hover:not(:focus-within) {
        box-shadow: var(--br-input-datetime-hover-box-shadow);
        border: var(--br-input-datetime-hover-border);
    }
    .container:focus-within {
        box-shadow: var(--br-input-datetime-focus-box-shadow);
        border: var(--br-input-datetime-focus-border);
    }
    .hint:not(:empty) {
        margin-block: var(--br-input-datetime-hint-margin-block);
        margin-inline: var(--br-input-datetime-hint-margin-inline);
        color: var(--br-input-datetime-hint-text-color);
        font-size: var(--br-input-datetime-hint-font-size);
    }
    /* Use pseudoselector to match '.hint' specificity */
    .invalid:not(:empty) {
        color: var(--br-input-datetime-hint-invalid-text-color);
    }
</style>
