<script>
    import Button from "~@components/Button";
    import { mdiGithub } from "@mdi/js";
    import Navbar from "~@components/Navbar";
</script>

<div class="layout">
    <Navbar>
        <svelte:fragment slot="logo">
            🍓 <span class="text">strawberry</span>
        </svelte:fragment>
        <svelte:fragment slot="calls-to-action">
            <a class="cta" href="https://github.com/kwangure/strawberry" target="_blank">
                <Button icon={mdiGithub}>
                    GitHub
                </Button>
            </a>
        </svelte:fragment>
    </Navbar>
    <main>
        <h1> Strawberry </h1>
        Strawberry is a set of Svelte components.

        <div class="link">
            <h3>
                <a href="/components">Components</a>
            </h3>
            Documentation on how to use Strawberry components.
        </div>

        <div class="link">
            <h3>
                <a href="/typography">Typography</a>
            </h3>
            See how typography is used in Strawberry.
        </div>
    </main>
</div>

<style>
    .layout {
        --nav-height: 64px;
        --page-max-width: 56rem;
        --page-width: 92%;
    }
    .layout {
        display: contents;
    }
    .layout :global(.berry-nav) {
        --br-nav-max-width: var(--page-max-width);
        --br-nav-width: var(--page-width);
        --br-nav-height: var(--nav-height);
    }
    main {
        max-width: var(--page-max-width);
        width: var(--page-width);
        height: calc(100% - var(--nav-height));
        margin: auto;
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
