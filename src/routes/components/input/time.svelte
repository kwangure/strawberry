<script>
    import Component from '$lib/internal/component.svelte';
    import { docs } from '~@components/input/time/docs';
    import Time from '~@components/input/time';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Time value={new Date()}>
            <svelte:fragment slot="label">
                I label your time!
            </svelte:fragment>
        </Time>
    </svelte:fragment>
</Component>