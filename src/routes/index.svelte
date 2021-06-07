<script>
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
    `;
    /* eslint-enable no-useless-escape */
</script>

General usage
<pre>
<code>{usage}</code>
</pre>