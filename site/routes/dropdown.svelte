<script>
    import Dropdown, { Item } from "~@components/Dropdown";
    import { browser } from "$app/env";
    import Button from "~@components/Button";
</script>

{#if browser}
    <Dropdown>
        <Button slot="button">
            Click for dropdown
        </Button>
        <Item>Purple.</Item>
        <Item>Penguin.</Item>
        <Item>Has.</Item>
        <Item>Dropped.</Item>
    </Dropdown>
{/if}