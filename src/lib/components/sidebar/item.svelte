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

<div class:active use:forward>
    <slot></slot>
</div>

<style>
    div {
        cursor: pointer;
        display: flex;
        align-items: center;
        height: var(--br-sidebar-item-height);
        padding-block: var(--br-sidebar-item-padding-block);
        padding-inline: var(--br-sidebar-item-padding-inline);
        border-radius: var(--br-sidebar-item-border-radius);
        color: var(--br-sidebar-item-font-color);
    }
    div:hover {
        background-color: var(--br-sidebar-item-hover-background-color);
    }
    div.active {
        background-color: var(--br-sidebar-item-active-background-color);
        color: var(--br-sidebar-item-active-font-color);
    }
    div.active:hover {
        background-color: var(--br-sidebar-item-active-hover-background-color);
    }
</style>