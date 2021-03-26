<script>
    import { createEventForwarder } from "../../utils/forward-events.js";

    export let size = "24px";
    export let path = "";
    export let flip = {};
    export let spin = {};
    export let color = "";
    export let rotate = 0;

    const forward = createEventForwarder();

    let style = "";

    $: createStyle(flip, spin);

    function createStyle(flip, spin) {
        const horizontal = flip.horizontal ? -1 : 1;
        const vertical = flip.vertical ? -1 : 1;
        style
            = `transform: rotate(${rotate}deg) scale(${horizontal}, ${vertical});`;

        const { direction = "", duration = "2s" } = spin;
        if (direction) {
            style = `${style} animation: ${direction} ${duration} infinite linear;`;
        }
    }
</script>

<svg class="berry-icon" height={size}
    {style} viewBox="0 0 24 24" width={size}
    use:forward>
    <path d={path} fill={color || "currentColor"} />
    <slot></slot>
</svg>

<style>
    @keyframes clockwise {
        0% { transform: rotate(0deg) }
        100% { transform: rotate(359deg) }
    }
    @keyframes counterclockwise {
        0% { transform: rotate(359deg) }
        100% { transform: rotate(0deg) }
    }
</style>