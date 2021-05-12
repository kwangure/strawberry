<script>
    import Dropdown, { Item, Link } from "~@components/Dropdown";
    import Button from "~@components/Button";
</script>

<Dropdown>
    <Button slot="button">
        Click for dropdown
    </Button>
    <Item>Purple.</Item>
    <Item>Penguin.</Item>
    <Item>Has.</Item>
    <Item>Dropped.</Item>
</Dropdown>

<Dropdown>
    <Button slot="button">
        Linked dropdown
    </Button>
    <Link href="#see">See.</Link>
    <Link href="#the">The.</Link>
    <Link href="#hash">Hash.</Link>
</Dropdown>