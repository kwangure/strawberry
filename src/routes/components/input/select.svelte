<script>
    import { Code, svelte } from '$lib/default/code';
    import { Option, Select } from '$lib/default/input/select';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/input/select';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Select placeholder="Like I said...">
            <svelte:fragment slot="label">I label selects.</svelte:fragment>
            <Option value={'onion'}>Undercover Onion</Option>
            <Option value={'testicle'}>Testicle Rainbow</Option>
        </Select>
    </svelte:fragment>
    <svelte:fragment slot="accessibility">
        You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        <Code language={svelte} code={`
<div class="element">
    <Label>
        Ice cream
        <Select slot'input'>
            <Option value="1">Strawberry</Option>
            <Option value="2">Vanilla</Option>
            <Option value="3">Chocolate</Option>
        </Select>
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
