<script>
    import Icon from "../Icon";
    import { mdiClose } from "@mdi/js";
    import { fly } from "svelte/transition";
    import { onMount } from "svelte";
    export let removeAfter = 4000;
    export let duration = 500;
    export let visible = false;
    export let message;

    onMount(() => {
        visible = true;
        setTimeout(() => visible = false, removeAfter);
    });
</script>

<svelte:options tag="berry-notification"/>

{#if visible}
    <div class="wrapper">
        <div class="notification" transition:fly={{ x: 200, duration}}>
            <div class="message">
                {message}
            </div>
            <div class="close" on:click={() => visible = false}>
                <Icon path={mdiClose}></Icon>
            </div>
        </div>
    </div>
{/if}

<style>
    @import "../../css/shared.css";
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
        background-color: var(--grey-dark);
        color: var(--white);
        border-radius: 4px;
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