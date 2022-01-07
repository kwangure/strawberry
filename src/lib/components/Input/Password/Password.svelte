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
    export let invalid = () => false;

    const forward = createEventForwarder();

    let blurred = false;

    $: isInvalid = blurred && invalid(value);
</script>

<Container {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <div class="container" class:invalid={isInvalid}>
        <input class="text-input" bind:value
            on:blur={() => {
 blurred = true;
}}
            use:forward type='password' id={labelId}
            use:focusElement={focus} {...$$restProps}/>
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

<script context="module">
    export const docs = true;
</script>
