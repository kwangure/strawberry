<script>
    import Button, { Primary } from '$lib/components/button';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/components/notification/docs';
    import Notification from '$lib/components/notification';

    let visible;

    $: handleClick = visible
    	? () => {}
    	: () => {
    			visible = true;
    		};

</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Primary>
            <Button on:click={handleClick}>
                Click to show notification
            </Button>
        </Primary>
        <Notification bind:visible message="Prepare yee the way!"/>
    </svelte:fragment>
</Component>