<script>
    export let size = 24
    export let path = ''
    //TODO
    export let color = null
    export let rotate = 0
    export let spin = false
    export let flip = false

    if(flip != 'h' && flip != 'v') {
        flip = false
    }
</script>

<svg height="{size}px" on:click on:dblclick viewBox="0 0 24 24" 
    width="{size}px">
    <path d={path} fill="currentColor" />
</svg>