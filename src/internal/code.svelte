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
			{#if color}
				<span style='color: var(--br-code-token-{color}-color);'>{segment}</span>
			{:else}
				{segment}
			{/if}
		{/each}
	{:else}
		{code}
	{/if}
</code>
