<script>
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/icon';
    import Icon from '$lib/default/icon';
    import { mdiPencil } from '@mdi/js';

</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Icon path={mdiPencil}/>
    </svelte:fragment>
</Component>