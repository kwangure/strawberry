<script>
    import { Code, mixedHTML } from '$lib/default/code';
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

<h1>Installation</h1>

A set of Svelte components.

Where possible, a Strawberry component is simply a light wrapper around a built-in element, making it easier to use it the Svelte way.

<Code code='npm install @kwangure/strawberry'/>
