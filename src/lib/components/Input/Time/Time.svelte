<script>
    import Container from "../Container.svelte";
    import { createEventDispatcher } from "svelte";
    import Icon from "../../Icon";
    import { mdiClockOutline } from "@mdi/js";
    import { transformable } from "storables";

    /**
     * Whether to hide the input label.
     *
     * @type {boolean}
     */
    export let hideLabel = false;
    /**
     * The initial value of the input.
     *
     * An ISO 8601 dateString or Date.
     *
     * @type {string | Date}
     */
    export let value = undefined;

    let hoursInput, minutesInput;

    function isInteger(number) {
        return parseFloat(number) % 1 === 0;
    }

    const dispatch = createEventDispatcher();
    /**
     * @typedef {{ hours: string; minutes: string; }} Time
     */
    const options = {
        name: "date",
        transforms: {
            time: {
                /**
                 * @param {Date} date
                 * @returns {Time}
                 */
                from(date) {
                    return date
                        ? {
                                hours: pad(date.getHours()),
                                minutes: pad(date.getMinutes()),
                            }
                        : { hours: "", minutes: "" };
                },
                /**
                 * @param {Time} time
                 * @returns {Date}
                 */
                to(time) {
                    const date = new Date();
                    date.setHours(time.hours, time.minutes, 0, 0);
                    return date;
                },
                /**
                 * @param {Time} time
                 * @returns {boolean | Error}
                 */
                validate(time) {
                    const { hours, minutes } = time;
                    if (!isInteger(hours) || !isInteger(minutes)) return false;

                    return (hours >= 0 && hours <= 23)
                        && (minutes >= 0 && minutes <= 59);
                },
            },
        },
        validate(date) {
            return date instanceof Date;
        },
    };

    $: ({ date, time } = transformable(options, value));
    $: value = $date;
    $: dispatch("change", value);

    function pad(num) {
        return String(num).padStart(2, "0");
    }

    function hourInputEnd() {
        if (!minutesInput.value) {
            minutesInput.focus();
        }
    }

    function minuteInputEnd() {
        if (!hoursInput.value) {
            hoursInput.focus();
        }
    }

    /**
     * @param {Event | InputEvent} event
     */
    function emitInputEnd(event) {
        const { target } = event;
        const maxPrefix = Number(target.max.slice(0, -1));

        const isUsingArrowKeys = !event.inputType;
        if (!isUsingArrowKeys && Number(target.value) > maxPrefix) {
            target.dispatchEvent(new Event("inputend"));
        }
    }

    /**
     * Cycle values that exceeds boundary back within boundary
     * @param {InputEvent} event
     */
    function loopValue(event) {
        const { target } = event;
        if (target.value.length === 0) return;

        const max = Number(target.max);
        const min = Number(target.min);
        let value = Number(target.value);

        if (value < min) {
            value = max;
        } else if (value > max) {
            value = min;
        }

        target.value = pad(value);
    }

    function focusInput() {
        if (!hoursInput.value) return hoursInput.focus();
        if (!minutesInput.value) return minutesInput.focus();
        hoursInput.focus();
    }
</script>

<Container class="berry-input-time" {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <div class="container"  class:invalid={false}>
        <input bind:this={hoursInput} class="text-input" type="number" min="0" max="23"
            on:input={emitInputEnd} on:inputend={hourInputEnd}
            placeholder="--" bind:value={$time.hours} on:input={loopValue}>:
        <input bind:this={minutesInput} class="text-input" type="number" min="0" max="59"
            on:input={emitInputEnd} on:inputend={minuteInputEnd}
            placeholder="--" bind:value={$time.minutes} on:input={loopValue}>
        <div class="postfix-wrapper" on:click={focusInput}>
            <Icon path={mdiClockOutline}></Icon>
        </div>
    </div>
</Container>

<style>
    @import "../css/container.css";
    @import "../css/input.css";
    @import "../css/postfix.css";

    :global(.berry-input-time) {
        --br-input-time-icon-size: 21px;
    }
    .container {
        display: flex;
        align-items: center;
        width: -moz-fit-content;
        width: fit-content;
    }
    input.text-input {
        padding: 2px;
        width: 3ch;
        border: 2px solid var(--br-white);
        text-align: center;
    }
    input:hover,
    input:focus {
        background-color: var(--br-primary-light);
        border-radius: var(--br-border-radius);
    }
    [type=number]::-webkit-outer-spin-button,
    [type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    [type=number] {
        -webkit-appearance: textfield;
        -moz-appearance: textfield;
        appearance: textfield;
        width: 2ch;
    }
    .postfix-wrapper {
        height: 100%;
    }
    .postfix-wrapper :global(.berry-icon) {
        --br-icon-size: var(--br-input-time-icon-size);
    }
</style>