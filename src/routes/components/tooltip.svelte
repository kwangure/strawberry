<script>
    import Button, { Primary } from '$lib/default/button';
    import Tooltip, { Arrow, Popup } from '$lib/default/tooltip';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/tooltip';

    const sides = ['top', 'right', 'bottom', 'left'];
    const sideModifiers = ['', '-start', '-end'];
    const placements = ['left-end'];

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
                        <Button slot="trigger">{placement}</Button>
                        <Popup>
                            <Arrow/>
                            I'm a <b>{placement}</b> tooltip!
                        </Popup>
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
