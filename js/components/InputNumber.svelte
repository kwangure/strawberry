<script>
    import { Icon } from '@deimimi/strawberry'
    import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
    export let name = ''
    export let label = ''
    export let placeholder = ''
    export let icon = ''
    export let min = null
    export let max = null
    export let value = 0
    export let step = 1
    export let stepOnly = false
    export let disabled = false
    export let autofocus = false
    let type = 'number'

    // Update value manually since Svelte does not allow data  
    // binding if input type is dynamic (and for good reason)
    function updateValue(e){
        value = e.target.value
    }

    function clamp(value, min, max) {
        if(typeof max === "number"){
            value = value > max ? max : value
        }
        if(typeof min === "number"){
            value = value < min ? min : value
        }
        return value
    }

    $: value = clamp(value, min, max)
</script>

<svelte:options tag="sb-input"/>

<label class="input-wrapper">
    {#if icon}
        <span class="input-prefix">
            <Icon path={icon}></Icon>
        </span>
    {/if}
    <!-- svelte-ignore a11y-autofocus -->
    <input 
        {autofocus} class:icon {disabled} {min} {max} {name} on:blur
        on:change on:input={updateValue} on:input on:keypress on:focus 
        on:keydown {placeholder} readonly={stepOnly} {type} {value}
        >
    <div class="input-postfix">
        <span class="postfix-up"
            on:click|stopPropagation={() => value = value + step}>
            <Icon path={mdiChevronUp} size={21}></Icon>
        </span>
        <span class="postfix-down"
            on:click|stopPropagation={() => value = value - step}>
            <Icon path={mdiChevronDown} size={21}></Icon>
        </span>
    </div>
</label>

<style>
    .input-wrapper {
        display: inline-block;
        position: relative;
    }
    .input-wrapper:not(.checkbox):not(.radio){
        width: 100%;
        line-height: 1.5;
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
        padding: 4px 11px;
        color: rgba(0,0,0,0.65);
        font-size: 14px;
        line-height: 1.5;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        -webkit-transition: all .3s;
        transition: all .3s;
    }
    input:not(.checkbox):not(.radio){
        width: 100%;
        height: 35px;
    }
    input:hover {
        border-color: #40a9ff;
    }
    input:focus {
        border-color: #40a9ff;
        outline: 0;
        -webkit-box-shadow: 0 0 0 2px rgba(24,144,255,0.2);
        box-shadow: 0 0 0 2px rgba(24,144,255,0.2);
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
    input {
        padding-right: 25px;
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
</style>