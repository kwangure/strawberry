<script>
    import Button from "./Button.svelte"
    import { mdiClose } from "@mdi/js"

    export let visible = false
    export let closable = true

    export function show(){
        visible = true
    }

    export function hide(){
        visible = false
    }
</script>

<svelte:options tag="sb-modal"/>

{#if visible}    
    <div class="overlay" on:click|self={() => visible = false}>
        <div class="modal">
            <div class="header">
                <div class="header-content">
                    <slot name="header"></slot>
                </div>
                {#if closable}
                    <Button class="close" color="none" icon={mdiClose}
                        on:click={()=> visible = false}/>
                {/if}
            </div>
            <div class="content">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
{/if}

<style>
    .overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1050;
        background-color: rgba(0,0,0,0.5);
        -webkit-transition: .2s opacity;
        -o-transition: .2s opacity;
        transition: .2s opacity;
        display: flex;
        align-items: center;
        justify-content: center
    }
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
    .modal :global(button.close)  {
        margin-left: auto;
    }    
</style>