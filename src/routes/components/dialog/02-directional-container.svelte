<script>
	import { Dialog } from '@kwangure/strawberry/default/dialog';

	/** @type {false | 'modal'} */
	let open;

	/** @type {string[]} */
	let paragraphs = [];

	const url = 'https://baconipsum.com/api/?type=all-meat&paras=4';
	(async () => {
		paragraphs = await fetch(url)
			.then((response) => response.json());
	})();
</script>

<Dialog bind:open>
	<article>
		<header class="br-dialog-inline-section">
			<h3>Dialog title</h3>
		</header>
		<section class="br-dialog-block-section">
			{#each paragraphs as paragraph}
				<p>{paragraph}</p>
			{/each}
		</section>
		<footer class="br-dialog-inline-section">
			<button on:click={() => open = false}>
				Cancel
			</button>
			<button class='br-button-primary' on:click={() => open = false}>
				Lorem
			</button>
		</footer>
	</article>
</Dialog>

<button on:click={() => open = 'modal'}>Show modal</button>

<style>
	article {
		height: 100%;
		min-height: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
