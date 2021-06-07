<script>
	import "~@css/standardDOM";

	export let status;
	export let error;
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<h1>{status}</h1>

{#if error?.message}
	<p>{error.message}</p>
{:else}
	<p>Unknown error: {status}</p>
{/if}

{#if error?.stack}
	<pre>{error.stack}</pre>
{:else}
	<pre>Unknown Error Source</pre>
{/if}

<style>
	h1, p {
		text-align: center;
	}

	h1 {
		margin-top: 2em;
	}
</style>
