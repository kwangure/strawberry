<script>
    import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
    import Container from "./Container.svelte";
    import { createEventForwarder } from "../../utils/forward-events.js";
    import { focusElement } from "./actions";
    import { handleInput } from "./number.js";
    import Icon from "../Icon";
    import { slide } from "svelte/transition";

    export let hideLabel = false;
    export let min = Number.MIN_SAFE_INTEGER;
    export let max = Number.MAX_SAFE_INTEGER;
    // eslint-disable-next-line no-undef-init
    export let value = undefined;
    export let step = 1;
    export let stepOnly = false;
    export let focus = false;

    const forward = createEventForwarder();

    $: isBelowMin = Number(value) < min;
    $: isAboveMax = Number(value) > max;

    function increment(value, step) {
        return clamp((Number(value)+ Number(step)).toFixed(12), min, max);
    }

    function decrement(value, step) {
        return clamp((Number(value) - Number(step)).toFixed(12), min, max);
    }

    function handleKeydown(event) {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            value = increment(value, step);
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
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
        pattern: /^-?\d*(?<decimal>\.\d*)?$/u,
    };
</script>

<Container class="berry-input-number" {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <div class="container">
        <input bind:value on:blur={() => {
 focus = false;
}}
            on:change={() => {
 value = clamp(value, min, max);
}}
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
</Container>

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