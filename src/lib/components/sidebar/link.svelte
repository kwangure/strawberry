<!-- TODO: Refactor into <Item/> wrapper with 'display: contents;' -->
<script>
    import { createEventForwarder } from '../../utils/forward-events.js';

    export let path = '';
    export let href = '';

    $: active = href === path;

    const forward = createEventForwarder();
</script>

<a {href} class="sidebar-item" class:active use:forward>
    <slot></slot>
</a>

<style>
    @import "./item.css";
    a.sidebar-item {
        text-decoration: none;
        color: inherit;
    }
</style>
