<script>
    import { Code, plainHTML } from '$lib/default/code';
    import Component from '$lib/internal/component.svelte';
    import { Date } from '$lib/default/input/date';
    import { docs } from '$lib/docs/input/date';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Date value="2017-06-01"/>
    </svelte:fragment>
    <svelte:fragment slot="accessibility">
        You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        <Code highlight={plainHTML} code={`
<div class="element">
    <Label>
        Birthday
        <Date slot='input'/>
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