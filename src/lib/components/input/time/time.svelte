<script context="module">
    // TODO: Remove docs variable from component
    export const docs = true;
</script>

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
     * When true, the time input will have input focus when the page loads.
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
     * The ID of the form element that the time input is associated with.
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
     * A string representing the latest time to accept.
     *
     * @type {string}
     */
    export let max = '';

    /**
     * A string representing the earliest time to accept
     *
     * @type {string}
     */
    export let min = '';

    /**
     * The name of the time input. Submitted with its parent form as part of a name/value pair.
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
     * The granularity in seconds that the time input value must adhere to
     *
     * @type {number}
     */
    export let step = 60;

    /**
     * The initial value of the input.
     *
     * An ISO 8601 dateString or Date.
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
            class="text-input" bind:value use:forward use:validate={{ invalid, error, errorMessage }}
            type="time">
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
        width: var(--br-input-time-width);
    }
    .label-text:not(:empty) {
        margin-block: var(--br-input-time-label-margin-block);
        position: var(--br-input-time-label-position);
        height: var(--br-input-time-label-height);
        width: var(--br-input-time-label-width);
        overflow: var(--br-input-time-label-overflow);
    }
    input::-webkit-calendar-picker-indicator {
        background-image: var(--br-input-time-background-image);
    }
    input {
        border: none;
        outline: 0;
        padding-block: var(--br-input-time-padding-block);
        padding-inline: var(--br-input-time-padding-inline);
        color: var(--br-input-time-text-color);
        background-color: transparent;
        flex-grow: 1;
    }
    .container {
        display: flex;
        border: var(--br-input-time-border);
        border-radius: var(--br-input-time-border-radius);
        background-color: var(--br-input-time-background-color);
        height: var(--br-input-time-height);
        width: 100%;
        transition: var(--br-input-time-transition);
    }
    .container:hover:not(:focus-within) {
        box-shadow: var(--br-input-time-hover-box-shadow);
        border: var(--br-input-time-hover-border);
    }
    .container:focus-within {
        box-shadow: var(--br-input-time-focus-box-shadow);
        border: var(--br-input-time-focus-border);
    }
    .hint:not(:empty) {
        margin-block: var(--br-input-time-hint-margin-block);
        margin-inline: var(--br-input-time-hint-margin-inline);
        color: var(--br-input-time-hint-text-color);
        font-size: var(--br-input-time-hint-font-size);
    }
    /* Use pseudoselector to match '.hint' specificity */
    .invalid:not(:empty) {
        color: var(--br-input-time-hint-invalid-text-color);
    }
</style>
