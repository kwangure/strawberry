<article>
    <slot></slot>
</article>

<style>
    article {
        overflow-y: auto;
        max-block-size: 100%;
        /* safari */
        overscroll-behavior-y: contain;
        display: flex;
        flex-direction: column;
        gap: var(--br-dialog-content-gap);
        padding-block: var(--br-dialog-content-padding-block);
		padding-inline: var(--br-dialog-content-padding-inline);
        flex-grow: 1;
        background-color: var(--br-dialog-content-background-color);
    }
</style>