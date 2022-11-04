<script>
    import Component from '$lib/internal/component.svelte';
    import { Container } from '$lib/default/input/container';
    import { docs } from '$lib/docs/input/text';
    import { Text as Input } from '$lib/default/input/text';
    import { Label } from '$lib/default/input/label';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Label>
            I label inputs like no one else!
            <Container slot='input'>
                <Input placeholder="I can say anything!"/>
            </Container>
        </Label>
    </svelte:fragment>
</Component>
