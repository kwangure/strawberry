<script>
	import Component from '$lib/internal/component.svelte';
	import { Container } from '$lib/default/input/container';

	const docs = {
		main: {
			name: 'Date',
			description: 'Date lets the user enter a date, with a date picker interface. The resulting value includes the year, month, day, but not the time.',
			customProperties: [],
			props: [],
			slots: [],
		},
	};
</script>

<Component {docs}>
	<svelte:fragment slot="inline">
		<Container>
			<input type="date" value="2017-06-01"/>
		</Container>
	</svelte:fragment>
</Component>