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

    const navHeight = writable("");

    setContext(key, { navHeight });
</script>

<nav class="berry-nav" bind:offsetHeight={$navHeight}>
    <div class="nav-wrapper ">
        <div class="nav-links">
            <a class="logo" href="/">
                <slot name="logo"/>
            </a>
            <ul class="links">
                <slot name="nav-links"/>
            </ul>
        </div>
        <ul class="calls-to-action">
            <slot name="calls-to-action"/>
        </ul>
    </div>
</nav>

<style>
    nav,
    .nav-wrapper,
    .nav-links {
        display: flex;
        align-items: center;
    }
    nav {
        --br-nav-block-padding: 0px;
        --br-nav-border:;
        --br-nav-max-width: 100%;
        --br-nav-padding: var(--br-outer-gutter);
        --br-nav-width: 100%;
    }
    nav {
        display: flex;
        justify-content: center;
        border-bottom: var(--br-nav-border);
        padding-left: var(--br-nav-padding);
        padding-right: var(--br-nav-padding);
    }
    .nav-wrapper {
        width: var(--br-nav-width);
        max-width: var(--br-nav-max-width);
        justify-content: space-between;
        padding-top: var(--br-nav-block-padding);
        padding-bottom: var(--br-nav-block-padding);
    }
    .links {
        display: none;
    }
    .logo {
        padding: var(--br-item-block-padding) var(--br-item-inline-padding);
        margin-right: 1rem;
        font-weight: 600;
    }
    ul {
        display: flex;
        gap: 0.5rem;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    /* TODO: use @container queries */
    @media only screen and (min-width: 500px) {
        .links {
            display: flex;
        }
    }
    @media only screen and (min-width: 669px) {
        .nav-wrapper {
            --br-nav-block-padding: 0.75rem;
        }
        ul {
            gap: 1.5rem;
        }
        .logo {
            margin-right: 2.25rem;
        }
    }
</style>
