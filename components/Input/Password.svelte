<script>
    import uid from 'uid';
    import { focusElement } from "./actions";
    import { slide } from "svelte/transition";

    export let name = "";
    export let hideLabel = false;
    export let placeholder = "";
    export let value = "";
    export let disabled = false;
    export let autofocus = false;
    export let focus = false;
    export let invalid = () => false;

    if (import.meta.env.DEV && !$$slots.label) {
        console.error(`
The 'label' prop must be included. If you want to hide it pass the 'hideLabel:boolean' prop.

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
        <!-- svelte-ignore a11y-autofocus -->
        <input
            {autofocus} bind:value class:is_invalid
            {disabled} {name} on:blur on:blur={() => blurred = true} on:change
            on:input on:keypress on:focus on:keydown {placeholder} type='password' id={labelId}
            use:focusElement={focus}/>
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