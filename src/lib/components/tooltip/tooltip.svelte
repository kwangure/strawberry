<!--
    @component

    Tooltip displays informative text when users hover over, focus on, or tap
	an element.
-->
<script>
    import { mousePosInBoundingRect, toggleListener } from './tooltip.js';
    import { createPopper } from '@popperjs/core';

    /**
     * Where to position the popup relative to the reference element.
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" }
     */
    export let placement = 'bottom';
    export let followMouse = false;
    export let gesture = 'hover';
    export let arrow = true;

    let visible = false;

    function createPopup(popup, _visible) {
    	const referenceElement = popup.previousElementSibling;

    	const reference = followMouse
    		? mousePosInBoundingRect(referenceElement)
    		: referenceElement;
    	const popperInstance = createPopper(reference, popup, {
    		placement,
    		modifiers: [{
    			name: 'offset',
    			options: { offset: [0, 5]},
    		}],
    	});

    	if (followMouse) {
    		reference.onchange(popperInstance.update);
    	}

    	return {
    		update: (visible) => {
    			if (visible) popperInstance.update();
    		},
    		destroy: () => {
    			popperInstance.destroy();
    		},
    	};
    }

    function handleTooltipHover(popup) {
    	if (gesture !== 'hover') return;

    	const referenceElement = popup.previousElementSibling;

    	const showEvents = ['focus', 'mouseenter'];
    	const hideEvents = ['blur', 'mouseleave'];

    	function show() {
    		visible = true;
    	}
    	function hide() {
    		visible = false;
    	}

    	showEvents.forEach((event) => {
    		toggleListener(referenceElement, event, show, true);
    	});
    	hideEvents.forEach((event) => {
    		toggleListener(referenceElement, event, hide, true);
    	});
    }

    function handleDocumentClick(popup) {
    	if (gesture !== 'click') return;

    	const reference = popup.previousElementSibling;

    	document.addEventListener('click', hideIfExternalClick, true);

    	function hideIfExternalClick(event) {
    		const [target] = event.path
                || (event.composedPath && event.composedPath());
    		const isContained = reference.contains(target);
    		if (isContained) {
    			visible = !visible;
    		} else if (visible) {
    			visible = false;
    		}
    	}

    	return {
    		destroy: () => {
    			document.removeEventListener('click', hideIfExternalClick);
    		},
    	};
    }
</script>

<slot/>
<div class="berry-tooltip" use:createPopup={visible}
    use:handleDocumentClick
    use:handleTooltipHover
    class:visible data-popper-placement={placement}>
    {#if arrow}
        <div class="arrow"></div>
    {/if}
    <slot name="popup"></slot>
</div>

<style>
    .berry-tooltip {
		padding: var(--br-tooltip-padding-block, 6px) var(--br-tooltip-padding-inline, 8px);
		min-width: 30px;
		min-height: 1em;
		color: #fff;
		border-radius: 4px;
		opacity: 0;
		visibility: hidden;
		transition: opacity;
		transition-timing-function: var(--br-tooltip-transition-function, ease);
		transition-duration: var(--br-tooltip-transition-duration, 0.25s);
		transition-delay: var(--br-tooltip-transition-delay, 0);
		position: relative;
		z-index: 1;
	}

	@media (prefers-color-scheme: dark) {
		.berry-tooltip {
			background-color: #444;
			box-shadow: 0 2px 8px #111;
		}
	}

	@media (prefers-color-scheme: light) {
		.berry-tooltip {
			background-color: rgba(30, 30, 30, 0.9);
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		}
	}

	.berry-tooltip.visible {
		visibility: visible;
		opacity: 1;
	}

	.arrow {
		--arrow-skidding-inline: 12px;
		--arrow-skidding-block: 5px;
	}

	.arrow {
		position: absolute;
		width: 12px;
		height: 12px;
		overflow: hidden;
		background: inherit;
		pointer-events: none;
		clip-path: polygon(0 0, 0% 100%, 100% 100%);
		border-radius: 0 4px;
		transform: translateX(var(--br-translate-x, 0)) translateY(var(--br-translate-y, 0)) rotate(var(--br-rotate, 0));
	}

	[data-popper-placement^="top"] .arrow {
		--br-rotate: -45deg;
		--br-translate-y: 50%;
		bottom: 0;
	}

	[data-popper-placement="top"] .arrow {
		left: 50%;
		--br-translate-x: -50%;
	}

	[data-popper-placement="top-start"] .arrow {
		left: var(--br-tooltip-arrow-skidding-inline, var(--arrow-skidding-inline));
	}

	[data-popper-placement="top-end"] .arrow {
		right: var(--br-tooltip-arrow-skidding-inline, var(--arrow-skidding-inline));
	}

	[data-popper-placement^="right"] .arrow {
		--br-rotate: 45deg;
		--br-translate-x: -50%;
		left: 0;
	}

	[data-popper-placement="right"] .arrow {
		top: 50%;
		--br-translate-y: -50%;
	}

	[data-popper-placement="right-start"] .arrow {
		top: var(--br-tooltip-arrow-skidding-block, --arrow-skidding-block);
	}

	[data-popper-placement="right-end"] .arrow {
		bottom: var(--br-tooltip-arrow-skidding-block, --arrow-skidding-block);
	}

	[data-popper-placement^="left"] .arrow {
		--br-rotate: 225deg;
		--br-translate-x: 50%;
		right: 0;
	}

	[data-popper-placement="left"] .arrow {
		--br-translate-y: 50%;
	}

	[data-popper-placement="left-start"] .arrow {
		top: var(--br-tooltip-arrow-skidding-block, var(--arrow-skidding-block));
	}

	[data-popper-placement="left-end"] .arrow {
		bottom: var(--br-tooltip-arrow-skidding-block, var(--arrow-skidding-block));
	}

	[data-popper-placement^="bottom"] .arrow {
		--br-rotate: 135deg;
		--br-translate-y: -50%;
		top: 0;
	}

	[data-popper-placement="bottom"] .arrow {
		left: 50%;
		--br-translate-x: -50%;
	}

	[data-popper-placement="bottom-start"] .arrow {
		left: var(--br-tooltip-arrow-skidding-inline, var(--arrow-skidding-inline));
	}

	[data-popper-placement="bottom-end"] .arrow {
		right: var(--br-tooltip-arrow-skidding-inline, var(--arrow-skidding-inline));
	}
</style>
