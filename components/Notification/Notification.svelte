<script>
    import { fly } from "svelte/transition";
    import Icon from "../Icon";
    import { mdiClose } from "@mdi/js";

    export let removeAfter = 4000;
    export let duration = 500;
    export let visible = false;
    export let message;

    $: if (visible) {
        setTimeout(() => {
            visible = false;
        }, removeAfter);
    }

    function hide() {
        visible = false;
    }
</script>

{#if visible}
    <div class="berry-notification wrapper">
        <div class="notification" transition:fly={{ x: 200, duration: duration }}>
            <div class="message">
                {message}
            </div>
            <div class="close" on:click={hide}>
                <Icon path={mdiClose}></Icon>
            </div>
        </div>
    </div>
{/if}

<style>
    .wrapper {
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }
    .notification {
        margin: 15px;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        background-color: var(--br-grey-dark);
        color: var(--br-white);
        border-radius: var(--br-border-radius);
        width: 210px;
        margin-left: auto;
    }
    .message {
        line-height: 2;
    }
    .close {
        padding-left: 10px;
        margin-left: auto;
    }
</style>