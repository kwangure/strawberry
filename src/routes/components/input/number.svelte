<script>
    import Code, { svelte } from '$lib/components/code';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/components/input/number/docs';
    import Hint from '$lib/components/input/hint';
    import Numero from '$lib/components/input/number';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Numero placeholder="Use keyboard or UI arrows!">
            <svelte:fragment slot="label">
                Mi label numeros!
            </svelte:fragment>
            <Hint slot="hint">
                This is an input hint
            </Hint>
        </Numero>
    </svelte:fragment>
    <svelte:fragment slot="accessibility">
        You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        <Code language={svelte} code={`
<div class="element">
    <Number value={42}>
        <svelte:fragment slot="label">
            Meaning of life
        </svelte:fragment>
    </Number>
</div>

<style>
    .element {
        --br-input-number-label-position: absolute;
        --br-input-number-label-height: 1px;
        --br-input-number-label-width: 1px;
        --br-input-number-label-overflow: hidden;
    }
</style>
`}/>
    </svelte:fragment>
</Component>