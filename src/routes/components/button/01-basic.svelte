<script>
	import '@kwangure/strawberry/css/button.css';

	let count = 0;
	const increment = () => count++;
</script>

<button on:click={increment} style="margin-right: 10px;">
	Increment Counter
</button>
{count}
