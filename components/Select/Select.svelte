<script>
    import { createEventDispatcher, setContext } from "svelte";
    import { writable } from "svelte/store";
    import { mdiChevronDown } from "@mdi/js";
    import Icon from "../Icon";
    import Dropdown from "../Dropdown";

    export let placeholder = "";
    export let placement = "bottomLeft";
    export let value = "";
    export let label = "";
    export let disabled = false;
    let displayText = placeholder;

    const selectValueStore = writable({ displayText, value });
    const dispatch = createEventDispatcher();

    $: handleValueChange($selectValueStore);
    
    function handleValueChange(selectValue) {
        ({ displayText, value } = selectValue);
        dispatch("change", value);
    }
    
    // Children of <Select/> (i.e <Option/>) change the value of 
    // this parent <Select/> via `getContext`
    setContext(SELECT_VALUE_STORE_NAME, selectValueStore);
</script>

<div class="select" >
    {#if typeof label === "string"}
        <div class="label">
            {label}
        </div>
    {/if}
    <Dropdown {placement}>
        <div slot="button" let:visible class:open={visible} class:disabled>
            <input bind:value={displayText} type="text" readonly>
            <div class="postfix" class:open={visible}>
                <Icon path={mdiChevronDown}></Icon>
            </div>
        </div>
        <slot></slot>
    </Dropdown>
</div>

<style>
    .select {
        --br-postfix-width: 31px;
        --br-postfix-height: --br-postfix-width;
    }
    .label {
        margin-bottom: 5px;
        line-height: 1.5;
    }
    [slot="button"] {
        display: flex;
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid #d9d9d9;
        padding: 1px;
    }
    [slot="button"]:hover,
    [slot="button"].open {
        border: 2px solid #196eff;
        outline: none;
        padding: 0px;
    }
    [slot="button"]:hover .postfix, 
    .postfix.open {
        color: var(--br-primary);
        background-color: var(--br-primary-light);
    }
    [slot="button"].disabled {
        pointer-events: none;
        cursor: not-allowed;
    }
    input {
        border: none;
        outline: none;
        height: 32px;
        user-select: none;
        flex: 1;
        user-select: none;
        padding: var(--br-input-vertical-padding) var(--br-input-horizontal-padding);
    }
    .postfix {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--br-postfix-width);
        height: var(--br-postfix-height);
    }
</style>

<script context="module">
    export const SELECT_VALUE_STORE_NAME = "custom-select-option";
</script>