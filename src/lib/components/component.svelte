<script>
    import Prop from "./prop.svelte";
    export let docs;

    const { name, props } = docs;
</script>

<svelte:head>
    <!-- Component title for SEO -->
    <title> Svelte {name} Component </title>
</svelte:head>

<h1>{name}</h1>
<h3>Props</h3>
{#each props as prop}
    <Prop {prop}></Prop>
{/each}

<style>
    h1 {
        font-size: 32px;
    }
    h3 {
        font-weight: 400;
        margin: 16px 0 8px;
    }
</style>