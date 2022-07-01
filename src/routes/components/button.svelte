<script>
    import Button, { Primary } from "~@components/Button";
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/Button/docs";
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Primary>
            <Button>I do nothing primary!</Button>
        </Primary>
        <Button>I do nothing too!</Button>
    </svelte:fragment>
</Component>
