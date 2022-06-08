<script context="module">
    export const docs = true;
</script>

<script>
    import Container from "../Container.svelte";
    import { createEventForwarder } from "$lib/utils/forward-events.js";

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

</script>

<Container {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <div class="container">
        <!-- svelte-ignore a11y-autofocus -->
        <input {autocomplete} {autofocus} {disabled} {form}
            {list} {max} {min} {name} {readonly} {step}
            class="text-input" bind:value use:forward
            on:keydown type="datetime-local" id={labelId}>
    </div>
</Container>

<style>
    @import "../css/input.css";
    @import "../css/container.css";

    @media (theme: berry) and (prefers-color-scheme: dark) {
        :scope {
            /* TODO: encode this at build-time via a preprocessor */
            /** Encoded from Material design icons. Path is `import("@mdi/js").mdiCalendar` */
            --calendar-background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9IjAgMCAyNCAyNCI+DQogICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE5LDE5SDVWOEgxOU0xNiwxVjNIOFYxSDZWM0g1QzMuODksMyAzLDMuODkgMyw1VjE5QTIsMiAwIDAsMCA1LDIxSDE5QTIsMiAwIDAsMCAyMSwxOVY1QzIxLDMuODkgMjAuMSwzIDE5LDNIMThWMU0xNywxMkgxMlYxN0gxN1YxMloiPjwvcGF0aD4NCjwvc3ZnPg==);
        }
    }
    @media (theme: berry) and (prefers-color-scheme: light) {
        :scope {
            /* TODO: encode this at build-time via a preprocessor */
            /** Encoded from Material design icons. Path is `import("@mdi/js").mdiCalendar` */
            --calendar-background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9IjAgMCAyNCAyNCI+DQogICAgPHBhdGggZD0iTTE5LDE5SDVWOEgxOU0xNiwxVjNIOFYxSDZWM0g1QzMuODksMyAzLDMuODkgMyw1VjE5QTIsMiAwIDAsMCA1LDIxSDE5QTIsMiAwIDAsMCAyMSwxOVY1QzIxLDMuODkgMjAuMSwzIDE5LDNIMThWMU0xNywxMkgxMlYxN0gxN1YxMloiPjwvcGF0aD4NCjwvc3ZnPg==);
        }
    }

    input[type=datetime-local]::-webkit-calendar-picker-indicator {
        background-image: var(--calendar-background-image);
        width: 20px;
        height: 20px;
    }

    input[type=datetime-local] {
        padding-block: var(--br-input-padding-block, 5px);
        padding-inline: var(--br-input-padding-inline, 12px) calc(var(--br-input-padding-inline, 12px)/2);
    }
</style>
