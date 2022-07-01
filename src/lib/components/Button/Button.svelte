<script context="module">
    export const docs = true;
</script>

<!--
    @component

    A button triggers an event or action. They let users know what will happen next.
-->
<script>
    import "../../css/styles.js";
    import { createEventForwarder } from "../../utils/forward-events.js";

    /**
     * When true, the button will have input focus when the page loads.
     *
     * @type {boolean}
     */
    export let autofocus = false;

    /**
     * When true, the button cannot be pressed or focused.
     *
     * @type {boolean}
     */
    export let disabled = false;

    /**
     * The ID of the form element that the datetime input is associated with.
     *
     * @type {string}
     */
    export let form = "";

    /**
     * The URL that the form associated with the button will submit to.
     *
     * @type {string}
     */
    export let formaction = "";

    /**
     * How to encode form data if the button is a submit button
     *
     * @type {"application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain" | ""}
     */
    export let formenctype = "";

    /**
     * The HTTP method used to submit the form data if the button is a submit button
     *
     * @type {"get" | "post" | ""}
     */
    export let formmethod = "";

    /**
     * When true, the form associated with the button will not be validated.
     *
     * @type {boolean}
     */
    export let formnovalidate = false;

    /**
     * The name of the tab or window to submit and display the response from submitting the form.
     *
     * @type {"_self" | "_blank" | "_parent" | "_top" | string}
     */
    export let formtarget =  "";

    /**
     * The name of the button. Submitted by its parent form as part of a name/value pair.
     *
     * @type {string}
     */
    export let name = "";

    /**
     * The value of the button. Submitted by its parent form as part of a name/value pair.
     *
     * @type {string}
     */
    export let value = "";

    /**
     * Indicates whether the button should be coloured using the primary colour.
     *
     * @type {boolean}
     */
    export let primary = false;

    const forward = createEventForwarder();
</script>

<!-- svelte-ignore a11y-autofocus -->
<button {autofocus} {disabled} {form} {formaction} {formenctype} {formmethod}
    {formnovalidate} {formtarget} {name} {value} class="berry-button"
    class:primary use:forward>
    <!--
        Any content that is acceptable in a HTMLButtonElement.
        @usage
        <Button>
            // Default slot content
            I am button content
        </Button>
    -->
    <slot />
</button>

<style>
    @media (prefers-color-scheme: dark) {
        button {
            --br-button-background-color: rgba(255,255,255, 0.05);
            --br-button-hover-background-color: rgba(255,255,255, 0.2);
        }
    }
    @media (prefers-color-scheme: light) {
        button {
            --br-button-background-color: transparent;
            --br-button-hover-background-color: rgba(0,0,0, 0.1);
        }
    }
    button {
        --br-button-text-color: inherit;
        --br-button-border: var(--br-default-border);
        --br-button-height: var(--br-default-item-height);
        --br-button-border-radius: var(--br-border-radius);
        --br-button-width: auto;
        --br-button-gap: 5px;
    }
    button {
        line-height: 1.2;
        display: inline-flex;
        font-weight: 400;
        white-space: nowrap;
        align-items: center;
        justify-content: center;
        border: var(--br-button-border);
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        height: var(--br-button-height);
        padding: 0 10px;
        font-size: 14px;
        border-radius: var(--br-button-border-radius);
        color: var(--br-button-text-color);
        background-color: var(--br-button-background-color);
        outline: none;
        width: var(--br-button-width);
    }
    button:disabled {
        cursor: not-allowed;
    }
    button:focus:not(:active),
    button:hover:not(:active) {
        background-color: var(--br-button-hover-background-color);
        border-color: var(--br-button-hover-background-color);
    }
    button.primary {
        color: #fff;
        background-color: var(--br-primary);
        border: none;
    }
    button.primary:active,
    button.primary:hover,
    button.primary:focus {
        background-color: var(--br-primary-hover) !important;
        color: #fff !important;
    }
</style>
