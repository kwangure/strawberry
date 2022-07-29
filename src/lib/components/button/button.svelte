<!--
    @component

    Button triggers an event or action. They let users know what will happen
    next.
-->
<script>
    import { createEventForwarder } from '../../utils/forward-events.js';

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
     * @type {string | undefined}
     */
    export let form = undefined;

    /**
     * The URL that the form associated with the button will submit to.
     *
     * @type {string | undefined}
     */
    export let formaction = undefined;

    /**
     * How to encode form data if the button is a submit button
     *
     * @type {"application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain" | undefined}
     */
    export let formenctype = undefined;

    /**
     * The HTTP method used to submit the form data if the button is a submit button
     *
     * @type {"get" | "post" | undefined}
     */
    export let formmethod = undefined;

    /**
     * When true, the form associated with the button will not be validated.
     *
     * @type {boolean}
     */
    export let formnovalidate = false;

    /**
     * The name of the tab or window to submit and display the response from submitting the form.
     *
     * @type {"_self" | "_blank" | "_parent" | "_top" | string | undefined}
     */
    export let formtarget = undefined;

    /**
     * The name of the button. Submitted by its parent form as part of a name/value pair.
     *
     * @type {string}
     */
    export let name = '';

    /**
     * The value of the button. Submitted by its parent form as part of a name/value pair.
     *
     * @type {string}
     */
    export let value = '';

    if ($$props.primary !== undefined) {
    	console.error('The \'primary\' prop has been removed. Use the \'Button.Primary\' component or CSS custom properties to overwrite color styles.');
    }

    const forward = createEventForwarder();
</script>

<!-- svelte-ignore a11y-autofocus -->
<button {autofocus} {disabled} {form} {formaction} {formenctype} {formmethod}
    {formnovalidate} {formtarget} {name} {value} use:forward>
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
    button {
        line-height: 1.2;
        display: var(--br-button-root-display);
        gap: var(--br-button-root-gap);
        font-weight: 400;
        white-space: nowrap;
        align-items: center;
        justify-content: center;
        border: var(--br-button-root-border);
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        height: var(--br-button-root-height);
        padding-inline: var(--br-button-root-padding-inline);
        font-size: 14px;
        border-radius: var(--br-button-root-border-radius);
        color: var(--br-button-root-font-color);
        background-color: var(--br-button-root-background-color);
        outline: none;
        width: var(--br-button-root-width);
    }
    button:disabled {
        cursor: not-allowed;
    }
    button:hover:not(:active) {
        background-color: var(--br-button-root-hover-background-color);
        border: var(--br-button-root-hover-border);
    }
</style>
