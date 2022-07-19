<!--
    @component

    Icon is a visual representation of a command, device, directory, or common
    action.
-->
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
    <path d={path} style="fill: var(--br-icon-fill);"/>
    <slot></slot>
</svg>

<style>
    svg {
        animation: var(--br-icon-animation);
        width: var(--br-icon-width);
        height: var(--br-icon-height);
        transform: var(--br-icon-transform);
    }
</style>
