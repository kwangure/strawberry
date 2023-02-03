<script>
    import { Arrow, Popup, Tooltip } from '$lib/default/tooltip';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/tooltip';

    const sides = ['top', 'right', 'bottom', 'left'];
    const sideModifiers = ['', '-start', '-end'];
    const placements = /** @type {("left" | "right" | "bottom" | "top" | "top-start" | "top-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end")[]} */(['left-end']);

    for (const side of sides) {
    	// @ts-ignore
    	placements.push(...sideModifiers.map((mod) => side + mod));
    }
</script>

<Component {docs}>
    <svelte:fragment slot="block">
        <div class="properties examples">
            {#each placements as placement}
                <Tooltip {placement}>
                    <button class='br-button-primary' slot="trigger">{placement}</button>
                    <Popup>
                        <Arrow/>
                        I'm a <b>{placement}</b> tooltip!
                    </Popup>
                </Tooltip>
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
