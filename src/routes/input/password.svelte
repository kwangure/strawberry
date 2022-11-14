<script>
	import Component from '$lib/internal/component.svelte';
	import { Container } from '$lib/default/input/container';

	const docs = {
		main: {
			name: 'Password',
			description: 'Password lets the user to securely enter a password.\
				It presents each character as a symbol such as an asterisk \
				(*) or a dot (•) so that it cannot be read.',
			customProperties: [],
			props: [],
			slots: [],
		},
	};
</script>

<Component {docs}>
	<svelte:fragment slot="inline">
		<Container>
			<input type='password' placeholder="I can say anything!"/>
		</Container>
	</svelte:fragment>
</Component>