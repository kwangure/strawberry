<section class="berry-sidebar-section sidebar-section">
    <div class="title">
        <slot name="title"/>
    </div>
    <div class="items">
        <slot name="items"></slot>
    </div>
</section>

<style>
    .title {
        padding: 8px 12px 4px;
        position: sticky;
        top: 0;
        text-transform: uppercase;
        color: rgb(150, 150, 150);
        font-size: 12.5px;
    }
    .items {
        display: flex;
        flex-direction: column;
        padding-left: 8px;
        gap: 4px;
    }
</style>
