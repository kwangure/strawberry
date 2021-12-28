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
        --br-nav-block-padding: var(--br-outer-gutter);
        --br-nav-inline-padding: auto;
        --br-nav-border: none;
        --br-nav-height: 48px;
        --br-nav-max-width: 100%;
        --br-nav-width: 100%;
        --br-logo-width: auto;
        --br-logo-block-padding: var(--br-outer-gutter);
        --br-logo-inline-padding:  var(--br-outer-gutter);
    }
    nav, .nav-wrapper, ul {
        display: flex;
        align-items: center;
        height: var(--br-nav-height);
    }
    nav {
        justify-content: center;
        border-bottom: var(--br-nav-border);
        height: var(--br-nav-height);
        padding: var(--br-nav-block-padding) var(--br-nav-inline-padding);
    }
    .nav-wrapper {
        width: calc(var(--br-nav-width) + var(--br-nav-block-padding)*2);
        max-width: var(--br-nav-max-width);
    }
    .nav-links {
        padding-left: var(--br-outer-gutter);
        padding-right: var(--br-outer-gutter);
    }
    .logo {
        padding: var(--br-logo-block-padding) var(--br-logo-inline-padding);
        font-weight: 600;
        width: var(--br-logo-width);
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
