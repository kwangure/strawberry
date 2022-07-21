<script>
    import { createEventForwarder } from '../../utils/forward-events.js';

    /** @type {boolean} */
    export let active;

    const forward = createEventForwarder();
</script>

<li>
    <div class:active use:forward>
        <slot />
    </div>
</li>

<style>
    li {
        display: flex;
        align-items: center;
        position: relative;
        height: 100%;
    }
    div {
        padding-block: var(--br-navbar-item-padding-block);
        padding-inline: var(--br-navbar-item-padding-inline);
        border-radius: var(--br-navbar-item-border-radius);
        transition: all 0.25s ease;
    }
    div:hover {
        color: var(--br-navbar-item-hover-font-color);
        background-color: var(--br-navbar-item-hover-background-color);
    }
    div.active {
        color: var(--br-navbar-item-active-font-color);
        background-color: var(--br-navbar-item-active-background-color);
    }
    div.active:hover {
        color: var(--br-navbar-item-active-hover-font-color);
        background-color: var(--br-navbar-item-active-hover-background-color);
    }
    div::before {
        display: block;
        content: "";
        position: absolute;
        inset: 0px;
    }
    div.active:before {
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        border-bottom: 3px solid currentColor;
    }
</style>
