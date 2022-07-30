<script>
    import { Code, svelte } from '$lib/default/code';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/input/time';
    import { Time } from '$lib/default/input/time';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Time value={new Date().toISOString()}/>
    </svelte:fragment>
    <svelte:fragment slot="accessibility">
        You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        <Code language={svelte} code={`
<div class="element">
    <Label>
        Delivery time
        <Time slot='input'/>
    </Label>
</div>

<style>
    .element {
        --br-input-label-root-position: absolute;
        --br-input-label-root-height: 1px;
        --br-input-label-root-width: 1px;
        --br-input-label-root-overflow: hidden;
    }
</style>
`}/>
    </svelte:fragment>
</Component>