<script>
    import { createEventForwarder } from "../../utils/forward-events.js";

    export let path = "";
    export let href = "";

    $: active = href === path;

    const forward = createEventForwarder();
</script>

<a {href} class="menu-item" use:forward class:active>
    <slot/>
</a>

<style>
    @import "./item.css";
    a {
        text-decoration: none;
        color: inherit;
    }
</style>