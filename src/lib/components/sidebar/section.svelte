<script>
    /** @type {string} */
    export let title = '';
</script>

<section>
    {#if title}
        <div class="title">{title}</div>
    {/if}
    <div class="items">
        <slot></slot>
    </div>
</section>

<style>
    .title {
        padding-block: var(--br-size-3) var(--br-size-2);
        padding-inline: var(--br-sidebar-section-indent, var(--br-size-3));
        position: sticky;
        top: 0;
        text-transform: uppercase;
        color: rgb(150, 150, 150);
        background-color: var(--br-background-color);
        font-size: 12.5px;
    }
    .items {
        display: flex;
        flex-direction: column;
        padding-inline-start: var(--br-sidebar-section-indent, var(--br-size-3));
        gap: var(--br-sidebar-section-gap, var(--br-size-2));
    }
</style>
