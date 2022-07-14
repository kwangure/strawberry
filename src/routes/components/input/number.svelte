<script>
    import Component from '$lib/internal/component.svelte';
    import { docs } from '~@components/input/number/docs';
    import Numero from '~@components/input/number';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Numero placeholder="Use keyboard or UI arrows!">
            <svelte:fragment slot="label">
                Mi label numeros!
            </svelte:fragment>
        </Numero>
    </svelte:fragment>
</Component>