<script context="module">
    // TODO: Remove docs variable from component
    export const docs = true;
</script>

<!-- TODO: Add a component description here. See button for example -->
<script>
    import '../../css/styles.js';
    import { createEventForwarder } from '../../utils/forward-events.js';

    /**
     * A "d" string is valid in an SVG path element.
     * @type {string}
     */
    export let path = '';

    const forward = createEventForwarder();
</script>

<svg viewBox="0 0 24 24" use:forward>
    <path d={path}/>
    <slot></slot>
</svg>

<style>
    svg {
        animation: var(--br-icon-animation);
        width: var(--br-icon-width);
        height: var(--br-icon-height);
        transform: var(--br-icon-transform);
    }
    path {
        fill: var(--br-icon-fill);
    }
</style>
