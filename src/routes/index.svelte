<script>
    import { mdiGithub, mdiNpm } from "@mdi/js";
    import { base } from "$app/paths";
    import Button from "~@components/Button";
    import Navbar from "~@components/Navbar";

    import Style from "$lib/components/Styles/Styles.svelte";
</script>

<Style/>

<div class="layout">
    <Navbar logoHref="{base}/">
        <svelte:fragment slot="logo">
            🍓 <span class="text">strawberry</span>
        </svelte:fragment>
        <svelte:fragment slot="actions">
            <a class="cta" href="https://github.com/kwangure/strawberry" target="_blank">
                <Button icon={mdiGithub}>
                    GitHub
                </Button>
            </a>
            <a class="cta" href="https://www.npmjs.com/package/@kwangure/strawberry" target="_blank">
                <Button icon={mdiNpm}>
                    NPM
                </Button>
            </a>
        </svelte:fragment>
    </Navbar>
    <main>
        <h1> Strawberry </h1>
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
        --br-navbar-max-width: var(--page-max-width);
        --br-navbar-height: var(--nav-height);
    }
    main {
        max-width: var(--page-max-width);
        height: calc(100% - var(--nav-height));
        margin: auto;
        padding-inline: 8px;

        /* Prevent heading margin collapse */
        display: flow-root;
    }
    h3 {
        margin-top: 0px;
    }
    .link {
        position: relative;
        padding: 16px;
        border: var(--br-border);
        border-radius: var(--br-border-radius);
        margin-top: 15px;
    }
    .link a:before {
        display: block;
        inset: 0px;
        position: absolute;
        content: "";
    }
    .cta {
        color: inherit;
    }
</style>
