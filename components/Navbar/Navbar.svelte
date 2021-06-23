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

<nav class="berry-nav" bind:offsetHeight={$navHeight}>
    <div class="nav-wrapper ">
        <a class="logo" href={logoHref}>
            <slot name="logo"/>
        </a>
        <ul class="nav-links">
            <slot name="nav-links"/>
        </ul>
        <ul class="calls-to-action">
            <slot name="calls-to-action"/>
        </ul>
    </div>
</nav>

<style>
    nav {
        --br-nav-block-padding: 0px;
        --br-nav-border:;
        --br-nav-height: 48px;
        --br-nav-max-width: 100%;
        --br-nav-padding: var(--br-outer-gutter);
        --br-nav-width: 100%;
        --br-logo-width: auto;
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
    }
    .nav-wrapper {
        width: var(--br-nav-width);
        max-width: var(--br-nav-max-width);
    }
    .nav-links {
        padding-left: var(--br-outer-gutter);
        padding-right: var(--br-outer-gutter);
    }
    .logo {
        padding: var(--br-item-block-padding) var(--br-item-inline-padding);
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
