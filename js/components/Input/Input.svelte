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
    .input-wrapper {
        display: inline-block;
        position: relative;
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
    input {
        width: 100%;
        height: 35px;
    }
    input:hover {
        border-color: var(--border);
    }
    input:focus {
        border: 2px solid var(--primary);
        padding: var(--vertical-padding-focus) var(--horizontal-padding-focus);
        outline: 0;
    }
    .icon {
        padding-left: var(--icon-padding);
    }
    .icon:focus {
        padding-left: var(--icon-padding-focus);
    }
    .label {
        margin-bottom: 5px;
    }
</style>