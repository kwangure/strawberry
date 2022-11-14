<!--
	@component

	Number lets the user enter a number. It includes built-in validation to
	reject non-numerical entries.
-->
<script>
	import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
	import { listen } from 'svelte/internal';

	let stepDown = () => {};
	let stepUp = () => {};
	/**
	 * @param {HTMLElement} postfix
	 */
	function setupInput(postfix) {
		const input = /** @type {HTMLInputElement}*/ (postfix.parentNode?.querySelector('input[type=number]'));

		if (!input) {
			return console.error('Number postfix is missing sibling number input.');
		}

		function handleButtonChange() {
			// Arrow buttons should not emit blur events.
			// We capture it at the top before anyone receives it
			const removeBlurListener = listen(document, 'blur', (event) => {
				if (event.target === input) {
					// Prevent hiding number keypad on mobile
					event.preventDefault();
					event.stopImmediatePropagation();
					removeBlurListener();
					input.focus();
				}
			}, { capture: true });


			if (!input.disabled) {
				input.dispatchEvent(new Event('input'));
				input.dispatchEvent(new Event('change'));
			}
		}

		stepUp = () => {
			input.stepUp();
			handleButtonChange();
		};

		stepDown = () => {
			input.stepDown();
			handleButtonChange();
		};
	}
</script>

<div class="postfix-wrapper" use:setupInput>
	<svg viewBox="0 0 24 24" class="postfix-up" on:click={stepUp}>
		<path d={mdiChevronUp}/>
	</svg>
	<svg viewBox="0 0 24 24" class="postfix-down" on:click={stepDown}>
		<path d={mdiChevronDown}/>
	</svg>
</div>

<style>
	:global(.br-container:hover) .postfix-wrapper,
	:global(.br-container:focus-within) .postfix-wrapper {
		color: var(--br-input-number-postfix-focus-color);
		background-color: var(--br-input-number-postfix-focus-background-color);
	}
	svg {
		width: 100%;
	}
	.postfix-wrapper {
		width: var(--br-input-number-postfix-width);
		color: var(--br-input-number-postfix-color);
		background-color: var(--br-input-number-postfix-background-color);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		border-radius: 0 2px 2px 0;
		flex: none;
		user-select: none;
	}
	path {
		fill: currentColor;
		scale: 1.25;
		translate: -10% -10%;
	}
</style>
