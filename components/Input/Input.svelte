<script>
    import Container from "./Container.svelte";
    import { slide } from "svelte/transition";
    import { focusElement } from "./actions";
    import { createEventForwarder } from "../../utils/forward-events.js";

    export let hideLabel = false;
    export let value = "";
    export let focus = false;
    export let invalid = () => false;

    const forward = createEventForwarder();

    function handleBlur() {
        is_invalid = invalid(value);
    }

    let is_invalid = false;
</script>

<Container class="berry-input" {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <div class="container">
        <input bind:value class:is_invalid
            on:blur={handleBlur} use:forward
            on:keydown
            type="text" id={labelId} use:focusElement={focus} {...$$restProps}>
        {#if $$slots.postfix}
            <div class="postfix-wrapper">
                <slot name="postfix"/>
            </div>
        {/if}
    </div>
    {#if is_invalid}
        <div class="invalid" transition:slide>
            {is_invalid}
        </div>
    {/if}
</Container>

<style>
    @import "./css/input.css";
    @import "./css/container.css";
    @import "./css/postfix.css";
</style>