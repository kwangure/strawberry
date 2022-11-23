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
	<div slot='content'>
		<button value='svelte'>Svelte</button>
	</div>
</Dialog>

<button on:click={showModal}>Show modal</button>
