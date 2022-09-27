<header>
    <slot/>
</header>

<style>
    header {
        display: flex;
        gap: var(--br-dialog-header-gap);
        justify-content: space-between;
        align-items: flex-start;
        padding-block: var(--br-dialog-header-padding-block);
		padding-inline: var(--br-dialog-header-padding-inline);
        background-color: var(--br-dialog-header-background-color);
    }
</style>