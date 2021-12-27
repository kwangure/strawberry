<!--
    @component

    A button triggers an event or action. They let users know what will happen next.
-->
<script>
    import { createEventForwarder } from "../../utils/forward-events.js";

    /**
     * Indicates whether the button should be coloured using the primary colour.
     * @type {boolean}
     */
    export let primary = false;

    const forward = createEventForwarder();
</script>

<button class="berry-button" class:primary
    {...$$restProps} use:forward>
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
    .berry-button {
        --br-button-width: auto;
        --br-button-border: var(--br-border);
    }
    button {
        line-height: 1.5;
        position: relative;
        display: inline-flex;
        font-weight: 400;
        white-space: nowrap;
        text-align: center;
        border: var(--br-button-border);
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        height: var(--br-item-height);
        padding: 0 10px;
        font-size: 14px;
        border-radius: var(--br-border-radius);
        color: var(--br-text-color);
        background-color: transparent;
        outline: none;
        width: var(--br-button-width);
        align-items: center;
        justify-content: center;
    }
    button:disabled {
        cursor: not-allowed;
    }
    button:focus:not(:active),
    button:hover:not(:active) {
        background-color: var(--br-grey-lightest);
        border-color: var(--br-grey-lightest);
        color: var(--br-text-color);
    }
    button.primary {
        color: var(--br-white);
        background-color: var(--br-primary);
        border: none;
    }
    button.primary:active,
    button.primary:hover,
    button.primary:focus {
        background-color: var(--br-primary-hover) !important;
        color: var(--br-white) !important;
    }
</style>