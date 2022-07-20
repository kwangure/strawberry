<!--
    @component

    Notification provides brief messages about an application above the page.
-->
<script>
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';
    import Icon from '../icon';
    import { mdiClose } from '@mdi/js';

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
    	dispatch('dismiss');
    }
</script>

{#if visible}
    <div class="berry-notification wrapper">
        <div class="notification" transition:fly="{{ x: 200, duration }}">
            <div class="message">
                {message}
            </div>
            <div class="close" on:click="{hide}">
                <Icon path="{mdiClose}" />
            </div>
        </div>
    </div>
{/if}

<style>
    :export {
        --br-notification-padding-block: ;
        --br-notification-padding-inline: ;
        --br-notification-background-color: ;
        --br-notification-font-color: ;
    }
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
        color: #fff;
        border-radius: 4px;
        width: fit-content;
        margin-left: auto;
        padding: var(
                --br-notification-padding-block,
                8px
            )
            var(--br-notification-padding-inline, 12px);
        z-index: 1;
        min-width: 30px;
        min-height: 35px;
    }
    @media (prefers-color-scheme: dark) {
        .notification {
            background-color: #444;
            box-shadow: 0 2px 8px #111;
        }
    }

    @media (prefers-color-scheme: light) {
        .notification {
            background-color: rgba(30, 30, 30, 0.9);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
    }
    .message {
        line-height: 2;
    }
    .close {
        padding-left: 10px;
        margin-left: auto;
        cursor: pointer;
    }
    .close :global(.berry-icon) {
        --br-icon-size: 20px;
    }
</style>
