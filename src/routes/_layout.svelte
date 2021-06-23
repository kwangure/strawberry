<script>
    import "~@css/standardDOM";
    import Navbar, { Link as NavLink } from "~@components/Navbar";
    import { base } from "$app/paths";
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
    </Navbar>
    <slot/>
</div>

<style>
    .app-layout {
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }
    .app-layout :global(.berry-nav) {
        --br-nav-border: var(--br-border);
        --br-logo-width: 240px;
    }
</style>
