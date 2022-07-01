<script>
    import Button, { Primary } from "~@components/Button";
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/Modal/docs";
    import Modal from "~@components/Modal";

    let visible = false;
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Primary>
            <Button on:click={() => visible = true}>
                Click to show modal
            </Button>
        </Primary>
        <Modal bind:visible>
            <svelte:fragment slot="content">
                I am a modal hear me cry!
            </svelte:fragment>
        </Modal>
    </svelte:fragment>
</Component>