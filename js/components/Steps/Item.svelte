<script>
    import Icon from "../Icon.svelte";
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
    @import "../../../css/strawberry.css";
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
        padding: var(--item-vertical-padding) var(--item-horizontal-padding);
        border-radius: 4px;
    }
    .step-item.active {
        background-color: var(--primary-light);
        color: var(--primary);
    }
    .step-item + .step-item {
        margin-left: 10px;
    }
    .progress-label {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: var(--white);
        color: var(--primary);
        border: 2px solid var(--primary);
    }
    .progress-label.active {
        background-color: var(--primary);
        color: var(--white);
    }
</style>