<script>
    import { setContext } from "svelte";
    import { writable } from "svelte/store";
    import Layout from "./_layout.svelte";

    export let component;

    export let error = false;
    export let status = 200;

    export let pathname;
    export let params;
    export let query;
    export let preload;

    const pathnameStore = writable(pathname);
    const paramsStore = writable(params);
    const queryStore = writable(query);

    $: $pathnameStore = pathname;
    $: $paramsStore = params;
    $: $queryStore = query;

    setContext("__stores__", {
        path: pathnameStore,
        params: paramsStore,
        query: queryStore,
    });
</script>

<Layout on:navigate>
    {#if error}
        {#await import("./_error.svelte") then errorPage}
            <svelte:component this={errorPage.default} {error} {status}/>
        {:catch fetchError}
            <h1>Error displaying {status}</h1>
        {/await}
	{:else}
		<svelte:component this={component} {...preload}/>
	{/if}
</Layout>