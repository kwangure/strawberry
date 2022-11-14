<script>
	import Component from '$lib/internal/component.svelte';
	import { Container } from '$lib/default/input/container';
	import { Postfix } from '$lib/default/input/number';
	import { validate } from '$lib/components/input/validate.js';

	const docs = {
		main: {
			name: 'Number',
			description: 'Number lets the user enter a number. It includes \
				built-in validation to reject non-numerical entries.',
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
				This is an input label
			</label>
			<input type=number id={inputId} placeholder="Use keyboard or UI arrows!" required use:validate={{}}/>
			<Postfix/>
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