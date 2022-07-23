<!--
	@component

	Tooltip displays informative text when users hover over, focus on, or tap
	an element.
-->
<script>
	import { arrow, autoUpdate, computePosition, flip, hide, limitShift, offset, shift } from '@floating-ui/dom';

	/**
     * Where to position the popup relative to the reference element.
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" }
     */
	export let placement = 'bottom';

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
		let cleanup = () => {};

		/**
		 * @param {Options} options
		 */
		function _popup(options) {
			const { placement } = options;
			const popup = /** @type {HTMLElement} */ (div
				.firstElementChild);
			const reference = /** @type {HTMLElement} */ (div
				.previousElementSibling);
			if (placement && popup && reference) {
				cleanup();
				cleanup = autoUpdate(reference, popup, async () => {
					const arrowElement = /** @type {HTMLElement} */ (div.querySelector('.br-arrow'));
					const middleware = [
						offset(5),
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

					div.style.setProperty('--br-tooltip-popup-left', `${x}px`);
					div.style.setProperty('--br-tooltip-popup-top', `${y}px`);
					div.style.setProperty('--br-tooltip-popup-visibility', referenceHidden
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
						div.style.setProperty('--br-tooltip-arrow-left', typeof x === 'number' ? `${x}px`: '');
						div.style.setProperty('--br-tooltip-arrow-top', typeof y === 'number' ? `${y}px` : '');
						div.style.setProperty('--br-tooltip-arrow-bottom', '');
						div.style.setProperty('--br-tooltip-arrow-right', '');
						div.style.setProperty(`--br-tooltip-arrow-${staticSide}`, 'var(--br-tooltip-arrow-bulge)');
						/*
							When custom property has whitespace it becomes the active value.
							Whitespace paired with 'initial' is a clever way to create CSS boolean variables
							For your amusement, read https://lea.verou.me/2020/10/the-var-space-hack-to-toggle-multiple-values-with-one-custom-property
						*/
						div.style.setProperty('--br-tooltip-arrow-side-top', 'initial');
						div.style.setProperty('--br-tooltip-arrow-side-bottom', 'initial');
						div.style.setProperty('--br-tooltip-arrow-side-left', 'initial');
						div.style.setProperty('--br-tooltip-arrow-side-right', 'initial');
						div.style.setProperty(`--br-tooltip-arrow-side-${side}`, ' ');
					}
				});
			} else {
				div.style.setProperty('--br-tooltip-popup-visibility', 'hidden');
				cleanup();
			}
		}

		_popup(options);

		return {
			update: _popup,
			destroy() {
				cleanup();
			},
		};
	}
</script>

<slot name="trigger"></slot>
<div class:has-trigger={$$slots.trigger}
	use:popup={{ placement }}>
	<slot></slot>
</div>

<style>
	div {
		display: contents;
		--br-tooltip-popup-show: hidden;
	}
	:global(*:hover) + div.has-trigger {
		--br-tooltip-popup-show: ;
	}
</style>