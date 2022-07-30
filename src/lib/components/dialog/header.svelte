<header>
    <slot/>
</header>

<style>
    header {
        display: flex;
        gap: var(--size-3);
        justify-content: space-between;
        align-items: flex-start;
        padding-block: var(--size-3);
        padding-inline: var(--size-5);
    }
    @media (prefers-color-scheme: dark) {
        header {
            background-color: var(--surface-1);
        }
    }

    @media (prefers-color-scheme: light) {
        header {
            background-color: var(--surface-2);
        }
    }
</style>