<script>
    import { plainHTML } from '@kwangure/strawberry/code';
</script>

Use <code class="br-code-inline">
	{#each plainHTML('<h1>Hello world!</h1>') as { segment, color }}
		{#if color}
			<span style='color: var(--br-code-token-{color}-color);'>{segment}</span>
		{:else}
			{segment}
		{/if}
	{/each}
</code> to greet the planet.
