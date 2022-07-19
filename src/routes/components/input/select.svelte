<script>
    import Code, { svelte } from '$lib/components/code';
    import Select, { Option } from '$lib/components/input/select';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/components/input/select/docs';
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
    <Select>
        <svelte:fragment slot="label">
            Ice cream
        </svelte:fragment>
        <Option value="1">Strawberry</Option>
        <Option value="2">Vanilla</Option>
        <Option value="3">Chocolate</Option>
    </Select>
</div>

<style>
    .element {
        --br-select-label-position: absolute;
        --br-select-label-height: 1px;
        --br-select-label-width: 1px;
        --br-select-label-overflow: hidden;
    }
</style>
`}/>
    </svelte:fragment>
</Component>
