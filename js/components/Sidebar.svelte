<script>
    export let items
    
    let active
</script>

<div class="sidebar">
    <div class="sidebar-head">
        <slot name="head"></slot>
    </div>
    <div class="sidebar-items">
        {#each items as item, index}
        
            <div class="sidebar-item {item.active ?'active':''}">
                <slot name="item" item={{...item, index}}></slot>
            </div>
        {/each}
    </div>
    <div class="sidebar-footer">
        <slot name="foot"></slot>
    </div>
</div>

<style>
    .sidebar {
        width: 240px;
        padding: 0 10px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .sidebar-items {
        overflow: hidden;
        overflow-y: scroll;
    }
    .sidebar-footer {
        margin-top: auto;
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
    .sidebar-item:not(.active):hover {
        background-color: #f9f9f9;
    }
    .sidebar-item.active {
        background-color: #e8f0fe;
        color:#2885ff;
    }
    .sidebar-item + .sidebar-item {
        margin-top: 3px;
    }
</style>