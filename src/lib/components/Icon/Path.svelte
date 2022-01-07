<script>
    import { createEventForwarder } from "../../utils/forward-events.js";

    const forward = createEventForwarder();

    /**
     * A "d" string that is usable in an SVG path element.
     * @type {string}
     */
    export let d;
</script>

<path class="berry-icon-path" use:forward {d} {...$$restProps}/>

<style>
    :export {
        --br-icon-path-fill: ;
    }
    path {
        fill: var(--br-icon-path-fill, currentColor);
    }
</style>

<script context="module">
    export const docs = true;
</script>
