<script>
    export let active = false;
</script>

<svelte:options tag="berry-dropdown-item"/>

<div class="menu-item" on:click class:active>
    <slot/>
</div>

<style>
    .menu-item {
        --vertical-padding: 8px;
        --horizontal-padding: 16px;
    }
    .menu-item {
        clear: both;
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
        white-space: nowrap;
        cursor: pointer;
        transition: all .3s;
        min-width: 130px;
        background-color: var(--white);
    }

    .menu-item:not(.linked) {
        padding: 8px 16px;
    }

    .menu-item :global(a) {
        display: flex;
        padding: var(--vertical-padding) var(--horizontal-padding);
        margin: calc(-1 * var(--vertical-padding)) calc(-1 * var(--horizontal-padding));
        text-decoration: none;
        color: inherit;
    }

    .menu-item.active,
    .menu-item:hover {
        color: var(--primary);
        background-color: var(--primary-light);
    }
</style>