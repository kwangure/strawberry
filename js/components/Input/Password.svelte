<script>
    import Icon from '../Icon.svelte'
    export let name = ''
    export let label = ''
    export let placeholder = ''
    export let icon = ''
    export let value = ''
    export let disabled = false
    export let autofocus = false
</script>

<label class="input-wrapper">
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
        {autofocus} bind:value class:icon {disabled} {name} on:blur
        on:change on:input on:keypress on:focus 
        on:keydown {placeholder} type='password' 
        >
</label>

<style>
    @import "./Input.css";
</style>