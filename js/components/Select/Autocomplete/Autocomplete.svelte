<script>
    import { mdiChevronDown } from "@mdi/js";
    import { onDestroy } from "svelte"
    import fuzzy from "fuzzy";
    import Icon from '../../Icon.svelte';
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
        pre: '<b>',
        post: '</b>',
        extract,
    }

    $: search  = text === extract(fallback) ? "" : text;
    $: filtered_options = fuzzy
                        .filter(search, options, fuzzy_options)
                        .map(({string, original, ...rest}) => (
                            {...original, html: string}
                        ));
    $: {
        visible
            ? document.addEventListener('click', handleDocumentClick)
            : document.removeEventListener('click', handleDocumentClick)
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
        if(!dropdown.contains(event.target)){
            visible = false;
        }
    }
    function valid(placement) {
        let positions = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
        return positions.includes(placement);
    }

    onDestroy(() => {
        document.removeEventListener('click', handleDocumentClick)
    });
</script>
 
<div class="wrapper" bind:this={dropdown}>
    <div class="dropdown-button">
        <!-- svelte-ignore a11y-autofocus -->
        <input {autofocus} bind:this={input} bind:value={text} class:icon {disabled} 
            on:blur placeholder={label} on:change on:input on:keypress on:focus 
            on:focus={open} on:keydown {placeholder} type='text'>
        <div class="input-postfix" class:visible on:click|stopPropagation={toggle}>
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
    .wrapper {
        display: inline-block;
        position: relative;
        width: 100%;
        line-height: 1.5;
    }
    .wrapper {
        --vertical-padding: 5px;
        --horizontal-padding: 12px;
        --padding-right: 25px;
        --vertical-padding-focus: calc(var(--vertical-padding) - 1px);
        --horizontal-padding-focus: calc(var(--horizontal-padding) - 1px);
        --padding-right-focus: calc(var(--padding-right) - 1px);
    }
    input {
        text-align: inherit;
        display: inline-block;
        padding: var(--vertical-padding) var(--horizontal-padding);
        padding-right: var(--padding-right);
        color: rgba(0,0,0,0.65);
        font-size: 14px;
        line-height: 1.5;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        width: 100%;
        height: 35px;
    }
    input:hover {
        border-color: #aaa;
    }
    input:focus {
        border: 2px solid #1870ff;
        outline: 0;
        padding: var(--vertical-padding-focus) var(--horizontal-padding-focus);
        padding-right: var(--padding-right-focus);
    }
    .dropdown-button {
        display: inline-block;
    }
    .dropdown-menu {
        position: absolute;
        margin-top: 5px;
        background-color: #fff;
        border-radius: 4px;
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
    .input-postfix {
        position: absolute;
        top: 2px;
        right: 2px;
        height: 31px;
        z-index: 2;
        color: rgba(0,0,0,0.65);
        display: flex;
        align-items: center;
        border-radius: 0 2px 2px 0;
        padding: 4px;
    }
    .input-postfix.visible {
        color: #1870ff;
        background-color: #deeaff;
    }
</style>
