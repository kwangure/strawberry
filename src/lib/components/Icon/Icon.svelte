<script>
    import { createEventForwarder } from "../../utils/forward-events.js";

    /**
     * A "d" string is valid in an SVG path element.
     * @type {string}
     */
    export let path = "";

    const forward = createEventForwarder();
</script>

<svg viewBox="0 0 24 24" use:forward>
    <path d={path}/>
    <slot></slot>
</svg>

<style>
    :export {
        --br-icon-animation: ;
        --br-icon-fill: ;
        --br-icon-transform: ;
        --br-icon-height: ;
        --br-icon-width: ;
    }
    svg {
        animation: var(--br-icon-animation, none);
        width: var(--br-icon-width, 24px);
        height: var(--br-icon-height, 24px);
        transform: var(--br-icon-transform, none);
    }
    path {
        fill: var(--br-icon-fill, currentColor);
    }
</style>

<script context="module">
    export const docs = true;
</script>
