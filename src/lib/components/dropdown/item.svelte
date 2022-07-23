<!--
    @component

    Item is an action a user can perform or a link to a page displayed in a
    group.
-->
<script>
    import { createEventForwarder } from '../../utils/forward-events.js';

    export let active = false;

    const forward = createEventForwarder();
</script>

<div class="menu-item" use:forward class:active>
    <slot/>
</div>

<style>
    div {
        white-space: nowrap;
        cursor: pointer;
        display: flex;
        align-items: center;
        width: var(--br-dropdown-item-width);
        height: var(--br-dropdown-item-height);
        padding-block: var(--br-dropdown-item-padding-block);
        padding-inline: var(--br-dropdown-item-padding-inline);
        border-radius: var(--br-dropdown-item-border-radius);
    }

    div:hover {
        color: var(--br-dropdown-item-hover-font-color);
        background-color: var(--br-dropdown-item-hover-background-color);
    }

    div.active {
        color: var(--br-dropdown-item-active-font-color);
        background-color: var(--br-dropdown-item-active-background-color);
    }

    div.active:hover {
        color: var(--br-dropdown-item-active-hover-font-color);
        background-color: var(--br-dropdown-item-active-hover-background-color);
    }
</style>
