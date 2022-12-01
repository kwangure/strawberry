<script>
	import { Container } from '@kwangure/strawberry/default/input/container';
	import { validate } from '@kwangure/strawberry/actions/validate.js';

	/** @type {import('@kwangure/strawberry/actions').Action<HTMLInputElement>}*/
	const _validate = (node) => validate(node, {
		invalid: (input) => (input.value === 'hello' ? 'customError' : ''),
		error: (error) => (error === 'customError' ? 'world' : ''),
	});

</script>

<Container let:hintId let:validationMessage>
	<input placeholder="I can say anything!" minlength="3"
		aria-describedby={hintId} required use:_validate/>
	<span slot='hint' id={hintId} class:invalid={validationMessage}>
		{#if validationMessage}
			{validationMessage}
		{:else}
			Required field with minimum 3 characters.
			Type hello to get a custom error.
		{/if}
	</span>
</Container>

<style>
	.invalid {
		color: red;
	}
</style>
