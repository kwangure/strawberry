<script>
    import { Button, Primary } from '$lib/default/button';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/modal';
    import { Modal } from '$lib/default/modal';

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