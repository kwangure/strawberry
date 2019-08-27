<script>
    let content
    let showing

    export function show(ModalComponent, params){
        
        content = new ModalComponent({
            target: document.getElementById('ModalManager'),
            hydrate: true,
            params,
        });
        showing = true
    }

    export function close(){ 
        if(!showing) return
        content.$destroy()
        showing = false
    }

    function hide(event){
        if (event.target.closest('.Modal')) return
        app.modal.close()
    }
</script>

<div id="ModalManager" class="{showing? 'open':''}" on:click={hide}>
    <div id="ModalWrapper"></div>
</div>

<style>
    #ModalManager {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1050;
        display: none;
        background-color: rgba(0,0,0,0.5);
        -webkit-transition: .2s opacity;
        -o-transition: .2s opacity;
        transition: .2s opacity;
    }

    #ModalManager.open {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>