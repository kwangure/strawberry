<script>
    import { createEventForwarder } from "../../utils/forward-events.js";
    import location from "../../utils/stores/location.js";
    import { matchSome } from "../../utils/regex.js";

    /** @type {string} */
    export let href;
    /**
     * The link is colored active `window.location.pathname`
     * satisfies any of the pattern(s).
     * @type {string | string[]}
     */
    export let pattern;

    $: active = matchSome($location?.pathname, pattern);

    const forward = createEventForwarder();
</script>

<li class="berry-navbar-link">
    <a {href} class:active use:forward><slot/></a>
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
        color: inherit;
    }
    a:hover {
        color: var(--br-primary);
        background-color: var(--br-primary-light);
    }
    a.active {
        color: var(--br-primary);
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
        border-bottom: 3px solid var(--br-primary);
    }
</style>

<script context="module">
    export const docs = true;
</script>
