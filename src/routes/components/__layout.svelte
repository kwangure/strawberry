<script>
    import Sidebar, { Item, Section } from '$lib/default/sidebar';
    import { base } from '$app/paths';
    import Layout from '$lib/internal/layout.svelte';
    import { page } from '$app/stores';

    /** @type {string} */
    let path;

    $: ({ pathname: path } = $page.url);
    $: if (base) {
    	path = `${base}${path}`;
    }
</script>

<Layout>
    <div class="components">
        <div class="left">
            <Sidebar>
                <a href="{base}/components">
                    <Item active={path === `${base}/components`}>
                        Components Overview
                    </Item>
                </a>
                <Section>
                    <svelte:fragment slot="title">General</svelte:fragment>
                    <svelte:fragment slot="items">
                        <a href="{base}/components/button">
                            <Item active={path === `${base}/components/button`}>
                                Button
                            </Item>
                        </a>
                        <a href="{base}/components/dropdown">
                            <Item active={path === `${base}/components/dropdown`}>
                                Dropdown
                            </Item>
                        </a>
                        <a href="{base}/components/element">
                            <Item active={path === `${base}/components/element`}>
                                Element
                            </Item>
                        </a>
                        <a href="{base}/components/icon">
                            <Item active={path === `${base}/components/icon`}>
                                Icon
                            </Item>
                        </a>
                        <a href="{base}/components/switch">
                            <Item active={path === `${base}/components/switch`}>
                                Switch
                            </Item>
                        </a>
                    </svelte:fragment>
                </Section>
                <Section>
                    <svelte:fragment slot="title">Data Inputs</svelte:fragment>
                    <svelte:fragment slot="items">
                        <a href="{base}/components/input/date">
                            <Item active={path === `${base}/components/input/date`}>
                                Date
                            </Item>
                        </a>
                        <a href="{base}/components/input/datetime">
                            <Item active={path === `${base}/components/input/datetime`}>
                                DateTime
                            </Item>
                        </a>
                        <a href="{base}/components/input">
                            <Item active={path === `${base}/components/input`}>
                                Text
                            </Item>
                        </a>
                        <a href="{base}/components/input/password">
                            <Item active={path === `${base}/components/input/password`}>
                                Password
                            </Item>
                        </a>
                        <a href="{base}/components/input/number">
                            <Item active={path === `${base}/components/input/number`}>
                                Number
                            </Item>
                        </a>
                        <a href="{base}/components/input/checkbox">
                            <Item active={path === `${base}/components/input/checkbox`}>
                                Checkbox
                            </Item>
                        </a>
                        <a href="{base}/components/input/radio">
                            <Item active={path === `${base}/components/input/radio`}>
                                Radio
                            </Item>
                        </a>
                        <a href="{base}/components/input/select">
                            <Item active={path === `${base}/components/input/select`}>
                                Select
                            </Item>
                        </a>
                        <a href="{base}/components/input/textarea">
                            <Item active={path === `${base}/components/input/textarea`}>
                                Textarea
                            </Item>
                        </a>
                        <a href="{base}/components/input/time">
                            <Item active={path === `${base}/components/input/time`}>
                                Time
                            </Item>
                        </a>
                    </svelte:fragment>
                </Section>
                <Section>
                    <svelte:fragment slot="title">Data Display</svelte:fragment>
                    <svelte:fragment slot="items">
                        <a href="{base}/components/code">
                            <Item active={path === `${base}/components/code`}>
                                Code
                            </Item>
                        </a>
                        <a href="{base}/components/modal">
                            <Item active={path === `${base}/components/modal`}>
                                Modal
                            </Item>
                        </a>
                        <a href="{base}/components/notification">
                            <Item active={path === `${base}/components/notification`}>
                                Notification
                            </Item>
                        </a>
                        <a href="{base}/components/tooltip">
                            <Item active={path === `${base}/components/tooltip`}>
                                Tooltip
                            </Item>
                        </a>
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
    .left a {
        display: contents;
        color: inherit;
    }
    .right {
        padding: 10px;
    }
</style>
