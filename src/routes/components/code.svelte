<script>
    import Code, { javascript, html } from "~@components/code";
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/code/docs";

</script>

<Component {docs}>
    <svelte:fragment slot="block">
        <Code language={javascript} code={`const five = 5;`}/>
        <div>
            An inline <Code language={html} inline code={"<!-- codeblock -->"}/> just for you!
        </div>
    </svelte:fragment>
</Component>
