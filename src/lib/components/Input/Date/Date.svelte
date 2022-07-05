<script>
    import Container from "../Container.svelte";
    import { createEventForwarder } from "../../../utils/forward-events.js";

    /**
     * Guidance to the browser on information expected in the field.
     * Helps UserAgent automate filling form field values.
     *
     * @type {"off" | "on" | string}
     */
    export let autocomplete = "";

    /**
     * Whether select should have input focus when the page loads.
     *
     * @type {boolean}
     */
    export let autofocus = false;

    /**
     * When true, the input cannot be edited or focused.
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
     * The id of a <datalist> element located in the same document.
     *
     * @type {string}
     */
    export let list = "";

    /**
     * A date string representing the latest date to accept.
     *
     * @type {string}
     */
    export let max = "";

    /**
     * A date string representing the earliest date to accept
     *
     * @type {string}
     */
    export let min = "";

    /**
     * The name of the date input. Submitted with its parent form as part of a name/value pair.
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
     * The granularity in days that the date input value must adhere to
     *
     * @type {number}
     */
    export let step = 1;

    /**
     * A string representing a date in YYYY-MM-DD format
     *
     * @type {string}
     */
    export let value = "";

    const forward = createEventForwarder();

</script>

<Container {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <div class="container">
        <!-- svelte-ignore a11y-autofocus -->
        <input {autocomplete} {autofocus} {disabled} {form} {list} {max} {min}
            {name} {readonly} {required} {step}
            class="text-input" bind:value use:forward
            on:keydown type="date" id={labelId}>
    </div>
</Container>

<style>
    @import "../css/input.css";
    @import "../css/container.css";

    :host,
    :root {
        --br-input-date-padding-block: 5px;
        --br-input-date-padding-inline: 12px;
    }

    @media (prefers-color-scheme: dark) {
        input {
            /** Encoded from Material design icons. Path is `import("@mdi/js").mdiCalendar` */
            --br-input-date-background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9IjAgMCAyNCAyNCI+DQogICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE5LDE5SDVWOEgxOU0xNiwxVjNIOFYxSDZWM0g1QzMuODksMyAzLDMuODkgMyw1VjE5QTIsMiAwIDAsMCA1LDIxSDE5QTIsMiAwIDAsMCAyMSwxOVY1QzIxLDMuODkgMjAuMSwzIDE5LDNIMThWMU0xNywxMkgxMlYxN0gxN1YxMloiPjwvcGF0aD4NCjwvc3ZnPg==);
        }
    }
    @media (prefers-color-scheme: light) {
        input {
            /** Encoded from Material design icons. Path is `import("@mdi/js").mdiCalendar` */
            --br-input-date-background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9IjAgMCAyNCAyNCI+DQogICAgPHBhdGggZD0iTTE5LDE5SDVWOEgxOU0xNiwxVjNIOFYxSDZWM0g1QzMuODksMyAzLDMuODkgMyw1VjE5QTIsMiAwIDAsMCA1LDIxSDE5QTIsMiAwIDAsMCAyMSwxOVY1QzIxLDMuODkgMjAuMSwzIDE5LDNIMThWMU0xNywxMkgxMlYxN0gxN1YxMloiPjwvcGF0aD4NCjwvc3ZnPg==);
        }
    }

    input::-webkit-calendar-picker-indicator {
        background-image: var(--br-input-date-background-image);
        width: 20px;
        height: 20px;
    }

    input {
        padding-block: var(--br-input-date-padding-block);
        padding-inline: var(--br-input-date-padding-inline) calc(var(--br-input-padding-inline)/2);
    }
</style>

<script context="module">
    export const docs = true;
</script>
