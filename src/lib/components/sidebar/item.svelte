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

<div class="sidebar-item" class:active use:forward>
    <slot></slot>
</div>

<style>
    @import "./item.css";
</style>