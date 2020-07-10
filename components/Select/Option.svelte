<script>
    import { SELECT_STORE_KEY  } from "./Select.svelte";
    import { getContext } from "svelte";

    export let value = null;

    let innerText = "";
    function getInnerText(optionDOMNode) {
        innerText = optionDOMNode.innerText;

        // Set initial Select value as default
        if ($selectStore.value === (value || innerText)) {
            setSelectStore();
        }
    }

    const selectStore = getContext(SELECT_STORE_KEY);
    const changeEvent = new CustomEvent("change", { detail: value || innerText });

    function setSelectStore() {
        $selectStore = {
            text: innerText,
            value: value || innerText,
        };
    }
    
    function handleClick() {
        setSelectStore();
        dispatchEvent(changeEvent);
    }
</script>

<div class="berry-option menu-item" class:active={$selectStore.text === innerText}
    on:mousedown={handleClick} use:getInnerText>
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
        transition: all .3s;
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