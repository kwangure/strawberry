<script>
    import Code, { svelte } from '$lib/default/code';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/input/text';
    import Input from '$lib/default/input/text';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Input placeholder="I can say anything!">
            <svelte:fragment slot="label">
                I label inputs like no one else!
            </svelte:fragment>
        </Input>
    </svelte:fragment>
    <svelte:fragment slot="accessibility">
        You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        <Code language={svelte} code={`
<div class="element">
    <Input value="Karen">
        <svelte:fragment slot="label">
            First name
        </svelte:fragment>
    </Input>
</div>

<style>
    .element {
        --br-input-text-root-label-position: absolute;
        --br-input-text-root-label-height: 1px;
        --br-input-text-root-label-width: 1px;
        --br-input-text-root-label-overflow: hidden;
    }
</style>
`}/>
    </svelte:fragment>
</Component>
