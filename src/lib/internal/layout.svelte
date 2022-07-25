<script>
    import Navbar, { Item, Logo, Section } from '$lib/default/navbar';
    import { base } from '$app/paths';
    import { page } from '$app/stores';

    /** @type {string} */
    let path;

    $: ({ pathname: path } = $page.url);
    $: if (base) {
    	path = `${base}${path}`;
    }
</script>

<div class="app-layout">
    <Navbar>
        <Logo href="{base}/">
            🍓 <span class="text">strawberry</span>
        </Logo>
        <Section>
            <a class="navigation" href="{base}/components">
                <Item active={path.startsWith(`${base}/components`)}>
                    Components
                </Item>
            </a>
            <a class="navigation" href="{base}/typography">
                <Item active={path.startsWith(`${base}/typography`)}>
                    Typography
                </Item>
            </a>
        </Section>
        <Section --br-navbar-section-margin-inline="auto 10px">
            <a class="cta" href="https://github.com/kwangure/strawberry" target="_blank">
                GitHub
            </a>
            <a class="cta" href="https://www.npmjs.com/package/@kwangure/strawberry" target="_blank">
                NPM
            </a>
        </Section>
    </Navbar>
    <slot />
</div>

<style>
    .app-layout {
        display: flex;
        flex-direction: column;
        min-height: 100%;
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
</style>
