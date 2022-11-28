<script>
	import { Dialog } from '@kwangure/strawberry/default/dialog';

	/** @type {() => any} */
	let showModal;

	/** @type {string[]} */
	let paragraphs = [];

	const url = 'https://baconipsum.com/api/?type=all-meat&paras=4';
	(async () => {
		paragraphs = await fetch(url)
			.then((response) => response.json());
	})();
</script>

<Dialog bind:showModal>
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
			<button>Cancel</button>
			<button class='br-primary'>Lorem</button>
		</footer>
	</article>
</Dialog>

<button on:click={showModal}>Show modal</button>

<style>
	article {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
