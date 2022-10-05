<script>
    import { Code, svelte } from '$lib/default/code';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/input/number';
    import { Number as Numero } from '$lib/default/input/number';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Numero placeholder="Use keyboard or UI arrows!"/>
    </svelte:fragment>
    <svelte:fragment slot="accessibility">
        You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        <Code language={svelte} code={`
<div class="element">
    <Label>
        Meaning of life
        <Number slot='input' value={42}/>
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