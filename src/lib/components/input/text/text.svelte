<script context="module">
    export const docs = true;
</script>

<script>
    import '../../../css/styles.js';
    import { createEventForwarder } from '../../../utils/forward-events.js';
    import { slide } from 'svelte/transition';
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
     * Whether select should have input focus when the page loads.
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
        <input class="text-input" bind:value use:forward use:validate={{ invalid, error, errorMessage }}
            on:keydown type="text"
            {autocomplete} {autofocus} {form} {list} {maxlength} {minlength}
            {name} {placeholder} {readonly} {required}>
    </div>
    {#if $errorMessage}
        <div class="invalid" transition:slide>
            {$errorMessage}
        </div>
    {/if}
</label>

<style>
    @import "../css/input.css";
    @import "../css/container.css";

    label {
        display: inline-block;
    }
    .label-text:not(:empty) {
        margin-block: var(--br-input-text-label-margin-block);
        position: var(--br-input-text-label-position);
        height: var(--br-input-text-label-height);
        width: var(--br-input-text-label-width);
        overflow: var(--br-input-text-label-overflow);
    }
    input {
        padding-block: var(--br-input-text-padding-block);
        padding-inline: var(--br-input-text-padding-inline);
    }
</style>
