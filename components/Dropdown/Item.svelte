<script>
    import { createEventForwarder } from "../../utils/forward-events.js";

    export let active = false;

    const forward = createEventForwarder();
</script>

<div class="menu-item" use:forward class:active>
    <slot/>
</div>

<style>
    .menu-item {
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
        white-space: nowrap;
        cursor: pointer;
        display: flex;
        align-items: center;
        min-width: 130px;
        background-color: var(--br-white);
    }

    .menu-item:not(.linked) {
        padding: 8px 16px;
    }

    .menu-item :global(a) {
        display: flex;
        padding: var(--br-item-vertical-padding) var(--br-item-horizontal-padding);
        margin: calc(-1 * var(--br-item-vertical-padding)) calc(-1 * var(--br-item-horizontal-padding));
        text-decoration: none;
        color: inherit;
    }

    .menu-item.active,
    .menu-item:hover {
        color: var(--br-primary);
        background-color: var(--br-primary-light);
    }
</style>