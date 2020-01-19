<script>
    export let active = false;
</script>

<svelte:options tag="berry-sidebar-item"/>

<div class="sidebar-item" class:active on:click>
    <slot></slot>
</div>

<style>
    .sidebar-item {
        --vertical-padding: 8px;
        --horizontal-padding: 12px;
    }
    .sidebar-item {
        cursor: pointer;
        background-color: transparent;
        border-radius: 4px;
        position: relative;
    }
    .sidebar-item, 
    .sidebar-item > :global(a) {
        display: flex;
        align-items: center;
        min-height: 40px;
        line-height: 24px;
        text-decoration: none;
        padding: var(--vertical-padding) var(--horizontal-padding);
    }
    .sidebar-item > :global(a) {
        margin: calc(var(--vertical-padding) * -1) calc(var(--horizontal-padding) * -1);
        color: inherit;
        flex: auto;
    }
    
    .sidebar-item:not(.active):hover {
        background-color: var(--grey-lightest);
    }
    .sidebar-item.active {
        background-color: var(--primary-light);
        color: var(--primary);
    }
    .sidebar-item + .sidebar-item {
        margin-top: 3px;
    }
</style>