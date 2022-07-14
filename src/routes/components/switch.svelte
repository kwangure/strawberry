<script>
    import Component from '$lib/internal/component.svelte';
    import { docs } from '~@components/switch/docs';
    import Switch from '~@components/switch';

    let checked = true;
</script>

<Component docs="{docs}">
    <svelte:fragment slot="inline">
        <Switch bind:checked></Switch>
        {checked ? '': 'un'}checked
    </svelte:fragment>
</Component>
