<script>
    import Component from '$lib/internal/component.svelte';
    import { Container } from '$lib/default/input/container';
    import { DateTime } from '$lib/default/input/datetime';
    import { docs } from '$lib/docs/input/datetime';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Container>
            <DateTime value="2017-06-01T01:00"/>
        </Container>
    </svelte:fragment>
</Component>