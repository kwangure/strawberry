<script>
    import Component from '$lib/internal/component.svelte';
    import { Container } from '$lib/default/input/container';
    import { docs } from '$lib/docs/input/number';
    import { Number as Numero } from '$lib/default/input/number';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Container>
            <Numero placeholder="Use keyboard or UI arrows!"/>
        </Container>
    </svelte:fragment>
</Component>