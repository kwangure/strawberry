<script>
    import CustomProperty from './custom-property.svelte';
    import Prop from './prop.svelte';
    import Slot from './slot.svelte';

    export let docs;

    const { props, customProperties, slots, workingDirectoryFilepath } = docs;
    customProperties.sort((
    	/** @type {{ customProperty: string; }} */ a,
    	/** @type {{ customProperty: string; }} */ b,
    ) => {
    	if (a.customProperty < b.customProperty) return -1;
    	if (a.customProperty > b.customProperty) return 1;
    	return 0;
    });
</script>

{#if props.length}
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
{/if}

{#if slots.length}
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
{/if}

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
    table,
    th {
        border: var(--br-dark, 1px solid #474b50) var(--br-light, 1px solid #c3c3c3);
    }
</style>
