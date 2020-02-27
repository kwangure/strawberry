import { cubicOut } from "svelte/easing";

export function assign(tar, src) {
    for (const k in src) {
        tar[k] = src[k];
    }
    return tar;
}

export function is_function(thing) {
    return typeof thing === "function";
}

// https://github.com/sveltejs/svelte/blob/master/src/runtime/transition/index.ts
// with added optional fading
export function crosstransition({ fallback, ...defaults }) {
    const to_receive = new Map();
    const to_send = new Map();

    function crosstransition(from, node, params) {
        const {
            delay = 0,
            duration = d => Math.sqrt(d) * 30,
            easing = cubicOut,
            fade = true,
        } = assign(assign({}, defaults), params);

        const to = node.getBoundingClientRect();
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        const dw = from.width / to.width;
        const dh = from.height / to.height;
        const d = Math.sqrt(dx * dx + dy * dy);

        const style = getComputedStyle(node);
        const transform = style.transform === "none" ? "" : style.transform;
        const opacity = +style.opacity;

        return {
            delay,
            duration: is_function(duration) ? duration(d) : duration,
            easing,
            css: (t, u) => `
				opacity: ${fade ? t * 1.5 * opacity : opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
			`
        };
    }

    function transition(items, counterparts, intro) {
        return (node, params) => {
            items.set(params.key, {
                rect: node.getBoundingClientRect()
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
        transition(to_send, to_receive, false),
        transition(to_receive, to_send, true)
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