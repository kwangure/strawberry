(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Icon = factory());
}(this, (function () { 'use strict';

    function noop() { }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function claim_element(nodes, name, attributes, svg) {
        for (let i = 0; i < nodes.length; i += 1) {
            const node = nodes[i];
            if (node.nodeName === name) {
                for (let j = 0; j < node.attributes.length; j += 1) {
                    const attribute = node.attributes[j];
                    if (!attributes[attribute.name])
                        node.removeAttribute(attribute.name);
                }
                return nodes.splice(i, 1)[0]; // TODO strip unwanted attributes
            }
        }
        return svg ? svg_element(name) : element(name);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            callbacks.slice().forEach(fn => fn(event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            $$.fragment && $$.fragment.p($$.ctx, $$.dirty);
            $$.dirty = [-1];
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, value = ret) => {
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    /* js/components/Icon.svelte generated by Svelte v3.16.4 */

    function add_css() {
    	var style = element("style");
    	style.id = "svelte-638rev-style";
    	style.textContent = "svg.horizontal.svelte-638rev{transform:scale(-1, 1)\n    }svg.vertical.svelte-638rev{transform:scale(1, -1)\n    }svg.clockwise.svelte-638rev{-webkit-animation:svelte-638rev-clockwise 2s infinite linear;animation:svelte-638rev-clockwise 2s infinite linear}@-webkit-keyframes svelte-638rev-clockwise{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes svelte-638rev-clockwise{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}svg.counterclockwise.svelte-638rev{-webkit-animation:svelte-638rev-counterclockwise 2s infinite linear;animation:svelte-638rev-counterclockwise 2s infinite linear}@-webkit-keyframes svelte-638rev-counterclockwise{0%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}100%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}}@keyframes svelte-638rev-counterclockwise{0%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}100%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}}";
    	append(document.head, style);
    }

    function create_fragment(ctx) {
    	let svg;
    	let path_1;
    	let svg_height_value;
    	let svg_width_value;
    	let dispose;

    	return {
    		c() {
    			svg = svg_element("svg");
    			path_1 = svg_element("path");
    			this.h();
    		},
    		l(nodes) {
    			svg = claim_element(
    				nodes,
    				"svg",
    				{
    					height: true,
    					viewBox: true,
    					width: true,
    					class: true
    				},
    				1
    			);

    			var svg_nodes = children(svg);
    			path_1 = claim_element(svg_nodes, "path", { d: true, fill: true }, 1);
    			children(path_1).forEach(detach);
    			svg_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(path_1, "d", /*path*/ ctx[1]);
    			attr(path_1, "fill", "currentColor");
    			attr(svg, "height", svg_height_value = "" + (/*size*/ ctx[0] + "px"));
    			attr(svg, "viewBox", "0 0 24 24");
    			attr(svg, "width", svg_width_value = "" + (/*size*/ ctx[0] + "px"));
    			attr(svg, "class", "svelte-638rev");
    			toggle_class(svg, "horizontal", /*horizontal*/ ctx[2]);
    			toggle_class(svg, "vertical", /*vertical*/ ctx[3]);
    			toggle_class(svg, "clockwise", /*clockwise*/ ctx[4]);
    			toggle_class(svg, "counterclockwise", /*counterclockwise*/ ctx[5]);

    			dispose = [
    				listen(svg, "click", /*click_handler*/ ctx[9]),
    				listen(svg, "dblclick", /*dblclick_handler*/ ctx[10])
    			];
    		},
    		m(target, anchor) {
    			insert(target, svg, anchor);
    			append(svg, path_1);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*path*/ 2) {
    				attr(path_1, "d", /*path*/ ctx[1]);
    			}

    			if (dirty[0] & /*size*/ 1 && svg_height_value !== (svg_height_value = "" + (/*size*/ ctx[0] + "px"))) {
    				attr(svg, "height", svg_height_value);
    			}

    			if (dirty[0] & /*size*/ 1 && svg_width_value !== (svg_width_value = "" + (/*size*/ ctx[0] + "px"))) {
    				attr(svg, "width", svg_width_value);
    			}

    			if (dirty[0] & /*horizontal*/ 4) {
    				toggle_class(svg, "horizontal", /*horizontal*/ ctx[2]);
    			}

    			if (dirty[0] & /*vertical*/ 8) {
    				toggle_class(svg, "vertical", /*vertical*/ ctx[3]);
    			}

    			if (dirty[0] & /*clockwise*/ 16) {
    				toggle_class(svg, "clockwise", /*clockwise*/ ctx[4]);
    			}

    			if (dirty[0] & /*counterclockwise*/ 32) {
    				toggle_class(svg, "counterclockwise", /*counterclockwise*/ ctx[5]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(svg);
    			run_all(dispose);
    		}
    	};
    }

    function validSpin(spin) {
    	return spin === "clockwise" || spin === "counterclockwise";
    }

    function instance($$self, $$props, $$invalidate) {
    	let { size = 24 } = $$props;
    	let { path = "" } = $$props;
    	let { flip = "" } = $$props;
    	let { spin = "" } = $$props;

    	function validFlip(spin) {
    		return flip === "horizontal" || flip === "vertical";
    	}

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	function dblclick_handler(event) {
    		bubble($$self, event);
    	}

    	$$self.$set = $$props => {
    		if ("size" in $$props) $$invalidate(0, size = $$props.size);
    		if ("path" in $$props) $$invalidate(1, path = $$props.path);
    		if ("flip" in $$props) $$invalidate(6, flip = $$props.flip);
    		if ("spin" in $$props) $$invalidate(7, spin = $$props.spin);
    	};

    	let horizontal;
    	let vertical;
    	let clockwise;
    	let counterclockwise;

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*flip*/ 64) {
    			 $$invalidate(2, horizontal = validFlip() && flip === "horizontal");
    		}

    		if ($$self.$$.dirty[0] & /*flip*/ 64) {
    			 $$invalidate(3, vertical = validFlip() && flip === "vertical");
    		}

    		if ($$self.$$.dirty[0] & /*spin*/ 128) {
    			 $$invalidate(4, clockwise = validSpin(spin) && spin === "clockwise");
    		}

    		if ($$self.$$.dirty[0] & /*spin*/ 128) {
    			 $$invalidate(5, counterclockwise = validSpin(spin) && spin === "counterclockwise");
    		}
    	};

    	return [
    		size,
    		path,
    		horizontal,
    		vertical,
    		clockwise,
    		counterclockwise,
    		flip,
    		spin,
    		validFlip,
    		click_handler,
    		dblclick_handler
    	];
    }

    class Icon extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-638rev-style")) add_css();
    		init(this, options, instance, create_fragment, safe_not_equal, { size: 0, path: 1, flip: 6, spin: 7 });
    	}

    	get size() {
    		return this.$$.ctx[0];
    	}

    	set size(size) {
    		this.$set({ size });
    		flush();
    	}

    	get path() {
    		return this.$$.ctx[1];
    	}

    	set path(path) {
    		this.$set({ path });
    		flush();
    	}

    	get flip() {
    		return this.$$.ctx[6];
    	}

    	set flip(flip) {
    		this.$set({ flip });
    		flush();
    	}

    	get spin() {
    		return this.$$.ctx[7];
    	}

    	set spin(spin) {
    		this.$set({ spin });
    		flush();
    	}
    }

    return Icon;

})));
//# sourceMappingURL=Icon.js.map
