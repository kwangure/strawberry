<script>
    import { Code, svelte } from '$lib/default/code';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/input/time';
    import { Time } from '$lib/default/input/time';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Time value={new Date()}>
            <svelte:fragment slot="label">
                I label your time!
            </svelte:fragment>
        </Time>
    </svelte:fragment>
    <svelte:fragment slot="accessibility">
        You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        <Code language={svelte} code={`
<div class="element">
    <Time>
        <svelte:fragment slot="label">
            Delivery time
        </svelte:fragment>
    </Time>
</div>

<style>
    .element {
        --br-input-time-root-label-position: absolute;
        --br-input-time-root-label-height: 1px;
        --br-input-time-root-label-width: 1px;
        --br-input-time-root-label-overflow: hidden;
    }
</style>
`}/>
    </svelte:fragment>
</Component>