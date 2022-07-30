<script>
    import { Content, Dialog } from '$lib/default/dialog';
    import Button from '$lib/default/button';
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
                <Button value='submit'>
                    Submit
                </Button>
            </Content>
        </Dialog>
        <Button on:click={show}>Show</Button>
        <Button on:click={showModal}>Show modal</Button>
    </svelte:fragment>
</Component>
