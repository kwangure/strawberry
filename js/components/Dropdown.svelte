<script>
    export let items = []
    export let placement = 'bottomLeft';

    function valid(placement) {
        let positions = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
        return positions.includes(placement)
    }

    $: top = valid(placement) && placement.includes("top")
    $: bottom = valid(placement) && placement.includes("bottom")
    $: left = valid(placement) && placement.includes("Left")
    $: right = valid(placement) && placement.includes("Right")

    let dropdown = null
    let visible = false

    function handleDocumentClick(e) {
        if(!dropdown.contains(event.target)){
            visible = false
        }
    }

    export function toggle(){
        visible = !visible
    }
    export function open(){
        visible = true
    }
    export function close(){
        visible = false
    }

    $: {
        visible
            ? document.addEventListener('click', handleDocumentClick)
            : document.removeEventListener('click', handleDocumentClick)
    }

</script>
 
<div class="dropdown" bind:this={dropdown}>
    <div class="dropdown-button" on:click|stopPropagation={toggle}>
        <slot name="button"/>
    </div>
    {#if visible}
        <div class="dropdown-menu" class:bottom class:left class:right
            class:top on:click={close}>
            {#each items as item, index}
                <div class="menu-item" >
                    <slot name="menu" item={{...item, index}}/>
                </div>
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
        background-color: #fff;
        border-radius: 4px;
        outline: none;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        z-index: 100;
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
    .menu-item {
        clear: both;
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
        white-space: nowrap;
        cursor: pointer;
        transition: all .3s;
        min-width: 130px;
        background-color: #fff;
    }

    .menu-item:not(.linked) {
        padding: 8px 16px;
    }

    .menu-item :global(a) {
        padding: 8px 16px;
        text-decoration: none;
        color: inherit;
    }

    .menu-item > * {
        display: block;
    }

    .menu-item:hover {
        color: #1870ff;
        background-color: #deeaff;
    }
</style>
