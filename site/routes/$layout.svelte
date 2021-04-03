<script>
    import "~@css/standardDOM";
    import Sidebar, { Link, Section } from "~@components/Sidebar";
    import Nav from "./_$layout.svelte/Nav.svelte";
    import { page } from "$app/stores";

    $: ({ path } = $page);
</script>

<div class="app-layout">
    <Nav/>
    <div class="components">
        <div class="left">
            <Sidebar>
                <Link href="/button" {path}>
                    Button
                </Link>
                <Link href="/dropdown" {path}>
                    Dropdown
                </Link>
                <Link href="/icon" {path}>
                    Icon
                </Link>
                <Section>
                    <svelte:fragment slot="title">Inputs</svelte:fragment>
                    <svelte:fragment slot="items">
                        <Link href="/input" {path}>
                            Text
                        </Link>
                        <Link href="/input/number" {path}>
                            Number
                        </Link>
                        <Link href="/input/checkbox" {path}>
                            Checkbox
                        </Link>
                        <Link href="/input/radio" {path}>
                            Radio
                        </Link>
                    </svelte:fragment>
                </Section>
                <Link href="/list" {path}>
                    List
                </Link>
                <Link href="/modal" {path}>
                    Modal
                </Link>
                <Link href="/notification" {path}>
                    Notification
                </Link>
                <Link href="/select" {path}>
                    Select
                </Link>
                <Link href="/tooltip" {path}>
                    Tooltip
                </Link>
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
</style>
