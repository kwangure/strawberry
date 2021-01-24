<script>
    import { createPopper } from "@popperjs/core";
    import { isSVGChild, getSVGParent } from "../../utils/svg.js";
    import { mousePosInBoundingRect, toggleListener } from "./tooltip.js";

    export let placement = "auto";
    export let followMouse = false;
    export let text;

    let referenceElement;
    let showTooltip = false;

    const handleShow = () => showTooltip = true;
    const handleHide =  () => showTooltip = false;

    function createPopup(popup, referenceElement) {
        if (!popup || !referenceElement) return;

        // Remount our <div> popup outside of SVGs to make them visible
        if (isSVGChild(referenceElement)) {
            getSVGParent(referenceElement).append(popup);
        }

        const reference = followMouse
            ? mousePosInBoundingRect(referenceElement)
            : referenceElement;
        const popperInstance = createPopper(reference, popup, {
            placement,
            modifiers: [{
                name: "offset",
                options: { offset: [5, 5] },
            }],
        });

        const showEvents = ["focus", "mouseenter"];
        const hideEvents = ["blur", "mouseleave"];

        showEvents.forEach(e => toggleListener(referenceElement, e, handleShow, true));
        hideEvents.forEach(e => toggleListener(referenceElement, e, handleHide, true));

        if (followMouse) {
            reference.onchange(popperInstance.update);
        }

        return {
            update: (reference) => {
                popperInstance.destroy();
                createPopup(popup, reference);
            },
            destroy: () => {
                showEvents.forEach(e => toggleListener(referenceElement, e, handleShow, false));
                hideEvents.forEach(e => toggleListener(referenceElement, e, handleHide, false));
                popperInstance.destroy();
            },
        };
    }

    function getReference(node) {
        referenceElement = node;
    }
</script>

<slot reference={getReference} />

<div use:createPopup={referenceElement} class:showTooltip>
    {text}
</div>

<style>
    @import "./tooltip.css";
</style>