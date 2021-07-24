<script>
    import Container from "../Container.svelte";
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

    $: inputValue = dateToTime(value);

    function parseTime(timeString) {
        const [hours, minutes] = timeString.split(":").map(Number);
        const date = new Date();

        date.setHours(hours);
        date.setMinutes(minutes);

        return date;
    }

    /**
     *
     * @param {string | Date} dirtyDate
    */
    function dateToTime(dirtyDate) {
        if (!dirtyDate) return "";
        const date = new Date(dirtyDate);
        const [hours, minutes] = [
            date.getHours(),
            date.getMinutes(),
        ].map((t) => String(t).padStart(2, "0"));

        return `${hours}:${minutes}`;
    }

    function input(event) {
        const date = parseTime(event.target.value);
        if (value instanceof Date) {
            value = date;
        } else {
            value = date.toISOString();
        }
    }
</script>

<Container class="berry-input-time" {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <div class="container"  class:invalid={false}>
        <input class="text-input" type="time" on:input={input}
            value={inputValue} placeholder="--"/>
        <div class="postfix-wrapper">
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
    /* fight Svelte's specificity shenanigans */
    .text-input.text-input {
        padding: initial;
        /* Negative margin and transparency to make postfix visible + clickable */
        margin-right: calc(-1 * var(--br-postfix-width));
        background-color: transparent;
    }
    input[type=time] {
        font-family: var(--br-font-family);
    }

    /*
    💡  Pro-tip: Enable User Agent Shadow DOM in Chrome Devtools to see these.
        > Devtools > Settings > Preferences > Elements:Show user agent shadow DOM
    */

    input[type=time]::-webkit-datetime-edit,
    input[type=time]::-webkit-datetime-edit-fields-wrapper {
        height: 100%;
        min-width: fit-content;
    }
    input[type=time]::-webkit-datetime-edit-fields-wrapper {
        display: grid;
        gap: 2px;
        grid-auto-flow: column;
        box-sizing: border-box;
    }
    input[type=time]::-webkit-datetime-edit-hour-field,
    input[type=time]::-webkit-datetime-edit-minute-field,
    input[type=time]::-webkit-datetime-edit-ampm-field,
    input[type=time]::-webkit-datetime-edit-text {
        display: flex;
        align-items: center;
        border-radius: var(--br-border-radius);
        box-sizing: border-box;
    }
    input[type=time]::-webkit-datetime-edit-hour-field,
    input[type=time]::-webkit-datetime-edit-minute-field,
    input[type=time]::-webkit-datetime-edit-ampm-field {
        padding: 2px;
    }
    /* An innerbox wrapping indiviually hour/minute/am+pm inputs */
    input[type=time]::-webkit-datetime-edit-hour-field:hover,
    input[type=time]::-webkit-datetime-edit-minute-field:hover,
    input[type=time]::-webkit-datetime-edit-ampm-field:hover,
    input[type=time]::-webkit-datetime-edit-hour-field:focus,
    input[type=time]::-webkit-datetime-edit-minute-field:focus,
    input[type=time]::-webkit-datetime-edit-ampm-field:focus {
        background-color: var(--br-primary-light);
        color: var(--br-black);
    }
    input[type="time"]::-webkit-calendar-picker-indicator {
        height: 100%;
        width: var(--br-postfix-width);
        opacity: 0;
        box-sizing: border-box;
        z-index: 1;
        margin-inline-start: 0;
    }
    .postfix-wrapper {
        position: relative;
        z-index: -1;
    }
    .postfix-wrapper :global(.berry-icon) {
        --br-icon-size: var(--br-input-time-icon-size);
    }
</style>