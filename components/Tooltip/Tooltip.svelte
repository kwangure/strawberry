<script>
    import { mousePosInBoundingRect, toggleListener } from "./tooltip.js";
    import { createPopper } from "@popperjs/core";

    export let placement = "bottom";
    export let followMouse = false;

    let referenceElement;
    let showTooltip = false;

    function handleShow() {
        showTooltip = true;
    }
    function handleHide() {
        showTooltip = false;
    }

    function createPopup(popup, referenceElement) {
        if (!popup || !referenceElement) return;

        const reference = followMouse
            ? mousePosInBoundingRect(referenceElement)
            : referenceElement;
        const popperInstance = createPopper(reference, popup, {
            placement: placement,
            modifiers: [{
                name: "offset",
                options: { offset: [5, 5]},
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
            update: (reference) => {
                popperInstance.destroy();
                createPopup(popup, reference);
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

    function getReference(node) {
        referenceElement = node;
    }
</script>

<slot reference={getReference} />

<div class="berry-tooltip" use:createPopup={referenceElement} class:showTooltip>
    <slot name="popup"></slot>
</div>

<style>
    @import "./tooltip.css";
</style>