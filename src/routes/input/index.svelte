<script>
	import Component from '$lib/internal/component.svelte';
	import { Container } from '$lib/default/input/container';
	import { validate } from '$lib/components/input/validate.js';

	const docs = {
		main: {
			name: 'Text',
			description: 'Text lets the user enter inline text. It includes built-in validation to reject invalid entries.',
			customProperties: [],
			props: [],
			slots: [],
		},
	};
</script>

<Component {docs}>
	<svelte:fragment slot="inline">
		<Container let:inputId let:descriptionId let:validationMessage>
			<label slot='label' for={inputId}>
				I label inputs like no one else!
			</label>
			<input id={inputId} placeholder="I can say anything!" required use:validate={{}}/>
			<span slot='hint' id={descriptionId} class:invalid={validationMessage}>
				{#if validationMessage}
					{validationMessage}
				{:else}
					This is a description or input hint
				{/if}
			</span>
		</Container>
	</svelte:fragment>
</Component>

<style>
	.invalid {
		color: red;
	}
</style>
