<script>
    import {
        ACTIVE_OPTION,
        OPTIONS_STORE,
        UPDATE_VALUE_FUNC,
    } from "./Select.svelte";
    import { getContext } from "svelte";
    import uid from "uid";

    export let value;

    const id = uid();
    const activeOptionId = getContext(ACTIVE_OPTION);
    const options = getContext(OPTIONS_STORE);
    const updateSelectValueFn = getContext(UPDATE_VALUE_FUNC);
    let option = null;
    let optionValue = {};

    $: changeOptionValue(option, value);

    function changeOptionValue(option, value) {
        if (option) {
            optionValue = {
                displayText: option.innerText,
                id: id,
                value: value,
            };
            $options = $options.set(id, optionValue);
        }
    }
</script>

<div bind:this={option} class="berry-option menu-item"
    class:active={id === $activeOptionId}
    on:mousedown={() => updateSelectValueFn(optionValue)}>
    <slot></slot>
</div>

<style>
    .menu-item {
        --vertical-padding: 8px;
        --horizontal-padding: 16px;
    }
    .menu-item {
        line-height: var(--br-item-height);
        padding: 0 var(--horizontal-padding);
        font-size: 14px;
        cursor: pointer;
        min-width: 150px;
        background-color: var(--br-white);
    }
    .menu-item :global(a) {
        display: flex;
        padding: var(--vertical-padding) var(--horizontal-padding);
        margin: calc(-1 * var(--vertical-padding)) calc(-1 * var(--horizontal-padding));
        text-decoration: none;
        color: inherit;
    }
    .menu-item:hover,
    .menu-item.active {
        color: var(--br-primary);
        background-color: var(--br-primary-light);
    }
</style>