<script>
    import Button from "./Button.svelte"
    import { mdiClose } from "@mdi/js"

    const app = window.app
    let className = ''
    export {className as class}

    export let title = ''
    export let width = '420px'
</script>

<div class='modal {className}' style="width:{width}">
    <div class="header">
        <div class="header-content">
            <slot name="header"></slot>
        </div>
        <Button class="close" color="none" icon={mdiClose}
            on:click={app.modal.close}/>
    </div>
    <div class="content">
        <slot name="content"></slot>
    </div>
</div>

<style>
    .modal {
        background-color: #fff;
        padding: 20px 30px;
        box-shadow: 0 7px 15px rgba(0,0,0,0.35);
        border-radius: 4px;
    }
    .header {
        display: flex;
        align-items: center;
    }
    .header-content {
        margin-right: 10px;
        flex: auto;
        font-size: 16px !important;
        font-weight: 600 !important;
    }
    :global(button.close)  {
        background-color: #f2f2f2;
    } 
    :global(button.close)  {
        margin-left: auto;
    }    
</style>