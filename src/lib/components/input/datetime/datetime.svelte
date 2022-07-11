<script context="module">
    export const docs = true;
</script>

<script>
    import Container from "../container.svelte";
    import { createEventForwarder } from "$lib/utils/forward-events.js";
    import { slide } from "svelte/transition";
    import { validate } from "../validate";
    import { writable } from "svelte/store";

    /**
     * Guidance to the browser on information expected in the field.
     * Helps UserAgent automate filling form field values.
     *
     * @type {"off" | "on" | undefined}
     */
    export let autocomplete = undefined;

    /**
     * Whether select should have input focus when the page loads.
     *
     * @type {boolean | undefined}
     */
    export let autofocus = undefined;

    /**
     * A function that takes a validity state string and returns an error message.
     *
     * @type {((error: string, input: HTMLInputElement) => string) | undefined}
     */
    export let error = undefined;

    /**
     * When true, prevents the user from interacting with the input.
     *
     * @type {boolean}
     */
    export let disabled = false;

    /**
     * The ID of the form element that the datetime input is associated with.
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
     * @type {string | undefined}
     */
    export let list = undefined;

    /**
     * A date string representing the latest date to accept.
     *
     * @type {string | undefined}
     */
    export let max = undefined;

    /**
     * A date string representing the earliest date to accept
     *
     * @type {string | undefined}
     */
    export let min = undefined;

    /**
     * The name of the datetime input. Submitted with its parent form as part of a name/value pair.
     *
     * @type {string | undefined}
     */
    export let name = undefined;

    /**
     * Indicates that the user should not be able to edit the value of the input
     *
     * @type {boolean | undefined}
     */
    export let readonly = undefined;

    /**
     * The granularity that the input value should adhere to
     *
     * @type {number | undefined}
     */
    export let step = undefined;

    /**
     * A string representing a date and time (in the local time zone)
     *
     * @type {string | undefined}
     */
    export let value = undefined;

    const forward = createEventForwarder();
    const errorMessage = writable("");
</script>

<Container {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <div class="container">
        <!-- svelte-ignore a11y-autofocus -->
        <input {autocomplete} {autofocus} {disabled} {form}
            {list} {max} {min} {name} {readonly} {step}
            class="text-input" bind:value use:forward use:validate={{ invalid, error, errorMessage }}
            on:keydown type="datetime-local" id={labelId}>
    </div>
    {#if $errorMessage}
        <div class="invalid" transition:slide>
            {$errorMessage}
        </div>
    {/if}
</Container>

<style>
    @import "../css/input.css";
    @import "../css/container.css";

    :host,
    :root {
        --br-input-datetime-padding-block: 5px;
        --br-input-datetime-padding-inline: 12px;
    }

    @media (prefers-color-scheme: dark) {
        input {
            /** Encoded from Material design icons. Path is `import("@mdi/js").mdiCalendar` */
            --br-input-datetime-background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9IjAgMCAyNCAyNCI+DQogICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE5LDE5SDVWOEgxOU0xNiwxVjNIOFYxSDZWM0g1QzMuODksMyAzLDMuODkgMyw1VjE5QTIsMiAwIDAsMCA1LDIxSDE5QTIsMiAwIDAsMCAyMSwxOVY1QzIxLDMuODkgMjAuMSwzIDE5LDNIMThWMU0xNywxMkgxMlYxN0gxN1YxMloiPjwvcGF0aD4NCjwvc3ZnPg==);
        }
    }
    @media (prefers-color-scheme: light) {
        input {
            /** Encoded from Material design icons. Path is `import("@mdi/js").mdiCalendar` */
            --br-input-datetime-background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9IjAgMCAyNCAyNCI+DQogICAgPHBhdGggZD0iTTE5LDE5SDVWOEgxOU0xNiwxVjNIOFYxSDZWM0g1QzMuODksMyAzLDMuODkgMyw1VjE5QTIsMiAwIDAsMCA1LDIxSDE5QTIsMiAwIDAsMCAyMSwxOVY1QzIxLDMuODkgMjAuMSwzIDE5LDNIMThWMU0xNywxMkgxMlYxN0gxN1YxMloiPjwvcGF0aD4NCjwvc3ZnPg==);
        }
    }

    input::-webkit-calendar-picker-indicator {
        background-image: var(--br-input-datetime-background-image);
        width: 20px;
        height: 20px;
    }

    input {
        padding-block: var(--br-input-datetime-padding-block);
        padding-inline: var(--br-input-datetime-padding-inline) calc(var(--br-input-datetime-padding-inline)/2);
    }
</style>
