<script>
    import Code from "~@components/Code";
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/Code/docs";

</script>

<Component {docs}>
    <svelte:fragment slot="block">
        <Code language="javascript">
            const five &#61; 5&#59;
        </Code>
        <div>
            An inline <Code language="svelte" inline>{"<!-- codeblock -->"}</Code> just for you!
        </div>
    </svelte:fragment>
</Component>
