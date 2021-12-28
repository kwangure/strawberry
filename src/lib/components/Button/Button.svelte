<!--
    @component

    A button triggers an event or action. They let users know what will happen next.
-->
<script>
    import { createEventForwarder } from "../../utils/forward-events.js";
    import Icon from "../Icon";

    /**
     * Indicates whether the button should be coloured using the primary colour.
     * @type {boolean}
     */
    export let primary = false;
    /**
     * A "d" string that is usable in an SVG path element.
     * @type {string}
     */
    export let icon = "";

    const forward = createEventForwarder();
</script>


<button class="berry-button" class:primary class:icon
    class:slot_used={$$slots.default}
    {...$$restProps} use:forward>
    <div class="content-wrapper">
        {#if icon}
            <span class="button-prefix">
                <Icon path={icon}/>
            </span>
        {/if}
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
    button {
        line-height: 1.5;
        position: relative;
        display: inline-block;
        font-weight: 400;
        white-space: nowrap;
        text-align: center;
        border: var(--br-button-border, var(--br-border));
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        height: var(--br-button-height, var(--br-item-height));
        padding: 0 10px;
        font-size: 14px;
        border-radius: var(--br-button-border-radius, var(--br-border-radius));
        color: var(--br-button-text-color, var(--br-text-color));
        background-color: transparent;
        outline: none;
        width: var(--br-button-width, auto);
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
    .button-prefix {
        display: flex;
    }
    button.slot_used :global(.berry-icon) {
        margin-right: 5px;
    }
    button.icon.slot_used {
        padding-right: 16px;
    }
</style>