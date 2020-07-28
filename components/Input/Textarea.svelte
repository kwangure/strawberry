<script>
    import "./Input.css";
    import uid from 'uid';

    export let name = "";
    export let placeholder = "";
    export let value = "";
    export let disabled = false;
    export let rows = 3;
    export let label;
    export let hideLabel = false;
    export let focus = false;

    let textarea = null;
    let labelId = uid();

    $: (focus && textarea) ? textarea.focus() : "";

    if (import.meta.env.DEV) {
        const isEmpty = (str) => (!str || 0 === str.length);
        isEmpty(label) && console.error(`
The 'label' prop must be included. If you want to hide it pass the 'hideLabel:boolean' prop.

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
    <label class:br-accessible-hide={hideLabel} for={labelId} >{label || ""}</label>
    <textarea bind:this={textarea} {disabled} {name}
        on:input={autosize} {placeholder} {rows} bind:value id={labelId}/>
</span>

<style>
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