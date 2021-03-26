<script>
    import Container from "./Container.svelte";
    import { createEventForwarder } from "../../utils/forward-events.js";
    import { focusElement } from "./actions";
    import { slide } from "svelte/transition";

    export let hideLabel = false;
    export let value = "";
    export let focus = false;
    export let invalid = () => false;

    const forward = createEventForwarder();

    let blurred = false;

    $: isInvalid = blurred && invalid(value);
</script>

<Container class="berry-input-password" {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <div class="container">
        <input bind:value class:is_invalid={isInvalid}
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
    @import "./css/input.css";
    @import "./css/container.css";
    @import "./css/postfix.css";
</style>