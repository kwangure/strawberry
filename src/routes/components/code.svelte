<script>
    import { base } from "$app/paths";
    import Code from "~@components/Code";
    import Component from "$lib/components/component.svelte";
    import Prop from "$lib/components/prop.svelte";

</script>

<Component name="Code">
    <svelte:fragment slot="props">
        <Prop name="language" type={"'' | 'javascript' | 'svelte'"} default="''">
            Which syntax highlighter to use.
            <svelte:fragment slot="usage">
{`<Code language="javascript">
    const five = 5;
</Code>`}
            </svelte:fragment>
            <svelte:fragment slot="example">
                <Code language="javascript">
                    const five &#61; 5&#59;
                </Code>
            </svelte:fragment>
        </Prop>
        <Prop name="inline" type="boolean" default="false">
            Whether to treat a codeblock as an inline element.
            <svelte:fragment slot="usage">
{"An <Code language=\"svelte\" inline>{\"<inline/>\"\"}</Code> block"}
            </svelte:fragment>
            <svelte:fragment slot="example">
<Code language="svelte">{`<!-- A regular Code block -->
<path/>`}</Code>
                <br>
                An inline<Code language="svelte" inline>{"<!-- Codeblock -->"}</Code> for you!
            </svelte:fragment>
        </Prop>
    </svelte:fragment>
</Component>

