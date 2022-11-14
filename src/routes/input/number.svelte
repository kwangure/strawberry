<script>
	import Component from '$lib/internal/component.svelte';
	import { Container } from '$lib/default/input/container';
	import { Postfix } from '$lib/default/input/number';

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
		<Container>
			<input type=number placeholder="Use keyboard or UI arrows!"/>
			<Postfix/>
		</Container>
	</svelte:fragment>
</Component>