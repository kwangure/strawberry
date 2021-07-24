<script>
    import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
    import Container from "../Container.svelte";
    import { createEventForwarder } from "../../../utils/forward-events.js";
    import { focusElement } from "../actions";
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
     * @type {number | undefined}
     */
    export let min = undefined;
    /**
     * The maximum value to accept.
     * @type {number | undefined}
     */
    export let max = undefined;
    /**
     * The initial value of the component.
     * @type {number | undefined}
     */
    export let value = undefined;
    /**
     * A stepping interval to use when using up and down arrows to adjust the value, as well as for validation.
     * @type {number}
     */
    export let step = 1;
    /**
     * Whether the input is focused.
     *
     * @type {boolean}
     */
    export let focus = false;

    /**
     * Text that appears in the form control when it has no value set
     *
     * @type {string}
     */
    export let placeholder = "";
    /**
     * Whether "value" is a number between "min" and "max".
     *
     * @type {boolean}
     * @readonly
     */
    export let valid = true;
    /**
     * Whether the input is readonly
     *
     * @type {boolean}
     */
    export let readonly = false;

    const forward = createEventForwarder();

    $: isBelowMin = min && Number(value) < min;
    $: isAboveMax = max && Number(value) > max;
    $: valid = isNaN(Number(value)) || (!isBelowMin && !isAboveMax);

    /** @type {HTMLInputElement}*/
    let input = {
        stepUp() {},
        stepDown() {},
    };

    function dispatchChange() {
        input.dispatchEvent(new Event("change"));
    }

    function stepUp() {
        input.stepUp();
        dispatchChange();
    }

    function stepDown() {
        input.stepDown();
        dispatchChange();
    }
</script>

<Container class="berry-input-number" {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <div class="container" class:invalid={!valid}>
        <input bind:this={input} bind:value class="text-input"
            id={labelId} on:blur={() => focus = false} {placeholder}
            {readonly} {step} type="number" use:focusElement={focus} use:forward>
        <div class="postfix-wrapper">
            <span class="postfix-up"on:click={stepUp}>
                <Icon path={mdiChevronUp}/>
            </span>
            <span class="postfix-down" on:click={stepDown}>
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
    [type=number]::-webkit-outer-spin-button,
    [type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    [type=number] {
        -webkit-appearance: textfield;
        -moz-appearance: textfield;
        appearance: textfield;
    }
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