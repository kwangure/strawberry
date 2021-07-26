<script>
    import Button from "~@components/Button";
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/Button/docs";
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Button primary>I do nothing primary!</Button>
        <Button>I do nothing too!</Button>
    </svelte:fragment>
</Component>
