<script>
    import { createEventDispatcher, setContext, tick } from "svelte";
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
    export let compare = (a, b) => a === b;
    export let format = ({optionDisplayText}) => optionDisplayText;

    const dispatch = createEventDispatcher();
    const activeOptionId = writable("");
    const options = writable(new Map());
    let valueChangedByOption = false;
    let displayText = "";

    $: handleParentChangedValue(value);
    $: handleParentChangedOptions($options)

    function handleParentChangedOptions(options) {
        syncOptionsWithValue(options, value);
    }

    function syncOptionsWithValue(options, value) {
        for (const [_id, option] of options) {
            if (compare(option.value, value)) {
                displayText = format({
                    optionDisplayText: option.displayText,
                    value: option.value,
                });
                $activeOptionId = option.id;
                return;
            }
        }

        // value doesn't match any child <Option/>
        displayText = placeholder;
        if (import.meta.env.DEV && options.size > 0) {
            console.error(`No option with the value "${value}" was found.`);
        }
    }

    function handleParentChangedValue(value) {
        if (valueChangedByOption) return;
        syncOptionsWithValue($options, value)
    }

    async function updateSelectValue(option) {
        // update scoped vars from outside
        value = option.value;
        displayText =  format({ optionDisplayText: option.displayText, value });
        $activeOptionId = option.id;
        valueChangedByOption = true;
        await tick();
        valueChangedByOption = false;
        dispatch("change", value);
    }

    setContext(ACTIVE_OPTION, activeOptionId);
    setContext(OPTIONS_STORE, options);
    setContext(UPDATE_VALUE_FUNC, updateSelectValue);
</script>

<div class="select" >
    <Dropdown {placement}>
        <div slot="button" class:disabled>
            <Input bind:value={displayText} readonly>
                <span slot="label">{label}</span>
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