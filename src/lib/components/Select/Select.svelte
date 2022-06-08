<script>
    import "../../css/styles.js";
    import { createEventDispatcher, setContext, tick } from "svelte";
    import Dropdown from "../Dropdown";
    import Icon from "../Icon";
    import Input from "../Input/Text/Text.svelte";
    import { mdiChevronDown } from "@mdi/js";
    import { writable } from "svelte/store";

    console.error(`
This component is deprecated and no longer maintained. Please use the Select component at "@kwangure/strawberry/components/Input/Select".
`.trim());

    /** Inline Block */
    /**
     * Text that appears in the form control when it has no value set
     * @type {string}
    */
    export let placeholder = "";
    /**
     * Where to position the popup relative to the dropdown button.
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" }
     */
    export let placement = "bottom-start";
    /**
     * The initial value of the component.
     * @type {any}
     */
    export let value = "";
    /**
     * Compares whether the `Select.value` an `Option.value` are equal.
     * @type {(value, optionValue) => boolean}
     */
    export function compare(a, b) {
        return a === b;
    }
    /**
     * Choose the text displayed when an Option is selected.
     * @type {({ optionValue, optionDisplayText }) => string}
     */
    export function format({ optionDisplayText }) {
        return optionDisplayText;
    }

    const dispatch = createEventDispatcher();
    const activeOptionId = writable("");
    const options = writable(new Map());
    let valueChangedByOption = false;
    let displayText = "";
    let usePlaceholder = false;

    $: handleParentChangedValue(value);
    $: handleParentChangedOptions($options);

    function handleParentChangedOptions(options) {
        syncOptionsWithValue(options, value);
    }

    function syncOptionsWithValue(options, value) {
        usePlaceholder = false;
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
        usePlaceholder = true;
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
            value,
        });
        // eslint-disable-next-line no-unused-vars
        $activeOptionId = option.id;
        valueChangedByOption = true;
        await tick();
        valueChangedByOption = false;
        dispatch("change", value);
        usePlaceholder = false;
    }

    setContext(ACTIVE_OPTION, activeOptionId);
    setContext(OPTIONS_STORE, options);
    setContext(UPDATE_VALUE_FUNC, updateSelectValue);
</script>

<div class="berry-select" class:placeholder={usePlaceholder}>
    <Dropdown {placement}>
        <Input slot="button" bind:value={displayText} {...$$restProps} readonly>
            <slot name="label" slot="label"></slot>
            <Icon slot="postfix" path={mdiChevronDown}/>
        </Input>
        <slot></slot>
    </Dropdown>
</div>

<style>
    .berry-select {
        display: contents;
        --br-input-container-cursor: pointer;
    }
    .placeholder {
        --br-input-text-color: var(--br-grey);
    }
</style>

<script context="module">
    /**
     * Internally used to identify the active option
     * @private
     */
    export const ACTIVE_OPTION = "select-active-option";
    /**
     * Used internally to communicate between `Select` an `Option`
     * @private
     */
    export const OPTIONS_STORE = "select-options-map";
    /**
     * Used internally to update `Select` when an `Option` is selected.
     * @private
     */
    export const UPDATE_VALUE_FUNC = "select-update-func";

    export const docs = true;
</script>