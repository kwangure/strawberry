<script>
    import { isMacintosh } from "../utils/platform";
    import { onMount, onDestroy } from "svelte";
    import { slide } from "svelte/transition";

    export let items = [];
    export let deletable = false;

    let Alt = false;
    let Backspace = false;
    let CtrlOrCmd = false;
    let Delete = false;
    let Shift = false;
    
    $: modifierPressed = CtrlOrCmd || Shift;

    let lastShiftSelection = null;

    let deselectItem = (index, e) => {
        if(modifierPressed) {
            return;
        }
        //deselect focused on only if another item is focused on
        if(e.relatedTarget) {
            items = items.map((item, i) => {
                if (index === i) {
                    item.selected = false;
                }
                item.focused = (index === i);
                return item;
            });
        } else {
            deselectAll();            
        }
    };

    function deselectAll() {
        items = items.map((item) => {
            item.selected = false;
            item.focused = false;
            return item;
        });
                
        CtrlOrCmd = false;
        Shift = false;
        Alt = false;
        // Backspase = false;
        // Delete = false;
        lastShiftSelection = null;  
    }

    // add/remove one item from selection
    function addToSelection(index) {
        items = items.map((item, i) => {
            if (index === i) {
                item.selected = !item.selected;
            }
            item.focused = index === i; // focus current item
            return item;
        });
    }

    // deselect all but currently focused item
    function selectSingle(index) {
        items = items.map((item, i) => {
            item.selected = (index === i);
            item.focused = (index === i);
            return item;
        });
    }

    function selectMultiple(index) {
        let focused = items.findIndex(item => item.focused);

        if (focused > -1) {
            // deselect previous shift selection below if new selection is made above
            // and vice versa, to match macOs's finder behaviour
            if (lastShiftSelection !== null) {
                const [start, end] = [focused, lastShiftSelection].sort();
                for (let i = start; i < (end + 1); i++) {
                    items[i].selected = false;
                }
            }
            // select range between previously and currently focused item
            const [start, end] = [focused, index].sort();
            for (let i = start; i < (end + 1); i++) {
                items[i].selected = true;
            }
        } else {
            selectSingle();
        }
    }

    let selectItem = (index) => {
        // prevent focus & click events overwriting each other
        if (items[index].dirty) return;
        items[index].dirty = true;
        setTimeout(() => items[index].dirty = false, 80);

        CtrlOrCmd = CtrlOrCmd && !Shift && !Alt;
        Shift = !CtrlOrCmd && Shift && !Alt;
        Alt = !CtrlOrCmd && !Shift && Alt;

        if (CtrlOrCmd) {
            addToSelection(index);
        } else if (Shift) {
            selectMultiple(index);
        } else {
            selectSingle(index);
        }

        lastShiftSelection = Shift ? index : null;
    };

    let corneredtop = i => {
        let roundtop = (i === 0) || (items[i-1] && !items[i-1].selected);
        return !roundtop;
    };
    let corneredbottom = i => {
        let roundbottom = (i === items.length - 1)  || (items[i+1] && !items[i+1].selected);
        return !roundbottom;
    };

    onMount(() => {
        function CtrlOrCmdPressed(e) {
            return (isMacintosh && e.key === "Meta") || e.key === "Control";
        }

        addEventListener("keydown", (e) => {
            if (CtrlOrCmdPressed(e)) {
                CtrlOrCmd = true;
            }
            switch(e.key) {
            case "Alt":
                Alt = true;
                break;
            case "Backspace":
                Backspace = true;
                break;
            case "Delete":
                Delete = true;
                break;
            case "Shift":
                Shift = true;
                break;
            }
        });

        addEventListener("keyup", (e) => {
            if (CtrlOrCmdPressed(e)) {
                CtrlOrCmd = false;
            }

            switch(e.key) {
            case "Alt":
                Alt = false;
                break;
            case "Backspace":
                Backspace = false;
                break;
            case "Delete":
                Delete = false;
                break;
            case "Shift":
                Shift = false;
                break;
            }
        });
        
        addEventListener("beforeunload", deselectAll);
    });

    $: {
        if(deletable && (Backspace || Delete)) {
            items = items.filter(item => !item.selected);
        }
    }

    onDestroy(() => deselectAll());
</script>

<svelte:options tag="berry-list"/>

<div class="berry-list">
    {#each items as item, i (i)}
        <div class="berry-list-item" class:selected={item.selected}
            class:focused={modifierPressed && item.focused}
            class:corneredtop={item.selected && corneredtop(i)} 
            class:corneredbottom={item.selected && corneredbottom(i)}
            on:blur={(e) => deselectItem(i, e)}
            on:click={() => selectItem(i)}
            on:focus={() => selectItem(i)}
            tabindex="0"
            transition:slide>
            <slot name="item" item={{...item, index: i}}></slot>
        </div>
    {:else}
        <slot name="empty"></slot>
    {/each}
</div>

<style>
    @import "../../../css/strawberry.css";
    .berry-list {
        display: flex;
        flex: auto;
        flex-direction: column;
    }
    .berry-list-item {
        padding: 10px;
        outline: none;
        cursor: pointer;
        transition: all 250ms ease;
        user-select: none;
        border-radius: 4px;
        position: relative;
    }
    .berry-list-item.selected:not(.form-item) {
        background-color: var(--primary-light);
        color: var(--primary);
    }
    .berry-list-item.focused:not(.form-item) {
        box-shadow: 0 0 3px var(--primary);
        z-index: 1;
    }
    .selected.corneredtop {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    .selected.corneredbottom {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
</style>