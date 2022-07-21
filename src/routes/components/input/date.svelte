<script>
    import Code, { svelte } from '$lib/components/code';
    import Component from '$lib/internal/component.svelte';
    import Date from '$lib/components/input/date';
    import { docs } from '$lib/docs/input/date';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Date value="2017-06-01">
            <svelte:fragment slot="label">
                This is a date label
            </svelte:fragment>
        </Date>
    </svelte:fragment>
    <svelte:fragment slot="accessibility">
        You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        <Code language={svelte} code={`
<div class="element">
    <Date>
        <svelte:fragment slot="label">
            Birthday
        </svelte:fragment>
    </Date>
</div>

<style>
    .element {
        --br-input-date-label-position: absolute;
        --br-input-date-label-height: 1px;
        --br-input-date-label-width: 1px;
        --br-input-date-label-overflow: hidden;
    }
</style>
`}/>
    </svelte:fragment>
</Component>