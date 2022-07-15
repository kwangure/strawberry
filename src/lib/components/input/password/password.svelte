<script context="module">
    export const docs = true;
</script>

<script>
    import '../../../css/styles.js';
    import { createEventForwarder } from '../../../utils/forward-events.js';
    import { validate } from '../validate';
    import { writable } from 'svelte/store';

    /**
     * A function that takes a validity state string and returns an error message.
     *
     * @type {((error: string, input: HTMLInputElement) => string) | undefined}
     */
    export let error = undefined;

    /**
     * A function that returns the validity of the input.
     *
     * @type {((input: HTMLInputElement) => string) | undefined}
     */
    export let invalid = undefined;

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
        <input bind:value use:forward type='password'
            use:validate={{ invalid, error, errorMessage }}
            {...$$restProps}/>
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
    }
    .label-text:not(:empty) {
        margin-block: var(--br-input-password-label-margin-block);
        position: var(--br-input-password-label-position);
        height: var(--br-input-password-label-height);
        width: var(--br-input-password-label-width);
        overflow: var(--br-input-password-label-overflow);
    }
    input {
        border: none;
        outline: 0;
        padding-block: var(--br-input-password-padding-block);
        padding-inline: var(--br-input-password-padding-inline);
        color: var(--br-input-password-text-color);
        background-color: transparent;
    }
    .container {
        display: flex;
        border: var(--br-input-password-border);
        border-radius: var(--br-input-password-border-radius);
        background-color: var(--br-input-password-background-color);
        height: var(--br-input-password-height);
        width: var(--br-input-password-width);
        transition: var(--br-input-password-transition);
    }
    .container:hover:not(:focus-within) {
        box-shadow: var(--br-input-password-hover-box-shadow);
        border: var(--br-input-password-hover-border);
    }
    .container:focus-within {
        box-shadow: var(--br-input-password-focus-box-shadow);
        border: var(--br-input-password-focus-border);
    }
    .hint:not(:empty) {
        margin-block: var(--br-input-password-hint-margin-block);
        margin-inline: var(--br-input-password-hint-margin-inline);
        color: var(--br-input-password-hint-text-color);
        font-size: var(--br-input-password-hint-font-size);
    }
    .invalid {
        color: var(--br-input-password-hint-invalid-text-color);
    }
</style>
