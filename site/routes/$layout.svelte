<script>
    import "~@css/standardDOM";
    import Sidebar, { Item } from "~@components/Sidebar";
    import Nav from "./_$layout.svelte/Nav.svelte";
    import { page } from "$app/stores";

    $: ({ path } = $page);
</script>

<div class="app-layout">
    <Nav/>
    <div class="components">
        <div class="left">
            <Sidebar>
                <Item active={path === "/button"}>
                    <a href="/button">Button</a>
                </Item>
                <Item active={path === "/dropdown"}>
                    <a href="/dropdown">Dropdown</a>
                </Item>
                <Item active={path === "/icon"}>
                    <a href="/icon">Icon</a>
                </Item>
                <Item active={path === "/input"}>
                    <a href="/input">Input</a>
                </Item>
                <Item active={path === "/list"}>
                    <a href="/list">List</a>
                </Item>
                <Item active={path === "/modal"}>
                    <a href="/modal">Modal</a>
                </Item>
                <Item active={path === "/notification"}>
                    <a href="/notification">Notification</a>
                </Item>
                <Item active={path === "/select"}>
                    <a href="/select">Select</a>
                </Item>
                <Item active={path === "/tooltip"}>
                    <a href="/tooltip">Tooltip</a>
                </Item>
            </Sidebar>
        </div>
        <div class="right">
            <slot/>
        </div>
    </div>
</div>

<style>
    .app-layout {
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }
    .components {
        display: grid;
        grid-template-columns: 240px 1fr;
        grid-template-rows: 1fr;
    }
    .right {
        padding: 10px;
    }
    .right > :global(*:not(.berry-modal):not(.berry-tooltip)) {
        margin-bottom: 10px;
    }
</style>
