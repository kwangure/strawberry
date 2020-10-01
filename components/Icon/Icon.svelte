<script>
    export let size = 24;
    export let units = "px";
    export let path = "";
    export let flip = "";
    export let spin = "";
    export let color = "";
    export let rotate = 0;

    $: horizontal = flip === "horizontal" ? -1 : 1;
    $: vertical = flip === "vertical" ? -1 : 1;
    $: clockwise = spin === "clockwise";
    $: counterclockwise = spin === "counterclockwise";
</script>

<svg class="berry-icon" class:clockwise class:counterclockwise
    height="{size}{units}" on:click on:dblclick 
    style="transform: rotate({rotate}deg) scale({horizontal}, {vertical})" 
    viewBox="0 0 24 24" width="{size}{units}">
    <path d={path} fill={color || "currentColor"} />
    <slot></slot>
</svg>

<style>
    svg.clockwise {
        animation: clockwise 2s infinite linear;
    }

    @keyframes clockwise {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
        }
    }

    svg.counterclockwise {
        animation: counterclockwise 2s infinite linear;
    }

    @keyframes counterclockwise {
        0% {
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
        }
        100% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
    }
</style>