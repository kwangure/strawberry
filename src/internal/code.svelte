<script>
	/** @type {string} */
	export let code;
	/** @type {import("$lib/code").Highlighter | undefined} */
	export let highlighter = undefined;
	export let inline = false;
</script>

<code class:br-code-inline={inline}>
	{#if highlighter}
		{#each highlighter(code) as { segment, color }}
			<span class='br-token-{color}'>{segment}</span>
		{/each}
	{:else}
		{code}
	{/if}
</code>

<style>
	code {
		padding: var(--br-size-4);
	}
</style>
