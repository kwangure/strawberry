<script>
    import { Content, Dialog } from '$lib/default/dialog';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/dialog';

    /** @type {(() => void)} */
    let showModal;
    /** @type {(() => void)} */
    let show;
</script>

<Component {docs}>
    <svelte:fragment slot="block">
        <Dialog bind:showModal bind:show>
            <Content slot='content'>
                I have value
                <button value='submit'>
                    Submit
                </button>
            </Content>
        </Dialog>
        <button on:click={show}>Show</button>
        <button on:click={showModal}>Show modal</button>
    </svelte:fragment>
</Component>
