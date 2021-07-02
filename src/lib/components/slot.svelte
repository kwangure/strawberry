<script>
    import Code from "~@components/Code";

    export let slotDocs;

    let keywordObj = {};

    $: ({ name, description, keywords } = slotDocs);
    $: {
        keywordObj = {};
        for (const { name, description } of keywords) {
            keywordObj[name] = description;
        }
    }
    $: ({ usage = "" } = keywordObj);
</script>

<details>
    <summary>
        <span>{name}</span>
        {#if description}
            <p>{description}</p>
        {/if}
    </summary>
    {#if usage}
        <p>Usage:</p>
        <Code language="svelte">{usage}</Code>
    {/if}
</details>

<style>
    details {
        margin-bottom: 10px;
    }
    details :global(.berry-code) {
        white-space: pre-wrap;
    }
    p {
        margin: 1em 0 0.25em;
    }
    summary p {
        margin: 0.25em 0 1em;
    }
</style>