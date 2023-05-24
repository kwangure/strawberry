<script>
	import '@kwangure/strawberry/css/button.css';

	let count = 0;
</script>

<button on:click={() => count++}>
	Increment Counter: {count}
</button>
