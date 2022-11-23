<script>
	import { Dialog } from '@kwangure/strawberry/default/dialog';

	let value = '?';

	/** @type {() => any} */
	let showModal;

	/** @param {CustomEvent} event */
	function handleClose(event) {
		value = event.detail.returnValue;
	}
</script>

The best framework is: {value} <br>

<Dialog bind:showModal on:close={handleClose}>
	<button value='svelte'>Svelte</button>
</Dialog>

<button on:click={showModal}>Show modal</button>
