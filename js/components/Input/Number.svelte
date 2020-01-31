<script>
    import Icon from "../Icon.svelte";
    import { slide } from "svelte/transition";
    import { mdiChevronUp, mdiChevronDown } from "@mdi/js";
    export let name = "";
    export let label = "";
    export let placeholder = "";
    export let icon = "";
    export let min = -Infinity;
    export let max = Infinity;
    export let value = 0;
    export let step = 1;
    export let stepOnly = false;
    export let disabled = false;
    export let autofocus = false;
    export let focus = false;
    export let invalid = () => false;

    let focused = false;

    let input = null;
    let blurred = false;

    $: (focus && input) ? input.focus() : "";
    $: is_invalid = blurred && invalid(value);

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
</script>

<label class="input-wrapper">
    {#if label}
        <div class="label">{label.length? label : placeholder}</div>
    {/if}
    <div class="container">
        {#if icon}
            <span class="input-prefix">
                <Icon path={icon}></Icon>
            </span>
        {/if}
        <!-- svelte-ignore a11y-autofocus -->
        <input 
            {autofocus} bind:value bind:this={input} class:icon class:is_invalid
            class="input-postfix"
            {disabled} {min} {max} {name} on:blur on:blur={()=> focused = false} 
            on:blur={() => blurred = true} on:change 
            on:change={() => value = clamp(value, min, max)} on:input 
            on:keypress on:focus on:focus={()=> focused = true} on:keydown 
            {placeholder} readonly={stepOnly} type='number'>
        <div class="postfix-wrapper" class:focused class:disabled>
            <span class="postfix-up"
                on:click|stopPropagation={() => value = clamp(value + step, min, max)}>
                <Icon path={mdiChevronUp} size={21}></Icon>
            </span>
            <span class="postfix-down"
                on:click|stopPropagation={() => value = clamp(value - step, min, max)}>
                <Icon path={mdiChevronDown} size={21}></Icon>
            </span>
        </div>
    </div>
    {#if is_invalid}
        <div class="invalid" transition:slide>
            {is_invalid}
        </div>
    {/if}
</label>

<svelte:options tag="berry-input-number"/>

<style>
    @import "./Input.css";
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0; 
    }
    .postfix-wrapper {
        flex-direction: column;
    }
    .postfix-up,
    .postfix-down {
        flex: 1;
        min-height: 0;
        display: flex;
        align-items: center;
    }
    .label {
        margin-bottom: 5px;
    }
</style>