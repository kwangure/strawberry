<script>
	import { javascript } from '@kwangure/strawberry/code';

	const code = 'const five = 5;\nconst thirty = five * 6';
</script>

<code>
	{#each javascript(code) as { segment, color }}
		<span class='br-token-{color}'>{segment}</span>
	{/each}
</code>
