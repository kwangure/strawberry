<script>
    import Dropdown, { Arrow, Item, Popup } from '$lib/default/dropdown';
    import Button from '$lib/default/button';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/dropdown';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Dropdown>
            <Button slot="trigger">
                Click for dropdown
            </Button>
            <Popup>
                <Arrow/>
                <Item>Purple</Item>
                <Item active>Penguin</Item>
                <Item>Has</Item>
                <Item>Landed</Item>
            </Popup>
        </Dropdown>
    </svelte:fragment>
</Component>
