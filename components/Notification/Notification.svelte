<script>
    import { createEventDispatcher } from "svelte";
    import { fly } from "svelte/transition";
    import Icon from "../Icon";
    import { mdiClose } from "@mdi/js";

    const dispatch = createEventDispatcher();

    export let removeAfter = 4000;
    export let duration = 500;
    export let visible = false;
    export let message;

    $: if (visible && removeAfter) {
        setTimeout(() => {
            visible = false;
        }, removeAfter);
    }

    function hide() {
        visible = false;
        dispatch("dismiss");
    }
</script>

{#if visible}
    <div class="berry-notification wrapper">
        <div class="notification" transition:fly={{ x: 200, duration: duration }}>
            <div class="message">
                {message}
            </div>
            <div class="close" on:click={hide}>
                <Icon size="20px" path={mdiClose}></Icon>
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
        display: flex;
        align-items: center;
        color: var(--br-white);
        border-radius: var(--br-border-radius);
        width: fit-content;
        margin-left: auto;
        padding: var(--br-item-block-padding) var(--br-item-inline-padding);
        background-color: rgba(0,0,0,.75);
        min-width: 30px;
        min-height: var(--br-item-height);
    }
    .message {
        line-height: 2;
    }
    .close {
        padding-left: 10px;
        margin-left: auto;
        cursor: pointer;
    }
</style>