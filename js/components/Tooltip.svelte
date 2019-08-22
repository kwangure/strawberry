<script>
    let breakParent = false
    export { breakParent as break }
    export let left = false
    export let right = false
    export let label = ''
</script>

<span 
    class:tooltipped={label} class:left class:center={!left && !right} 
    class:right class:breakParent 
    aria-label={label}>
    <slot></slot>
</span>

<style>
    .tooltipped {
        display: inline-block;
        position: relative;
    }
    .tooltipped.breakParent {
        position: static;
    }
    .tooltipped:hover:after {
        line-height: 1em;
        background: #4a4e57;
        border-radius: 4px;
        bottom: auto;
        top: calc(100% + 7px);
        color: #fff;
        content: attr(aria-label);
        display: block;
        padding: 7px 10px;
        position: absolute;
        white-space: nowrap;
        z-index: 300;
        font-size: 12px;
        text-transform: none;
        font-weight: 400;
        pointer-events: none;
    }
    .tooltipped.left:hover:after {
        left: 0%;
    }
    .tooltipped.center:hover:after {
        left: 50%;
        transform: translateX(-50%);
    }
    .tooltipped.right:hover:after {
        right: 0%;
    }
    .tooltipped:hover:before {
        border: solid;
        border-color: #4a4e57 transparent;
        bottom: auto;
        top: calc(100% + 2px);
        border-width: 0 5px 5px 5px;
        content: "";
        display: block;
        position: absolute;
        z-index: 301;
    }
    .tooltipped.left:hover:before {
        left: 10%;
    }
    .tooltipped.center:hover:before {
        left: 50%;
        transform: translateX(-50%);
    }
    .tooltipped.right:hover:before {
        right: 10%;
    }
</style>