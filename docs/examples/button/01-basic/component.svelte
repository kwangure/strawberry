<script>
	import '@kwangure/strawberry/default/button';

	let count = 0;
	const increment = () => count++;
</script>

<button on:click={increment} style="margin-right: 10px;">
	Increment Counter
</button>
{count}
