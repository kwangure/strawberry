<script>
    import Container from "../Container.svelte";
    import { createEventForwarder } from "../../../utils/forward-events.js";
    import { focusElement } from "../actions";
    import { slide } from "svelte/transition";

    /**
     * Whether to hide the input label.
     *
     * @type {boolean}
     */
    export let hideLabel = false;
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
    /**
     * A function to check whether the "value" is valid.
     * @type {(value: string) => boolean}
     */
    export let invalid = (value) => false; // eslint-disable-line no-unused-vars

    const forward = createEventForwarder();

    function handleBlur() {
        isInvalid = invalid(value);
    }

    let isInvalid = false;
</script>

<Container class="berry-input" {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <div class="container">
        <input bind:value class:isInvalid
            on:blur={handleBlur} use:forward
            on:keydown
            type="text" id={labelId} use:focusElement={focus} {...$$restProps}>
        {#if $$slots.postfix}
            <div class="postfix-wrapper">
                <slot name="postfix"/>
            </div>
        {/if}
    </div>
    {#if isInvalid}
        <div class="invalid" transition:slide>
            {isInvalid}
        </div>
    {/if}
</Container>

<style>
    @import "../css/input.css";
    @import "../css/container.css";
    @import "../css/postfix.css";
</style>