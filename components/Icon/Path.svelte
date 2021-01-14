<script>
    import { createEventForwarder } from "$utils/forward-events.js";

    const forward = createEventForwarder();

    export let d;
    export let fill="currentColor";
</script>

<path class="berry-icon-path" use:forward {d} {fill} {...$$restProps}/>