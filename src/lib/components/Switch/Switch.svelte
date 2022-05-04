<script context="module">
    export const docs = true;
</script>

<script>
    import { createEventForwarder } from "../../utils/forward-events.js";
    import { listen } from "svelte/internal";

    const forward = createEventForwarder();

    /**
	 * Whether the switch is checked
	 *
	 * @type {boolean | "indeterminate"}
	 */
    export let checked = false;
    /**
     * When true, prevents the user from interacting with the switch.
     *
     * @type {boolean}
     */
    export let disabled = false;
    /**
     * The name of the switch. Submitted with its parent form as part of a name/value pair.
     *
     * @type {string}
     */
    export let name = undefined;
    /**
     * When true, indicates that the user must check the switch before the parent form can be submitted.
     *
     * @type {boolean}
     */
    export let required = undefined;
    /**
     * The value given as data when submitted with a name.
     *
     * @type {string}
     */
    export let value = "on";

    function getStyle(element, prop) {
        const computedStylesheet = window.getComputedStyle(element);
        return parseInt(computedStylesheet.getPropertyValue(prop));
    }

    function getPseudoStyle(element, prop) {
        const computedStylesheet = window.getComputedStyle(element, ":before");
        return parseInt(computedStylesheet.getPropertyValue(prop));
    }

    /**
     *
     * @param {FocusEvent} event
     */
    function handleFocus(event) {
        const removeKeydownHandler = listen(event.currentTarget, "keydown", (event) => {
            if (event.code === "Enter") {
                event.currentTarget.checked = !event.currentTarget.checked;
            }
        });

        const removeBlurHandler= listen(event.currentTarget, "blur", () => {
            removeKeydownHandler();
            removeBlurHandler();
        });
    }

    /**
     * Toggle switch by dragging
     *
     * @param {HTMLInputElement} input
     */
    function drag(input) {
        let thumbsize = 0;
        let padding = 0;
        let bounds = {
            lower: 0,
            middle: 0,
            upper: 0,
        };

        thumbsize = getPseudoStyle(input, "width");
        padding
        = getStyle(input, "padding-left") + getStyle(input, "padding-right");

        bounds = {
            lower: 0,
            middle: (input.clientWidth - padding) / 4,
            upper: input.clientWidth - thumbsize - padding,
        };

        const removePointerDownHandler = listen(input, "pointerdown", dragInit);
        const removeFocusHandler = listen(input, "focus", handleFocus);

        function dragInit(pointerDown) {
            if (input.disabled) return;
            input.style.setProperty("--thumb-transition-duration", "0s");
            const removePointerMoveHandler = listen(input, "pointermove", dragging);
            const removePointerUpHandler = listen(window, "pointerup", function click(pointerUp) {
                try {
                    const tapTime = pointerUp.timeStamp - pointerDown.timeStamp;
                    const isClick = (tapTime < 300)
                        || (
                            Math.abs(pointerUp.clientX - pointerDown.clientX) < 5
                            && Math.abs(pointerUp.clientY - pointerDown.clientY) < 5
                        );
                    if (isClick) return;
                    // prevent race with change event which happens after pointerup
                    const dragResult = determineChecked();

                    // If mouse is outside input after drag, change will not fire, we update checked on pointerup
                    // If mouse is within input after drag, change will fire and overwrite our pointerup write
                    // So we rerun update after on change as well
                    if (pointerUp.target === input) {
                        const removeChangeHandler = listen(input, "change", () => {
                            input.checked = dragResult;
                            removeChangeHandler();
                        });
                    }

                    checked = dragResult;
                    input.checked = dragResult;
                    input.style.removeProperty("--thumb-transition-duration");
                    input.style.removeProperty("--thumb-position");
                } finally {
                    removePointerMoveHandler();
                    removePointerUpHandler();
                }
            });
        }

        function dragging(event) {
            const directionality = getStyle(input, "--isLTR");
            const track = directionality === -1
                ? (input.clientWidth * -1) + thumbsize + padding
                : 0;

            let pos = Math.round(event.offsetX - (thumbsize / 2));
            if (pos < bounds.lower) {
                pos = 0;
            }
            if (pos > bounds.upper) {
                pos = bounds.upper;
            }

            input.style.setProperty("--thumb-position", `${track + pos}px`);
        }

        function determineChecked() {
            let curpos = Math.abs(parseInt(input.style.getPropertyValue("--thumb-position")));

            if (!curpos) {
                curpos = input.checked ? bounds.lower : bounds.upper;
            }

            return curpos >= bounds.middle;
        }

        return {
            destroy() {
                removePointerDownHandler();
                removeFocusHandler();
            },
        };
    }

