<script>
    import Icon from "../Icon";
    import { mdiCheck } from "@mdi/js";
    export let vertical = false;
    export let active = false;
    export let completed = false;
    export let position;
</script>

<svelte:options tag="berry-steps-item"/>

<div class="step-item" class:active class:vertical on:click>
    <span class="progress-label" class:active>
        {#if completed}
            <Icon path={mdiCheck}></Icon>
        {:else}
            {position}
        {/if}
    </span>
    <slot></slot>
</div>

<style>
    @import "../../css/shared.css";
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
        padding: var(--br-item-vertical-padding) var(--br-item-horizontal-padding);
        border-radius: var(--br-border-radius);
    }
    .step-item.active {
        background-color: var(--br-primary-light);
        color: var(--br-primary);
    }
    .step-item + .step-item {
        margin-left: 10px;
    }
    .progress-label {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 35px;
        height: var(--br-item-height);
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