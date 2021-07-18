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
    h1 {
        font-size: 32px;
    }
    h2 {
        font-weight: 400;
        margin: 16px 0 8px;
    }
</style>