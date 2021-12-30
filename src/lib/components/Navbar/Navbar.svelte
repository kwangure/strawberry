<script context="module">
    import { getContext } from "svelte";

    const key = {};

    export function stores() {
        return getContext(key);
    }
</script>

<script>
    import { setContext } from "svelte";
    import { writable } from "svelte/store";

    export let logoHref = "/";
    const navHeight = writable("");

    setContext(key, { navHeight });
</script>

<nav class="berry-navbar" bind:offsetHeight={$navHeight}>
    <div class="nav-wrapper ">
        {#if $$slots.logo}
            <a class="logo" href={logoHref}>
                <slot name="logo"/>
            </a>
        {/if}
        {#if $$slots["nav-links"]}
            <ul class="nav-links">
                <slot name="nav-links"/>
            </ul>
        {/if}
        {#if $$slots["calls-to-action"]}
            <ul class="calls-to-action">
                <slot name="calls-to-action"/>
            </ul>
        {/if}
    </div>
</nav>

<style>
    :export {
        /* TODO: Refactor markup to simplify CSS API */
        --br-nav-padding-block: var(--br-outer-gutter);
        --br-nav-padding-inline: ;
        --br-nav-border: ;
        --br-nav-height: ;
        --br-nav-max-width: 100%;
        --br-nav-width: 100%;
        --br-logo-width: ;
        --br-logo-padding-block: ;
        --br-logo-padding-inline: ;
    }
    nav, .nav-wrapper, ul {
        display: flex;
        align-items: center;
        height: var(--br-nav-height, 48px);
    }
    nav {
        justify-content: center;
        border-bottom: var(--br-nav-border, none);
        height: var(--br-nav-height);
        padding: var(--br-nav-padding-block) var(--br-nav-padding-inline, auto);
    }
    .nav-wrapper {
        width: calc(var(--br-nav-width, 100%) + var(--br-nav-padding-block)*2);
        max-width: var(--br-nav-max-width, 100%);
    }
    .nav-links {
        padding-left: var(--br-outer-gutter);
        padding-right: var(--br-outer-gutter);
    }
    .logo {
        padding: var(--br-logo-padding-block, var(--br-outer-gutter)) var(--br-logo-padding-inline, var(--br-outer-gutter));
        font-weight: 600;
        width: var(--br-logo-width, auto);
    }
    ul {
        gap: 0.5rem;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .calls-to-action {
        margin-left: auto;
    }
</style>
