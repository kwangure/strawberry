<script>
    import Button from "~@components/Button/Button.svelte";
    import Modal from "~@components/Modal";

    let visible = false;

    function hide() {
        visible = true;
    }
</script>

<Button on:click={hide}>
    Open modal
</Button>

<Modal bind:visible>
    <span slot="content">
        <div class="modal-content">
            I am a modal. Hear me cry!
        </div>
        <Button primary fullwidth>
            Close me!
        </Button>
    </span>
</Modal>

<style>
    .modal-content {
        margin-bottom: 10px;
    }
</style>