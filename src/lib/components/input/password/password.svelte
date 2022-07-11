<script>
    import Container from "../container.svelte";
    import { createEventForwarder } from "../../../utils/forward-events.js";
    import { focusElement } from "../actions";
    import { slide } from "svelte/transition";
    import { validate } from "../validate";
    import { writable } from "svelte/store";

    /**
     * A function that takes a validity state string and returns an error message.
     *
     * @type {((error: string, input: HTMLInputElement) => string) | undefined}
     */
    export let error = undefined;

    /**
     * Whether to hide the input label.
     *
     * @type {boolean}
     */
    export let hideLabel = false;

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
    export let value = "";
    /**
     * Whether the input is focused.
     *
     * @type {boolean}
     */
    export let focus = false;

    const forward = createEventForwarder();
    const errorMessage = writable("");
</script>

<Container {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <div class="container">
        <input class="text-input" bind:value
            use:forward type='password' id={labelId}
            use:focusElement={focus}
            use:validate={{ invalid, error, errorMessage }}
            {...$$restProps}/>
    </div>
    {#if $errorMessage}
        <div class="invalid" transition:slide>
            {$errorMessage}
        </div>
    {/if}
</Container>

<style>
    @import "../css/input.css";
    @import "../css/container.css";
    @import "../css/postfix.css";

    :host,
    :root {
        --br-input-password-padding-block: 5px;
        --br-input-password-padding-inline: 12px;
    }
    input {
        padding-block: var(--br-input-password-padding-block);
        padding-inline: var(--br-input-password-padding-inline);
    }
</style>

<script context="module">
    export const docs = true;
</script>
