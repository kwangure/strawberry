<script context="module">
    export const docs = true;
</script>

<script>
    import { createEventForwarder } from "../../utils/forward-events.js";

    const forward = createEventForwarder();

    export let checked = false;
    export let disabled = false;

    function getStyle(element, prop) {
        const computedStylesheet = window.getComputedStyle(element);
        return parseInt(computedStylesheet.getPropertyValue(prop));
    }

    function getPseudoStyle(element, prop) {
        const computedStylesheet = window.getComputedStyle(element, ":before");
        return parseInt(computedStylesheet.getPropertyValue(prop));
    }

    function drag(input) {
        let isDragging = false;
        let recentlyDragged = false;
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

        input.addEventListener("pointerdown", dragInit);
        input.addEventListener("pointerup", dragEnd);
        input.addEventListener("click", preventBlubbling);

        window.addEventListener("pointerup", dragEnd);

        function dragInit() {
            if (input.disabled) return;

            isDragging = true;

            input.addEventListener("pointermove", dragging);
            input.style.setProperty("--thumb-transition-duration", "0s");
        }

        function dragEnd() {
            if (isDragging !== true) return;

            input.checked = determineChecked();

            if (input.indeterminate) {
                input.indeterminate = false;
            }

            input.style.removeProperty("--thumb-transition-duration");
            input.style.removeProperty("--thumb-position");
            input.removeEventListener("pointermove", dragging);

            isDragging = false;

            padRelease();
        }

        function dragging(event) {
            if (isDragging !== true) return;

            const directionality = getStyle(input, "--isLTR");
            const track
            = directionality === -1
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

        function padRelease() {
            recentlyDragged = true;

            setTimeout((_) => (recentlyDragged = false), 300);
        }

        function preventBlubbling(event) {
            if (recentlyDragged) {
                event.preventDefault();
                event.stopPropagation();
            }
        }

        return {
            destroy() {
                input.removeEventListener("pointerdown", dragInit);
                input.removeEventListener("pointerup", dragEnd);
                input.removeEventListener("click", preventBlubbling);

                window.removeEventListener("pointerup", dragEnd);
            },
        };
    }
</script>

<label>
    <slot/>
    <input type="checkbox" bind:checked disabled="{disabled}" role="switch"
        use:drag use:forward/>
</label>

<style>
    :export {
        --br-switch-flex-direction: ;
    }

    label {
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

    label:dir(rtl) {
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
