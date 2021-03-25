<script>
	import "$css/standardDOM";

	export let status;
	export let error;
</script>

<style>
	h1, p {
		text-align: center;
	}

	h1 {
		margin-top: 2em;
	}
</style>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<h1>{status}</h1>

<p>{error.message}</p>

