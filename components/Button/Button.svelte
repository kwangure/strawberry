<script>
    import Icon from "../Icon";

    export let primary = false;
    export let icon = "";
    export let iconProps = {};
    export let active = "";
    export let fullwidth = false;

    let slot_used = true;
</script>

<button class="berry-button" class:primary class:icon class:slot_used class:fullwidth
    class:active {...$$restProps} on:click on:hover on:mouseover on:mouseout>
    <div class="content-wrapper">
        {#if icon}
            <span class="button-prefix">
                <Icon path={icon} {...iconProps}></Icon>
            </span>
        {/if}
        <slot>{(slot_used = false) || ""}</slot>
    </div>
</button>

<style>
    button {
        line-height: 1.5;
        position: relative;
        display: inline-block;
        font-weight: 400;
        white-space: nowrap;
        text-align: center;
        border: 1px solid transparent;
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        height: var(--br-item-height);
        padding: 0 10px;
        font-size: 14px;
        border-radius: var(--br-border-radius);
        color: var(--br-text);
        background-color: transparent;
        border-color: var(--br-border-color);
        outline: none;
    }
    button:disabled {
        cursor: not-allowed;
    }
    button.fullwidth {
        width:100%;
    }
    button .content-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1.2;
    }
    button:focus:not(:active):not(.active),
    button:hover:not(:active):not(.active) {
        background-color: var(--br-grey-lightest);
        border-color: var(--br-grey-lightest);
        color: var(--br-text);
    }
    button:active,
    button.active {
        background-color: var(--br-primary-light);
        border-color: var(--br-primary-light);
        color:  var(--br-primary);
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