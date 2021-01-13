<script>
    import uid from 'uid';
    import { slide } from "svelte/transition";
    import { focusElement } from "./actions";

    export let name = "";
    export let hideLabel = false;
    export let placeholder = "";
    export let value = "";
    export let disabled = false;
    export let autofocus = false;
    export let readonly = false;
    export let focus = false;
    export let invalid = () => false;

    if (import.meta.env.DEV && !$$slots.label) {
        console.error(`
The 'label' slot must be included. If you want to hide it pass the 'hideLabel' prop.

To read about a hidden '<label/>' for accessibility reasons, see:
https://www.w3.org/WAI/tutorials/forms/labels/#hiding-label-text
        `.trim());
    }

    function handleBlur() {
        is_invalid = invalid(value);
    }

    let labelId = uid();
    let is_invalid = false;
</script>

<div class="berry-input input-wrapper">
    <label class:br-accessible-hide={hideLabel} for={labelId} >
        <slot name="label"/>
    </label>
    <div class="container">
        <!-- svelte-ignore a11y-autofocus -->
        <input
            {autofocus} bind:value class:is_invalid
            {disabled} {name} on:blur
            on:blur={handleBlur} on:change on:input on:keypress on:focus
            {readonly} on:keydown
            {placeholder}
            type="text" id={labelId} use:focusElement={focus}>
        {#if $$slots.postfix}
            <div class="postfix-wrapper" class:disabled>
                <slot name="postfix"/>
            </div>
        {/if}
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