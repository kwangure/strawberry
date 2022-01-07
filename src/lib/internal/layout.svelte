<script>
    import "~@css/styles";
    import { mdiGithub, mdiNpm } from "@mdi/js";
    import Navbar, { Link as NavLink } from "~@components/Navbar";
    import { base } from "$app/paths";
    import Button from "~@components/Button";
</script>

<div class="app-layout">
    <Navbar logoHref="{base}/">
        <svelte:fragment slot="logo">
            🍓 <span class="text">strawberry</span>
        </svelte:fragment>
        <svelte:fragment slot="nav-links">
            <NavLink href="{base}/components" pattern={[`${base}/components`, `${base}/components/*`]}>
                Components
            </NavLink>
            <NavLink href="{base}/typography" pattern="{base}/typography">
                Typography
            </NavLink>
        </svelte:fragment>
        <svelte:fragment slot="calls-to-action">
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
    <slot/>
</div>

<style>
    .app-layout {
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }
    .app-layout :global(.berry-navbar) {
        --br-nav-border: var(--br-border);
        --br-logo-width: 240px;
    }
    .cta {
        --br-text-color: var(--br-black);
    }
</style>
