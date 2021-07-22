<script>
    import Dropdown, { Item, Link } from "~@components/Dropdown";
    import Button from "~@components/Button";
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/Dropdown/docs";
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

        <Dropdown>
            <Button slot="button">
                Click for linked dropdown
            </Button>
            <Link href="#click">Click.</Link>
            <Link href="#to">To.</Link>
            <Link href="#change">Change.</Link>
            <Link href="#hash">Hash.</Link>
        </Dropdown>
    </svelte:fragment>
</Component>
