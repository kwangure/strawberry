<div>
    <slot></slot>
</div>

<style>
    div {
        position: absolute;
        top: var(--br-dropdown-popup-top);
        left: var(--br-dropdown-popup-left);
        padding-block: var(--br-dropdown-popup-padding-block);
		padding-inline: var(--br-dropdown-popup-padding-inline);
        background-color: var(--br-dropdown-popup-background-color);
        border-radius: var(--br-dropdown-popup-border-radius);
        visibility: var(--br-dropdown-popup-show, --br-dropdown-popup-visibility);
        gap: var(--br-dropdown-popup-gap);
        display: flex;
        flex-direction: column;
        box-shadow: var(--br-dropdown-popup-box-shadow);
    }
</style>