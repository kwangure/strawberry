<script>
    import '$lib/css/button.css';
    import '$lib/css/code.css';
    import '$lib/css/focusable.css';
    import '$lib/css/sidebar.css';
    import '$lib/css/navbar.css';
    import { Link } from '$internal';
    import { page } from '$app/stores';
    import { Section } from '$lib/components/sidebar';

    /** @type {string} */
    let path;

    $: ({ pathname: path } = $page.url);
</script>

<div class="app-layout">
    <nav>
        <a class='logo' href="/">
            🍓 <span class="text">strawberry</span>
        </a>
        <ul class='br-navbar-section'>
            <a class="br-navbar-item br-focusable navigation" href="/"
                aria-current={!path.startsWith('/typograph') ? 'true' : null}>
                Components
            </a>
            <a class="br-navbar-item br-focusable navigation" href="/typography"
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
                    <Link href="/components/switch">Switch</Link>
                </Section>
                <Section title='Data Inputs'>
                    <Link href="/components/container">Container</Link>
                </Section>
                <Section title='Data display'>
                    <Link href="/components/code">Code</Link>
                    <Link href="/components/dialog">Dialog</Link>
                    <Link href="/components/focusable">Focusable</Link>
                    <Link href="/components/tooltip">Tooltip</Link>
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
    nav {
        border-bottom: var(--br-border);
        padding-inline: 20px;
    }
    .logo {
        width: 240px;
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
        padding-inline: var(--br-size-16);
    }
    .sidebar-wrapper:after,
    .content-wrapper:after {
        content: "";
        display: block;
        height: 25vh;
        width: 100%;
    }
</style>
