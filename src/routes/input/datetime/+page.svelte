<script>
	import Component from '$lib/internal/component.svelte';
	import { Container } from '$lib/default/input/container';

	const docs = {
		main: {
			name: 'DateTime',
			description: 'Datetime lets the user enter both a date and time,\
				with a date picker interface. The resulting value includes the\
				year, month, and day as well as the time in hours and minutes.',
			customProperties: [],
			props: [],
			slots: [],
		},
	};
</script>

<Component {docs}>
	<svelte:fragment slot="inline">
		<Container>
			<input type="datetime-local" value="2017-06-01T01:00"/>
		</Container>
	</svelte:fragment>
</Component>