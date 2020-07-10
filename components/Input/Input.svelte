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
    export let readonly = false;
    export let focus = false;
    export let invalid = () => false;

    let input = null;
    let blurred = false;

    $: (focus && input) ? input.focus() : "";
    $: is_invalid = blurred && invalid(value);
</script>

<label class="berry-input input-wrapper">
    <!-- label could be a boolean or a string-->
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
            {autofocus} bind:value bind:this={input} class:icon class:is_invalid {disabled} {name} on:blur
            on:blur={() => blurred = true} on:change on:input on:keypress on:focus {readonly}
            on:keydown {placeholder} type="text">
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