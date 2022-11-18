<script>
    import '$lib/default/css/components.css';
    import { Item, Section, Sidebar } from '$lib/default/sidebar';
    import { base } from '$app/paths';
    import Layout from '$lib/internal/layout.svelte';
    import { page } from '$app/stores';

    /** @type {string} */
    let path;

    $: ({ pathname: path } = $page.url);
</script>

<Layout>
    <div class="components">
        <div class="left">
            <Sidebar>
                <a href="{base}">
                    <Item active={path === base}>
                        Getting started
                    </Item>
                </a>
                <Section>
                    <svelte:fragment slot="title">General</svelte:fragment>
                    <svelte:fragment slot="items">
                        <a href="{base}/button">
                            <Item active={path === `${base}/button`}>
                                Button
                            </Item>
                        </a>
                        <a href="{base}/dropdown">
                            <Item active={path === `${base}/dropdown`}>
                                Dropdown
                            </Item>
                        </a>
                        <a href="{base}/element">
                            <Item active={path === `${base}/element`}>
                                Element
                            </Item>
                        </a>
                        <a href="{base}/icon">
                            <Item active={path === `${base}/icon`}>
                                Icon
                            </Item>
                        </a>
                        <a href="{base}/switch">
                            <Item active={path === `${base}/switch`}>
                                Switch
                            </Item>
                        </a>
                    </svelte:fragment>
                </Section>
                <Section>
                    <svelte:fragment slot="title">Data Inputs</svelte:fragment>
                    <svelte:fragment slot="items">
                        <a href="{base}/input/date">
                            <Item active={path === `${base}/input/date`}>
                                Date
                            </Item>
                        </a>
                        <a href="{base}/input/datetime">
                            <Item active={path === `${base}/input/datetime`}>
                                DateTime
                            </Item>
                        </a>
                        <a href="{base}/input">
                            <Item active={path === `${base}/input`}>
                                Text
                            </Item>
                        </a>
                        <a href="{base}/input/password">
                            <Item active={path === `${base}/input/password`}>
                                Password
                            </Item>
                        </a>
                        <a href="{base}/input/number">
                            <Item active={path === `${base}/input/number`}>
                                Number
                            </Item>
                        </a>
                        <a href="{base}/select">
                            <Item active={path === `${base}/input/select`}>
                                Select
                            </Item>
                        </a>
                        <a href="{base}/input/textarea">
                            <Item active={path === `${base}/input/textarea`}>
                                Textarea
                            </Item>
                        </a>
                        <a href="{base}/input/time">
                            <Item active={path === `${base}/input/time`}>
                                Time
                            </Item>
                        </a>
                    </svelte:fragment>
                </Section>
                <Section>
                    <svelte:fragment slot="title">Data Display</svelte:fragment>
                    <svelte:fragment slot="items">
                        <a href="{base}/code">
                            <Item active={path === `${base}/code`}>
                                Code
                            </Item>
                        </a>
                        <a href="{base}/dialog">
                            <Item active={path === `${base}/dialog`}>
                                Dialog
                            </Item>
                        </a>
                        <a href="{base}/tooltip">
                            <Item active={path === `${base}/tooltip`}>
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
        padding: 0px 10px;
    }
</style>
