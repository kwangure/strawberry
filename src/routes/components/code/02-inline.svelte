<script>
    import { plainHTML } from '@kwangure/strawberry/code';
</script>

Use <code class="br-code-inline">
	{#each plainHTML('<h1>Hello world!</h1>') as { segment, color }}
		<span class='br-token-{color}'>{segment}</span>
	{/each}
</code> to greet the planet.
