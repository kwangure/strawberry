<script>
	import { Dialog } from '@kwangure/strawberry/default/dialog';

	/** @type {false | 'modal' | 'non-modal'} */
	let open;
</script>

<Dialog bind:open>
	Nice to meet you
	<button>👋 Bye!</button>
</Dialog>

<button on:click={() => open = 'modal'}>Show</button>
<button on:click={() => open = 'non-modal'}>Show modal</button>
