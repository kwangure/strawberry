<script context="module">
    import { getContext } from "svelte";

    export const docs = true;

    const key = {};
    export function stores() {
        return getContext(key);
    }
</script>

<script>
    import "../../css/styles.js";
    import { setContext } from "svelte";
    import { writable } from "svelte/store";

    export let logoHref = "/";
    const navHeight = writable("");

    setContext(key, { navHeight });
</script>

<nav bind:offsetHeight={$navHeight}>
    <!--
        We need a wrapper for the usecase where we want a fixed width centered navbar
        with a bottom border.
    -->
    <div class="wrapper">
        {#if $$slots.logo}
            <a class="logo" href={logoHref}>
                <slot name="logo"/>
            </a>
        {/if}
        {#if $$slots.links}
            <ul class="links">
                <slot name="links"/>
            </ul>
        {/if}
        {#if $$slots.actions}
            <ul class="actions">
                <slot name="actions"/>
            </ul>
        {/if}
    </div>
</nav>

<style>
    :export {
        --br-navbar-border-bottom: ;
        --br-navbar-margin-block: ;
        --br-navbar-padding-inline: ;
        --br-navbar-height: ;
        --br-navbar-max-width: ;
        --br-navbar-logo-width: ;
        --br-navbar-logo-padding-inline: ;
        --br-navbar-link-padding-inline: ;
        --br-navbar-actions-padding-inline: ;
        --br-navbar-items-padding-inline: ;
        --br-navbar-items-gap: ;
    }
    ul,
    .wrapper {
        display: flex;
        align-items: center;

        /*
            An active link has a colored bottom border. This border should always touch
            the bottom border of the navbar. Therefore, `nav`, `.wrapper` and `ul` must
            be the same height without padding/margin in between them on the bottom side.
        */
        height: var(--br-navbar-height, 48px);
    }
    /*
        Navbar requirements:
        1) I should be able to center a fixed-width navbar but with full-width edge to edge border
        2) I should be able to add spacing in the inline/block directions of the navbar
        2.5) The active link should have a highlighted border touching the bottom border of the navbar
        no matter which variables I override.
    */
    nav {
        border-bottom: var(--br-navbar-border-bottom, none);
        margin-block: var(--br-navbar-margin-block, initial);
    }
    .wrapper {
        max-width: var(--br-navbar-max-width, initial);
        padding-inline: var(--br-navbar-padding-inline, initial);
        margin-inline: auto;
    }
    ul {
        gap: var(--br-navbar-gap, 0.5rem);
        list-style: none;
    }
    .logo {
        padding-inline: var(--br-navbar-logo-padding-inline, var(--br-navbar-items-padding-inline, 8px));
        width: var(--br-navbar-logo-width, max-content);
    }
    .links {
        padding-inline: var(--br-navbar-link-padding-inline, var(--br-navbar-items-padding-inline, 8px));
    }
    .actions {
        padding-inline: var(--br-navbar-actions-padding-inline, var(--br-navbar-items-padding-inline, 8px));
        margin-left: auto;
    }
</style>
