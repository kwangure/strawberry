<script>
    import Component from '$lib/internal/component.svelte';
    import { Container } from '$lib/default/input/container';
    import { docs } from '$lib/docs/input/password';
    import { Password } from '$lib/default/input/password';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Container>
            <Password placeholder="I can say anything!"/>
        </Container>
    </svelte:fragment>
</Component>