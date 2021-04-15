<script>
    import "~@css/standardDOM";
    import Sidebar, { Link, Section } from "~@components/Sidebar";
    import { base } from "$app/paths";
    import Nav from "./_$layout.svelte/Nav.svelte";
    import { page } from "$app/stores";

    $: ({ path } = $page);
</script>

<div class="app-layout">
    <Nav/>
    <div class="components">
        <div class="left">
            <Sidebar>
                <Link href="{base}/" {path}>
                    Components Overview
                </Link>
                <Section>
                    <svelte:fragment slot="title">General</svelte:fragment>
                    <svelte:fragment slot="items">
                        <Link href="{base}/button" {path}>
                            Button
                        </Link>
                        <Link href="{base}/dropdown" {path}>
                            Dropdown
                        </Link>
                        <Link href="{base}/icon" {path}>
                            Icon
                        </Link>
                    </svelte:fragment>
                </Section>
                <Section>
                    <svelte:fragment slot="title">Data Inputs</svelte:fragment>
                    <svelte:fragment slot="items">
                        <Link href="{base}/input" {path}>
                            Text
                        </Link>
                        <Link href="{base}/input/number" {path}>
                            Number
                        </Link>
                        <Link href="{base}/input/checkbox" {path}>
                            Checkbox
                        </Link>
                        <Link href="{base}/input/radio" {path}>
                            Radio
                        </Link>
                        <Link href="{base}/select" {path}>
                            Select
                        </Link>
                    </svelte:fragment>
                </Section>
                <Section>
                    <svelte:fragment slot="title">Data Display</svelte:fragment>
                    <svelte:fragment slot="items">
                        <Link href="{base}/list" {path}>
                            List
                        </Link>
                        <Link href="{base}/modal" {path}>
                            Modal
                        </Link>
                        <Link href="{base}/notification" {path}>
                            Notification
                        </Link>
                        <Link href="{base}/tooltip" {path}>
                            Tooltip
                        </Link>
                    </svelte:fragment>
                </Section>
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
