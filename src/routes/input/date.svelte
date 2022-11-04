<script>
    import Component from '$lib/internal/component.svelte';
    import { Container } from '$lib/default/input/container';
    import { Date } from '$lib/default/input/date';
    import { docs } from '$lib/docs/input/date';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Container>
            <Date value="2017-06-01"/>
        </Container>
    </svelte:fragment>
</Component>