<script>
	import { Code, mixedHTML } from '@kwangure/strawberry/default/code';
	import Markdoc from '$lib/internal/markdoc.svelte';

	const components = import.meta.glob('$docs/examples/**/*.svelte');
	/** @type {import('./$types').PageData}*/
	export let data;

	console.log({ data });

</script>

<svelte:head>
	<title>{data.name}</title>
	<meta name='description' value={data.description}/>
</svelte:head>

<h1>{data.name}</h1>
{data.description}

{#if data.examples.length}
	<h2>Example{data.examples.length > 1 ? 's':''}</h2>
{/if}
{#each data.examples as { code, filepath, readme: { frontmatter, tree } }}
	<div class="explainer">
		<h3>{frontmatter.title}</h3>
		{#if Array.isArray(tree)}
			{#each tree as element}
				<Markdoc {element}/>
			{/each}
		{:else}
			<Markdoc element={tree}/>
		{/if}
	</div>
	<div class="demo">
		<Code highlight={mixedHTML} {code}/>
		<div class="output">
			{#await components[filepath]() then component}
				<svelte:component this={component.default}/>
			{/await}
		</div>
	</div>
{/each}

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
	h3 {
		font-weight: normal;
	}
	.explainer {
		margin-bottom: 10px;
	}
	.demo {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}
	.output {
		padding: 16px;
		border-radius: 4px;
	}
	@media (prefers-color-scheme: dark) {
		.output {
			background-color: rgba(255, 255, 255, 0.05);
			border: 1px solid #444;
		}
	}
	@media (prefers-color-scheme: light) {
		.output {
			background-color: rgba(50, 0, 0, 0.01);
			border: 1px solid #ccc;
		}
	}
</style>
