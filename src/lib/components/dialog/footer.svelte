<footer>
    <slot></slot>
</footer>

<style>
    footer {
        display: flex;
        flex-wrap: wrap;
        gap: var(--size-3);
        justify-content: space-between;
        align-items: flex-start;
        padding-inline: var(--size-5);
        padding-block: var(--size-3);
    }

    @media (prefers-color-scheme: dark) {
        footer {
            background-color: var(--surface-1);
        }
    }

    @media (prefers-color-scheme: light) {
        footer {
            background-color: var(--surface-2);
        }
    }
</style>