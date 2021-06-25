<script>
    import Code from "~@components/Code";

    export let name;
    export let type;
    let defaultValue = "";
    export { defaultValue as default };
</script>

<details class="prop">
    <summary>
        <span>{name}</span>
        <p><slot/></p>
    </summary>

    <Code language="javascript">
{#if defaultValue}
/**
 * @type {type}
 * @default {defaultValue}
 */
{:else}
/**
 * @type {type}
 */
{/if}
let {name};
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
    .prop {
        margin-bottom: 10px;
    }
    p {
        margin: 1em 0 0.25em;
    }
</style>
