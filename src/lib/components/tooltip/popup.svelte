<div>
    <slot></slot>
</div>

<style>
    div {
        position: absolute;
        top: var(--br-tooltip-popup-top);
        left: var(--br-tooltip-popup-left);
        padding-block: var(--br-tooltip-popup-padding-block);
		padding-inline: var(--br-tooltip-popup-padding-inline);
        background-color: var(--br-tooltip-popup-background-color);
        border-radius: var(--br-tooltip-popup-border-radius);
        visibility: var(--br-tooltip-popup-show, --br-tooltip-popup-visibility);
    }
</style>