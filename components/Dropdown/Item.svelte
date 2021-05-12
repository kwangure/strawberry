<script>
    import { createEventForwarder } from "../../utils/forward-events.js";

    export let active = false;

    const forward = createEventForwarder();
</script>

<div class="menu-item" use:forward class:active>
    <slot/>
</div>

<style>
    @import "./item.css";
</style>