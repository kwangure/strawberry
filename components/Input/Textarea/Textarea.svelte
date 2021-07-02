<script>
    import Container from "../Container.svelte";
    import { createEventForwarder } from "../../../utils/forward-events.js";

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

    const forward = createEventForwarder();

    let textarea = null;

    $: if (focus && textarea) textarea.focus();

    function autosize() {
        const computed = getComputedStyle(textarea);

        let newHeight;
        newHeight = parseInt(computed.getPropertyValue("border-top-width"));
        newHeight += parseInt(computed.getPropertyValue("border-bottom-width"));

        newHeight += textarea.scrollHeight;
        textarea.style.height = `${newHeight}px`;
    }
</script>

<Container class="berry-input-textarea" {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <textarea bind:this={textarea} on:input={autosize}
        use:forward bind:value id={labelId} {...$$restProps}/>
</Container>

<style>
    @import "../css/input.css";
    textarea {
        width: 100%;
        overflow: scroll;
        overflow-x: hidden;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    textarea::-webkit-scrollbar {
        display: none;
    }
</style>