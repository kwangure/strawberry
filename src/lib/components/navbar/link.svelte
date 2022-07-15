<script context="module">
    export const docs = true;
</script>

<script>
    import { createEventForwarder } from '../../utils/forward-events.js';

    /** @type {boolean} */
    export let active;
    /** @type {string} */
    export let href;

    const forward = createEventForwarder();
</script>

<li class="berry-navbar-link">
    <a {href} class:active use:forward><slot /></a>
</li>

<style>
    li {
        display: flex;
        align-items: center;
        position: relative;
        height: 100%;
    }
    a {
        padding: 5px 8px;
        border-radius: var(--br-border-radius);
        transition: all 0.5s ease;
    }
    @media (theme: berry) and (prefers-color-scheme: dark) {
        :root {
            --_link-hover-background-color: #444;
            --_link-hover-text-color: inherit;
            --_link-hover-border-color: currentColor;
        }
    }
    @media (theme: berry) and (prefers-color-scheme: light) {
        :root {
            --_link-hover-background-color: var(--br-primary-light);
            --_link-hover-text-color: var(--br-primary);
            --_link-hover-border-color: currentColor;
        }
    }
    a:hover {
        color: var(--_link-hover-text-color);
        background-color: var(--_link-hover-background-color);
    }
    a:not(.active) {
        color: inherit;
    }
    a::before {
        display: block;
        content: "";
        position: absolute;
        inset: 0px;
    }
    a.active:before {
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        border-bottom: 3px solid currentColor;
    }
    a.active:hover:before {
        border-bottom: 3px solid var(--_link-hover-border-color);
    }
</style>
