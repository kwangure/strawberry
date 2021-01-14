<script>
    import { createEventForwarder } from "$utils/forward-events.js";
    import { slide } from "svelte/transition";

    const forward = createEventForwarder();
</script>

<div class="menu-item" use:forward transition:slide>
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
        min-width: 130px;
        background-color: var(--br-white);
    }

    .menu-item :global(b) {
        color: var(--br-primary);
        font-weight: 500;
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

    .menu-item:hover {
        color: var(--br-primary);
        background-color: var(--br-primary-light);
    }
</style>