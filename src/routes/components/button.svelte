<script>
	import Component from '$lib/internal/component.svelte';

	const docs = {
		main: {
			name: 'Button',
			description: 'Button triggers an event or action. They let users know what will happen next.',
			customProperties: [
				{
					customProperty: '--br-button-root-border',
				},
				{
					customProperty: '--br-button-root-hover-border',
				},
				{
					customProperty: '--br-button-root-background-color',
				},
				{
					customProperty: '--br-button-root-hover-background-color',
				},
			],
			props: [],
			slots: [],
		},
	};
</script>

<Component {docs}>
	<svelte:fragment slot="inline">
		<button class='br-primary'>I do nothing primary!</button>
		<button>I do nothing too!</button>
	</svelte:fragment>
</Component>
