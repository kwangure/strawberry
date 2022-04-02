<script>
    import Container from "../Container.svelte";
    import { createEventForwarder } from "../../../utils/forward-events.js";
    import Option from "./Option.svelte";

    /**
     * Guidance to the browser on information expected in the field.
     * Helps UserAgent automate filling form field values.
     *
     * @type {"off" | "on"}
     */
    export let autocomplete = undefined;

    /**
     * Whether select should have input focus when the page loads.
     *
     * @type {boolean}
     */
    export let autofocus = undefined;

    /**
     * Indicates that the user cannot interact with the Select.
     *
     * @type {boolean}
     */
    export let disabled = undefined;

    /**
     * The id of the form to associate with a Select
     *
     * @type {string}
     */
    export let form = undefined;

    /**
     * Whether to hide the input label.
     *
     * @type {boolean}
     */
    export let hideLabel = false;

    /**
     *  Briefly hints the kind of information is expected in the field
     * @type {string}
     */
    export let placeholder;

    /**
     * Indicate that an Option with a non-empty string value must be selected
     *
     * @type {string}
     */
    export let required = undefined;

    /**
     * The value of the Select.
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
        <select {autocomplete} {autofocus} {disabled} {form} {required}
            bind:value id={labelId} {placeholder} use:forward>
            <Option value="" disabled selected>{placeholder}</Option>
            <slot></slot>
        </select>
    </div>
</Container>

<style>
    @import "../css/container.css";

    select {
        color: var(--br-select-text-color, var(--br-text-color, inherit));
        width: var(--br-select-width, initial);
        font-size: 14px;
        line-height: 1.5;
        background-color: var(--br-select-background-color, var(--br-white, transparent));
        background-image: none;
        border: none;
        outline: 0;
        padding: var(--br-input-padding-block, 5px) var(--br-input-padding-inline, 8px);
    }

</style>

<script context="module">
    export const docs = true;
</script>