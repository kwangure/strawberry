<script>
    import Prop from "./prop.svelte";
    import Slot from "./slot.svelte";

    export let docs;

    const { name, props, slots } = docs;
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

<h2>Slots</h2>
{#each slots as slot}
    <Slot slotDocs={slot}></Slot>
{/each}

<style>
    h1 {
        font-size: 32px;
    }
    h2 {
        font-weight: 400;
        margin: 16px 0 8px;
    }
</style>