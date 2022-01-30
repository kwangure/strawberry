<script context="module">
    export const docs = true;
</script>

<script>
    import { createEventForwarder } from "../../utils/forward-events.js";
    import Icon from "../Icon";
    import { mdiCheck } from "@mdi/js";

    export let vertical = false;
    export let active = false;
    export let completed = false;
    export let position;

    const forward = createEventForwarder();
</script>

<div class="step-item" class:active class:vertical use:forward>
    <span class="progress-label" class:active>
        {#if completed}
            <Icon path="{mdiCheck}" />
        {:else}
            {position}
        {/if}
    </span>
    <slot />
</div>

<style>
    .step-item {
        cursor: pointer;
        background-color: transparent;
        position: relative;
    }
    .step-item {
        display: flex;
        align-items: center;
        flex: auto;
        min-height: 40px;
        line-height: 24px;
        padding: var(--br-item-padding-block) var(--br-item-padding-inline);
        border-radius: var(--br-border-radius);
    }
    .step-item.active {
        background-color: var(--br-primary-light);
        color: var(--br-primary);
    }
    .step-item + :global(.step-item) {
        margin-left: 10px;
    }
    .progress-label {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 35px;
        height: var(--br-default-item-height);
        border-radius: 50%;
        background-color: var(--br-white);
        color: var(--br-primary);
        border: 2px solid var(--br-primary);
    }
    .progress-label.active {
        background-color: var(--br-primary);
        color: var(--br-white);
    }
</style>
