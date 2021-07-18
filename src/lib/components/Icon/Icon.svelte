<script>
    import { createEventForwarder } from "../../utils/forward-events.js";

    /**
     * A "d" string is valid in an SVG path element.
     * @type {string}
     */
    export let path = "";

    const forward = createEventForwarder();
</script>

<svg class="berry-icon" viewBox="0 0 24 24" use:forward>
    <path d={path}/>
    <slot></slot>
</svg>

<style>
    .berry-icon {
        --br-icon-animation: none;
        --br-icon-fill: currentColor;
        --br-icon-transform: none;

        --br-icon-size: 24px;
        --br-icon-height: var(--br-icon-size);
        --br-icon-width: var(--br-icon-size);
    }
    svg {
        width: var(--br-icon-width);
        height: var(--br-icon-height);
        transform: var(--br-icon-transform);
        animation: var(--br-icon-animation);
    }
    path {
        fill: var(--br-icon-fill);
    }
</style>