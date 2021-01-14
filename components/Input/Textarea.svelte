<script>
    import { createEventForwarder } from "$utils/forward-events.js";
    import uid from 'uid';

    export let value = "";
    export let hideLabel = false;
    export let focus = false;

    const forward = createEventForwarder();

    let textarea = null;
    let labelId = uid();

    $: (focus && textarea) ? textarea.focus() : "";

    if (import.meta.env.DEV && !$$slots.label) {
        console.error(`
The 'label' slot must be included. If you want to hide it pass the 'hideLabel' prop.

To read about a hidden '<label/>' for accessibility reasons, see:
https://www.w3.org/WAI/tutorials/forms/labels/#hiding-label-text
        `.trim());
    }

    function autosize(){
        const computed = getComputedStyle(textarea);

        let newHeight;
        newHeight = parseInt(computed.getPropertyValue("border-top-width"));
        newHeight += parseInt(computed.getPropertyValue("border-bottom-width"));

        newHeight += textarea.scrollHeight;
        textarea.style.height =  `${newHeight}px`;
    }
</script>

<span class="berry-textarea input-wrapper">
    <label class:br-accessible-hide={hideLabel} for={labelId} >
        <slot name="label"/>
    </label>
    <textarea bind:this={textarea} on:input={autosize}
        use:forward bind:value id={labelId} {...$$restProps}/>
</span>

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