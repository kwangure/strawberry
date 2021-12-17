<script>
    import fuzzy from "fuzzy";
    import Icon from "../../Icon";
    import Item from "./Item.svelte";
    import { mdiChevronDown } from "@mdi/js";
    import { onDestroy } from "svelte";

    export let options = [];
    export let placement = "bottomLeft";
    export let fallback = "";
    export let value = "";
    export let label = "";
    export let placeholder = "";
    export let icon = "";

    $: top = valid(placement) && placement.includes("top");
    $: bottom = valid(placement) && placement.includes("bottom");
    $: left = valid(placement) && placement.includes("Left");
    $: right = valid(placement) && placement.includes("Right");

    let dropdown = null;
    let input = null;
    let visible = false;
    const extract = (option) => option.html || option.text || option.value;
    let text = fallback ? extract(fallback) : "";
    const fuzzyOptions = {
        pre: "<b>",
        post: "</b>",
        extract,
    };

    $: search = text === extract(fallback) ? "" : text;
    $: filteredOptions = fuzzy
        .filter(search, options, fuzzyOptions)
        .map(({ string, original }) => (
            { ...original, html: string }
        ));
    $: if (visible) {
        document.addEventListener("click", handleDocumentClick);
    } else {
        document.removeEventListener("click", handleDocumentClick);
    }

    export function toggle() {
        visible = !visible;
        if (visible) input.focus();
    }
    export function open() {
        visible = true;
        input.setSelectionRange(0, input.value.length);
    }
    export function close() {
        visible = false;
    }
    export function set(option) {
        ({ value } = option);
        text = option.text || option.value;
    }

    function handleDocumentClick(event) {
        if (!dropdown.contains(event.target)) {
            visible = false;
        }
    }
    function valid(placement) {
        const positions = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
        return positions.includes(placement);
    }

    onDestroy(() => {
        document.removeEventListener("click", handleDocumentClick);
    });
</script>

<div class="berry-select-autocomplete input-wrapper" bind:this={dropdown}>
    <div class="dropdown-button container">
        <input bind:this={input} bind:value={text} class:icon
            on:blur placeholder={placeholder || label} on:change on:input on:keypress on:focus
            on:focus={open} on:keydown type='text' {...$$restProps}>
        <div class="postfix-wrapper" class:visible on:click|stopPropagation={toggle}>
            <Icon path={mdiChevronDown}/>
        </div>
    </div>
    {#if visible}
        <div class="dropdown-menu" class:bottom class:left class:right
            class:top on:click={close}>
            {#if fallback}
                <Item on:click={() => set(fallback)}>
                    {extract(fallback)}
                </Item>
            {/if}
            {#each filteredOptions as option, index}
                <Item on:click={() => set(option)}>
                    {@html extract(option)}
                </Item>
            {:else}
                <slot></slot>
            {/each}
        </div>
    {/if}
</div>

<style>
    @import "../../Input/css/input.css";
    @import "../../Input/css/container.css";
    .input-wrapper {
        display: inline-block;
        position: relative;
        width: 100%;
        line-height: 1.5;
    }
    .dropdown-button {
        display: inline-block;
    }
    .dropdown-menu {
        position: absolute;
        margin-top: 5px;
        background-color: var(--br-white);
        border-radius: var(--br-border-radius);
        outline: none;
        box-shadow: var(--br-box-shadow);
        z-index: 100;
        overflow: hidden;
    }
    .dropdown-menu.top {
        margin-bottom: 5px;
        bottom: 100%;
    }
    .dropdown-menu.bottom {
        margin-top: 5px;
        top: 100%;
    }
    .dropdown-menu.left {
        left: 0;
    }
    .dropdown-menu.right {
        right: 0;
    }
    .menu-item > :global(*) {
        display: block;
    }
</style>
