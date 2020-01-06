<script>
    export let name = ''
    export let placeholder = ''
    export let value = ''
    export let disabled = false
    export let rows = 3
    export let label = ''

    let textarea
             
    function autosize(){
        const computed = getComputedStyle(textarea)

        let newHeight;
        newHeight = parseInt(computed.getPropertyValue('border-top-width'))
        newHeight += parseInt(computed.getPropertyValue('border-bottom-width'))

        newHeight += textarea.scrollHeight
        textarea.style.height =  `${newHeight}px`
    }
</script>

<span class="input-wrapper">
    {#if label}
        <div class="label">{label.length? label : placeholder}</div>
    {/if}
    <textarea bind:this={textarea} {disabled} {name}
        on:input={autosize} {placeholder} {rows} bind:value/>
</span>

<style>
    @import "./Input.css";
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