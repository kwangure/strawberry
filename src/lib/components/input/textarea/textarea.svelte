<!--
	@component

	Textarea is a multi-line plain-text editing control. It allows users to
	enter a sizeable amount of free-form text, such as a comment on a review
	or feedback form.
-->
<script>
	import { createEventForwarder } from '../../../utils/forward-events.js';
	import debounce from '$lib/utils/debounce.js';
	import { getPropertyValueNumber } from '$lib/utils/style.js';
	import { listen } from 'svelte/internal';
	import ownerWindow from '$lib/utils/owner.js';
	import { validate } from '../validate';

	/**
	 * Guidance to the browser on information expected in the field.
	 * Helps UserAgent automate filling form field values.
	 *
	 * @type {"off" | "on" | string}
	 */
	export let autocomplete = '';

	/**
	 * When true, the textarea will have input focus when the page loads.
	 *
	 * @type {boolean}
	 */
	export let autofocus = false;

	/**
	 * The visible width of the text control, in average character widths.
	 *
	 * @type {number}
	 */
	export let cols = 20;

	/**
	 * A function that takes a validity state string and returns an error message.
	 *
	 * @type {((error: string, input: HTMLTextAreaElement) => string) | undefined}
	 */
	export let error = undefined;

	/**
	 * The id of the form to associate with the textarea
	 *
	 * @type {string | undefined}
	 */
	export let form = undefined;

	/**
	 * The id of the aria-describedby element.
	 *
	 * @type {string | undefined}
	 */
	export let hint = undefined;

	/**
	 * The id of the textarea
	 *
	 * @type {string | undefined}
	 */
	export let id = undefined;

	/**
	 * A function that returns the validity of the input.
	 *
	 * @type {((input: HTMLTextAreaElement) => string) | undefined}
	 */
	export let invalid = undefined;

	/**
	 * The maximum number of characters allowed in the element.
	 *
	 * @type {number}
	 */
	export let maxlength = -1;

	/**
	 * The maximum number of visible text lines for the control.
	 *
	 * @type {number}
	 */
	export let maxrows = 10;

	/**
	 * The minimum number of characters allowed in the element.
	 *
	 * @type {number}
	 */
	export let minlength = -1;

	/**
	 * The minimum number of visible text lines for the control.
	 *
	 * @type {number}
	 */
	export let minrows = 2;

	/**
	 * The name of the textarea. Submitted with its parent form as part of a name/value pair.
	 *
	 * @type {string}
	 */
	export let name = '';

	/**
	 * Text that appears in the form control when it has no value set
	 *
	 * @type {string}
	 */
	export let placeholder = '';

	/**
	 * When true, the user cannot edit the value of the input
	 *
	 * @type {boolean}
	 */
	export let readonly = false;

	/**
	 * When true, indicates that the user must input a value before the parent form can be submitted.
	 *
	 * @type {boolean}
	 */
	export let required = false;

	/**
	 * The number of visible text lines for the control.
	 * @type {number}
	*/
	export let rows = 2;

	/**
	 * The initial value of the component.
	 * @type {string | undefined}
	 */
	export let value = '';

	const forward = createEventForwarder();
	/**
	 *
	 * @param {HTMLTextAreaElement} textarea
	 */
	function autosize(textarea) {
		const containerWindow = ownerWindow(textarea);
		/**
		 * @type {any}
		 */
		let prevStateOuterHeightStyle;
		/**
		 * @type {boolean}
		 */
		let prevStateOverflow;

		function updateHeight() {
			const computedStyle = containerWindow.getComputedStyle(textarea);

			// If input's width is shrunk and it's not visible, don't sync height.
			if (computedStyle.width === '0px') return;

			const textareaShadow
				= /** @type {HTMLTextAreaElement} */ (textarea.nextElementSibling);
			textareaShadow.style.width = computedStyle.width;
			textareaShadow.value = textarea.value || placeholder || 'x';
			if (textareaShadow.value.slice(-1) === '\n') {
				// Certain fonts which overflow the line height will cause the textarea
				// to report a different scrollHeight depending on whether the last line
				// is empty. Make it non-empty to avoid this issue.
				textareaShadow.value += ' ';
			}
			const boxSizing = computedStyle.getPropertyValue('box-sizing');
			const padding = getPropertyValueNumber(computedStyle, 'padding-bottom')
				+ getPropertyValueNumber(computedStyle, 'padding-top');
			const border = getPropertyValueNumber(computedStyle, 'border-bottom-width')
				+ getPropertyValueNumber(computedStyle, 'border-top-width');

			// The height of the inner content
			const innerHeight = textareaShadow.scrollHeight;

			// Measure height of a textarea with a single row
			textareaShadow.value = 'x';
			const singleRowHeight = textareaShadow.scrollHeight;

			// The height of the outer content
			let outerHeight = innerHeight;
			if (minrows) {
				outerHeight = Math.max(
					Number(minrows) * singleRowHeight, outerHeight,
				);
			}
			if (maxrows) {
				outerHeight = Math.min(
					Number(maxrows) * singleRowHeight, outerHeight,
				);
			}
			outerHeight = Math.max(outerHeight, singleRowHeight);

			// Take the box sizing into account for applying this value as a style.
			const outerHeightStyle = outerHeight + (boxSizing === 'border-box' ? padding + border : 0);
			const overflow = Math.abs(outerHeight - innerHeight) <= 1;

			// Need a large enough difference to update the height.
			// This prevents infinite rendering loop.
			if (
				((outerHeightStyle > 0 && Math.abs(
					(prevStateOuterHeightStyle || 0) - outerHeightStyle,
				) > 1)
				|| prevStateOverflow !== overflow)
			) {
				prevStateOverflow = overflow;
				prevStateOuterHeightStyle = outerHeightStyle;
				textarea.style.setProperty('--br-textarea-root-height', `${outerHeightStyle}px`);
			}
		}

		const handleResize = debounce(updateHeight);
		const removeResizeListener = listen(containerWindow, 'resize', handleResize);

		/**
		 * @type {ResizeObserver}
		 */
		let resizeObserver;
		if (typeof ResizeObserver !== 'undefined') {
			resizeObserver = new ResizeObserver(handleResize);
			resizeObserver.observe(textarea);
		}

		const removeInputListener = listen(textarea, 'input', updateHeight);
		updateHeight();

		return {
			destroy() {
				removeInputListener();
				removeResizeListener();
				handleResize.clear();
				if (resizeObserver) {
					resizeObserver.disconnect();
				}
			},
		};

	}
