<script>
    export let d;
    export let fill="currentColor";
    export let props = {};
</script>

<svelte:options tag="berry-icon-path"/>

<path class="berry-icon-path" {d} {fill} {...props}/>