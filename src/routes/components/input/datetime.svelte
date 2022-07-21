<script>
    import Code, { svelte } from '$lib/components/code';
    import Component from '$lib/internal/component.svelte';
    import DateTime from '$lib/components/input/datetime';
    import { docs } from '$lib/docs/input/datetime';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <DateTime value="2017-06-01T01:00">
            <svelte:fragment slot="label">
                This is a datetime label
            </svelte:fragment>
        </DateTime>
    </svelte:fragment>
    <svelte:fragment slot="accessibility">
        You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        <Code language={svelte} code={`
<div class="element">
    <DateTime>
        <svelte:fragment slot="label">
            Expected arrival
        </svelte:fragment>
    </DateTime>
</div>

<style>
    .element {
        --br-input-datetime-label-position: absolute;
        --br-input-datetime-label-height: 1px;
        --br-input-datetime-label-width: 1px;
        --br-input-datetime-label-overflow: hidden;
    }
</style>
`}/>
    </svelte:fragment>
</Component>