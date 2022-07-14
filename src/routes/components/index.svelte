<script>
    import Code, { svelte } from '~@components/code';
    /* eslint-disable no-useless-escape */
    const usage = `
<script\>
    import Button from "@kwangure/strawberry/components/button";

    const hello = () => alert("strawberry");
</script\>

<div class="element">
    <Button on:click={hello}>Click me!</Button>
</div>

<style>
    /* Import style presets */
    @import "@kwangure/strawberry/components/button/layout.css";
    @import "@kwangure/strawberry/components/button/dark.css" (prefers-color-scheme: dark);
    @import "@kwangure/strawberry/components/button/light.css" (prefers-color-scheme: light);

    /* Override imported preset values */
    .element {
        --br-button-width: 50px;
        --br-button-border: 3px solid var(--my-primary-color);
    }
</style\>
    `.trim();
    /* eslint-enable no-useless-escape */
</script>

<p>
    General Usage:
</p>

<Code language={svelte} code={usage}/>
