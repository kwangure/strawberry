<!--
	@component

	Dropdown displays a list of actions or options to a user.
-->
<script>
	import { arrow, autoUpdate, computePosition, flip, hide, limitShift, offset, shift } from '@floating-ui/dom';
	import { listen } from 'svelte/internal';

	/**
	 * Where to position the popup relative to the reference element.
	 * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" }
	 */
	export let placement = 'bottom';

	let show = false;

	/**
	 *
	 * @param {string} placement
	 * @returns {'top' | 'right' | 'bottom' | 'left'}
	 */
	function getSide(placement) {
		return /** @type {'top' | 'right' | 'bottom' | 'left'} */(placement.split('-')[0]);
	}

	/**
	 * @typedef {{
	 * 		placement: "top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end";
	 * }} Options
	 * @param {HTMLDivElement} div
	 * @param {Options} options
	 */
	function popup(div, options) {
		const { placement } = options;
		const popup = /** @type {HTMLElement} */ (div
			.firstElementChild);
		const reference = /** @type {HTMLElement} */ (div
			.previousElementSibling);
		if (!placement || !popup || !reference) return () => {};
		return autoUpdate(reference, popup, async () => {
			const arrowElement = /** @type {HTMLElement} */ (div.querySelector('.br-arrow'));
			const middleware = [
				offset(10),
				flip(),
				shift({
					limiter: limitShift({ offset: 5 }),
				}),
				hide(),
			];
			if (arrowElement) {
				middleware.push(arrow({ element: arrowElement }));
			}
			// resulting final placement might be different from provided placement
			// to avoid overflows/collisions
			const { placement: finalPlacement, middlewareData, x, y }
					= await computePosition(reference, popup, {
						placement,
						middleware,
					});
			const { referenceHidden } = middlewareData.hide || {};

			div.style.setProperty('--br-dropdown-popup-left', `${x}px`);
			div.style.setProperty('--br-dropdown-popup-top', `${y}px`);
			div.style.setProperty('--br-dropdown-popup-visibility', referenceHidden
				? 'hidden'
				: 'visible');

			if (arrowElement) {
				const { x, y } = middlewareData.arrow || {};
				const side = getSide(finalPlacement);
				const staticSide = {
					top: 'bottom',
					right: 'left',
					bottom: 'top',
					left: 'right',
				}[side];
				div.style.setProperty('--br-dropdown-arrow-left', typeof x === 'number' ? `${x}px`: '');
				div.style.setProperty('--br-dropdown-arrow-top', typeof y === 'number' ? `${y}px` : '');
				div.style.setProperty('--br-dropdown-arrow-bottom', '');
				div.style.setProperty('--br-dropdown-arrow-right', '');
				div.style.setProperty(`--br-dropdown-arrow-${staticSide}`, 'var(--br-dropdown-arrow-bulge)');
				/*
						When custom property has whitespace it becomes the active value.
						Whitespace paired with 'initial' is a clever way to create CSS boolean variables
						For your amusement, read https://lea.verou.me/2020/10/the-var-space-hack-to-toggle-multiple-values-with-one-custom-property
					*/
				div.style.setProperty('--br-dropdown-arrow-side-top', 'initial');
				div.style.setProperty('--br-dropdown-arrow-side-bottom', 'initial');
				div.style.setProperty('--br-dropdown-arrow-side-left', 'initial');
				div.style.setProperty('--br-dropdown-arrow-side-right', 'initial');
				div.style.setProperty(`--br-dropdown-arrow-side-${side}`, ' ');
			}
		});
	}

	/**
	 * @param {HTMLDivElement} div
	 * @param {{
	 *     hasTrigger: boolean;
	 *     placement: "top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end";
	 * }} options
	 */
	function trigger(div, options) {
		let { hasTrigger } = options;
		let cleanup = () => {};
		const removeClickListener = listen(document, 'click', (event) => {
			const targetIsInPopup = div
				.contains(/** @type {HTMLElement} */ (event.target));
			if (targetIsInPopup) {
				show = false;
			}

			if (!hasTrigger) return;
			const trigger = /** @type {HTMLElement} */ (div.previousElementSibling);
			const targetIsInTrigger = trigger
				.contains(/** @type {HTMLElement} */ (event.target));
			if (targetIsInTrigger) {
				show = !show;
			} else {
				show = false;
			}

			handleShow();
		});

		function handleShow() {
			cleanup();
			if (show) {
				cleanup = popup(div, { placement });
			} else {
				cleanup = () => {};
			}
		}

		return {
			/**
			 * @param {{ hasTrigger: boolean; }} options
			 */
			update(options) {
				({ hasTrigger } = options);
				handleShow();
			},
			destroy() {
				removeClickListener();
			},
		};
	}
</script>

<slot name="trigger"></slot>
<div class:has-trigger={$$slots.trigger} class:show
	use:trigger={{ hasTrigger: $$slots.trigger, placement }}>
	<slot></slot>
</div>

<style>
	div {
		display: contents;
		--br-dropdown-popup-show: hidden;
		--br-dropdown-popup-position: static;
	}
	div.has-trigger.show {
		--br-dropdown-popup-show: ;
		--br-dropdown-popup-position: absolute;
	}
</style>