</script>

<div class="container">
	<!-- svelte-ignore a11y-autofocus -->
	<textarea use:validate={{ invalid, error }} use:autosize
		{id}  aria-describedby={hint}
		use:forward bind:value {...$$restProps}
		{autocomplete} {autofocus} {cols} {form} {maxlength} {minlength}
		{name} {placeholder} {readonly} {required} {rows}/>
	<textarea class="shadow" aria-hidden readonly tabIndex={-1}/>
</div>

<style>
	textarea {
		border: none;
		outline: 0;
		padding-block: var(--br-textarea-root-padding-block);
		padding-inline: var(--br-textarea-root-padding-inline);
		color: var(--br-textarea-root-font-color);
		background-color: transparent;
		flex-grow: 1;
		overflow: var(--br-textarea-root-overflow);
		overflow-x: hidden;
		-ms-overflow-style: none;
		scrollbar-width: none;
		height: var(--br-textarea-root-height);
	}
	textarea::-webkit-scrollbar {
		display: none;
	}
	.shadow {
		/* Visibility needed to hide the extra text area on iPads */
		visibility: hidden;
		/* Remove from the content flow */
		position: absolute;
		 /* Ignore the scrollbar width */
		overflow: hidden;
		height: 0;
		top: 0;
		left: 0;
		/* Create a new layer, increase the isolation of the computed values */
		transform: translateZ(0);
	}
	.container {
		display: flex;
		border: var(--br-textarea-root-border);
		border-radius: var(--br-textarea-root-border-radius);
		background-color: var(--br-textarea-root-background-color);
		height: var(--br-textarea-root-height);
		transition: var(--br-textarea-root-transition);
	}
	.container:hover:not(:focus-within) {
		box-shadow: var(--br-textarea-root-hover-box-shadow);
		border: var(--br-textarea-root-hover-border);
	}
	.container:focus-within {
		box-shadow: var(--br-textarea-root-focus-box-shadow);
		border: var(--br-textarea-root-focus-border);
	}
</style>
