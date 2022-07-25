<!--
    @component

    Time lets the user enter time (hours and minutes, and optionally seconds).
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
        <input {autocomplete} {autofocus} {disabled} {form} {list} {max} {min}
            {name} {readonly} {required} {step}
            class="text-input" bind:value use:forward use:validate={{ invalid, error, validationMessageStore }}
            type="time">
    </div>
    <slot name="hint"></slot>
</label>

<style>
    @import "../css/picker_indicator.css";

    label {
        display: inline-block;
        width: var(--br-input-time-root-width);
    }
    .label-text:not(:empty) {
        margin-block: var(--br-input-time-root-label-margin-block);
        position: var(--br-input-time-root-label-position);
        height: var(--br-input-time-root-label-height);
        width: var(--br-input-time-root-label-width);
        overflow: var(--br-input-time-root-label-overflow);
    }
    input::-webkit-calendar-picker-indicator {
        background-image: var(--br-input-time-root-background-image);
    }
    input {
        border: none;
        outline: 0;
        padding-block: var(--br-input-time-root-padding-block);
        padding-inline: var(--br-input-time-root-padding-inline);
        color: var(--br-input-time-root-font-color);
        background-color: transparent;
        flex-grow: 1;
    }
    .container {
        display: flex;
        border: var(--br-input-time-root-border);
        border-radius: var(--br-input-time-root-border-radius);
        background-color: var(--br-input-time-root-background-color);
        height: var(--br-input-time-root-height);
        width: 100%;
        transition: var(--br-input-time-root-transition);
    }
    .container:hover:not(:focus-within) {
        box-shadow: var(--br-input-time-root-hover-box-shadow);
        border: var(--br-input-time-root-hover-border);
    }
    .container:focus-within {
        box-shadow: var(--br-input-time-root-focus-box-shadow);
        border: var(--br-input-time-root-focus-border);
    }
</style>
