<script>
    export let name;
</script>

<svelte:head>
    <!-- Component title for SEO -->
    <title> Svelte {name} Component </title>
</svelte:head>

<h1>{name}</h1>
<h3>Props</h3>
<slot name="props"/>

<style>
    h1 {
        font-size: 32px;
    }
    h3 {
        font-weight: 400;
        margin: 16px 0 8px;
    }
</style>