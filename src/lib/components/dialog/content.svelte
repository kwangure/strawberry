<article>
    <slot></slot>
</article>

<style>
    article {
        overflow-y: auto;
        max-block-size: 100%;
        /* safari */
        overscroll-behavior-y: contain;
        display: grid;
        justify-items: flex-start;
        gap: var(--size-3);
        box-shadow: var(--shadow-2);
        z-index: var(--layer-1);
        padding-inline: var(--size-5);
        padding-block: var(--size-3);
    }

    @media (prefers-color-scheme: light) {
        article {
            background: var(--surface-1);
        }

        article::-webkit-scrollbar {
            background: var(--surface-1);
        }
    }

    @media (prefers-color-scheme: dark) {
        article {
            border-block-start: var(--border-size-1) solid var(--surface-3);
        }
    }
</style>