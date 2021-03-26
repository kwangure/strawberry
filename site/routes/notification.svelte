<script>
    import Button from "~@components/Button";
    import Notification from "~@components/Notification";

    let visible;

    $: handleClick = visible
        ? () => {}
        : () => {
                visible = true;
            };
</script>

<Button on:click={handleClick}>
    Click to show notification
</Button>
<Notification bind:visible message="Prepare yee the way!"/>
