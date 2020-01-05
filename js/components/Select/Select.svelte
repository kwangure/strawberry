<script>
    import { mdiChevronDown } from "@mdi/js";
    import fuzzy from "fuzzy";
    import Icon from '../Icon.svelte';
    import Dropdown from "../Dropdown";

    export let options = [];
    export let active = (options.length > 0) ? 0 : null;
    export let placement = "bottomLeft";
    export let value = "";
    export let label = "";
    export let icon = "";
    export let disabled = false;
    export let autofocus = false;

    let dropdown = null;
    let input    = null;
    let visible  = false;
    let extract  = option => option.text || option.value;
    let text     = Number.isInteger(active) ? extract(options[active]) : "";
    
    $: options = options.map((option, index) => {
        option.onclick = () => {
            set(option)
            active = index;
        }
        return option;
    })

    $: visible && input ? input.focus() : "";

    export function set(option){
        value = option.value;
        text  = option.text || option.value;
    }
</script>
 
<Dropdown bind:items={options} bind:placement bind:visible bind:active>
    <div slot="button" class="wrapper">
        <!-- svelte-ignore a11y-autofocus -->
        <input {autofocus} bind:this={input} bind:value={text} class:icon {disabled} 
            on:blur placeholder={label} on:change on:input on:keypress on:focus 
            on:keydown readonly type='text'>
        <div class="input-postfix" class:visible>
            <Icon path={mdiChevronDown}></Icon>
        </div>
    </div>
    <div slot="menu" let:item={option}>
        {extract(option)}
    </div>
</Dropdown>

<style>
    .wrapper {
        --vertical-padding: 5px;
        --horizontal-padding: 12px;
        --padding-right: 25px;
        --vertical-padding-focus: calc(var(--vertical-padding) - 1px);
        --horizontal-padding-focus: calc(var(--horizontal-padding) - 1px);
        --padding-right-focus: calc(var(--padding-right) - 1px);
    }
    input {
        text-align: inherit;
        display: inline-block;
        padding: var(--vertical-padding) var(--horizontal-padding);
        padding-right: var(--padding-right);
        color: rgba(0,0,0,0.65);
        font-size: 14px;
        line-height: 1.5;
        background-color: var(--white);
        background-image: none;
        border: 1px solid var(--border);
        border-radius: 4px;
        width: 100%;
        height: 35px;
    }
    .wrapper:hover input {
        border-color: var(--border);
    }
    input:focus {
        border: 2px solid var(--primary) !important;
        outline: 0;
        padding: var(--vertical-padding-focus) var(--horizontal-padding-focus);
        padding-right: var(--padding-right-focus);
    }
    .input-postfix {
        position: absolute;
        top: 2px;
        right: 2px;
        height: 31px;
        z-index: 2;
        color: rgba(0,0,0,0.65);
        display: flex;
        align-items: center;
        border-radius: 0 2px 2px 0;
        padding: 4px;
    }
    .input-postfix.visible {
        color: var(--primary);
        background-color: var(--primary-light);
    }
</style>
