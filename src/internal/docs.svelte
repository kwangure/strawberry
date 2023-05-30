<script>
	import { page } from '$app/stores';

	/** @type {string} */
	export let title;
	/** @type {string} */
	export let description;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name='description' content={description}/>
</svelte:head>

<h1>{title}</h1>
<p>{description}</p>

<div class="grid grid-columns-2">
	<a href="/components/container"
		class='br-focusable tab'
		aria-current={$page.url.pathname === '/components/container'}>
		<h2 class='no-margin'>Examples</h2>
	</a>
	<a href="/components/container/reference"
		class='br-focusable tab'
		aria-current={$page.url.pathname === '/components/container/reference'}>
		<h2 class='no-margin'>Reference</h2>
	</a>
</div>

<slot/>

<style>
	.grid {
		display: grid;
		gap: var(--br-size-1);
		margin-top: var(--br-size-5);
	}
	.grid-columns-2 {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	.tab {
		height: auto;
	}
	.no-margin {
		margin: 0px
	}
</style>
