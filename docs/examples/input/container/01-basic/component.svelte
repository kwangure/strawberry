<script>
	import { Container } from '@kwangure/strawberry/default/input/container';
	import { validate } from '@kwangure/strawberry/actions/validate.js';
</script>

<Container let:inputId let:hintId let:validationMessage>
	<label slot='label' for={inputId}>
		This is the input label
	</label>
	<input autofocus id={inputId} placeholder="I can say anything!"
		aria-describedby={hintId} required use:validate/>
	<span slot='hint' id={hintId} class:invalid={validationMessage}>
		{#if validationMessage}
			{validationMessage}
		{:else}
			Remove focus from empty input to see message
		{/if}
	</span>
</Container>

<style>
	.invalid {
		color: red;
	}
</style>
