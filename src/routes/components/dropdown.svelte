<script>
    import { Arrow, Dropdown, Item, Popup } from '$lib/default/dropdown';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/dropdown';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Dropdown>
            <button slot="trigger">
                Click for dropdown
            </button>
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
