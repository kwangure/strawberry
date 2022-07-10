<script>
    import Button, { Primary } from "~@components/button";
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/button/docs";
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Primary>
            <Button>I do nothing primary!</Button>
        </Primary>
        <Button>I do nothing too!</Button>
    </svelte:fragment>
</Component>
