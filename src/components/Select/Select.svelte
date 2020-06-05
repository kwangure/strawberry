<script>
    import { onDestroy, setContext } from "svelte";
    import { writable } from "svelte/store";
    import { mdiChevronDown } from "@mdi/js";
    import Icon from "../Icon";
    import Dropdown from "../Dropdown";

    export let placeholder = "";
    export let placement = "bottomLeft";
    export let value = "";
    export let label = "";
    export let disabled = false;

    const selectStore = writable({ text: placeholder, value });
    $: value = $selectStore.value;
    
    setContext(SELECT_STORE_KEY, selectStore);
</script>

<div class="select" >
    {#if typeof label === "string"}
        <div class="label">
            {label}
        </div>
    {/if}
    <Dropdown {placement}>
        <div slot="button" let:visible class:open={visible} class:disabled>
            <input bind:value={$selectStore.text} type="text" readonly>
            <div class="postfix" class:open={visible}>
                <Icon path={mdiChevronDown}></Icon>
            </div>
        </div>
        <slot></slot>
    </Dropdown>
</div>

<style>
    .select {
        --postfix-width: 31px;
        --postfix-height: --postfix-width;
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
        color: var(--primary);
        background-color: var(--primary-light);
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
        padding: var(--input-vertical-padding) var(--input-horizontal-padding);
    }
    .postfix {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--postfix-width);
        height: var(--postfix-height);
    }
</style>

<script context="module">
    export const SELECT_STORE_KEY = "custom-select-option";
</script>