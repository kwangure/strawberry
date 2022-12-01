<!--
    @component

    Icon is a visual representation of a command, device, directory, or common
    action.
-->
<script>
    import { createEventForwarder } from '../../utils/forward-events.js';

    /**
     * A "d" string is valid in an SVG path element.
     * @type {string}
     */
    export let path = '';

    const forward = createEventForwarder();
</script>

<svg viewBox="0 0 24 24" use:forward>
    <path d={path} style="fill: var(--br-icon-root-fill);"/>
    <slot></slot>
</svg>

<style>
    svg {
        animation: var(--br-icon-root-animation);
        width: var(--br-icon-root-width);
        height: var(--br-icon-root-height);
        transform: var(--br-icon-root-transform);
    }
</style>
