<script>
    import Button, { Primary } from '$lib/components/button';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/button';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Primary>
            <Button>I do nothing primary!</Button>
        </Primary>
        <Button>I do nothing too!</Button>
    </svelte:fragment>
</Component>
