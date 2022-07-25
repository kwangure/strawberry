<script>
    import Navbar, { Logo, Section } from '$lib/default/navbar';
    import { base } from '$app/paths';
</script>

<svelte:body data-color-scheme="dark"></svelte:body>

<div class="layout">
    <Navbar >
        <Logo href="{base}/">
            🍓 <span class="text">strawberry</span>
        </Logo>
        <Section --br-navbar-section-margin-inline="auto 10px">
            <a class="cta" href="https://github.com/kwangure/strawberry" target="_blank">
                GitHub
            </a>
            <a class="cta" href="https://www.npmjs.com/package/@kwangure/strawberry" target="_blank">
                NPM
            </a>
        </Section>
    </Navbar>
    <main>
        <h1>Strawberry</h1>
        Strawberry is a set of Svelte components.

        <div class="link">
            <h3>
                <a href="{base}/components">Components</a>
            </h3>
            Documentation on how to use Strawberry components.
        </div>

        <div class="link">
            <h3>
                <a href="{base}/typography">Typography</a>
            </h3>
            See how typography is used in Strawberry.
        </div>
    </main>
</div>

<style>
    .layout {
        --nav-height: 64px;
        --page-max-width: 56rem;
    }
    .layout {
        display: contents;
    }
    .layout {
        --br-navbar-root-max-width: var(--page-max-width);
        --br-navbar-root-height: var(--nav-height);
    }
    main {
        max-width: var(--page-max-width);
        height: calc(100% - var(--nav-height));
        margin: auto;
        padding-inline: 8px;

        /* Prevent heading margin collapse */
        display: flow-root;
    }
    .layout {
        --br-navbar-root-width: var(--page-max-width);
        --br-navbar-root-margin-inline: auto;
    }
    @media (max-width: 56rem) {
        .layout {
            --br-navbar-root-width: auto;
        }
    }
    h3 {
        margin-top: 0px;
    }
    .link {
        position: relative;
        padding: 16px;
        border-radius: 4px;
        margin-top: 15px;
    }
    @media (prefers-color-scheme: dark) {
        .link {
            border: 1px solid #474b50;
        }
    }
    @media (prefers-color-scheme: light) {
        .link {
            border: 1px solid #c3c3c3;
        }
    }
    .link a:before {
        display: block;
        inset: 0px;
        position: absolute;
        content: "";
    }
    .cta {
        line-height: var(--br-navbar-root-height);
    }
</style>
