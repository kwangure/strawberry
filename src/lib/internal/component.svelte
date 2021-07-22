<script>
    import CustomProperty from "./custom-property.svelte";
    import Prop from "./prop.svelte";

    /**
     * @type {object}
     */
    export let docs;

    const { name, props, customProperties } = docs.main;
</script>

<svelte:head>
    <!-- Component title for SEO -->
    <title> Strawberry | Svelte {name} Component </title>
</svelte:head>

<h1>{name}</h1>
{#if $$slots.inline || $$slots.block}
    <h2>Example</h2>
    <div class="usage inline">
        <slot name="inline"/>
    </div>
    <div class="usage block">
        <slot name="block"/>
    </div>
{/if}

<h2>Props</h2>
{#each props as prop}
    <Prop {prop}></Prop>
{/each}

<h2>Custom Properties</h2>
{#if customProperties.length > 0}
    {#each customProperties as property}
        <CustomProperty propertyDocs={property}></CustomProperty>
    {/each}
{:else}
    None.
{/if}

<style>
    h1 + h2 {
        margin-top: 16px;
    }
    h2 {
        margin: 24px 0 8px;
    }
    .usage {
        display: flex;
        gap: 5px;
    }
    .block {
        flex-direction: column;
    }
</style>