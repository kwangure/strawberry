<script>
    import { createEventForwarder } from "$utils/forward-events.js";
    import uid from 'uid';
    import { focusElement } from "./actions";
    import { slide } from "svelte/transition";

    export let hideLabel = false;
    export let value = "";
    export let focus = false;
    export let invalid = () => false;

    const forward = createEventForwarder();
    
    if (import.meta.env.DEV && !$$slots.label) {
        console.error(`
        The 'label' slot must be included. If you want to hide it pass the 'hideLabel' prop.

To read about a hidden '<label/>' for accessibility reasons, see:
https://www.w3.org/WAI/tutorials/forms/labels/#hiding-label-text
        `.trim());
    }

    let labelId = uid();
    let blurred = false;

    $: is_invalid = blurred && invalid(value);
</script>

<div class="berry-input-password input-wrapper">
    <label class:br-accessible-hide={hideLabel} for={labelId}>
        <slot name="label"/>
    </label>
    <div class="container">
        <input bind:value class:is_invalid on:blur={() => blurred = true}
            use:forward type='password' id={labelId}
            use:focusElement={focus} {...$$restProps}/>
    </div>
    {#if is_invalid}
        <div class="invalid" transition:slide>
            {is_invalid}
        </div>
    {/if}
</div>

<style>
    @import "./css/input.css";
    @import "./css/container.css";
    @import "./css/postfix.css";
</style>