<!--
    @component

    Time lets the user enter time (hours and minutes, and optionally seconds).
-->
<script>
    import { createEventForwarder } from '../../../utils/forward-events.js';
    import { validate } from '../validate';

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
     * The id of the aria-describedby element.
     *
     * @type {string | undefined}
     */
    export let hint = undefined;

    /**
     * The id of the number input
     *
     * @type {string | undefined}
     */
    export let id = undefined;

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
</script>

<!-- svelte-ignore a11y-autofocus -->
<input {autocomplete} {autofocus} {disabled} {form} {id} {list} {max} {min}
    {name} {readonly} {required} {step} aria-describedby={hint}
    bind:value use:forward use:validate={{ invalid, error }}
    type="time">

<style>
    @import "../css/picker_indicator.css";

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
</style>
