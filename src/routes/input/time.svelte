<script>
    import Component from '$lib/internal/component.svelte';
    import { Container } from '$lib/default/input/container';
    import { docs } from '$lib/docs/input/time';
    import { Time } from '$lib/default/input/time';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Container>
            <Time value={new Date().toISOString()}/>
        </Container>
    </svelte:fragment>
</Component>