<script>
    import { mdiChevronDown } from "@mdi/js";
    import { onDestroy } from "svelte";
    import fuzzy from "fuzzy";
    import Icon from "../../Icon";
    import Item from "./Item.svelte";

    export let options = [];
    export let placement = "bottomLeft";
    export let fallback = "";
    export let value = "";
    export let label = "";
    export let placeholder = "";
    export let icon = "";
    export let disabled = false;
    export let autofocus = false;

    $: top = valid(placement) && placement.includes("top");
    $: bottom = valid(placement) && placement.includes("bottom");
    $: left = valid(placement) && placement.includes("Left");
    $: right = valid(placement) && placement.includes("Right");

    let dropdown = null;
    let input    = null;
    let visible  = false;
    let extract  = option => option.html || option.text || option.value;
    let text     = fallback ? extract(fallback) : "";
    let fuzzy_options = {
        pre: "<b>",
        post: "</b>",
        extract,
    };

    $: search  = text === extract(fallback) ? "" : text;
    $: filtered_options = fuzzy
        .filter(search, options, fuzzy_options)
        .map(({string, original}) => (
            {...original, html: string}
        ));
    $: {
        visible
            ? document.addEventListener("click", handleDocumentClick)
            : document.removeEventListener("click", handleDocumentClick);
    }

    export function toggle(){
        visible = !visible;
        visible ? input.focus() : "";
    }
    export function open(){
        visible = true;
        input.setSelectionRange(0, input.value.length);
    }
    export function close(){
        visible = false;
    }
    export function set(option){
        value = option.value;
        text  = option.text || option.value;
    }

    function handleDocumentClick(e) {
        if(!dropdown.contains(e.target)){
            visible = false;
        }
    }
    function valid(placement) {
        let positions = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
        return positions.includes(placement);
    }

    onDestroy(() => {
        document.removeEventListener("click", handleDocumentClick);
    });
</script>

<div class="berry-select-autocomplete input-wrapper" bind:this={dropdown}>
    <div class="dropdown-button">
        <!-- svelte-ignore a11y-autofocus -->
        <input {autofocus} bind:this={input} bind:value={text} class:icon 
            class="input-postfix" {disabled} 
            on:blur placeholder={placeholder || label} on:change on:input on:keypress on:focus 
            on:focus={open} on:keydown type='text'>
        <div class="postfix-wrapper" class:visible on:click|stopPropagation={toggle}>
            <Icon path={mdiChevronDown}></Icon>
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
            {#each filtered_options as option, index}
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
    @import "../../Input/Input.css";
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
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
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
    .menu-item > * {
        display: block;
    }
</style>
