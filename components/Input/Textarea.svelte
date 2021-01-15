<script>
    import Container from "./Container.svelte";
    import { createEventForwarder } from "$utils/forward-events.js";

    export let value = "";
    export let hideLabel = false;
    export let focus = false;

    const forward = createEventForwarder();

    let textarea = null;

    $: (focus && textarea) ? textarea.focus() : "";

    function autosize(){
        const computed = getComputedStyle(textarea);

        let newHeight;
        newHeight = parseInt(computed.getPropertyValue("border-top-width"));
        newHeight += parseInt(computed.getPropertyValue("border-bottom-width"));

        newHeight += textarea.scrollHeight;
        textarea.style.height =  `${newHeight}px`;
    }
</script>

<Container class="berry-input" {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <textarea bind:this={textarea} on:input={autosize}
        use:forward bind:value id={labelId} {...$$restProps}/>
</Container>

<style>
    @import "./css/input.css";
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