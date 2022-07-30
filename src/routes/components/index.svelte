<script>
    import { Code, svelte } from '$lib/default/code';
    /* eslint-disable no-useless-escape */
    const usage = `
<script\>
    import { Button } from "@kwangure/strawberry/default/button";

    const hello = () => alert("strawberry");
</script\>

<div class="element">
    <Button on:click={hello}>Click me!</Button>
</div>

<style>
    /* Override imported preset values */
    .element {
        --br-button-root-width: 50px;
        --br-button-root-border: 3px solid turquoise;
    }
</style\>
    `.trim();
    /* eslint-enable no-useless-escape */
</script>

<p>
    General Usage:
</p>

<Code language={svelte} code={usage}/>
