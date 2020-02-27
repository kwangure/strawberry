<script>
    export let active = false;
</script>

<svelte:options tag="berry-sidebar-item"/>

<div class="sidebar-item" class:active on:click>
    <slot></slot>
</div>

<style>
    @import "../../css/shared.css";
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
        padding: var(--item-vertical-padding) var(--item-horizontal-padding);
        border-radius: 4px;
    }
    .sidebar-item > :global(a) {
        margin: calc(var(--item-vertical-padding) * -1) calc(var(--item-horizontal-padding) * -1);
        color: inherit;
        flex: auto;
    }
    
    .sidebar-item:not(.active):hover,
    .sidebar-item:not(.active) > :global(a:focus) {
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