</script>

<div>
    {#if $$slots.default}
        <label for="berry-switch"><slot/></label>
    {/if}
    <input type="checkbox" id="berry-switch" disabled="{disabled}" {name} {required}
        role="switch" {value} on:focus={handleFocus} use:drag use:forward/>
</div>

<style>
    :export {
        --br-switch-flex-direction: ;
    }

    div {
        --thumb-size: 1.25rem;

        --track-size: calc(var(--thumb-size) * 2);
        --track-padding: 2px;

        --thumb-color: var(--thumb);
        --thumb-color-highlight: var(--thumb-highlight);
        --track-color-inactive: var(--track-inactive);
        --track-color-active: var(--track-active);

        --isLTR: 1;

        display: flex;
        align-items: center;
        gap: 2ch;
        justify-content: space-between;

        cursor: pointer;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
    }

    div:dir(rtl) {
        --isLTR: -1;
    }

    @media (theme: berry) and (prefers-color-scheme: light) {
        :scope {
            --thumb: hsl(0 0% 105%);
            --thumb-highlight: hsl(0 0% 0% / 25%);
            --track-inactive: hsl(80 0% 80%);
            --track-active: hsl(225deg 100% 45%);
        }
    }

    @media (theme: berry) and (prefers-color-scheme: dark) {
        :scope {
            --thumb: hsl(0 0% 100%);
            --thumb-highlight: hsl(0 0% 100% / 25%);
            --track-inactive: hsl(80 0% 35%);
            --track-active: hsl(225deg 100% 65%);
        }
    }

    input {
        --thumb-position: 0%;
        --thumb-transition-duration: 0.25s;
    }

    input {
        padding: var(--track-padding);
        background: var(--track-color-inactive);
        inline-size: var(--track-size);
        block-size: var(--thumb-size);
        border-radius: var(--track-size);

        appearance: none;
        pointer-events: none;
        touch-action: pan-y;
        border: none;
        outline-offset: 5px;
        box-sizing: content-box;

        flex-shrink: 0;
        display: grid;
        align-items: center;
        grid: [track] 1fr / [track] 1fr;

        transition: background-color 0.25s ease;
    }

    input::before {
        --highlight-size: 0;

        content: "";
        cursor: pointer;
        pointer-events: auto;
        grid-area: track;
        inline-size: var(--thumb-size);
        block-size: var(--thumb-size);
        background: var(--thumb-color);
        box-shadow: 0 0 0 var(--highlight-size) var(--thumb-color-highlight);
        border-radius: 50%;
        transform: translateX(var(--thumb-position));

        /* TODO: @media (prefers-reduced-motion: ...); */
        transition: transform var(--thumb-transition-duration) ease,
            box-shadow 0.25s ease;
        transform: translateX(var(--thumb-position));
    }

    input::after {
        content: "";
        cursor: pointer;
        pointer-events: auto;
        grid-area: track;
        block-size: var(--thumb-size);
    }

    input:not(:disabled):hover::before {
        --highlight-size: 0.5rem;
    }

    input:checked {
        background: var(--track-color-active);
        --thumb-position: calc((var(--track-size) - 100%) * var(--isLTR));
    }

    input:indeterminate {
        --thumb-position: calc(
            calc(calc(var(--track-size) / 2) - calc(var(--thumb-size) / 2)) *
                var(--isLTR)
        );
    }
</style>
