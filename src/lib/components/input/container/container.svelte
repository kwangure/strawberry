<!--
	@component

	Container adds layout and identity to input elements. It provides a
	canonical way to add labels, descriptions and validation to inputs.
-->

<script>
	import uid from 'uid';

	const hintId = uid();
	const inputId = uid();

	/** @type {HTMLInputElement | undefined} */
	let input;
	let validationMessage = '';

	/**
	 * @param {Event} event
	 */
	function updateValidationMessage(event) {
		input = /** @type {HTMLInputElement}*/(event?.target);
		validationMessage = input?.validationMessage || '';
	}
</script>

<div class="wrapper" class:active={$$slots.label || $$slots.hint}>
	<slot name='label'></slot>
	<div class="br-container" on:validate={updateValidationMessage}>
		<slot {hintId} {input} {inputId} {validationMessage}/>
	</div>
	<slot name='hint' ></slot>
</div>

<style>
	.wrapper {
		display: contents;
	}
	.active {
		display: inline-block;
	}
	.br-container {
		display: flex;
		border: var(--br-input-container-border);
		border-radius: var(--br-input-container-border-radius);
		background-color: var(--br-input-container-background-color);
		height: var(--br-input-container-height);
		transition: var(--br-input-container-transition);
	}
	.br-container:hover:not(:focus-within) {
		box-shadow: var(--br-input-container-hover-box-shadow);
		border: var(--br-input-container-hover-border);
	}
	.br-container:focus-within {
		box-shadow: var(--br-input-container-focus-box-shadow);
		border: var(--br-input-container-focus-border);
	}
	.br-container :global(input) {
		border: none;
		outline: 0;
		padding-block: var(--br-input-root-padding-block);
		padding-inline: var(--br-input-root-padding-inline);
		color: var(--br-input-root-font-color);
		background-color: transparent;
		flex-grow: 1;
		color: inherit;
	}

	.br-container :global(input::-webkit-datetime-edit) {
		display: contents;
	}

	.br-container :global(input::-webkit-datetime-edit-fields-wrapper) {
		flex-grow: 1;
	}

	.br-container :global(input::-webkit-calendar-picker-indicator) {
		padding-inline: 0;
		margin-inline-start: 8px;
		width: 20px;
		height: 20px;
		cursor: pointer;
	}

	.br-container :global([type=number]::-webkit-outer-spin-button),
	.br-container :global([type=number]::-webkit-inner-spin-button) {
		appearance: none;
		margin: 0;
	}

	.br-container :global([type=number]) {
		appearance: textfield;
	}
</style>