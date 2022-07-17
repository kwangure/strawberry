<!-- TODO: Add a component description here. See button for example -->
<script>
    import '../../../css/styles.js';
    import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
    import { createEventForwarder } from '../../../utils/forward-events.js';
    import Icon from '../../icon';
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
     * When true, the number input will have input focus when the page loads.
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
     * The ID of the form element that the number input is associated with.
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
     * The maximum value to accept.
     * @type {number | undefined}
     */
    export let max = undefined;

    /**
     * The minimum value to accept.
     * @type {number | undefined}
     */
    export let min = undefined;

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
     * A stepping interval to use when using up and down arrows to adjust the value, as well as for validation.
     * @type {number}
     */
    export let step = 1;

    /**
     * The initial value of the component.
     * @type {number | undefined}
     */
    export let value = undefined;

    const errorMessage = writable('');

    const forward = createEventForwarder();

    let input = /** @type {HTMLInputElement}*/ ({
    	stepUp() {},
    	stepDown() {},
    });

    function dispatchChange() {
    	input.dispatchEvent(new Event('change'));
    }

    function stepUp() {
    	input.stepUp();
    	dispatchChange();
    }

    function stepDown() {
    	input.stepDown();
    	dispatchChange();
    }
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
        <input bind:this={input} bind:value
            type="number" use:forward use:validate={{ invalid, error, errorMessage }}
            {autocomplete} {autofocus} {form} {list} {max} {min} {name}
            {placeholder} {required} {readonly} {step}>
        <div class="postfix-wrapper">
            <span class="postfix-up"on:click={stepUp}>
                <Icon path={mdiChevronUp}/>
            </span>
            <span class="postfix-down" on:click={stepDown}>
                <Icon path={mdiChevronDown}/>
            </span>
        </div>
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
    label {
        display: inline-block;
        width: var(--br-input-number-width);
    }
    .label-text:not(:empty) {
        margin-block: var(--br-input-number-label-margin-block);
        position: var(--br-input-number-label-position);
        height: var(--br-input-number-label-height);
        width: var(--br-input-number-label-width);
        overflow: var(--br-input-number-label-overflow);
    }
    input {
        border: none;
        outline: 0;
        padding-block: var(--br-input-number-padding-block);
        padding-inline: var(--br-input-number-padding-inline);
        color: var(--br-input-number-text-color);
        background-color: transparent;
        flex-grow: 1;
    }
    [type=number]::-webkit-outer-spin-button,
    [type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    [type=number] {
        -webkit-appearance: textfield;
        -moz-appearance: textfield;
        appearance: textfield;
    }
    .postfix-up,
    .postfix-down {
        flex: 1;
        min-height: 0;
        display: flex;
        align-items: center;
    }
    .postfix-up {
        --br-icon-height: 21px;
    }
    .container:hover .postfix-wrapper,
    .container:focus-within .postfix-wrapper {
        color: var(--br-input-number-postfix-focus-color);
        background-color: var(--br-input-number-postfix-focus-background-color);
    }
    .postfix-wrapper {
        width: var(--br-input-number-postfix-width);
        color: var(--br-input-number-postfix-color);
        background-color: var(--br-input-number-postfix-background-color);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 0 2px 2px 0;
        flex: none;
    }
    .container {
        display: flex;
        border: var(--br-input-number-border);
        border-radius: var(--br-input-number-border-radius);
        background-color: var(--br-input-number-background-color);
        height: var(--br-input-number-height);
        width: 100%;
        transition: var(--br-input-number-transition);
    }
    .container:hover:not(:focus-within) {
        box-shadow: var(--br-input-number-hover-box-shadow);
        border: var(--br-input-number-hover-border);
    }
    .container:focus-within {
        box-shadow: var(--br-input-number-focus-box-shadow);
        border: var(--br-input-number-focus-border);
    }
    .hint:not(:empty) {
        margin-block: var(--br-input-number-hint-margin-block);
        margin-inline: var(--br-input-number-hint-margin-inline);
        color: var(--br-input-number-hint-text-color);
        font-size: var(--br-input-number-hint-font-size);
    }
    /* Use pseudoselector to match '.hint' specificity */
    .invalid:not(:empty) {
        color: var(--br-input-number-hint-invalid-text-color);
    }
</style>
