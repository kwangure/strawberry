<script>
    import Icon from '../Icon.svelte'
    export let name = ''
    export let label = ''
    export let placeholder = ''
    export let icon = ''
    export let value = ''
    export let disabled = false
    export let autofocus = false
    export let readonly = false;
    export let focus = false;

    let input = null;

    $: (focus && input) ? input.focus() : ""; 
</script>

<label class="input-wrapper">
    <!-- label could be a boolean or a string-->
    {#if label}
        <div class="label">{label.length? label : placeholder}</div>
    {/if}
    {#if icon}
        <span class="input-prefix">
            <Icon size="18" path={icon}></Icon>
        </span>
    {/if}
    <!-- svelte-ignore a11y-autofocus -->
    <input 
        {autofocus} bind:value bind:this={input} class:icon {disabled} {name} on:blur
        on:change on:input on:keypress on:focus {readonly}
        on:keydown {placeholder} type="text"
        >
</label>

<style>
    @import "./Input.css";
</style>