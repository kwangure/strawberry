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

    let focused = false;

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
        on:blur={()=> focused = false} on:change 
        on:change={() => value = clamp(value, min, max)} on:input 
        on:keypress on:focus on:focus={()=> focused = true} on:keydown 
        {placeholder} readonly={stepOnly} type='number'>
    <div class="input-postfix" class:focused>
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
    @import "./Input.css";
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0; 
    }
    .input-postfix {
        position: absolute;
        top: 2px;
        right: 2px;
        z-index: 2;
        height: 31px;
        color: rgba(0,0,0,0.65);
        display: flex;
        padding: 0 4px;
        flex-direction: column;
        border-radius: 0 2px 2px 0;
    }
    .focused {
        color: var(--primary);
        background-color: var(--primary-light);
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