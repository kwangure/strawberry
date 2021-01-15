<script>
    import { mdiChevronUp, mdiChevronDown } from "@mdi/js";
    import { createEventForwarder } from "$utils/forward-events.js";
    import { focusElement } from "./actions";
    import { handleInput } from "./number.js";
    import Icon from "../Icon";
    import { slide } from "svelte/transition";
    import uid from 'uid';

    export let hideLabel = false;
    export let min = Number.MIN_SAFE_INTEGER;
    export let max = Number.MAX_SAFE_INTEGER;
    export let value = "";
    export let step = 1;
    export let stepOnly = false;
    export let focus = false;

    const forward = createEventForwarder();

    let labelId = uid();

    $: isBelowMin = Number(value) < min;
    $: isAboveMax = Number(value) > max;

    if (import.meta.env.DEV && !$$slots.label) {
        console.error(`
The 'label' slot must be included. If you want to hide it pass the 'hideLabel' prop.

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
        value = decrement(value, step);
        focus = true;
    }

    const handleInputOptions = {
        pattern: /^-?\d*(\.\d*)?$/,
    };
</script>

<div class="berry-input-number input-wrapper">
    <label class:br-accessible-hide={hideLabel} for={labelId} >
        <slot name="label"/>
    </label>
    <div class="container">
        <input bind:value on:blur={()=> focus = false}
            on:change={() => value = clamp(value, min, max)}
            readonly={stepOnly}
            on:keydown={handleKeydown} use:forward use:handleInput={handleInputOptions}
            type="text" id={labelId} use:focusElement={focus} {...$$restProps}>
        <div class="postfix-wrapper">
            <span class="postfix-up"on:click|stopPropagation={handleClickUp}>
                <Icon path={mdiChevronUp} size={21}></Icon>
            </span>
            <span class="postfix-down" on:click|stopPropagation={handleClickDown}>
                <Icon path={mdiChevronDown} size={21}></Icon>
            </span>
        </div>
    </div>
    {#if isBelowMin}
        <div class="invalid" transition:slide>
            Minimum value is {min}.
        </div>
    {:else if isAboveMax}
        <div class="invalid" transition:slide>
            Maximum value is {min}.
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