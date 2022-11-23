<script>
	import { Dialog } from '@kwangure/strawberry/default/dialog';

	/** @type {() => any} */
	let show;
	/** @type {() => any} */
	let showModal;
</script>

<Dialog bind:show bind:showModal>
	<div slot='content'>Nice to meet you</div>
	<div slot='footer'>
		<button>Bye!</button>
	</div>
</Dialog>

<button on:click={show}>Show</button>
<button on:click={showModal}>Show modal</button>
