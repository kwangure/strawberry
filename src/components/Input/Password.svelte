<script>
    import Icon from "../Icon";
    import { slide } from "svelte/transition";
    export let name = "";
    export let label = "";
    export let placeholder = "";
    export let icon = "";
    export let value = "";
    export let disabled = false;
    export let autofocus = false;
    export let focus = false;
    export let invalid = () => false;

    let input = null;
    let blurred = false;

    $: (focus && input) ? input.focus() : ""; 
    $: is_invalid = blurred && invalid(value);
</script>

<svelte:options tag="berry-input-password"/>

<label class="berry-input-password input-wrapper">
    {#if label}
        <div class="label">{label.length? label : placeholder}</div>
    {/if}
    <div class="container">
        {#if icon}
            <span class="input-prefix">
                <Icon size="18" path={icon}></Icon>
            </span>
        {/if}
        <!-- svelte-ignore a11y-autofocus -->
        <input 
            {autofocus} bind:this={input} bind:value class:icon class:is_invalid
            {disabled} {name} on:blur on:blur={() => blurred = true} on:change 
            on:input on:keypress on:focus on:keydown {placeholder} type='password'/>
    </div>
    {#if is_invalid}
        <div class="invalid" transition:slide>
            {is_invalid}
        </div>
    {/if}
</label>

<style>
    @import "./Input.css";
</style>