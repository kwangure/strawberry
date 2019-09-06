<script>
    export let type=''
    export let name = ''
    export let placeholder = ''
    export let icon = ''
    export let value = ''
    export let disabled = false
    export let rows=3

    // Update value manually since Svelte does not allow two-way data  
    // binding if input type is dynamic (and for good reason)
    function updateValue(e){
        value=this.value
    }

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

<svelte:options tag="sb-textarea"/>

<span class="wrapper">
    <textarea bind:this={textarea} {disabled} {name} on:change={updateValue} 
        on:input={autosize} {placeholder} {rows} {type} {value}/>
</span>

<style>
    .wrapper {
        line-height: 1.5;
        display: inline-block;
        width: 100%;
    }
    textarea {
        text-align: inherit;
        display: inline-block;
        width: 100%;
        padding: 4px 11px;
        color: rgba(0,0,0,0.65);
        font-size: 14px;
        line-height: 1.5;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        -webkit-transition: all .2s;
        transition: all .2s;
        overflow: scroll;
        overflow-x: hidden;
        -ms-overflow-style: none; 
        scrollbar-width: none; 
    }
    textarea::-webkit-scrollbar { 
        display: none;  
    }
    textarea:hover {
        border-color: #40a9ff;
    }
    textarea:focus {
        border-color: #40a9ff;
        outline: 0;
        -webkit-box-shadow: 0 0 0 2px rgba(24,144,255,0.2);
        box-shadow: 0 0 0 2px rgba(24,144,255,0.2);
    }
</style>