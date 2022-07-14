<script>
    import '../../css/styles.js';
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
    @import "./tooltip.css";
</style>

<script context="module">
    export const docs = true;
</script>
