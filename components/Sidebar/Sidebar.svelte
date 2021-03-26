<script>
    import Item from "./Item.svelte";
    export let items = [];
</script>

<div class="berry-sidebar">
    {#if $$slots.head}
        <div class="sidebar-head">
            <slot name="head"></slot>
        </div>
    {/if}
    <div class="sidebar-items">
        {#each items as item, index}
            <Item on:click={item.onclick} active={item.active}>
                <slot name="item" item={{ ...item, index }}></slot>
            </Item>
        {:else}
            <slot/>
        {/each}
    </div>
    {#if $$slots.foot}
        <div class="sidebar-foot">
            <slot name="foot"></slot>
        </div>
    {/if}
</div>

<style>
    .berry-sidebar {
        width: 240px;
        padding: 0 10px;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: none;
        user-select: none;
    }
    .sidebar-foot {
        margin-top: auto;
    }
    .sidebar-head{
        display: block;
        min-height: 40px;
        line-height: 24px;
        text-decoration: none;
        padding: 8px 12px;
    }
</style>