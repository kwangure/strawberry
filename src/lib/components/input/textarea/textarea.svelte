<script>
    import Container from "../container.svelte";
    import { createEventForwarder } from "../../../utils/forward-events.js";
    import { slide } from "svelte/transition";

    /**
     * The initial value of the component.
     * @type {string | undefined}
     */
    export let value = "";
    /**
     * Whether to hide the input label.
     *
     * @type {boolean}
     */
    export let hideLabel = false;
    /**
     * Whether the input is focused.
     *
     * @type {boolean}
     */
    export let focus = false;
    export let invalid = () => false;

    const forward = createEventForwarder();

    let textarea = null;
    let blurred = false;

    $: if (focus && textarea) textarea.focus();
    $: isInvalid = blurred && invalid(value);

    function autosize() {
        const computed = getComputedStyle(textarea);

        let newHeight;
        newHeight = parseInt(computed.getPropertyValue("border-top-width"));
        newHeight += parseInt(computed.getPropertyValue("border-bottom-width"));

        newHeight += textarea.scrollHeight;
        textarea.style.height = `${newHeight}px`;
    }
</script>

<Container {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <textarea class="text-input" class:is_invalid={isInvalid}
        bind:this={textarea} on:input={autosize}
        on:blur={() => blurred = true}
        use:forward bind:value id={labelId} {...$$restProps}/>
    {#if isInvalid}
    <div class="invalid" transition:slide>
        {isInvalid}
    </div>
    {/if}
</Container>

<style>
    @import "../css/input.css";
    @import "../css/container.css";
    :export {
        --br-textarea-border: ;
    }
    @media (theme: berry) and (prefers-color-scheme: dark) {
        :scope {
            --_textarea-box-shadow-color: var(--br-primary);
            --_textarea-border-color: var(--blue-3);
            --_textarea-text-color: #dcdcdc;
        }
    }
    @media (theme: berry) and (prefers-color-scheme: light) {
        :scope {
            --_textarea-box-shadow-color: var(--br-primary-light);
            --_textarea-border-color: var(--br-primary);
            --_textarea-text-color: #dcdcdc;
        }
    }
    textarea.text-input {
        width: 100%;
        overflow: scroll;
        overflow-x: hidden;
        -ms-overflow-style: none;
        scrollbar-width: none;
        border: var(--br-textarea-border, var(--br-default-border));
        border-radius: var(--br-textarea-border-radius, var(--br-border-radius));
    }
    textarea::-webkit-scrollbar {
        display: none;
    }
    textarea:hover:not(:focus) {
        box-shadow: 0 0 0px 2px var(--_container-box-shadow-color);
        border-color: var(--_container-border-color);
    }
    textarea:focus {
        border: 2px solid var(--br-primary);
        padding: calc(var(--br-input-padding-block, 5px) - 1px) calc(var(--br-input-padding-inline, 12px) - 1px);
    }
</style>

<script context="module">
    export const docs = true;
</script>
