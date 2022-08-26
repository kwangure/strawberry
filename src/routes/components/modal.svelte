<script>
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/modal';
    import { Modal } from '$lib/default/modal';
    import { Primary } from '$lib/default/button';

    let visible = false;
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Primary>
            <button on:click={() => visible = true}>
                Click to show modal
            </button>
        </Primary>
        <Modal bind:visible>
            <svelte:fragment slot="content">
                I am a modal hear me cry!
            </svelte:fragment>
        </Modal>
    </svelte:fragment>
</Component>