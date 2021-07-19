<script>
    import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
    import Container from "../Container.svelte";
    import { createEventForwarder } from "../../../utils/forward-events.js";
    import { focusElement } from "../actions";
    import { handleInput } from "./number.js";
    import Icon from "../../Icon";
    import { slide } from "svelte/transition";

    /**
     * Whether to hide the input label.
     *
     * @type {boolean}
     */
    export let hideLabel = false;
    /**
     * The minimum value to accept.
     * @type {number}
     */
    export let min = Number.MIN_SAFE_INTEGER;
    /**
     * The maximum value to accept.
     * @type {number}
     */
    export let max = Number.MAX_SAFE_INTEGER;
    /**
     * The initial value of the component.
     * @type {number | undefined}
     */
    export let value = undefined; // eslint-disable-line no-undef-init
    /**
     * A stepping interval to use when using up and down arrows to adjust the value, as well as for validation.
     * @type {number}
     */
    export let step = 1;
    /**
     * Whether the user can only edit the value using up and down arrows.
     * @type {boolean}
    */
    export let stepOnly = false;
    /**
     * Whether the input is focused.
     *
     * @type {boolean}
     */
    export let focus = false;
    /**
     * Whether "value" is a number between "min" and "max".
     *
     * @type {boolean}
     * @readonly
     */
    export let valid = true;

    const forward = createEventForwarder();

    $: isBelowMin = Number(value) < min;
    $: isAboveMax = Number(value) > max;
    $: valid = isNaN(Number(value)) || (!isBelowMin && !isAboveMax);

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
        if (isNaN(value)) return;
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

<Container class="berry-input-number" {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <div class="container">
        <input class="text-input" bind:value on:blur={() => {
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
                <Icon path={mdiChevronUp}/>
            </span>
            <span class="postfix-down" on:click|stopPropagation={handleClickDown}>
                <Icon path={mdiChevronDown}/>
            </span>
        </div>
    </div>
    {#if isBelowMin}
        <div class="invalid" transition:slide>
            Use a number larger than {min}.
        </div>
    {:else if isAboveMax}
        <div class="invalid" transition:slide>
            Use a number smaller than {max}.
        </div>
    {/if}
</Container>

<style>
    @import "../css/input.css";
    @import "../css/container.css";
    @import "../css/postfix.css";
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
    .postfix-up :global(.berry-icon) {
        --br-icon-size: 21px;
    }
</style>