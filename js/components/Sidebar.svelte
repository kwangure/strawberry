<script>
    export let items
    
    let active
</script>

<div class="sidebar">
    <div class="sidebar-head">
        <slot name="head"></slot>
    </div>
    {#each items as item, index}
        <div class="sidebar-item {item.active ?'active':''}">
            <slot name="item" item={{...item, index}}></slot>
        </div>
    {/each}
</div>

<style>
    .sidebar {
        width: 240px;
        padding: 0 10px;
        height: 100%;
    }
    .sidebar-item {
        cursor: pointer;
        background-color: transparent;
        border-radius: 4px;
        position: relative;
    }
    .sidebar-head,
    .sidebar-item {
        display: block;
        min-height: 40px;
        line-height: 24px;
        text-decoration: none;
        padding: 8px 12px;
    }
    .sidebar-item.icon {
        padding-left: 30px;
    }
    .sidebar-item:not(.active):hover {
        background-color: #f9f9f9;
    }
    .sidebar-item > :global(*:active),
    .sidebar-item.active {
        background-color: #e8f0fe;
    }
    .sidebar-item.active > :global(*) {
        color:#2885ff;
    }
</style>