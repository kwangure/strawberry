<script>
	import { Dialog } from '@kwangure/strawberry/default/dialog';

	let value = '?';
	/** @type {false | 'modal'} */
	let open = false;

	/** @param {CustomEvent} event */
	function handleClose(event) {
		value = event.detail.returnValue;
	}
</script>

The best framework is: {value} <br>

<Dialog bind:open on:close={handleClose}>
	<button value='svelte'>Svelte</button>
</Dialog>

<button on:click={() => open = 'modal'}>
	Show modal
</button>
