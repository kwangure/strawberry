<script>
    import '$lib/default/css/components.css';
    import '$lib/default/navbar';
    import { Sidebar, Item as SidebarItem, Section as SidebarSection } from '$lib/default/sidebar';
    import { base } from '$app/paths';
    import { page } from '$app/stores';

    /** @type {string} */
    let path;

    $: ({ pathname: path } = $page.url);
</script>

<div class="app-layout">
    <nav>
        <a class='logo' href="{base}">
            🍓 <span class="text">strawberry</span>
        </a>
        <ul class='br-navbar-section'>
            <a class="br-navbar-item navigation" href="{base}"
                aria-current={path.startsWith(`${base}/components`) ? 'true' : null}>
                Components
            </a>
            <a class="br-navbar-item  navigation" href="{base}/typography"
                aria-current={path.startsWith(`${base}/typography`) ? 'true' : null}>
                Typography
            </a>
        </ul>
        <ul class="br-navbar-section right">
            <a class="cta" href="https://github.com/kwangure/strawberry" target="_blank" rel=noreferrer>
                GitHub
            </a>
            <a class="cta" href="https://www.npmjs.com/package/@kwangure/strawberry" target="_blank" rel=noreferrer>
                NPM
            </a>
        </ul>
    </nav>
    <div class="components">
        <div class="sidebar-wrapper">
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
                        <a href="{base}/components/input-container">
                            <SidebarItem active={path === `${base}/components/input-container`}>
                                Container
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
        <div class="content-wrapper">
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
    nav {
        padding-inline: 20px;
    }
    a.logo {
        width: 240px;
    }
    a.navigation {
        color: inherit;
    }
    a.cta {
        line-height: var(--br-navbar-root-height);
    }
    .br-navbar-section.right {
        margin-inline: auto 10px;
    }
    .components {
        display: grid;
        grid-template-columns: max-content 1fr;
        min-height: 0;
        grid-template-rows: 100%;
    }
    .sidebar-wrapper,
    .content-wrapper {
        overflow-y: auto;
    }
    .sidebar-wrapper a {
        color: inherit;
    }
    .content-wrapper {
        padding: 10px 64px;
    }
    .sidebar-wrapper:after,
    .content-wrapper:after {
        content: "";
        display: block;
        height: 25vh;
        width: 100%;
    }
</style>
