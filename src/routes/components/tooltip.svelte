<script>
    import Button, { Primary } from "~@components/button";
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/tooltip/docs";
    import Tooltip from "~@components/tooltip";

    const sides = ["top", "right", "bottom", "left"];
    const sideModifiers = ["", "-start", "-end"];
    const placements = [];

    for (const side of sides) {
        placements.push(...sideModifiers.map((mod) => side + mod));
    }
</script>

<Component {docs}>
    <svelte:fragment slot="block">
        <div class="properties examples">
            {#each placements as placement}
                <Primary>
                    <Tooltip {placement}>
                        <Button>{placement}</Button>
                        <span slot="popup">I'm a <b>{placement}</b> tooltip!</span>
                    </Tooltip>
                </Primary>
            {/each}
        </div>
    </svelte:fragment>
</Component>

<style>
    .properties.examples {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(3, max-content);
    }
</style>
