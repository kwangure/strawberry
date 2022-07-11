<script context="module">
    export const docs = true;
</script>

<script>
    import Container from "../container.svelte";
    import { createEventForwarder } from "../../../utils/forward-events.js";
    import { slide } from "svelte/transition";
    import { validate } from "../validate";
    import { writable } from "svelte/store";

    /**
     * Guidance to the browser on information expected in the field.
     * Helps UserAgent automate filling form field values.
     *
     * @type {"off" | "on" | string}
     */
    export let autocomplete = "";

    /**
     * When true, the button will have input focus when the page loads.
     *
     * @type {boolean}
     */
    export let autofocus = false;

    /**
     * A function that takes a validity state string and returns an error message.
     *
     * @type {((error: string, input: HTMLInputElement) => string) | undefined}
     */
    export let error = undefined;

    /**
     * When true, the input cannot be edited or focused.
     *
     * @type {boolean}
     */
    export let disabled = false;

    /**
     * The ID of the form element that the time input is associated with.
     *
     * @type {string | undefined}
     */
    export let form = undefined;

    /**
     * Whether to hide the input label.
     *
     * @type {boolean}
     */
    export let hideLabel = false;

    /**
     * A function that returns the validity of the input.
     *
     * @type {((input: HTMLInputElement) => string) | undefined}
     */
    export let invalid = undefined;

    /**
     * The id of a <datalist> element located in the same document.
     *
     * @type {string}
     */
    export let list = "";

    /**
     * A string representing the latest time to accept.
     *
     * @type {string}
     */
    export let max = "";

    /**
     * A string representing the earliest time to accept
     *
     * @type {string}
     */
    export let min = "";

    /**
     * The name of the time input. Submitted with its parent form as part of a name/value pair.
     *
     * @type {string}
     */
    export let name = "";

    /**
     * When true, the user cannot edit the value of the input
     *
     * @type {boolean}
     */
    export let readonly = false;

    /**
     * When true, indicates that the user must input a value before the parent form can be submitted.
     *
     * @type {boolean}
     */
    export let required = false;

    /**
     * The granularity in seconds that the time input value must adhere to
     *
     * @type {number}
     */
    export let step = 60;

    /**
     * The initial value of the input.
     *
     * An ISO 8601 dateString or Date.
     *
     * @type {string}
     */
    export let value = "";

    const forward = createEventForwarder();
    const errorMessage = writable("");
</script>

<Container {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <div class="container">
        <!-- svelte-ignore a11y-autofocus -->
        <input {autocomplete} {autofocus} {disabled} {form} {list} {max} {min}
            {name} {readonly} {required} {step}
            class="text-input" bind:value use:forward use:validate={{ invalid, error, errorMessage }}
            on:keydown type="time" id={labelId}>
    </div>
    {#if $errorMessage}
        <div class="invalid" transition:slide>
            {$errorMessage}
        </div>
    {/if}
</Container>

<style>
    @import "../css/container.css";
    @import "../css/input.css";

    :host,
    :root {
        --br-input-time-padding-block: 5px;
        --br-input-time-padding-inline: 12px 8px;
    }

    @media (prefers-color-scheme: dark) {
        input {
            /** Encoded from Material design icons. Path is `import("@mdi/js").mdiClockOutline` */
            --br-input-time-background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTIsMjBBOCw4IDAgMCwwIDIwLDEyQTgsOCAwIDAsMCAxMiw0QTgsOCAwIDAsMCA0LDEyQTgsOCAwIDAsMCAxMiwyME0xMiwyQTEwLDEwIDAgMCwxIDIyLDEyQTEwLDEwIDAgMCwxIDEyLDIyQzYuNDcsMjIgMiwxNy41IDIsMTJBMTAsMTAgMCAwLDEgMTIsMk0xMi41LDdWMTIuMjVMMTcsMTQuOTJMMTYuMjUsMTYuMTVMMTEsMTNWN0gxMi41WgoiPjwvcGF0aD4KPC9zdmc+);
        }
    }
    @media (prefers-color-scheme: light) {
        input {
            /** Encoded from Material design icons. Path is `import("@mdi/js").mdiClockOutline` */
            --br-input-time-background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8cGF0aCBkPSJNMTIsMjBBOCw4IDAgMCwwIDIwLDEyQTgsOCAwIDAsMCAxMiw0QTgsOCAwIDAsMCA0LDEyQTgsOCAwIDAsMCAxMiwyME0xMiwyQTEwLDEwIDAgMCwxIDIyLDEyQTEwLDEwIDAgMCwxIDEyLDIyQzYuNDcsMjIgMiwxNy41IDIsMTJBMTAsMTAgMCAwLDEgMTIsMk0xMi41LDdWMTIuMjVMMTcsMTQuOTJMMTYuMjUsMTYuMTVMMTEsMTNWN0gxMi41WiI+PC9wYXRoPgo8L3N2Zz4=);
        }
    }

    input::-webkit-datetime-edit {
        display: contents;
    }
    input::-webkit-calendar-picker-indicator {
        padding-inline: 0;
    }
    input::-webkit-calendar-picker-indicator {
        background-image: var(--br-input-time-background-image);
        width: 20px;
        height: 20px;
    }
    input {
        padding-block: var(--br-input-time-padding-block);
        padding-inline: var(--br-input-time-padding-inline);
    }
</style>
