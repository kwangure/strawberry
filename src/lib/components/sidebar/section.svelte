<script>
    /** @type {string} */
    export let title;
</script>

<section>
    <div class="title">{title}</div>
    <div class="items">
        <slot></slot>
    </div>
</section>

<style>
    .title {
        padding: 8px 12px 4px;
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
        padding-left: 8px;
        gap: 4px;
    }
</style>
