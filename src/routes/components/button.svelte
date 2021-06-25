<script>
    import { base } from "$app/paths";
    import Button from "~@components/Button";
    import Code from "~@components/Code";
    import Component from "$lib/components/component.svelte";
    import Prop from "$lib/components/prop.svelte";

</script>

<Component name="Button">
    <svelte:fragment slot="props">
        <Prop name="primary" type="boolean" default="false">
            Indicates whether the button should be coloured using the primary colour.
            <svelte:fragment slot="usage">
{`<Button primary>
    I'm a primary button
</Button>`}
            </svelte:fragment>
            <svelte:fragment slot="example">
                <Button primary>
                    I'm a primary button.
                </Button>
                &nbsp;
                <Button>
                    I'm the default button.
                </Button>
            </svelte:fragment>
        </Prop>
        <Prop name="icon" type="string">
            A <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d">
                <Code language="svelte" inline>d</Code> string
            </a> that is usable in an SVG <Code language="svelte" inline>{"<path/>"}</Code>
            element.
            <svelte:fragment slot="usage">
{`<script>
    import { mdiPencil } from "@mdi/js";
</script>
<Button icon={mdiPencil}>
    I'm an edit button
</Button>`}
            </svelte:fragment>
        </Prop>
        <Prop name="iconProps" type="Object">
            Props to be passed to the <a href="{base}/components/icon">Icon component</a>.
        </Prop>
    </svelte:fragment>
</Component>
