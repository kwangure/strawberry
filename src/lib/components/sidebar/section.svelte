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
        padding: var(--br-item-padding-block) var(--br-item-padding-inline) var(--br-inner-gutter);
        position: sticky;
        top: 0;
        text-transform: uppercase;
        color: var(--br-grey);
        font-size: 12.5px;
    }
    .items {
        display: flex;
        flex-direction: column;
        padding-left: var(--br-outer-gutter);
        gap: var(--br-inner-gutter);
    }
</style>
