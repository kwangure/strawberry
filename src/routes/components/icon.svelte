<script>
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/components/icon/docs';
    import Icon from '$lib/components/icon';
    import { mdiPencil } from '@mdi/js';

</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Icon path={mdiPencil}/>
    </svelte:fragment>
</Component>