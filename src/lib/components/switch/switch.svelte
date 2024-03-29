<!--
	@component

	Switch is used to view or switch between enabled or disabled states.
-->
<script>
	import { getPropertyValueNumber, getPseudoStyle, getStyle } from '$lib/utils/style.js';
	import { createEventForwarder } from '../../utils/events.js';
	import { listen } from 'svelte/internal';

	const forward = createEventForwarder();

	/**
	 * Whether the switch is checked
	 *
	 * @type {boolean | "indeterminate"}
	 */
	export let checked = false;
	/**
	 * When true, prevents the user from interacting with the switch.
	 *
	 * @type {boolean}
	 */
	export let disabled = false;
	/**
	 * The name of the switch. Submitted with its parent form as part of a name/value pair.
	 *
	 * @type {string}
	 */
	export let name = '';
	/**
	 * When true, indicates that the user must check the switch before the parent form can be submitted.
	 *
	 * @type {boolean}
	 */
	export let required = false;
	/**
	 * The value given as data when submitted with a name.
	 *
	 * @type {string}
	 */
	export let value = 'on';

	/**
	 *
	 * @param {FocusEvent} event
	 */
	function handleFocus(event) {
		const currentTarget = /** @type {HTMLInputElement}*/ (event?.currentTarget);
		const removeKeydownHandler = listen(currentTarget, 'keydown', (event) => {
			if (/** @type {KeyboardEvent}*/ (event).code === 'Enter') {
				currentTarget.checked = !currentTarget.checked;
			}
		});

		const removeBlurHandler= listen(currentTarget, 'blur', () => {
			removeKeydownHandler();
			removeBlurHandler();
		});
	}

	/**
	 * Toggle switch by dragging
	 * @param {HTMLInputElement} input
	 * @param {"indeterminate" | boolean} checkedInitial
	 */
	function drag(input, checkedInitial) {
		/**
		 * @param {"indeterminate" | boolean} checked
		 */
		function updateChecked(checked) {
			if (checked === 'indeterminate') {
				input.indeterminate = true;
			} else {
				input.checked = checked;
			}
		}
		updateChecked(checkedInitial);

		let thumbsize = 0;
		let padding = 0;
		let bounds = {
			lower: 0,
			middle: 0,
			upper: 0,
		};

		thumbsize = getPseudoStyle(input, 'width');
		padding
		= getStyle(input, 'padding-left') + getStyle(input, 'padding-right');

		bounds = {
			lower: 0,
			middle: (input.clientWidth - padding) / 4,
			upper: input.clientWidth - thumbsize - padding,
		};

		const removePointerDownHandler = listen(input, 'pointerdown', /** @type {(event: Event) => void}*/ (dragInit));
		const removeFocusHandler = listen(input, 'focus', /** @type {(event: Event) => void}*/ (handleFocus));
		// Coordinating change events and dragging + clicks is unnecessarily involving
		// So we treat `checked` as only source of truth
		const removeChangeHandler = listen(input, 'change', () => updateChecked(checked));

		/**
		 * @param {PointerEvent} pointerDown
		 */
		function dragInit(pointerDown) {
			if (input.disabled) return;
			// Only clicks should animate the switch sliding
			input.style.setProperty('transition-duration', '0s');
			const removePointerMoveHandler = listen(input, 'pointermove', /** @type {(event: Event) => void}*/ (dragging));
			const removePointerUpHandler = listen(window, 'pointerup', function click(pointerUp) {
				try {
					const tapTime = pointerUp.timeStamp - pointerDown.timeStamp;
					const isClick = (tapTime < 300)
						|| (
							Math.abs(
								/** @type {PointerEvent} */ (pointerUp).clientX
								- pointerDown.clientX,
							) < 5
							&& Math.abs(
								/** @type {PointerEvent} */ (pointerUp).clientY
								- pointerDown.clientY,
							) < 5
						);
					if (isClick) {
						checked = checked === 'indeterminate' ? true : !checked;
						return;
					}
					checked = determineChecked();
					input.style.removeProperty('transition-duration');
					input.style.removeProperty('--thumb-position');
				} finally {
					removePointerMoveHandler();
					removePointerUpHandler();
				}
			});
		}

		/**
		 * @param {PointerEvent} event
		 */
		function dragging(event) {
			const directionality = getStyle(input, '--isLTR');
			const track = directionality === -1
				? (input.clientWidth * -1) + thumbsize + padding
				: 0;

			let pos = Math.round(event.offsetX - (thumbsize / 2));
			if (pos < bounds.lower) {
				pos = 0;
			}
			if (pos > bounds.upper) {
				pos = bounds.upper;
			}

			input.style.setProperty('--thumb-position', `${track + pos}px`);
		}

		function determineChecked() {
			const thumbPos = getPropertyValueNumber(input.style, '--thumb-position');
			let curpos = Math.abs(thumbPos);

			if (!thumbPos) {
				curpos = input.checked ? bounds.lower : bounds.upper;
			}

			return curpos >= bounds.middle;
		}

		return {
			update: updateChecked,
			destroy() {
				removePointerDownHandler();
				removeFocusHandler();
				removeChangeHandler();
			},
		};
	}

</script>

<div class="berry-element">
	{#if $$slots.default}
		<label for="berry-switch"><slot/></label>
	{/if}
	<input type="checkbox" id="berry-switch" disabled="{disabled}" {name} {required}
		role="switch" {value} on:focus={handleFocus} use:drag={checked} use:forward/>
</div>

<style>
	div {
		--isLTR: 1;

		display: inline-flex;
		align-items: center;
		gap: 2ch;
		justify-content: space-between;

		cursor: pointer;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}

	div:dir(rtl) {
		--isLTR: -1;
	}

	input {
		--thumb-position: 0%;
	}

	input {
		padding: var(--br-switch-track-padding);
		background: var(--br-switch-track-background-color);
		inline-size: var(--br-switch-track-size);
		block-size: var(--br-switch-thumb-size);
		border-radius: var(--br-switch-track-size);

		appearance: none;
		pointer-events: none;
		touch-action: pan-y;
		border: none;
		outline-offset: 5px;
		box-sizing: content-box;

		flex-shrink: 0;
		display: grid;
		align-items: center;
		grid: [track] 1fr / [track] 1fr;

		transition: var(--br-switch-track-transition);
	}

	input::before {
		content: "";
		cursor: pointer;
		pointer-events: auto;
		grid-area: track;
		inline-size: var(--br-switch-thumb-size);
		block-size: var(--br-switch-thumb-size);
		background: var(--br-switch-thumb-background-color);
		border-radius: 50%;

		transition: var(--br-switch-thumb-transition);
		transform: translateX(var(--thumb-position));
	}
	@media (prefers-reduced-motion) {
		input::before {
			transition: box-shadow 0.25s ease;
		}
	}

	input::after {
		content: "";
		cursor: pointer;
		pointer-events: auto;
		grid-area: track;
		block-size: var(--br-switch-thumb-size);
	}

	input:not(:disabled):hover::before {
		box-shadow: var(--br-switch-thumb-hover-box-shadow);
	}

	input:checked {
		background: var(--br-switch-track-active-background-color);
		--thumb-position: calc((var(--br-switch-track-size) - 100%) * var(--isLTR));
	}

	input:indeterminate {
		--thumb-position: calc(calc(calc(var(--br-switch-track-size) / 2) - calc(var(--br-switch-thumb-size) / 2)) * var(--isLTR));
	}
</style>
