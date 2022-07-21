<script>
    import Code, { html, javascript } from '$lib/default/code';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/code';

</script>

<Component {docs}>
    <svelte:fragment slot="block">
        <Code language={javascript} code={'const five = 5;'}/>
        <div>
            An inline <Code language={html} inline code={'<!-- codeblock -->'}/> just for you!
        </div>
    </svelte:fragment>
</Component>
