<script>
	import { javascript } from '@kwangure/strawberry/code';

	const code = 'const five = 5;\nconst thirty = five * 6';
</script>

<code>
	{#each javascript(code) as { segment, color }}
		{#if color}
			<span style='color: var(--br-code-token-{color}-color);'>{segment}</span>
		{:else}
			{segment}
		{/if}
	{/each}
</code>
