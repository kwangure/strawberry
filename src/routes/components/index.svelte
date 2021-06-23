<script>
    import Code from "~@components/Code";
    /* eslint-disable no-useless-escape */
    const usage = `
\<script\>
    /* Import one of the global styles in your layout or root file */
    import "@kwangure/strawberry/css/standardDOM"; // Style a standard document
    import "@kwangure/strawberry/css/customElement"; // Style a shadow root

    import Button from "@kwangure/strawberry/components/Button";
\</script\>

\<Button on:click="{() => alert('strawberry')}">
    Click me!
\</Button\>
    `.trim();
    /* eslint-enable no-useless-escape */
</script>

<p>
    General Usage:
</p>
<Code language="svelte">{usage}</Code>
