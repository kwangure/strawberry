<script>
    import Container from "../Container.svelte";
    import { createEventDispatcher } from "svelte";
    import Icon from "../../Icon";
    import { mdiClockOutline } from "@mdi/js";

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

    let hours, minutes;
    let hoursInput, minutesInput;

    $: dateToValues(value);

    function dateToValues(dirtyDate) {
        const date = new Date(dirtyDate);
        [hours, minutes] = [
            pad(date.getHours()),
            pad(date.getMinutes()),
        ];
    }

    const dispatch = createEventDispatcher();
    function setValue() {
        const date = new Date();
        const [hh, mm] = [Number(hours), Number(minutes)];
        date.setHours(hh, mm);

        if (value instanceof Date) {
            value = date;
        } else {
            value = date.toISOString();
        }

        dispatch("change", { value });
    }

    function pad(num) {
        return String(num).padStart(2, "0");
    }

    function filled() {
        return [hours, minutes].every((a) => typeof a === "string");
    }

    const handleHourInput = input({
        min: 0,
        max: 23,
        set(hr) {
            hours = hr;
            if (filled()) setValue();
        },
        format(hr) {
            return pad(hr);
        },
        onInputEnd(input) {
            if (!minutesInput.value) {
                minutesInput.focus();
            } else {
                input.blur();
            }
        },
    });

    const handleMinuteInput = input({
        min: 0,
        max: 59,
        set(min) {
            minutes = min;
            if (filled()) setValue();
        },
        format(min) {
            return pad(min);
        },
        onInputEnd(input) {
            if (!hoursInput.value) {
                hoursInput.focus();
            } else {
                input.blur();
            }
        },
    });


    /**
     *
     * @param {{
     *    max: number;
     *    min: number;
     *    set: (value: number) => void;
     *    format: (value: number) => string;
     *    onInputEnd: (input: HTMLInputElement) => void;
     * }} options
     */
    function input(options) {
        const { max, min, set, format, onInputEnd } = options;
        const maxPrefix = parseInt(String(max).slice(0, -1));

        /**
         *
         * @param {Event | InputEvent} event
         */
        return function loop(event) {
            const { target } = event;

            ensureValid(target, (val) => val >= (min-1) && val <= (max+1));

            let value = parseInt(target.value);
            if (value < min) {
                value = max;
            } else if (value > max) {
                value = min;
            }

            const formatted = format(value);
            target.value = formatted;
            set(formatted);

            const isUsingArrows = !event.inputType;
            if (!isUsingArrows && value > maxPrefix) {
                onInputEnd(target);
            }
        };
    }

    /**
     * @param {number} number
     */
    function isInteger(number) {
        return number % 1 === 0;
    }
    /**
     *
     * @param {HTMLInputElement} input
     * @param {(value:string) => boolean} validate
     */
    function ensureValid(input, validate) {
        const value = Number(input.value);
        const isValid = isInteger(value) && validate(value);

        if (isValid) {
            input.oldValue = input.value;
        } else if (Object.hasOwnProperty.call(input, "oldValue")) {
            input.value = input.oldValue;
        } else {
            input.value= "";
        }
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
        <input bind:this={hoursInput} class="text-input" type="number"
            on:input={handleHourInput} placeholder="--" value={hours}>:
        <input bind:this={minutesInput} class="text-input" type="number"
            on:input={handleMinuteInput} placeholder="--" value={minutes}>
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