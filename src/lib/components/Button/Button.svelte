<script context="module">
    export const docs = true;
</script>

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

<button class="berry-button" class:primary {...$$restProps} use:forward>
    <div class="content-wrapper">
        <!--
            Any content that is acceptable in a HTMLButtonElement.
            @usage
            <Button>
                // Default slot content
                I am button content
            </Button>
        -->
        <slot />
    </div>
</button>

<style>
    :export {
        --br-button-width: ;
        --br-button-height: ;
        --br-button-border: ;
        --br-button-border-radius: ;
        --br-button-text-color: ;
    }
    @media (theme: berry) and (prefers-color-scheme: dark) {
        :scope {
            --_button-background-color: rgba(255,255,255, 0.05);
            --_button-hover-background-color: rgba(255,255,255, 0.2);
            --_button-text-color: #dcdcdc;
        }
    }
    @media (theme: berry) and (prefers-color-scheme: light) {
        :scope {
            --_button-background-color: transparent;
            --_button-hover-background-color: rgba(0,0,0, 0.1);
            --_button-text-color: #333;
        }
    }
    button {
        line-height: 1.5;
        display: inline-flex;
        font-weight: 400;
        white-space: nowrap;
        align-items: center;
        justify-content: center;
        border: var(
            --br-button-border,
            var(--br-border, var(--br-default-border))
        );
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        height: var(--br-button-height, var(--br-item-height, var(--br-default-item-height)));
        padding: 0 10px;
        font-size: 14px;
        border-radius: var(--br-button-border-radius, var(--br-border-radius, var(--br-default-border-radius)));
        color: var(--br-button-text-color, var(--br-text-color, inherit));
        background-color: var(--_button-background-color);
        outline: none;
        width: var(--br-button-width, auto);
        gap: 5px;
    }
    button:disabled {
        cursor: not-allowed;
    }
    button .content-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1.2;
    }
    button:focus:not(:active),
    button:hover:not(:active) {
        background-color: var(--_button-hover-background-color);
        border-color: var(--_button-hover-background-color);
        color: var(--br-text-color, inherit);
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
    .button-prefix {
        display: flex;
    }
</style>
