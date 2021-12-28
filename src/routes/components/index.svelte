<script>
    import Code from "~@components/Code";
    /* eslint-disable no-useless-escape */
    const usage = `
<script\>
    /* Import a global stylesheet in root file */
    // Style for standard document
    import "@kwangure/strawberry/css/standardDOM";
    // Style for shadow root
    import "@kwangure/strawberry/css/customElement";

    import Button from "@kwangure/strawberry/components/Button";
</script\>

<!--
    Use attribute or <style/> custom properties to override styles.
    See docs for supported \`--br-[component]-#\` custom properties.
-->

<div class="document">
    Text
    <Button primary --br-button-width="50px"
        on:click={() => console.log('strawberry')}>
        Click me!
    </Button>
</div>

<style>
    .document {
        --br-button-border: 3px solid red;
    }
</style\>
    `.trim();
    /* eslint-enable no-useless-escape */
</script>

<p>
    General Usage:
</p>
<Code language="svelte">{usage}</Code>
