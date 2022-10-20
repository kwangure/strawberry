<script>
    import { Code, javascript, plainHTML } from '$lib/default/code';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/code';

</script>

<Component {docs}>
    <svelte:fragment slot="block">
        <Code highlight={javascript} code={'const five = 5;'}/>
        <div>
            An inline <Code highlight={plainHTML} inline code={'<!-- codeblock -->'}/> just for you!
        </div>
    </svelte:fragment>
</Component>
