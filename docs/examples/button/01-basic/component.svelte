<script>
	import '@kwangure/strawberry/default/button';

	let count = 0;
</script>

<button on:click={() => count++} style="margin-right: 10px;">
	Increment Counter
</button>
{count}
