<script>
    import { createPopper } from "@popperjs/core";

    export let placement = "bottom-start";
    export let visible = false;

    function createPopup(popup, _) {
        const reference = popup.previousElementSibling;
        const popperInstance = createPopper(reference, popup, {
            placement: placement,
            modifiers: [{
                name: "offset",
                options: { offset: [0, 5]},
            }],
        });

        return {
            update: (visible) => {
                if (visible) popperInstance.update();
            },
            destroy: () => {
                popperInstance.destroy();
            },
        };
    }

    function handleDocumentClick(popup) {
        const reference = popup.previousElementSibling;

        reference.addEventListener("click", () => {
            if (visible) {
                document.addEventListener("click", hideIfExternalClick, true);
                visible = false;
            } else {
                document.removeEventListener("click", hideIfExternalClick);
                visible = true;
            }
        });

        function hideIfExternalClick(event) {
            if (visible && !reference.contains(event.target)) {
                visible = false;
            }
        }

        return {
            destroy: () => {
                document.removeEventListener("click", hideIfExternalClick);
            },
        };
    }
</script>

<slot name="button"/>
<div class="berry-dropdown-menu" use:createPopup={visible}
    use:handleDocumentClick class:visible>
    <slot></slot>
</div>

<style>
    .berry-dropdown-menu {
        display: none;
        background-color: var(--br-white);
        border-radius: var(--br-border-radius);
        outline: none;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        z-index: 100;
        overflow: hidden;
    }
    .berry-dropdown-menu.visible {
        display: block;
    }
</style>
