<script>
    import { createEventForwarder } from '../../utils/events.js';

    const forward = createEventForwarder();

    /**
     * A "d" string that is usable in an SVG path element.
     * @type {string}
     */
    export let d;
</script>

<path class="berry-icon-path" use:forward {d} {...$$restProps}/>

<style>
    path {
        --br-icon-root-path-fill: currentColor;
    }
    path {
        fill: var(--br-icon-root-path-fill, currentColor);
    }
</style>
