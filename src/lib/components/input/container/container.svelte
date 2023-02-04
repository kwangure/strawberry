<!--
	@component

	Container adds layout and identity to input elements. It provides a
	canonical way to add labels, descriptions and validation to inputs.
-->

<script>
	import { createEventForwarder } from '@kwangure/strawberry/utils/events';
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

	const forward = createEventForwarder();
</script>

<div class="wrapper" class:active={$$slots.label || $$slots.hint} use:forward>
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
		transition: var(--br-input-container-transition);
		position: var(--br-input-container-position, relative);
	}
	.br-container:hover:not(:focus-within) {
		box-shadow: var(--br-input-container-hover-box-shadow);
		border: var(--br-input-container-hover-border);
	}
	.br-container:focus-within {
		box-shadow: var(--br-input-container-focus-box-shadow);
		border: var(--br-input-container-focus-border);
	}
	.br-container :global(input),
	.br-container :global(select) {
		border: none;
		outline: 0;
		padding-block: var(--br-input-padding-block);
		padding-inline: var(--br-input-padding-inline);
		color: var(--br-input-font-color);
		/*
			Set container height on input so that container can grow for
			textarea elements.
		 */
		height: var(--br-input-container-inner-height);
		background-color: transparent;
		flex-grow: 1;
		color: inherit;
	}

	.br-container :global(option) {
		color: black;
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

	.br-container :global(textarea) {
		border: none;
		outline: 0;
		padding-block: var(--br-input-padding-block);
		padding-inline: var(--br-input-padding-inline);
		background-color: transparent;
		color: inherit;
		flex-grow: 1;
		overflow: auto;
		overflow-x: hidden;
		-ms-overflow-style: none;
		resize: none;
	}

</style>