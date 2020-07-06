<script>
    import { onDestroy } from "svelte";

    export let placement = "bottomLeft";
    export let visible = false;
    
    function valid(placement) {
        let positions = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
        return positions.includes(placement);
    }

    $: top = valid(placement) && placement.includes("top");
    $: bottom = valid(placement) && placement.includes("bottom");
    $: left = valid(placement) && placement.includes("Left");
    $: right = valid(placement) && placement.includes("Right");

    let dropdownTarget = null;

    function handleDocumentClick(e) {
        if(!dropdownTarget.contains(e.target)){
            visible = false;
        }
    }

    $: {
        visible
            ? document.addEventListener("click", handleDocumentClick, true)
            : document.removeEventListener("click", handleDocumentClick);
    }

    onDestroy(() => {
        document.removeEventListener("click", handleDocumentClick);
    });
</script>
 
<div class="berry-dropdown">
    <div class="dropdown-button" bind:this={dropdownTarget} on:click={() => visible = !visible}>
        <slot name="button" {visible}/>
    </div>
    <div class="dropdown-menu" class:bottom class:left class:right class:top class:visible>
        <slot></slot>
    </div>
</div>

<style>
    .berry-dropdown {
        position: relative;
        display: inline-block;
    }
    .dropdown-button {
        display: inline-block;
    }
    .dropdown-menu {
        display: none;
        position: absolute;
        margin-top: 5px;
        background-color: var(--br-white);
        border-radius: var(--br-border-radius);
        outline: none;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        z-index: 100;
        overflow: hidden;
    }
    .dropdown-menu.visible {
        display: block;
    }
    .dropdown-menu.top {
        margin-bottom: 5px;
        bottom: 100%;
    }
    .dropdown-menu.bottom {
        margin-top: 5px;
        top: 100%;
    }
    .dropdown-menu.left {
        left: 0;
    }
    .dropdown-menu.right {
        right: 0;
    }
</style>
