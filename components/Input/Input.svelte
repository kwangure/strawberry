<script>
    import "./css/input.css";
    import Icon from "../Icon";
    import uid from 'uid';
    import { slide } from "svelte/transition";

    export let name = "";
    export let label;
    export let hideLabel = false;
    export let placeholder = "";
    export let icon = "";
    export let value = "";
    export let disabled = false;
    export let autofocus = false;
    export let readonly = false;
    export let focus = false;
    export let invalid = () => false;

    if (import.meta.env.DEV) {
        const isEmpty = (str) => (!str || 0 === str.length);
        isEmpty(label) && console.error(`
The 'label' prop must be included. If you want to hide it pass the 'hideLabel:boolean' prop.

To read about a hidden '<label/>' for accessibility reasons, see:
https://www.w3.org/WAI/tutorials/forms/labels/#hiding-label-text
        `.trim());
    }
    
    let labelId = uid();
    let input = null;
    let focused = false;
    let is_invalid = false;

    $: (focus && input) ? input.focus() : "";
</script>

<div class="berry-input input-wrapper">
    <label class:br-accessible-hide={hideLabel} for={labelId} >{label || ""}</label>
    <div class="container">
        {#if icon}
            <span class="input-prefix">
                <Icon size="18" path={icon}></Icon>
            </span>
        {/if}
        <!-- svelte-ignore a11y-autofocus -->
        <input 
            {autofocus} bind:value bind:this={input} class:icon class:is_invalid
            {disabled} {name} on:blur 
            on:blur={() => is_invalid = invalid(value)} 
            on:blur={()=> focused = false}
            on:change on:input on:keypress on:focus 
            on:focus={()=> focused = true} {readonly} on:keydown {placeholder} 
            type="text" id={labelId}>
        {#if $$slots.postfix}
            <div class="postfix-wrapper" class:focused class:disabled>
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