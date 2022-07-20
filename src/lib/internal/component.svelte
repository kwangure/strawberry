<script>
    import CustomProperty from './custom-property.svelte';
    import Prop from './prop.svelte';
    import Slot from './slot.svelte';

    /**
     * @type {Record<string, any>}
     */
    export let docs;

    const {
    	description, name, props, customProperties, slots, workingDirectoryFilepath,
    } = docs.main;
    customProperties.sort((
    	/** @type {{ customProperty: string; }} */ a,
    	/** @type {{ customProperty: string; }} */ b,
    ) => {
    	if (a.customProperty < b.customProperty) return -1;
    	if (a.customProperty > b.customProperty) return 1;
    	return 0;
    });
</script>

<svelte:head>
    <!-- Component title for SEO -->
    <title>Strawberry | Svelte {name} Component</title>
</svelte:head>

<h1>{name}</h1>
{description}
{#if $$slots.inline || $$slots.block}
    <h2>Example</h2>
    <div class="usage inline">
        <slot name="inline" />
    </div>
    <div class="usage block">
        <slot name="block" />
    </div>
{/if}

<h2>Props</h2>
<table>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
    </tr>
    {#each props as prop}
        <Prop prop="{prop}" />
    {/each}
</table>

<h2>Slots</h2>
<table>
    <tr>
        <th>Name</th>
        <th>Description</th>
    </tr>
    {#each slots as slot}
        <Slot slotDocs="{slot || {}}" />
    {/each}
</table>

{#if customProperties.length > 0}
    <h2>Custom Properties</h2>
    {#each customProperties as property}
        <CustomProperty filepath={workingDirectoryFilepath} propertyDocs="{property}" />
    {/each}
{/if}

{#if $$slots.accessibility}
    <h2>Accessibility</h2>
    <slot name="accessibility"/>
{/if}

<style>
    h1 {
        margin-top: 0;
    }
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
    table {
        border-collapse: collapse;
        /* Zooming makes collapsed border twice as thick sometimes */
        /* See https://stackoverflow.com/questions/68111310/thick-border-issue-in-chrome-browser*/
        border-width: 0.5px;
    }
    th {
        padding: 8px;
        text-align: left;
        /* Zooming makes collapsed border twice as thick sometimes */
        /* See https://stackoverflow.com/questions/68111310/thick-border-issue-in-chrome-browser*/
        border-width: 0.5px;
    }
    @media (prefers-color-scheme: dark) {
        table,
        th {
            border: 1px solid #474b50;
        }
    }
    @media (prefers-color-scheme: light) {
        table,
        th {
            border: 1px solid #c3c3c3;
        }
    }
</style>
