<script>
    import "~@css/standardDOM";
    import Navbar, { Link as NavLink } from "~@components/Navbar";
    import Sidebar, { Link, Section } from "~@components/Sidebar";
    import { base } from "$app/paths";
    import { page } from "$app/stores";

    let path;

    $: ({ path } = $page);
    $: if (base) {
        path = `${base}${path}`;
    }
</script>

<div class="app-layout">
    <Navbar>
        <svelte:fragment slot="logo">
            🍓 <span class="text">strawberry</span>
        </svelte:fragment>
        <svelte:fragment slot="nav-links">
            <NavLink href="/" {path}>
                Components
            </NavLink>
        </svelte:fragment>
    </Navbar>
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
                        <Link href="{base}/input/time" {path}>
                            Time
                        </Link>
                    </svelte:fragment>
                </Section>
                <Section>
                    <svelte:fragment slot="title">Data Display</svelte:fragment>
                    <svelte:fragment slot="items">
                        <Link href="{base}/code" {path}>
                            Code
                        </Link>
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
    .app-layout :global(.berry-nav) {
        --br-nav-border: var(--br-border);
        --br-logo-width: 240px;
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
