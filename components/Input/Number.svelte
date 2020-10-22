<script>
    import { mdiChevronUp, mdiChevronDown } from "@mdi/js";
    import { slide } from "svelte/transition";
    import { focusElement } from "./actions";
    import Icon from "../Icon";
    import uid from 'uid';

    export let label;
    export let hideLabel = false;
    export let placeholder = "";
    export let icon = "";
    export let min = Number.MIN_SAFE_INTEGER;
    export let max = Number.MAX_SAFE_INTEGER;
    export let value = "";
    export let step = 1;
    export let stepOnly = false;
    export let disabled = false;
    export let autofocus = false;
    export let focus = false;
    let isInvalidFn = () => false;
    export { isInvalidFn as isInvalid };
    export let parser = (string) => parseFloat(string); 
    export let formatter = (number) => number.toString();
    export let formattedValue = formatter(value);

    let labelId = uid();
    let focused = false;
    let isInvalid = false;

    $: formatValue(value);
    $: parseValue(formattedValue);

    function formatValue(value) {
        formattedValue = formatter(value)
    }

    function parseValue(formattedValue) {
        isInvalid = isInvalidFn(formattedValue);
        if (!isInvalid) {
            value = parser(formattedValue)
        }
    }

    if (import.meta.env.DEV) {
        const isEmpty = (str) => (!str || 0 === str.length);
        isEmpty(label) && console.error(`
The 'label' prop must be included. If you want to hide it pass the 'hideLabel:boolean' prop.

To read about a hidden '<label/>' for accessibility reasons, see:
https://www.w3.org/WAI/tutorials/forms/labels/#hiding-label-text
        `.trim());
    }

    function increment(value, step) {
        value = clamp(value + step, min, max);
        return value;
    }

    function decrement(value, step) {
        value = clamp(value - step, min, max);
        return value;
    }

    function handleKeydown(e) {
        if(e.key === "ArrowUp"){
            e.preventDefault();
            value = increment(value, step);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            value = decrement(value, step);
        }
    }

    function clamp(value, min, max) {
        if (isNaN(value)) return "";
        return Math.min(Math.max(value, min), max);
    }

    function handleClickUp() {
        value = increment(value, step);
        focus = true;
    }

    function handleClickDown() {
        value = increment(value, step);
        focus = true;
    }
</script>

<div class="berry-input-number input-wrapper">
    <label class:br-accessible-hide={hideLabel} for={labelId} >{label || ""}</label>
    <div class="container">
        {#if icon}
            <span class="input-prefix">
                <Icon size="18" path={icon}></Icon>
            </span>
        {/if}
        <!-- svelte-ignore a11y-autofocus -->
        <input 
            {autofocus} bind:value={formattedValue} class:icon
            class:is_invalid={isInvalid} {disabled} on:blur 
            on:blur={()=> focused = focus = false} 
            on:change={() => value = clamp(value, min, max)} on:change on:input on:keypress on:focus
            on:focus={()=> focused = true} readonly={stepOnly} on:keydown 
            on:keydown={handleKeydown} {placeholder} type="text" id={labelId} use:focusElement={focus}>
        <div class="postfix-wrapper" class:focused class:disabled>
            <span class="postfix-up"on:click|stopPropagation={handleClickUp}>
                <Icon path={mdiChevronUp} size={21}></Icon>
            </span>
            <span class="postfix-down" on:click|stopPropagation={handleClickDown}>
                <Icon path={mdiChevronDown} size={21}></Icon>
            </span>
        </div>
    </div>
    {#if isInvalid}
        <div class="invalid" transition:slide>
            {isInvalid}
        </div>
    {/if}
</div>

<style>
    @import "./css/input.css"; 
    @import "./css/container.css";
    @import "./css/postfix.css";
    .postfix-wrapper {
        flex-direction: column;
    }
    .postfix-up,
    .postfix-down {
        flex: 1;
        min-height: 0;
        display: flex;
        align-items: center;
    }
</style>