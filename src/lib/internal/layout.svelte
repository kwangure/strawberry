<script>
    import Navbar, { Link as NavLink } from "~@components/navbar";
    import { base } from "$app/paths";

    import Theme from "@kwangure/strawberry/components/Theme";
</script>

<Theme />

<div class="app-layout">
    <Navbar logoHref="{base}/">
        <svelte:fragment slot="logo">
            🍓 <span class="text">strawberry</span>
        </svelte:fragment>
        <svelte:fragment slot="links">
            <NavLink
                href="{base}/components"
                pattern="{[`${base}/components`, `${base}/components/*`]}"
            >
                Components
            </NavLink>
            <NavLink href="{base}/typography" pattern="{base}/typography">
                Typography
            </NavLink>
        </svelte:fragment>
        <svelte:fragment slot="actions">
            <a
                class="cta"
                href="https://github.com/kwangure/strawberry"
                target="_blank"
            >
                GitHub
            </a>
            <a
                class="cta"
                href="https://www.npmjs.com/package/@kwangure/strawberry"
                target="_blank"
            >
                NPM
            </a>
        </svelte:fragment>
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
        --br-navbar-border-bottom: var(--br-default-border);
        --br-navbar-logo-width: 240px;
    }
    .cta {
        --br-text-color: var(--_black);
    }
</style>
