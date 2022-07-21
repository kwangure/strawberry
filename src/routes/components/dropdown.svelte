<script>
    import Dropdown, { Item } from '$lib/default/dropdown';
    import Button from '$lib/default/button';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/dropdown';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Dropdown>
            <Button slot="button">
                Click for regular dropdown
            </Button>
            <Item>Purple.</Item>
            <Item>Penguin.</Item>
            <Item>Has.</Item>
            <Item>Dropped.</Item>
        </Dropdown>
    </svelte:fragment>
</Component>
