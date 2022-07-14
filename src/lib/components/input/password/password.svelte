<script>
    import '../../../css/styles.js';
    import { createEventForwarder } from '../../../utils/forward-events.js';
    import { slide } from 'svelte/transition';
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
        <input class="text-input" bind:value
            use:forward type='password'
            use:validate={{ invalid, error, errorMessage }}
            {...$$restProps}/>
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
    /*
        TODO: Add tip on how to accessibly hide label text
        height: 1px;
        width: 1px;
        position: absolute;
        overflow: hidden;
    */
    .label-text {
        margin-block: var(--br-input-password-label-margin-block);
        position: var(--br-input-password-label-position);
        height: var(--br-input-password-label-height);
        width: var(--br-input-password-label-height);
    }
    input {
        padding-block: var(--br-input-password-padding-block);
        padding-inline: var(--br-input-password-padding-inline);
    }
</style>

<script context="module">
    export const docs = true;
</script>
