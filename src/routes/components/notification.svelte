<script>
    import Button, { Primary } from "~@components/Button";
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/Notification/docs";
    import Notification from "~@components/Notification";

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