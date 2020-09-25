<script>
    import { createEventDispatcher, setContext } from "svelte";
    import { mdiChevronDown } from "@mdi/js";
    import { writable } from "svelte/store";
    import Icon from "../Icon";
    import Dropdown from "../Dropdown";
    import Input from "../Input";

    export let placeholder = "";
    export let placement = "bottomLeft";
    export let value = "";
    export let label = "";
    export let disabled = false;

    const dispatch = createEventDispatcher();
    const activeOptionId = writable("");
    const options = writable(new Map());
    let valueIsDirty = false;
    let displayText = "";

    $: handleValueChange($options, value);
    
    function handleValueChange(options, value) {
        // value was changed by `updateSelectValue`
        if (valueIsDirty) {
            valueIsDirty = false;
            dispatch("change", value);
            return;
        }

        // value was changed via props
        for (const [_id, option] of options) {
            if (option.value === value) {
                ({ displayText, id: $activeOptionId } = option);
                return;
            }
        }

        // value doesn't match any child <Option/>
        displayText = placeholder;
        if (import.meta.env.DEV && options.size > 0) {
            console.error(`No option with the value "${value}" was found.`);
        }
    }

    function updateSelectValue(option) {
        // update scoped vars from outside
        ({ value, displayText, id :$activeOptionId } = option);
        valueIsDirty = true;
    }

    setContext(ACTIVE_OPTION, activeOptionId);
    setContext(OPTIONS_STORE, options);
    setContext(UPDATE_VALUE_FUNC, updateSelectValue);
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
    export const ACTIVE_OPTION = "select-active-option";
    export const OPTIONS_STORE = "select-options-map";
    export const UPDATE_VALUE_FUNC = "select-update-func";
</script>