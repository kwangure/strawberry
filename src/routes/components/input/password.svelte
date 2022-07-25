<script>
    import Code, { svelte } from '$lib/default/code';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/input/password';
    import Password from '$lib/default/input/password';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Password placeholder="I can say anything!">
            <svelte:fragment slot="label">
                I label secrets!
            </svelte:fragment>
        </Password>
    </svelte:fragment>
    <svelte:fragment slot="accessibility">
        You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        <Code language={svelte} code={`
<div class="element">
    <Password value="password">
        <svelte:fragment slot="label">
            Secret Key
        </svelte:fragment>
    </Password>
</div>

<style>
    .element {
        --br-input-password-root-label-position: absolute;
        --br-input-password-root-label-height: 1px;
        --br-input-password-root-label-width: 1px;
        --br-input-password-root-label-overflow: hidden;
    }
</style>
`}/>
    </svelte:fragment>
</Component>