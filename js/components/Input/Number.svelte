<script>
    import Icon from '../Icon.svelte'
    import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
    export let name = ''
    export let label = ''
    export let placeholder = ''
    export let icon = ''
    export let min = -Infinity
    export let max = Infinity
    export let value = 0
    export let step = 1
    export let stepOnly = false
    export let disabled = false
    export let autofocus = false

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
</script>

<label class="input-wrapper">
    {#if label}
        <div class="label">{label.length? label : placeholder}</div>
    {/if}
    {#if icon}
        <span class="input-prefix">
            <Icon path={icon}></Icon>
        </span>
    {/if}
    <!-- svelte-ignore a11y-autofocus -->
    <input 
        {autofocus} bind:value class:icon {disabled} {min} {max} {name} on:blur
        on:change on:change={() => value = clamp(value, min, max)} on:input 
        on:keypress on:focus on:keydown {placeholder} readonly={stepOnly} 
        type='number'>
    <div class="input-postfix">
        <span class="postfix-up"
            on:click|stopPropagation={() => value = clamp(value + step, min, max)}>
            <Icon path={mdiChevronUp} size={21}></Icon>
        </span>
        <span class="postfix-down"
            on:click|stopPropagation={() => value = clamp(value - step, min, max)}>
            <Icon path={mdiChevronDown} size={21}></Icon>
        </span>
    </div>
</label>

<style>
    .input-wrapper {
        display: inline-block;
        position: relative;
        width: 100%;
        line-height: 1.5;
    }
    .input-wrapper {
        --vertical-padding: 5px;
        --horizontal-padding: 12px;
        --padding-right: 25px;
        --vertical-padding-focus: calc(var(--vertical-padding) - 1px);
        --horizontal-padding-focus: calc(var(--horizontal-padding) - 1px);
        --padding-right-focus: calc(var(--padding-right) - 1px);
    }

    .input-prefix {
        position: absolute;
        top: 52%;
        z-index: 2;
        color: rgba(0,0,0,0.65);
        line-height: 0;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        left: 12px;
    }
    input {
        text-align: inherit;
        display: inline-block;
        padding: var(--vertical-padding) var(--horizontal-padding);
        padding-right: var(--padding-right);
        color: rgba(0,0,0,0.65);
        font-size: 14px;
        line-height: 1.5;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
    }
    input:not(.checkbox):not(.radio){
        width: 100%;
        height: 35px;
    }
    input:hover {
        border-color: #aaa;
    }
    input:focus {
        border: 2px solid #1870ff;
        outline: 0;
        padding: var(--vertical-padding-focus) var(--horizontal-padding-focus);
        padding-right: var(--padding-right-focus);
    }
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0; 
    }
    input.icon {
        padding-left: 30px;
    }
    .input-postfix {
        position: absolute;
        top: 52%;
        right: 6px;
        z-index: 2;
        color: rgba(0,0,0,0.65);
        line-height: 0;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
    }
    .postfix-up {
        margin-bottom: -3px;
    }
    .postfix-down {
        margin-top: -3px;
    }

    .label {
        margin-bottom: 5px;
    }
</style>