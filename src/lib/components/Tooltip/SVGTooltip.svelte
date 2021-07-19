<script>
    import { getSVGParent, isSVGChild } from "../../utils/svg.js";
    import { mousePosInBoundingRect, toggleListener } from "./tooltip.js";
    import { createPopper } from "@popperjs/core";

    /**
     * Where to position the popup relative to the reference element.
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" }
     */
    export let placement = "auto";
    export let followMouse = false;
    export let arrow = true;

    let visible = false;

    function handleShow() {
        visible = true;
    }
    function handleHide() {
        visible = false;
    }

    function createPopup(popup) {
        const referenceElement = popup.previousElementSibling;

        // Remount our <div> popup outside of SVGs to make them visible
        if (isSVGChild(referenceElement)) {
            getSVGParent(referenceElement).append(popup);
        }

        const reference = followMouse
            ? mousePosInBoundingRect(referenceElement)
            : referenceElement;
        const popperInstance = createPopper(reference, popup, {
            placement: placement,
            modifiers: [{
                name: "offset",
                options: { offset: [0, 5]},
            }],
        });

        const showEvents = ["focus", "mouseenter"];
        const hideEvents = ["blur", "mouseleave"];

        showEvents.forEach((event) => {
            toggleListener(referenceElement, event, handleShow, true);
        });
        hideEvents.forEach((event) => {
            toggleListener(referenceElement, event, handleHide, true);
        });

        if (followMouse) {
            reference.onchange(popperInstance.update);
        }

        return {
            update: () => {
                popperInstance.destroy();
                createPopup(popup);
            },
            destroy: () => {
                showEvents.forEach((event) => {
                    toggleListener(referenceElement, event, handleShow, false);
                });
                hideEvents.forEach((event) => {
                    toggleListener(referenceElement, event, handleHide, false);
                });
                popperInstance.destroy();
            },
        };
    }
</script>

<slot/>
<div class="berry-tooltip" use:createPopup class:visible data-popper-placement={placement}>
    {#if arrow}
        <div class="arrow"></div>
    {/if}
    <slot name="popup"></slot>
</div>

<style>
    @import "./tooltip.css";
</style>