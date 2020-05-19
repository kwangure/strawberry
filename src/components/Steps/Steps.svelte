<script>
    import Item from "./Item.svelte";
    import { createEventDispatcher } from "svelte";
    export let steps = [];
    export let direction = "horizontal";
    export let activeIndex = 0;

    const dispatch = createEventDispatcher();

    function valid(direction) {
        let directions = ["horizontal", "vertical"];
        return directions.includes(direction);
    }

    $: horizontal = valid(direction);
    $: vertical = valid(direction);
    $: {
        if(!horizontal && !vertical){
            horizontal = true;
            console.warn("Invalid direction. Use \"horizontal\" or \"vertical\".");
        }
    }

    function step(to) {
        activeIndex = to;
        dispatch("step", to);
    }
</script>

<svelte:options tag="berry-steps"/>

<div class="berry-steps wrapper">
    <div class="steps" class:horizontal class:vertical>
        {#each steps as item, index}
            <Item active={activeIndex === index} 
                completed={activeIndex > index}
                position={index + 1}
                on:click={() => step(index)}>
                <slot name="step" step={{
                    ...item, 
                    active: activeIndex === index, 
                    completed: activeIndex > index,
                    index}}></slot>
            </Item>
        {/each}
    </div>
    <div class="content">
        <slot name="content" {activeIndex}></slot>
    </div>
</div>

<style>
    @import "../../css/shared.css";

    .steps {
        display: flex;
    }
</style>