<script>
    import { createEventForwarder } from "$utils/forward-events.js";
    
    export let active = false;

    const forward = createEventForwarder();
</script>

<div class="sidebar-item" class:active use:forward>
    <slot></slot>
</div>

<style>
    .sidebar-item {
        cursor: pointer;
        background-color: transparent;
        position: relative;
    }
    .sidebar-item,
    .sidebar-item > :global(a) {
        display: flex;
        align-items: center;
        min-height: 40px;
        line-height: 24px;
        text-decoration: none;
        padding: var(--br-item-vertical-padding) var(--br-item-horizontal-padding);
        border-radius: var(--br-border-radius);
    }
    .sidebar-item > :global(a) {
        margin: calc(var(--br-item-vertical-padding) * -1) calc(var(--br-item-horizontal-padding) * -1);
        color: inherit;
        flex: auto;
    }

    .sidebar-item:not(.active):hover,
    .sidebar-item:not(.active) > :global(a:focus) {
        background-color: var(--br-grey-lightest);
    }
    .sidebar-item.active {
        background-color: var(--br-primary-light);
        color: var(--br-primary);
    }
    .sidebar-item + .sidebar-item {
        margin-top: 3px;
    }
</style>