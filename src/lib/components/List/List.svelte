<script context="module">
    export const docs = true;
</script>

<script>
    import { isIOS, isMacintosh } from "../../utils/platform";
    import { onDestroy } from "svelte";
    import { slide } from "svelte/transition";

    export let items = [];
    export let border = false;
    export let deletable = false;

    let Alt = false;
    let Backspace = false;
    let CtrlOrCmd = false;
    let Delete = false;
    let Shift = false;

    $: modifierPressed = CtrlOrCmd || Shift;

    let lastShiftSelection = null;

    const deselectItem = (index, event) => {
        if (modifierPressed) {
            return;
        }
        // do not deselect if focus is lost to child element
        if (event.target.contains(event.relatedTarget)) {
            return;
        }
        // deselect one item if another item is focused on
        // otherwise deselect all
        if (event.relatedTarget) {
            items = items.map((item, i) => {
                if (index === i) {
                    item.selected = false;
                }
                item.focused = index === i;
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
        Backspace = false;
        Delete = false;
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
            item.selected = index === i;
            item.focused = index === i;
            return item;
        });
    }

    function selectMultiple(index) {
        const focused = items.findIndex((item) => item.focused);

        if (focused > -1) {
            // deselect previous shift selection below if new selection is made above
            // and vice versa, to match macOs's finder behaviour
            if (lastShiftSelection !== null) {
                const [start, end] = [focused, lastShiftSelection].sort();
                for (let i = start; i < end + 1; i++) {
                    items[i].selected = false;
                }
            }
            // select range between previously and currently focused item
            const [start, end] = [focused, index].sort();
            for (let i = start; i < end + 1; i++) {
                items[i].selected = true;
            }
        } else {
            selectSingle();
        }
    }

    const selectItem = (index) => {
        // prevent focus & click events overwriting each other
        if (items[index].dirty) return;
        items[index].dirty = true;
        setTimeout(() => delete items[index].dirty, 80);

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

    const borderBottom = (i) => {
        const { selected } = items[i];
        const nextSelected = items[i + 1] && items[i + 1].selected;
        const noBorder = selected || nextSelected;
        return !noBorder;
    };

    const corneredTop = (i) => {
        const roundtop = i === 0 || (items[i - 1] && !items[i - 1].selected);
        return !roundtop;
    };
    const corneredBottom = (i) => {
        const roundbottom =
            i === items.length - 1 || (items[i + 1] && !items[i + 1].selected);
        return !roundbottom;
    };

    function CtrlOrCmdPressed(event) {
        return (
            ((isMacintosh || isIOS) && event.key === "Meta") ||
            event.key === "Control"
        );
    }

    function handleKeydown(event) {
        event.stopPropagation();
        if (CtrlOrCmdPressed(event)) {
            CtrlOrCmd = true;
        }
        switch (event.key) {
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
            default:
        }
    }

    function handleKeyup(event) {
        event.stopPropagation();
        if (CtrlOrCmdPressed(event)) {
            CtrlOrCmd = false;
        }

        switch (event.key) {
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
            default:
        }
    }

    $: {
        if (deletable && (Backspace || Delete)) {
            items = items.filter((item) => !item.selected);
        }
    }

    onDestroy(() => {
        deselectAll();
    });
</script>

<div class="berry-list">
    {#each items as item, i (i)}
        <div
            class="berry-list-item"
            class:border
            class:border-no-radius="{border && !item.selected}"
            class:border-top="{border && !item.selected && i === 0}"
            class:border-bottom="{border && borderBottom(i)}"
            class:cornered-top="{item.selected && corneredTop(i)}"
            class:cornered-bottom="{item.selected && corneredBottom(i)}"
            class:focus-ring="{modifierPressed && item.focused}"
            class:selected="{item.selected}"
            on:blur="{(event) => deselectItem(i, event)}"
            on:click="{() => selectItem(i)}"
            on:focus="{() => selectItem(i)}"
            on:keydown="{handleKeydown}"
            on:keyup="{handleKeyup}"
            tabindex="0"
            transition:slide
        >
            <slot name="item" item="{{ ...item, index: i }}" />
        </div>
    {:else}
        <slot name="empty" />
    {/each}
</div>

<style>
    .berry-list {
        display: flex;
        flex: auto;
        flex-direction: column;
    }
    .berry-list-item,
    .berry-list-item > :global(*) {
        padding: 10px;
        outline: none;
        cursor: pointer;
        user-select: none;
        position: relative;
    }
    .berry-list-item:not(.border-no-radius),
    .berry-list-item > :global(*) {
        border-radius: var(--br-border-radius);
    }
    .berry-list-item > :global(*) {
        margin: -10px;
    }
    .border {
        border-top: 1px solid transparent; /* prevent shifting up and down when border's hidden */
        border-bottom: 1px solid transparent;
    }
    .border-top {
        border-top-color: var(--br-default-border-color);
    }
    .border-bottom {
        border-bottom-color: var(--br-border-color);
    }
    .selected {
        background-color: var(--br-primary-light);
        color: var(--br-primary);
    }
    .selected.cornered-top {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    .selected.cornered-bottom {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    .focus-ring,
    .focus-ring.cornered-top,
    .focus-ring.cornered-bottom {
        box-shadow: 0 0 3px var(--br-primary);
        border-radius: var(--br-border-radius);
        z-index: 1;
    }
</style>
