<script>
    export let active = false;
</script>

<svelte:options tag="berry-sidebar-item"/>

<div class="sidebar-item" class:active on:click>
    <slot></slot>
</div>

<style>
    .sidebar-item {
        cursor: pointer;
        background-color: transparent;
        border-radius: 4px;
        position: relative;
    }
    .sidebar-item {
        display: flex;
        min-height: 40px;
        line-height: 24px;
        text-decoration: none;
        padding: 8px 12px;
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