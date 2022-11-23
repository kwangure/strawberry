<script>
	import { Dialog } from '@kwangure/strawberry/default/dialog';

	/** @type {() => any} */
	let show;
	/** @type {() => any} */
	let showModal;
</script>

<Dialog bind:show bind:showModal>
	Nice to meet you
	<div>
		<button>Bye!</button>
	</div>
</Dialog>

<button on:click={show}>Show</button>
<button on:click={showModal}>Show modal</button>
