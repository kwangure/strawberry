<script context="module">
    // TODO: Remove docs variable from component
    export const docs = true;
</script>

<!-- TODO: Add a component description here. See button for example -->
<script>
    import { createEventForwarder } from '../../utils/forward-events.js';

    export let active = false;

    const forward = createEventForwarder();
</script>

<div class="menu-item" use:forward class:active>
    <slot/>
</div>

<style>
    @import "./item.css";
</style>
