<script>
    import Sidebar, { Link, Section } from "~@components/Sidebar";
    import { base } from "$app/paths";
    import Layout from "$lib/internal/layout.svelte";
    import { page } from "$app/stores";

    let path;

    $: ({ path } = $page);
    $: if (base) {
        path = `${base}${path}`;
    }
</script>

<Layout>
    <div class="components">
        <div class="left">
            <Sidebar>
                <Link href="{base}/components" {path}>
                    Components Overview
                </Link>
                <Section>
                    <svelte:fragment slot="title">General</svelte:fragment>
                    <svelte:fragment slot="items">
                        <Link href="{base}/components/button" {path}>
                            Button
                        </Link>
                        <Link href="{base}/components/dropdown" {path}>
                            Dropdown
                        </Link>
                        <Link href="{base}/components/icon" {path}>
                            Icon
                        </Link>
                        <Link href="{base}/components/switch" {path}>
                            Switch
                        </Link>
                    </svelte:fragment>
                </Section>
                <Section>
                    <svelte:fragment slot="title">Data Inputs</svelte:fragment>
                    <svelte:fragment slot="items">
                        <Link href="{base}/components/input/date" {path}>
                            Date
                        </Link>
                        <Link href="{base}/components/input" {path}>
                            Text
                        </Link>
                        <Link href="{base}/components/input/password" {path}>
                            Password
                        </Link>
                        <Link href="{base}/components/input/number" {path}>
                            Number
                        </Link>
                        <Link href="{base}/components/input/checkbox" {path}>
                            Checkbox
                        </Link>
                        <Link href="{base}/components/input/radio" {path}>
                            Radio
                        </Link>
                        <Link href="{base}/components/select" {path}>
                            Select (deprecated)
                        </Link>
                        <Link href="{base}/components/input/select" {path}>
                            Select
                        </Link>
                        <Link href="{base}/components/input/textarea" {path}>
                            Textarea
                        </Link>
                        <Link href="{base}/components/input/time" {path}>
                            Time
                        </Link>
                    </svelte:fragment>
                </Section>
                <Section>
                    <svelte:fragment slot="title">Data Display</svelte:fragment>
                    <svelte:fragment slot="items">
                        <Link href="{base}/components/code" {path}>
                            Code
                        </Link>
                        <Link href="{base}/components/modal" {path}>
                            Modal
                        </Link>
                        <Link href="{base}/components/notification" {path}>
                            Notification
                        </Link>
                        <Link href="{base}/components/tooltip" {path}>
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
</Layout>

<style>
    .components {
        display: grid;
        grid-template-columns: 240px 1fr;
        grid-template-rows: 1fr;
    }
    .right {
        padding: 10px;
    }
</style>
