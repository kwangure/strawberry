<script>
    import Icon from "../Icon";

    let className = "";
    export { className as class };
    export let color = ""; 
    export let icon = "";
    export let disabled = "";
    export let iconProps = {};
    export let active = "";
    export let fullwidth = false;
    
    let slot_used = true;
</script>

<svelte:options tag="berry-button"/>

<button class="{color? color: ''} {className}" class:icon class:slot_used class:fullwidth
    class:active {disabled} on:click on:hover on:mouseover on:mouseout>
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
    @import "../../css/shared.css";
    button {
        line-height: 1.5;
        position: relative;
        display: inline-block;
        font-weight: 400;
        white-space: nowrap;
        text-align: center;
        border: 1px solid transparent;
        cursor: pointer;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        user-select: none;
        touch-action: manipulation;
        height: var(--item-height);
        padding: 0 10px;
        font-size: 14px;
        border-radius: var(--border-radius);
        color: var(--text);
        background-color: transparent;
        border-color: var(--border-color);
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
        background-color: var(--grey-lightest);
        border-color: var(--grey-lightest);
        color: var(--text);
    }
    button:active,
    button.active {
        background-color: var(--primary-light);
        border-color: var(--primary-light);
        color:  var(--primary);
    }
    button.none {
        border: none;
    }
    button.primary {
        color: var(--white);
        background-color: var(--primary);
        border: none;
    }
    button.primary:active, 
    button.primary:hover,
    button.primary:focus {
        background-color: var(--primary-hover) !important;
        color: var(--white) !important;
    }
    .button-prefix {
        display: flex;
    }
    button.icon.slot_used {
        padding-right: 16px;
    }
    .visible {
        display: block;
    }
</style>