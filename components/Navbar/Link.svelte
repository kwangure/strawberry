<script>
    import { createEventForwarder } from "../../utils/forward-events.js";

    export let path;
    export let href;

    $: active = href === path;

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
