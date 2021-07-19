import { cubicOut } from "svelte/easing";

export function assign(tar, src) {
    for (const k in src) {
        if ({}.hasOwnProperty.call(src, k)) {
            tar[k] = src[k];
        }
    }
    return tar;
}

export function isFunction(thing) {
    return typeof thing === "function";
}

// https://github.com/sveltejs/svelte/blob/master/src/runtime/transition/index.ts
// with added optional fading
export function crosstransition({ fallback, ...defaults }) {
    const toReceive = new Map();
    const toSend = new Map();

    function crosstransition(from, node, params) {
        const {
            delay = 0,
            duration = (d) => Math.sqrt(d) * 30,
            easing = cubicOut,
            fade = true,
        } = assign(assign({}, defaults), params);

        const to = node.getBoundingClientRect();
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        const dw = from.width / to.width;
        const dh = from.height / to.height;
        const d = Math.sqrt((dx * dx) + (dy * dy));

        const style = getComputedStyle(node);
        const transform = style.transform === "none" ? "" : style.transform;
        const opacity = Number(style.opacity);

        return {
            delay,
            duration: isFunction(duration) ? duration(d) : duration,
            easing,
            /* eslint-disable max-len */
            css: (t, u) => `
				opacity: ${fade ? t * 1.5 * opacity : opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + ((1 - t) * dw)}, ${t + ((1 - t) * dh)});
			`,
            /* eslint-enable max-len */
        };
    }

    function transition(items, counterparts, intro) {
        return (node, params) => {
            items.set(params.key, {
                rect: node.getBoundingClientRect(),
            });

            return () => {
                if (counterparts.has(params.key)) {
                    const { rect } = counterparts.get(params.key);
                    counterparts.delete(params.key);

                    return crosstransition(rect, node, params);
                }

                // if the node is disappearing altogether
                // (i.e. wasn't claimed by the other list)
                // then we need to supply an outro
                items.delete(params.key);
                return fallback && fallback(node, params, intro);
            };
        };
    }

    return [
        transition(toSend, toReceive, false),
        transition(toReceive, toSend, true),
    ];
}

const crossfade = crosstransition({
    duration: 300,
    fade: true,
});

const crossscale = crosstransition({
    duration: 300,
    fade: false,
});

export { crossfade, crossscale };
