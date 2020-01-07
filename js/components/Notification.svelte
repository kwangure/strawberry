<script>
    import Icon from "./Icon.svelte";
    import { mdiClose } from "@mdi/js";
    import { slide } from "svelte/transition";
    export let delay = 1000;
    export let visible = true;
    export let message;
</script>

{#if visible}
    <div class="notification" transition:slide={{duration: delay}}>
        <div class="message">
            {message}
        </div>
        <Icon path={mdiClose}></Icon>
    </div>
{/if}

<style>
    .notification {
        position: absolute;
        top: 0;
        right: 0;
        margin: 10px;
        padding: 20px;
        display: flex;
    }
    .message {
        background-color: var(--dark-grey);
        color: var(--white);
    }
</style>