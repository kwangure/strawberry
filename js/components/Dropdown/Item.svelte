<script>
    export let active = false;
</script>

<svelte:options tag="berry-dropdown-item"/>

<div class="menu-item" on:click class:active>
    <slot/>
</div>

<style>
    @import "../../../css/strawberry.css";
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
        padding: var(--item-vertical-padding) var(--item-horizontal-padding);
        margin: calc(-1 * var(--item-vertical-padding)) calc(-1 * var(--item-horizontal-padding));
        text-decoration: none;
        color: inherit;
    }

    .menu-item.active,
    .menu-item:hover {
        color: var(--primary);
        background-color: var(--primary-light);
    }
</style>