<script>
    import { SELECT_VALUE_STORE_NAME } from "./Select.svelte";
    import { getContext } from "svelte";

    export let value;
    const selectValueStore = getContext(SELECT_VALUE_STORE_NAME);

    let optionDisplayText = "";
    function getDisplayText(divElement) {
        optionDisplayText = divElement.innerText;
        
        // Set display text of <Select/> if this <Option/> is initially selected
        if ($selectValueStore.value === value) {
            setParentSelectValue();
        }
    }

    function setParentSelectValue() {
        $selectValueStore = { displayText: optionDisplayText, value };
    }      
</script>

<div class="berry-option menu-item" class:active={$selectValueStore.value === value}
    on:mousedown={setParentSelectValue} use:getDisplayText>
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