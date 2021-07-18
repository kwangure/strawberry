<script>
    import Code from "~@components/Code";

    export let prop;

    $: ({ kind, name, optional, value, jsDoc } = prop);
    $: ({ description, tags = []} = jsDoc || {});
    $: ({ type } = tags.find((t) => t.tag === "type") || {});

    // @ts-ignore
    if (import.meta.DEV && !description) {
        console.warn(`"${name}" prop is missing a description`);
    }

    // @ts-ignore
    if (import.meta.DEV && type === "any") {
        console.warn(`"${name}" property is typed "any". Use a stronger type.`);
    }
</script>

<details>
    <summary>
        <span>{name}</span>
        {#if description}
            <p>{description}</p>
        {/if}
    </summary>

    <Code language="javascript">
        <!-- Repeating some code avoids whitespace problems -->
        {#if optional && type}
/**
 * @type &#123;{type}&#125;
 */
{kind} {name};
        {:else if type}
/**
 * @type &#123;{type}&#125;
 * @default {value}
 */
{kind} {name};
        {/if}
    </Code>

    {#if $$slots.usage}
        <p>Usage:</p>
        <Code language="svelte">
            <slot name="usage"/>
        </Code>
    {/if}

    {#if $$slots.example}
        <p>Example:</p>
        <div class="example">
            <slot name="example"/>
        </div>
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
