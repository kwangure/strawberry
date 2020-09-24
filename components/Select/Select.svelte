<script>
    import { createEventDispatcher, setContext } from "svelte";
    import { writable } from "svelte/store";
    import { mdiChevronDown } from "@mdi/js";
    import Icon from "../Icon";
    import Dropdown from "../Dropdown";
    import Input from "../Input";

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
    <Dropdown {placement}>
        <div slot="button" class:disabled>
            <Input bind:value={displayText} readonly {label}>
                <div slot="postfix">
                    <Icon path={mdiChevronDown}></Icon>
                </div>
            </Input>
        </div>
        <slot></slot>
    </Dropdown>
</div>

<style>
    [slot="postfix"] {
        all: inherit;
    }
    [slot="button"].disabled {
        pointer-events: none;
        cursor: not-allowed;
    }
</style>

<script context="module">
    export const SELECT_VALUE_STORE_NAME = "custom-select-option";
</script>