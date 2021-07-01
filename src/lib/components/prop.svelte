<script>
    import Code from "~@components/Code";

    export let prop;

    const {
        defaultValue,
        description,
        name,
        kind,
        type: { text: type },
    } = prop;

    // @ts-ignore
    if (import.meta.DEV && !description) {
        console.warn(`"${name}" property is missing description`);
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
        {#if defaultValue}
/**
 * @type &#123;{type}&#125;
 * @default {defaultValue}
 */
{kind} {name};
        {:else}
/**
 * @type &#123;{type}&#125;
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
</style>
