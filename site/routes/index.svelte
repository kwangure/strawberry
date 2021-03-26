<script>
    /* eslint-disable no-useless-escape */
    const usage = `
<!-- component.svelte -->
\<script\>
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