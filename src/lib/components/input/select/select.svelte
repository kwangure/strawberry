<script>
    import '../../../css/styles.js';
    import { createEventForwarder } from '../../../utils/forward-events.js';
    import Option from './option.svelte';

    /**
     * Guidance to the browser on information expected in the field.
     * Helps UserAgent automate filling form field values.
     *
     * @type {"off" | "on" | undefined}
     */
    export let autocomplete = undefined;

    /**
     * Whether select should have input focus when the page loads.
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
        <select {autocomplete} {autofocus} {disabled} {form}
            {name} {required}
            bind:value {placeholder} use:forward>
            {#if placeholder}
                <Option value="" disabled selected>{placeholder}</Option>
            {/if}
            <slot></slot>
        </select>
    </div>
</label>

<style>
    label {
        display: inline-block;
    }
    .label-text:not(:empty) {
        margin-block: var(--br-select-label-margin-block);
        position: var(--br-select-label-position);
        height: var(--br-select-label-height);
        width: var(--br-select-label-width);
        overflow: var(--br-select-label-overflow);
    }
    select {
        width: var(--br-select-width);
        font-size: 14px;
        line-height: 1.5;
        background-color: var(--br-select-background-color);
        background-image: none;
        border: none;
        outline: 0;
        padding-block: var(--br-select-padding-block);
        padding-inline: var(--br-select-padding-inline);
        color: var(--br-select-text-color);
        background-color: transparent;
    }
    .container {
        display: flex;
        border: var(--br-select-border);
        border-radius: var(--br-select-border-radius);
        background-color: var(--br-select-background-color);
        height: var(--br-select-height);
        width: var(--br-select-width);
        transition: var(--br-select-transition);
    }
    .container:hover:not(:focus-within) {
        box-shadow: var(--br-select-hover-box-shadow);
        border: var(--br-select-hover-border);
    }
    .container:focus-within {
        box-shadow: var(--br-select-focus-box-shadow);
        border: var(--br-select-focus-border);
    }
</style>

<script context="module">
    export const docs = true;
</script>