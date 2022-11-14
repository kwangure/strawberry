<script>
	import Component from '$lib/internal/component.svelte';
	import { Container } from '$lib/default/input/container';

	const docs = {
		main: {
			name: 'Time',
			description: 'Time lets the user enter time (hours and minutes, and optionally seconds).',
			customProperties: [],
			props: [],
			slots: [],
		},
	};
</script>

<Component {docs}>
	<svelte:fragment slot="inline">
		<Container>
			<input type=time value={new Date().toISOString()}/>
		</Container>
	</svelte:fragment>
</Component>