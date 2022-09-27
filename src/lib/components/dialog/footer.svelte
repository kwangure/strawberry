<footer>
    <slot></slot>
</footer>

<style>
    footer {
        display: flex;
        flex-wrap: wrap;
        gap: var(--br-dialog-footer-gap);
        justify-content: space-between;
        align-items: flex-start;
        padding-block: var(--br-dialog-footer-padding-block);
		padding-inline: var(--br-dialog-footer-padding-inline);
        background-color: var(--br-dialog-footer-background-color);
    }
</style>