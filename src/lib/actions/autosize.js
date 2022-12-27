import { append, element, listen } from 'svelte/internal';
import debounce from '$lib/utils/debounce.js';
import { getPropertyValueNumber } from '$lib/utils/style.js';
import { ownerWindow } from '$lib/utils/owner.js';

/**
 * @param {HTMLTextAreaElement} textarea
 * @param {{ minrows?: 2; maxrows?: 10; }} [options]
 */
export function autosize(textarea, options = {}) {
	const containerWindow = ownerWindow(textarea);
	const { minrows = 2, maxrows = 10 } = options;

	const textareaShadow = element('textarea');
	textareaShadow.style.cssText = [
		/* Visibility needed to hide the extra text area on iPads */
		'visibility: hidden;',
		/* Remove from the content flow */
		'position: absolute;',
		/* Ignore the scrollbar width */
		'overflow: hidden;',
		'height: 0;',
		'top: 0;',
		'left: 0;',
		/* Create a new layer, increase the isolation of the computed values */
		'transform: translateZ(0);',
	].join('');
	append(/** @type {HTMLElement} */(textarea.parentNode), textareaShadow);

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

		textareaShadow.style.width = computedStyle.width;
		textareaShadow.value = textarea.value || textarea.placeholder || 'x';
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
		const outerHeightStyle = outerHeight
			+ (boxSizing === 'border-box' ? padding + border : 0);
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
			textarea.style.setProperty('height', `${outerHeightStyle}px`);
		}
	}

	const handleResize = debounce(updateHeight);
	const removeResizeListener
		= listen(containerWindow, 'resize', handleResize);

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
			resizeObserver?.disconnect();
			textareaShadow.remove();
		},
	};

}
