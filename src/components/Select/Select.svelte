<script>
    import { mdiChevronDown } from "@mdi/js";
    import Icon from "../Icon";
    import Dropdown from "../Dropdown";

    export let options = [];
    export let active = (options.length > 0) ? 0 : null;
    export let placement = "bottomLeft";
    export let value = "";
    export let label = "";
    export let icon = "";
    export let disabled = false;
    export let autofocus = false;

    let input    = null;
    let visible  = false;
    let extract  = option => option.text || option.value;
    let text     = Number.isInteger(active) ? extract(options[active]) : "";
    
    $: options = options.map((option, index) => {
        //set initial active option
        if(option.value === value) {
            set(option, index);
        }
        option.onclick = () => {
            set(option, index);
            dispatchChange();
        };
        return option;
    });

    // always focus on input if dropdown is open
    $: visible && input ? input.focus() : "";

    let dispatchChange = () => {
        input.dispatchEvent(new CustomEvent("change", {detail: value}));
    };

    export function set(option, index){
        value = option.value;
        text  = option.text || option.value;
        active = index;
    }
</script>

<svelte:options tag="berry-select"/>
 
<Dropdown bind:items={options} bind:placement bind:visible bind:active>
    <div slot="button" class="input-wrapper">
        <!-- svelte-ignore a11y-autofocus -->
        <input {autofocus} bind:this={input} bind:value={text} class:icon 
            class="input-postfix" {disabled} 
            on:blur placeholder={label} on:change on:focus 
            readonly type='text'>
        <div class="postfix-wrapper" class:visible>
            <Icon path={mdiChevronDown}></Icon>
        </div>
    </div>
    <div slot="menu" let:item={option}>
        {extract(option)}
    </div>
</Dropdown>

<style>
    @import "../Input/Input.css";
    .input-wrapper,
    input {
        cursor: pointer;
        user-select: none;
    }
</style>
