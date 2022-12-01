<script>
    import '$lib/default/css/components.css';
    import { Logo, Navbar, Item as NavbarItem, Section as NavbarSection } from '$lib/default/navbar';
    import { Sidebar, Item as SidebarItem, Section as SidebarSection } from '$lib/default/sidebar';
    import { base } from '$app/paths';
    import { page } from '$app/stores';

    /** @type {string} */
    let path;

    $: ({ pathname: path } = $page.url);
</script>

<div class="app-layout">
    <Navbar>
        <Logo href="{base}">
            🍓 <span class="text">strawberry</span>
        </Logo>
        <NavbarSection>
            <a class="navigation" href="{base}">
                <NavbarItem active={!path.startsWith(`${base}/typography`)}>
                    Components
                </NavbarItem>
            </a>
            <a class="navigation" href="{base}/typography">
                <NavbarItem active={path.startsWith(`${base}/typography`)}>
                    Typography
                </NavbarItem>
            </a>
        </NavbarSection>
        <NavbarSection --br-navbar-section-margin-inline="auto 10px">
            <a class="cta" href="https://github.com/kwangure/strawberry" target="_blank">
                GitHub
            </a>
            <a class="cta" href="https://www.npmjs.com/package/@kwangure/strawberry" target="_blank">
                NPM
            </a>
        </NavbarSection>
    </Navbar>
    <div class="components">
        <div class="left">
            <Sidebar>
                <a href="{base || "/"}">
                    <SidebarItem active={path === (base || '/')}>
                        Getting started
                    </SidebarItem>
                </a>
                <SidebarSection>
                    <svelte:fragment slot="title">General</svelte:fragment>
                    <svelte:fragment slot="items">
                        <a href="{base}/components/button">
                            <SidebarItem active={path === `${base}/components/button`}>
                                Button
                            </SidebarItem>
                        </a>
                        <a href="{base}/components/dropdown">
                            <SidebarItem active={path === `${base}/components/dropdown`}>
                                Dropdown
                            </SidebarItem>
                        </a>
                        <a href="{base}/components/element">
                            <SidebarItem active={path === `${base}/components/element`}>
                                Element
                            </SidebarItem>
                        </a>
                        <a href="{base}/switch">
                            <SidebarItem active={path === `${base}/switch`}>
                                Switch
                            </SidebarItem>
                        </a>
                    </svelte:fragment>
                </SidebarSection>
                <SidebarSection>
                    <svelte:fragment slot="title">Data Inputs</svelte:fragment>
                    <svelte:fragment slot="items">
                        <a href="{base}/input/date">
                            <SidebarItem active={path === `${base}/input/date`}>
                                Date
                            </SidebarItem>
                        </a>
                        <a href="{base}/input/datetime">
                            <SidebarItem active={path === `${base}/input/datetime`}>
                                DateTime
                            </SidebarItem>
                        </a>
                        <a href="{base}/components/input-container">
                            <SidebarItem active={path === `${base}/components/input-container`}>
                                Container
                            </SidebarItem>
                        </a>
                        <a href="{base}/input/password">
                            <SidebarItem active={path === `${base}/input/password`}>
                                Password
                            </SidebarItem>
                        </a>
                        <a href="{base}/input/number">
                            <SidebarItem active={path === `${base}/input/number`}>
                                Number
                            </SidebarItem>
                        </a>
                        <a href="{base}/select">
                            <SidebarItem active={path === `${base}/select`}>
                                Select
                            </SidebarItem>
                        </a>
                        <a href="{base}/input/textarea">
                            <SidebarItem active={path === `${base}/input/textarea`}>
                                Textarea
                            </SidebarItem>
                        </a>
                        <a href="{base}/input/time">
                            <SidebarItem active={path === `${base}/input/time`}>
                                Time
                            </SidebarItem>
                        </a>
                    </svelte:fragment>
                </SidebarSection>
                <SidebarSection>
                    <svelte:fragment slot="title">Data Display</svelte:fragment>
                    <svelte:fragment slot="items">
                        <a href="{base}/components/code">
                            <SidebarItem active={path === `${base}/components/code`}>
                                Code
                            </SidebarItem>
                        </a>
                        <a href="{base}/components/dialog">
                            <SidebarItem active={path === `${base}/components/dialog`}>
                                Dialog
                            </SidebarItem>
                        </a>
                        <a href="{base}/tooltip">
                            <SidebarItem active={path === `${base}/tooltip`}>
                                Tooltip
                            </SidebarItem>
                        </a>
                    </svelte:fragment>
                </SidebarSection>
            </Sidebar>
        </div>
        <div class="right">
            <slot/>
        </div>
    </div>
</div>

<style>
    .app-layout {
        display: grid;
        grid-template-rows: max-content 1fr;
        height: 100%;
    }
    .app-layout {
        --br-navbar-logo-width: 240px;
    }
    @media (prefers-color-scheme: dark) {
        .app-layout {
            --br-navbar-root-border-bottom: 1px solid #474b50;
        }
    }
    @media (prefers-color-scheme: light) {
        .app-layout {
            --br-navbar-root-border-bottom: 1px solid #c3c3c3;
        }
    }
    a.navigation {
        color: inherit;
    }
    a.cta {
        line-height: var(--br-navbar-root-height);
    }
    .components {
        display: grid;
        grid-template-columns: max-content 1fr;
        min-height: 0;
        grid-template-rows: 100%;
    }
    .left,
    .right {
        overflow-y: auto;
    }
    .left::-webkit-scrollbar,
    .right::-webkit-scrollbar {
        width: 16px;
    }
    @media (prefers-color-scheme: dark) {
        .left::-webkit-scrollbar-thumb,
        .right::-webkit-scrollbar-thumb,
        .left::-webkit-scrollbar-track,
        .right::-webkit-scrollbar-track {
            background-color: rgb(255, 255, 255, 0.1);
        }
    }
    @media (prefers-color-scheme: light) {
        .left::-webkit-scrollbar-thumb,
        .right::-webkit-scrollbar-thumb,
        .left::-webkit-scrollbar-track,
        .right::-webkit-scrollbar-track {
            background-color: rgb(0, 0, 0, 0.1);
        }
    }
    .left a {
        color: inherit;
    }
    .right {
        padding: 10px 64px;
    }
    .left:after,
    .right:after {
        content: "";
        display: block;
        height: 25vh;
        width: 100%;
    }
</style>
