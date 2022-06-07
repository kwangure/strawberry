<script context="module">
    export const docs = true;
</script>

<script>
    import "$lib/css/styles";
    import Button from "../Button";
    import Icon from "../Icon";
    import { createEventDispatcher } from "svelte";
    import { crossscale } from "../../utils/crosstransition.js";
    import { fade } from "svelte/transition";
    import { mdiClose } from "@mdi/js";

    /**
     * Whether to show the modal or not
     * @type {boolean}
     */
    export let visible = false;
    /**
     * Whether to show a close button and allow the user to close the modal by clicking the overlay.
     *
     * Useful if you want to implement your own closing mechanism.
     *
     * @type {boolean}
     */
    export let closable = true;

    const dispatch = createEventDispatcher();
    const [send, receive] = crossscale;

    export function open() {
        visible = true;
    }

    export function close() {
        visible = false;
    }

    $: if (visible) {
        dispatch("open");
    } else {
        dispatch("close");
    }
</script>

{#if visible}
    <div
        class="berry-modal overlay"
        transition:fade
        on:click|self="{() => {
            visible = closable ? false : visible;
        }}"
    >
        <div class="wrapper">
            <div
                class="modal"
                class:closable
                out:send="{{ key: 'modal' }}"
                in:receive="{{ key: 'modal' }}"
            >
                <div class="header">
                    <div class="header-content">
                        <slot name="header" />
                    </div>
                    {#if closable}
                        <div class="close">
                            <Button on:click="{() => visible = false}">
                                <Icon path={mdiClose}/>
                            </Button>
                        </div>
                    {/if}
                </div>
                <div class="content">
                    <slot name="content" />
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1050;
        background-color: rgba(0, 0, 0, 0.5);
        transition: background-color var(--br-transition-duration) ease;
    }
    .wrapper {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .modal {
        background-color: var(
            --br-modal-background-color,
            var(--br-default-background-color)
        );
        padding: 30px 30px;
        box-shadow: var(--br-box-shadow, var(--br-default-box-shadow));
        border-radius: var(--br-border-radius);
        transition: background-color var(--br-transition-duration) ease;
        max-width: 90%;
    }
    .modal.closable {
        padding: 20px 30px;
    }
    .header {
        display: flex;
        align-items: center;
    }
    .header-content {
        margin-right: 10px;
        font-size: 16px !important;
        font-weight: 600 !important;
    }
    .close {
        margin-left: auto;
    }
    .close :global(.berry-button) {
        border: none;
    }
    .content > :global(*) {
        max-width: 100%;
    }
</style>
