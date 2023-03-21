<script>
    import '$lib/default/button';
    import '$lib/default/item';
    import '$lib/default/navbar';
    import { base } from '$app/paths';
    import Link from '@kwangure/strawberry/internal/sidebar-link.svelte';
    import { page } from '$app/stores';
    import { Section } from '$lib/default/sidebar';

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
                aria-current={path.startsWith('/components') ? 'true' : null}>
                Components
            </a>
            <a class="br-navbar-item  navigation" href="{base}/typography"
                aria-current={path.startsWith('/typography') ? 'true' : null}>
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
            <div class="br-sidebar">
                <Link href="/">Getting started</Link>
                <Section title='General'>
                    <Link href="/components/button">Button</Link>
                    <Link href="/components/dropdown">Dropdown</Link>
                    <Link href="/components/element">Element</Link>
                    <Link href="/switch">Switch</Link>
                </Section>
                <Section title='Data Inputs'>
                    <Link href="/components/container">Container</Link>
                </Section>
                <Section title='Data display'>
                    <Link href="/components/code">Code</Link>
                    <Link href="/components/dialog">Dialog</Link>
                    <Link href="/tooltip">Tooltip</Link>
                    <Link href="/components/item">Items</Link>
                </Section>
            </div>
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
