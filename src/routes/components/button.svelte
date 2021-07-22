<script>
    import Button from "~@components/Button";
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/Button/docs";
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Button primary>I'm a primary button!</Button>
        <Button>I'm a regular button!</Button>
    </svelte:fragment>
</Component>
