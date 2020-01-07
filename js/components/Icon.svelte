<script>
    export let size = 24;
    export let path = "";
    export let flip = "";
    export let spin = "";
    export let color = "";
    
    function validSpin(spin) {
        return spin === "clockwise" || spin === "counterclockwise";
    }

    function validFlip(flip) {
        return flip === "horizontal" || flip === "vertical";
    }

    $: horizontal = validFlip(flip) && flip === "horizontal";
    $: vertical = validFlip(flip) && flip === "vertical";
    $: clockwise = validSpin(spin) && spin === "clockwise";
    $: counterclockwise = validSpin(spin) && spin === "counterclockwise";
</script>

<svg class:horizontal class:vertical class:clockwise class:counterclockwise
    height="{size}px" 
    on:click on:dblclick viewBox="0 0 24 24" width="{size}px">
    <path d={path} fill={color || "currentColor"} />
</svg>

<style>
    svg.horizontal {
        transform: scale(-1, 1)
    }
    svg.vertical {
        transform: scale(1, -1)
    }

    svg.clockwise {
        -webkit-animation: clockwise 2s infinite linear;
        animation: clockwise 2s infinite linear;
    }

    @-webkit-keyframes clockwise {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
        }
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
        -webkit-animation: counterclockwise 2s infinite linear;
        animation: counterclockwise 2s infinite linear;
    }

    @-webkit-keyframes counterclockwise {
        0% {
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
        }
        100% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }   
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