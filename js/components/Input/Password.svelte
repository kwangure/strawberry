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
    .input-wrapper {
        display: inline-block;
        position: relative;
    }
    .input-wrapper {
        --vertical-padding: 5px;
        --horizontal-padding: 12px;
        --vertical-padding-focus: calc(var(--vertical-padding) - 1px);
        --horizontal-padding-focus: calc(var(--horizontal-padding) - 1px);
    }
    .input-wrapper{
        width: 100%;
        line-height: 1.5;
    }
    .input-prefix {
        position: absolute;
        bottom: 7px;
        z-index: 2;
        color: rgba(0,0,0,0.65);
        line-height: 0;
        left: 10px;
    }
    input {
        text-align: inherit;
        display: inline-block;
        padding: var(--vertical-padding) var(--horizontal-padding);
        color: rgba(0,0,0,0.65);
        font-size: 14px;
        line-height: 1.5;
        background-color: var(--white);
        background-image: none;
        border: 1px solid var(--border);
        border-radius: 4px;
    }
    input:not(.checkbox):not(.radio){
        width: 100%;
        height: 35px;
    }
    input:hover {
        border-color: var(--grey);
    }
    input:focus {
        border: 2px solid var(--primary);
        padding: var(--vertical-padding-focus) var(--horizontal-padding-focus);
        outline: 0;
    }
    .icon {
        padding-left: 38px;
    }
    .icon:focus {
        padding-left: 37px;
    }
    .label {
        margin-bottom: 5px;
    }
</style>