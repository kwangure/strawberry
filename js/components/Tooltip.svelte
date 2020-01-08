<script>
    let breakParent = false;
    export { breakParent as break };
    export let left = false;
    export let right = false;
    export let label = "";
</script>

<span aria-label={label} class:active={label} class:left 
    class:center={!left && !right} class:right class:breakParent>
    <slot></slot>
</span>

<style>
    .active {
        position: relative;
    }
    .active:before,
    .active:after {
        opacity: 0;
        transition: opacity 300ms ease-in-out;
        pointer-events: none;
        position: absolute;
        display: block;
        z-index: 300;
    }
    .active:hover:before,
    .active:hover:after {
        opacity: 1;
    }
    .active.breakParent {
        position: static;
    }
    .active:before {
        top: calc(100%);
        border: solid;
        border-color: var(--grey-dark) transparent;
        border-width: 0 8px 9px 8px;
        content: "";
    }
    .active:after {
        line-height: 2em;
        background: var(--grey-dark);
        border-radius: 4px;
        top: calc(100% + 8px);
        color: var(--white);
        content: attr(aria-label);
        padding: 10px 20px;
        white-space: nowrap;
        font-size: 12px;
        text-transform: none;
        font-weight: 400;
    }
    .active.left:before {
        left: 0px;
    }
    .active.left:after {
        left: -10px;
    }
    .active.center:before,
    .active.center:after {
        left: 50%;
        transform: translateX(-50%);
    }
    .active.right:before {
        right: 0px;
    }
    .active.right:after {
        right: -10px;
    }
</style>