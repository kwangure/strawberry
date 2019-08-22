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

<svg viewBox="0 0 {size} {size}" on:click on:dblclick>
    <path d={path}/>
</svg>