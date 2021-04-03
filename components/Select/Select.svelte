<script>
    import { createEventDispatcher, setContext, tick } from "svelte";
    import Dropdown from "../Dropdown";
    import Icon from "../Icon";
    import Input from "../Input";
    import { mdiChevronDown } from "@mdi/js";
    import { writable } from "svelte/store";

    export let placeholder = "";
    export let placement = "bottom-start";
    export let value = "";
    export let compare = (a, b) => a === b;
    export let format = ({ optionDisplayText }) => optionDisplayText;

    const dispatch = createEventDispatcher();
    const activeOptionId = writable("");
    const options = writable(new Map());
    let valueChangedByOption = false;
    let displayText = "";

    $: handleParentChangedValue(value);
    $: handleParentChangedOptions($options);

    function handleParentChangedOptions(options) {
        syncOptionsWithValue(options, value);
    }

    function syncOptionsWithValue(options, value) {
        for (const [, option] of options) {
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
        syncOptionsWithValue($options, value);
    }

    async function updateSelectValue(option) {
        // update scoped vars from outside
        ({ value } = option);
        displayText = format({
            optionDisplayText: option.displayText,
            value: value,
        });
        // eslint-disable-next-line no-unused-vars
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

<div class="berry-select" >
    <Dropdown {placement}>
        <Input slot="button" bind:value={displayText} {...$$restProps} readonly>
            <slot name="label" slot="label"></slot>
            <Icon slot="postfix" path={mdiChevronDown}></Icon>
        </Input>
        <slot></slot>
    </Dropdown>
</div>

<script context="module">
    export const ACTIVE_OPTION = "select-active-option";
    export const OPTIONS_STORE = "select-options-map";
    export const UPDATE_VALUE_FUNC = "select-update-func";
</script>