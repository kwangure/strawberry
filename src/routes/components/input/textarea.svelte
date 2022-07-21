<script>
    import Code, { svelte } from '$lib/default/code';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/input/textarea';
    import Textarea from '$lib/default/input/textarea';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Textarea placeholder="I can say anything!">
            <svelte:fragment slot="label">
                I label inputs like no one else!
            </svelte:fragment>
        </Textarea>
    </svelte:fragment>
    <svelte:fragment slot="accessibility">
        You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        <Code language={svelte} code={`
<div class="element">
    <Textarea>
        <svelte:fragment slot="label">
            Long response
        </svelte:fragment>
    </Textarea>
</div>

<style>
    .element {
        --br-textarea-label-position: absolute;
        --br-textarea-label-height: 1px;
        --br-textarea-label-width: 1px;
        --br-textarea-label-overflow: hidden;
    }
</style>
`}/>
    </svelte:fragment>
</Component>
