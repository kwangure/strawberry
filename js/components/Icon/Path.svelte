<script>
    export let d;
    export let fill="currentColor";
    export let props = {};
</script>

<svelte:options tag="berry-icon-path"/>

<path {d} {fill} {...props}/>