<!--
    @component

    Date lets the user enter a date, with a date picker interface. The
    resulting value includes the year, month, day, but not the time.
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
     * The id of the aria-describedby element.
     *
     * @type {string | undefined}
     */
    export let hint = undefined;

    /**
     * The id of the date input
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
</script>

<div class="container">
    <!-- svelte-ignore a11y-autofocus -->
    <input {autocomplete} {autofocus} {disabled} {form} {id} {list} {max} {min}
        {name} {readonly} {required} {step} aria-describedby={hint}
        bind:value use:forward use:validate={{ invalid, error }}
        type="date">
</div>

<style>
    @import "../css/picker_indicator.css";

    input::-webkit-calendar-picker-indicator {
        background-image: var(--br-input-date-root-background-image);
    }
    input {
        border: none;
        outline: 0;
        padding-block: var(--br-input-date-root-padding-block);
        padding-inline: var(--br-input-date-root-padding-inline);
        color: var(--br-input-date-root-font-color);
        background-color: transparent;
        flex-grow: 1;
    }
    .container {
        display: flex;
        border: var(--br-input-date-root-border);
        border-radius: var(--br-input-date-root-border-radius);
        background-color: var(--br-input-date-root-background-color);
        height: var(--br-input-date-root-height);
        transition: var(--br-input-date-root-transition);
    }
    .container:hover:not(:focus-within) {
        box-shadow: var(--br-input-date-root-hover-box-shadow);
        border: var(--br-input-date-root-hover-border);
    }
    .container:focus-within {
        box-shadow: var(--br-input-date-root-focus-box-shadow);
        border: var(--br-input-date-root-focus-border);
    }
</style>
