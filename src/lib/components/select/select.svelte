<!--
    @component

    Select allows users to make a single selection or multiple selections from
    a list of options.
-->
<script>
    import { createEventForwarder } from '../../utils/forward-events.js';
    import Option from './option.svelte';

    /**
     * Guidance to the browser on information expected in the field.
     * Helps UserAgent automate filling form field values.
     *
     * @type {"off" | "on" | undefined}
     */
    export let autocomplete = undefined;

    /**
     * When true, the select will have input focus when the page loads.
     *
     * @type {boolean | undefined}
     */
    export let autofocus = undefined;

    /**
     * Indicates that the user cannot interact with the Select.
     *
     * @type {boolean | undefined}
     */
    export let disabled = undefined;

    /**
     * The id of the form to associate with a Select
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
     * The id of the select element.
     *
     * @type {string | undefined}
     */
    export let id = undefined;

    /**
     * The name of the select. Submitted with form as part of a name/value pair.
     *
     * @type {string | undefined}
     */
    export let name = undefined;

    /**
     *  Briefly hints the kind of information is expected in the field
     * @type {string | undefined}
     */
    export let placeholder = undefined;

    /**
     * Indicate that an Option with a non-empty string value must be selected
     *
     * @type {boolean | undefined}
     */
    export let required = undefined;

    /**
     * The value of the Select.
     *
     * @type {string | undefined}
     */
    export let value = undefined;

    const forward = createEventForwarder();
</script>

<div class="container">
    <!-- svelte-ignore a11y-autofocus -->
    <select {autocomplete} {autofocus} {disabled} {form} {id}
        {name} {required} bind:value {placeholder}
        aria-describedby={hint} use:forward>
        {#if placeholder}
            <Option value="" disabled selected>{placeholder}</Option>
        {/if}
        <slot></slot>
    </select>
</div>

<style>
    select {
        width: var(--br-select-root-width);
        font-size: 14px;
        line-height: 1.5;
        background-color: var(--br-select-root-background-color);
        background-image: none;
        border: none;
        outline: 0;
        padding-block: var(--br-select-root-padding-block);
        padding-inline: var(--br-select-root-padding-inline);
        color: var(--br-select-root-font-color);
        background-color: transparent;
        flex-grow: 1;
    }
    .container {
        display: flex;
        border: var(--br-select-root-border);
        border-radius: var(--br-select-root-border-radius);
        background-color: var(--br-select-root-background-color);
        height: var(--br-select-root-height);
        transition: var(--br-select-root-transition);
    }
    .container:hover:not(:focus-within) {
        box-shadow: var(--br-select-root-hover-box-shadow);
        border: var(--br-select-root-hover-border);
    }
    .container:focus-within {
        box-shadow: var(--br-select-root-focus-box-shadow);
        border: var(--br-select-root-focus-border);
    }
</style>
