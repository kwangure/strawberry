<script>
    import Code, { svelte } from "~@components/Code";
    /* eslint-disable no-useless-escape */
    const usage = `
<script\>
    import "@kwangure/strawberry/css/styles";

    import Button from "@kwangure/strawberry/components/Button";

    const hello = () => console.log('strawberry');
</script\>

<div class="document">
    <Button on:click={hello}>Click me!</Button>
</div>

<style>
    .document {
        --br-button-width: 50px;
        --br-button-border: 3px solid red;
    }
</style\>
    `.trim();
    /* eslint-enable no-useless-escape */
</script>

<p>
    General Usage:
</p>

<Code language={svelte} code={usage}/>
