<script>
    import { onDestroy } from "svelte";
    import Item from "./Item.svelte";
    
    export let items = [];
    export let active = [];
    export let placement = "bottomLeft";
    export let visible = false;
    
    $: active = Number.isInteger(active) ? [active]: active;
    $: active_set =  new Set(active);
    $: is_active = (index) => active_set.has(index);
    
    function valid(placement) {
        let positions = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
        return positions.includes(placement);
    }

    $: top = valid(placement) && placement.includes("top");
    $: bottom = valid(placement) && placement.includes("bottom");
    $: left = valid(placement) && placement.includes("Left");
    $: right = valid(placement) && placement.includes("Right");

    let dropdown = null;

    function handleDocumentClick(e) {
        if(!dropdown.contains(e.target)){
            visible = false;
        }
    }

    export function toggle(){
        visible = !visible;
    }
    export function open(){
        visible = true;
    }
    export function close(){
        visible = false;
    }

    $: {
        visible
            ? document.addEventListener("click", handleDocumentClick)
            : document.removeEventListener("click", handleDocumentClick);
    }

    onDestroy(() => {
        document.removeEventListener("click", handleDocumentClick);
    });
</script>
 
<div class="dropdown" bind:this={dropdown}>
    <div class="dropdown-button" on:click|stopPropagation={toggle}>
        <slot name="button"/>
    </div>
    {#if visible}
        <div class="dropdown-menu" class:bottom class:left class:right
            class:top on:click={close}>
            {#each items as item, index}
                <Item on:click={item.onclick} active={is_active(index)}>
                    <slot name="menu" item={{...item, index}}/>
                </Item>
            {:else}
                <slot></slot>
            {/each}
        </div>
    {/if}
</div>

<style>
    .dropdown {
        position: relative;
        display: inline-block;
    }
    .dropdown-button {
        display: inline-block;
    }
    .dropdown-menu {
        position: absolute;
        margin-top: 5px;
        background-color: var(--white);
        border-radius: 4px;
        outline: none;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        z-index: 100;
        overflow: hidden;
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
    

    .menu-item > * {
        display: block;
    }

    
</style>
