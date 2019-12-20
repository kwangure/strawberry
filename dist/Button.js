(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Button = factory());
}(this, (function () { 'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
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
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty) {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return lets;
        }
        return $$scope.dirty;
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
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
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
    function claim_text(nodes, data) {
        for (let i = 0; i < nodes.length; i += 1) {
            const node = nodes[i];
            if (node.nodeType === 3) {
                node.data = '' + data;
                return nodes.splice(i, 1)[0];
            }
        }
        return text(data);
    }
    function claim_space(nodes) {
        return claim_text(nodes, ' ');
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.data !== data)
            text.data = data;
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
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function claim_component(block, parent_nodes) {
        block && block.l(parent_nodes);
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
    	let path_1_fill_value;
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
    			attr(path_1, "fill", path_1_fill_value = /*color*/ ctx[2] || "currentColor");
    			attr(svg, "height", svg_height_value = "" + (/*size*/ ctx[0] + "px"));
    			attr(svg, "viewBox", "0 0 24 24");
    			attr(svg, "width", svg_width_value = "" + (/*size*/ ctx[0] + "px"));
    			attr(svg, "class", "svelte-638rev");
    			toggle_class(svg, "horizontal", /*horizontal*/ ctx[3]);
    			toggle_class(svg, "vertical", /*vertical*/ ctx[4]);
    			toggle_class(svg, "clockwise", /*clockwise*/ ctx[5]);
    			toggle_class(svg, "counterclockwise", /*counterclockwise*/ ctx[6]);

    			dispose = [
    				listen(svg, "click", /*click_handler*/ ctx[10]),
    				listen(svg, "dblclick", /*dblclick_handler*/ ctx[11])
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

    			if (dirty[0] & /*color*/ 4 && path_1_fill_value !== (path_1_fill_value = /*color*/ ctx[2] || "currentColor")) {
    				attr(path_1, "fill", path_1_fill_value);
    			}

    			if (dirty[0] & /*size*/ 1 && svg_height_value !== (svg_height_value = "" + (/*size*/ ctx[0] + "px"))) {
    				attr(svg, "height", svg_height_value);
    			}

    			if (dirty[0] & /*size*/ 1 && svg_width_value !== (svg_width_value = "" + (/*size*/ ctx[0] + "px"))) {
    				attr(svg, "width", svg_width_value);
    			}

    			if (dirty[0] & /*horizontal*/ 8) {
    				toggle_class(svg, "horizontal", /*horizontal*/ ctx[3]);
    			}

    			if (dirty[0] & /*vertical*/ 16) {
    				toggle_class(svg, "vertical", /*vertical*/ ctx[4]);
    			}

    			if (dirty[0] & /*clockwise*/ 32) {
    				toggle_class(svg, "clockwise", /*clockwise*/ ctx[5]);
    			}

    			if (dirty[0] & /*counterclockwise*/ 64) {
    				toggle_class(svg, "counterclockwise", /*counterclockwise*/ ctx[6]);
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
    	let { color = "" } = $$props;

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
    		if ("flip" in $$props) $$invalidate(7, flip = $$props.flip);
    		if ("spin" in $$props) $$invalidate(8, spin = $$props.spin);
    		if ("color" in $$props) $$invalidate(2, color = $$props.color);
    	};

    	let horizontal;
    	let vertical;
    	let clockwise;
    	let counterclockwise;

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*flip*/ 128) {
    			 $$invalidate(3, horizontal = validFlip() && flip === "horizontal");
    		}

    		if ($$self.$$.dirty[0] & /*flip*/ 128) {
    			 $$invalidate(4, vertical = validFlip() && flip === "vertical");
    		}

    		if ($$self.$$.dirty[0] & /*spin*/ 256) {
    			 $$invalidate(5, clockwise = validSpin(spin) && spin === "clockwise");
    		}

    		if ($$self.$$.dirty[0] & /*spin*/ 256) {
    			 $$invalidate(6, counterclockwise = validSpin(spin) && spin === "counterclockwise");
    		}
    	};

    	return [
    		size,
    		path,
    		color,
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

    		init(this, options, instance, create_fragment, safe_not_equal, {
    			size: 0,
    			path: 1,
    			flip: 7,
    			spin: 8,
    			color: 2
    		});
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
    		return this.$$.ctx[7];
    	}

    	set flip(flip) {
    		this.$set({ flip });
    		flush();
    	}

    	get spin() {
    		return this.$$.ctx[8];
    	}

    	set spin(spin) {
    		this.$set({ spin });
    		flush();
    	}

    	get color() {
    		return this.$$.ctx[2];
    	}

    	set color(color) {
    		this.$set({ color });
    		flush();
    	}
    }

    // Material Design Icons v4.2.95
    var mdiLoading = "M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z";

    /* js/components/Button/Button.svelte generated by Svelte v3.16.4 */

    function add_css$1() {
    	var style = element("style");
    	style.id = "svelte-1c4u4uz-style";
    	style.textContent = "button.svelte-1c4u4uz{line-height:1.5;position:relative;display:inline-block;font-weight:400;white-space:nowrap;text-align:center;border:1px solid transparent;cursor:pointer;transition:all .3s cubic-bezier(.645, .045, .355, 1);user-select:none;touch-action:manipulation;height:35px;padding:0 10px;font-size:14px;border-radius:4px;color:rgba(0,0,0,0.65);background-color:transparent;border-color:#d9d9d9;outline:none}button.fullwidth.svelte-1c4u4uz{width:100%}button.svelte-1c4u4uz .content-wrapper.svelte-1c4u4uz{display:flex;align-items:center;justify-content:center;line-height:1.2}button.primary.svelte-1c4u4uz{color:#fff;background-color:#1870ff;border:none}button.primary.svelte-1c4u4uz:active,button.primary.svelte-1c4u4uz:hover{color:#fff;background-color:#2981ff}button.none.svelte-1c4u4uz{border:none}button.none.svelte-1c4u4uz:active,button.none.svelte-1c4u4uz:hover{background-color:#e8f0fe;color:#1870ff}.button-prefix.svelte-1c4u4uz{display:flex;padding-right:2px}button.icon.svelte-1c4u4uz{padding-right:16px}button.loading.svelte-1c4u4uz{cursor:disabled}button.loading.svelte-1c4u4uz:after{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;background-color:#fff;opacity:.6;cursor:disabled;z-index:2}.loading-spinner.svelte-1c4u4uz{position:absolute;display:none;top:50%;transform:translateY(-50%);left:50%;transform:translateX(-50%);z-index:2;font-size:22px;animation:svelte-1c4u4uz-spin 1s infinite linear;color:#444;z-index:3}@keyframes svelte-1c4u4uz-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.visible.svelte-1c4u4uz{display:block}button.active.svelte-1c4u4uz,button.svelte-1c4u4uz:hover{color:#2981ff;background-color:#fff;border-color:#2981ff}";
    	append(document.head, style);
    }

    // (19:8) {#if icon}
    function create_if_block_1(ctx) {
    	let span;
    	let current;
    	const icon_1_spread_levels = [{ path: /*icon*/ ctx[2] }, /*iconProps*/ ctx[3]];
    	let icon_1_props = {};

    	for (let i = 0; i < icon_1_spread_levels.length; i += 1) {
    		icon_1_props = assign(icon_1_props, icon_1_spread_levels[i]);
    	}

    	const icon_1 = new Icon({ props: icon_1_props });

    	return {
    		c() {
    			span = element("span");
    			create_component(icon_1.$$.fragment);
    			this.h();
    		},
    		l(nodes) {
    			span = claim_element(nodes, "SPAN", { class: true });
    			var span_nodes = children(span);
    			claim_component(icon_1.$$.fragment, span_nodes);
    			span_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(span, "class", "button-prefix svelte-1c4u4uz");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			mount_component(icon_1, span, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const icon_1_changes = (dirty[0] & /*icon, iconProps*/ 12)
    			? get_spread_update(icon_1_spread_levels, [
    					dirty[0] & /*icon*/ 4 && ({ path: /*icon*/ ctx[2] }),
    					dirty[0] & /*iconProps*/ 8 && get_spread_object(/*iconProps*/ ctx[3])
    				])
    			: {};

    			icon_1.$set(icon_1_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(icon_1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(icon_1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			destroy_component(icon_1);
    		}
    	};
    }

    // (24:8) {#if loading}
    function create_if_block(ctx) {
    	let span;
    	let span_class_value;
    	let current;
    	const icon_1 = new Icon({ props: { path: mdiLoading } });

    	return {
    		c() {
    			span = element("span");
    			create_component(icon_1.$$.fragment);
    			this.h();
    		},
    		l(nodes) {
    			span = claim_element(nodes, "SPAN", { class: true });
    			var span_nodes = children(span);
    			claim_component(icon_1.$$.fragment, span_nodes);
    			span_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(span, "class", span_class_value = "loading-spinner " + (/*loading*/ ctx[5] ? "visible" : "") + " svelte-1c4u4uz");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			mount_component(icon_1, span, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			if (!current || dirty[0] & /*loading*/ 32 && span_class_value !== (span_class_value = "loading-spinner " + (/*loading*/ ctx[5] ? "visible" : "") + " svelte-1c4u4uz")) {
    				attr(span, "class", span_class_value);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(icon_1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(icon_1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			destroy_component(icon_1);
    		}
    	};
    }

    function create_fragment$1(ctx) {
    	let button;
    	let div;
    	let t0;
    	let t1;
    	let button_class_value;
    	let current;
    	let dispose;
    	let if_block0 = /*icon*/ ctx[2] && create_if_block_1(ctx);
    	let if_block1 = /*loading*/ ctx[5] && create_if_block(ctx);
    	const default_slot_template = /*$$slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

    	return {
    		c() {
    			button = element("button");
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			if (default_slot) default_slot.c();
    			this.h();
    		},
    		l(nodes) {
    			button = claim_element(nodes, "BUTTON", { class: true });
    			var button_nodes = children(button);
    			div = claim_element(button_nodes, "DIV", { class: true });
    			var div_nodes = children(div);
    			if (if_block0) if_block0.l(div_nodes);
    			t0 = claim_space(div_nodes);
    			if (if_block1) if_block1.l(div_nodes);
    			t1 = claim_space(div_nodes);
    			if (default_slot) default_slot.l(div_nodes);
    			div_nodes.forEach(detach);
    			button_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(div, "class", "content-wrapper svelte-1c4u4uz");
    			attr(button, "class", button_class_value = "" + ((/*color*/ ctx[1] ? /*color*/ ctx[1] : "") + " " + /*className*/ ctx[0] + " svelte-1c4u4uz"));
    			toggle_class(button, "icon", /*icon*/ ctx[2]);
    			toggle_class(button, "loading", /*loading*/ ctx[5]);
    			toggle_class(button, "fullwidth", /*fullwidth*/ ctx[6]);
    			toggle_class(button, "active", /*active*/ ctx[4]);

    			dispose = [
    				listen(button, "click", /*click_handler*/ ctx[9]),
    				listen(button, "hover", /*hover_handler*/ ctx[10]),
    				listen(button, "mouseover", /*mouseover_handler*/ ctx[11]),
    				listen(button, "mouseout", /*mouseout_handler*/ ctx[12])
    			];
    		},
    		m(target, anchor) {
    			insert(target, button, anchor);
    			append(button, div);
    			if (if_block0) if_block0.m(div, null);
    			append(div, t0);
    			if (if_block1) if_block1.m(div, null);
    			append(div, t1);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (/*icon*/ ctx[2]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    					transition_in(if_block0, 1);
    				} else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*loading*/ ctx[5]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    					transition_in(if_block1, 1);
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (default_slot && default_slot.p && dirty[0] & /*$$scope*/ 128) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[7], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, null));
    			}

    			if (!current || dirty[0] & /*color, className*/ 3 && button_class_value !== (button_class_value = "" + ((/*color*/ ctx[1] ? /*color*/ ctx[1] : "") + " " + /*className*/ ctx[0] + " svelte-1c4u4uz"))) {
    				attr(button, "class", button_class_value);
    			}

    			if (dirty[0] & /*color, className, icon*/ 7) {
    				toggle_class(button, "icon", /*icon*/ ctx[2]);
    			}

    			if (dirty[0] & /*color, className, loading*/ 35) {
    				toggle_class(button, "loading", /*loading*/ ctx[5]);
    			}

    			if (dirty[0] & /*color, className, fullwidth*/ 67) {
    				toggle_class(button, "fullwidth", /*fullwidth*/ ctx[6]);
    			}

    			if (dirty[0] & /*color, className, active*/ 19) {
    				toggle_class(button, "active", /*active*/ ctx[4]);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(button);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (default_slot) default_slot.d(detaching);
    			run_all(dispose);
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { class: className = "" } = $$props;
    	let { color = "" } = $$props;
    	let { icon = "" } = $$props;
    	let { iconProps = {} } = $$props;
    	let { active = "" } = $$props;
    	let { loading = false } = $$props;
    	let { fullwidth = false } = $$props;
    	let { $$slots = {}, $$scope } = $$props;

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	function hover_handler(event) {
    		bubble($$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble($$self, event);
    	}

    	function mouseout_handler(event) {
    		bubble($$self, event);
    	}

    	$$self.$set = $$props => {
    		if ("class" in $$props) $$invalidate(0, className = $$props.class);
    		if ("color" in $$props) $$invalidate(1, color = $$props.color);
    		if ("icon" in $$props) $$invalidate(2, icon = $$props.icon);
    		if ("iconProps" in $$props) $$invalidate(3, iconProps = $$props.iconProps);
    		if ("active" in $$props) $$invalidate(4, active = $$props.active);
    		if ("loading" in $$props) $$invalidate(5, loading = $$props.loading);
    		if ("fullwidth" in $$props) $$invalidate(6, fullwidth = $$props.fullwidth);
    		if ("$$scope" in $$props) $$invalidate(7, $$scope = $$props.$$scope);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*loading*/ 32) ;
    	};

    	return [
    		className,
    		color,
    		icon,
    		iconProps,
    		active,
    		loading,
    		fullwidth,
    		$$scope,
    		$$slots,
    		click_handler,
    		hover_handler,
    		mouseover_handler,
    		mouseout_handler
    	];
    }

    class Button extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-1c4u4uz-style")) add_css$1();

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			class: 0,
    			color: 1,
    			icon: 2,
    			iconProps: 3,
    			active: 4,
    			loading: 5,
    			fullwidth: 6
    		});
    	}

    	get class() {
    		return this.$$.ctx[0];
    	}

    	set class(className) {
    		this.$set({ class: className });
    		flush();
    	}

    	get color() {
    		return this.$$.ctx[1];
    	}

    	set color(color) {
    		this.$set({ color });
    		flush();
    	}

    	get icon() {
    		return this.$$.ctx[2];
    	}

    	set icon(icon) {
    		this.$set({ icon });
    		flush();
    	}

    	get iconProps() {
    		return this.$$.ctx[3];
    	}

    	set iconProps(iconProps) {
    		this.$set({ iconProps });
    		flush();
    	}

    	get active() {
    		return this.$$.ctx[4];
    	}

    	set active(active) {
    		this.$set({ active });
    		flush();
    	}

    	get loading() {
    		return this.$$.ctx[5];
    	}

    	set loading(loading) {
    		this.$set({ loading });
    		flush();
    	}

    	get fullwidth() {
    		return this.$$.ctx[6];
    	}

    	set fullwidth(fullwidth) {
    		this.$set({ fullwidth });
    		flush();
    	}
    }

    /* js/components/Button/Group.svelte generated by Svelte v3.16.4 */

    function add_css$2() {
    	var style = element("style");
    	style.id = "svelte-3soqv-style";
    	style.textContent = ".button-group.svelte-3soqv button{border-radius:0}.button-group.svelte-3soqv>button:first-child:not(:last-child),.button-group.svelte-3soqv>span:first-child:not(:last-child) > button{border-top-left-radius:4px;border-bottom-left-radius:4px}.button-group.svelte-3soqv>button:last-child:not(:first-child),.button-group.svelte-3soqv>span:last-child:not(:first-child) > button{border-top-right-radius:4px;border-bottom-right-radius:4px}.button-group.svelte-3soqv button + button,button+.button-group.svelte-3soqv,.button-group.svelte-3soqv span + button,.button-group.svelte-3soqv button + span,.button-group.svelte-3soqv>span + span,.button-group.svelte-3soqv+button,.button-group+.button-group.svelte-3soqv{margin-left:-1px}.button-group.svelte-3soqv>button,.button-group.svelte-3soqv>span > button{position:relative}.button-group.svelte-3soqv>button:hover,.button-group.svelte-3soqv>span > button:hover,.button-group.svelte-3soqv>button:focus,.button-group.svelte-3soqv>span > button:focus,.button-group.svelte-3soqv>button:active,.button-group.svelte-3soqv>span > button:active,.button-group.svelte-3soqv>button.active,.button-group.svelte-3soqv>span > button.active{z-index:2}";
    	append(document.head, style);
    }

    function create_fragment$2(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	return {
    		c() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			this.h();
    		},
    		l(nodes) {
    			div = claim_element(nodes, "DIV", { class: true });
    			var div_nodes = children(div);
    			if (default_slot) default_slot.l(div_nodes);
    			div_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(div, "class", "button-group svelte-3soqv");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (default_slot && default_slot.p && dirty[0] & /*$$scope*/ 1) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[0], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null));
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, $$slots];
    }

    class Group extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-3soqv-style")) add_css$2();
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});
    	}
    }

    /* js/components/Button/Tabs.svelte generated by Svelte v3.16.4 */

    function add_css$3() {
    	var style = element("style");
    	style.id = "svelte-1knqyjw-style";
    	style.textContent = ".tab-wrapper.svelte-1knqyjw{padding:5px 10px}.tab-header.svelte-1knqyjw,.tab-content.svelte-1knqyjw{padding:5px 10px}";
    	append(document.head, style);
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    // (9:0) {#if tabs.length > 0}
    function create_if_block$1(ctx) {
    	let div2;
    	let div0;
    	let t;
    	let div1;
    	let current;

    	const buttongroup = new Group({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			}
    		});

    	const switch_instance_spread_levels = [/*selected*/ ctx[1].props];
    	var switch_value = /*selected*/ ctx[1].component;

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return { props: switch_instance_props };
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    	}

    	return {
    		c() {
    			div2 = element("div");
    			div0 = element("div");
    			create_component(buttongroup.$$.fragment);
    			t = space();
    			div1 = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			this.h();
    		},
    		l(nodes) {
    			div2 = claim_element(nodes, "DIV", { class: true });
    			var div2_nodes = children(div2);
    			div0 = claim_element(div2_nodes, "DIV", { class: true });
    			var div0_nodes = children(div0);
    			claim_component(buttongroup.$$.fragment, div0_nodes);
    			div0_nodes.forEach(detach);
    			t = claim_space(div2_nodes);
    			div1 = claim_element(div2_nodes, "DIV", { class: true });
    			var div1_nodes = children(div1);
    			if (switch_instance) claim_component(switch_instance.$$.fragment, div1_nodes);
    			div1_nodes.forEach(detach);
    			div2_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(div0, "class", "tab-header svelte-1knqyjw");
    			attr(div1, "class", "tab-content svelte-1knqyjw");
    			attr(div2, "class", "tab-wrapper svelte-1knqyjw");
    		},
    		m(target, anchor) {
    			insert(target, div2, anchor);
    			append(div2, div0);
    			mount_component(buttongroup, div0, null);
    			append(div2, t);
    			append(div2, div1);

    			if (switch_instance) {
    				mount_component(switch_instance, div1, null);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			const buttongroup_changes = {};

    			if (dirty[0] & /*$$scope, tabs, selected*/ 67) {
    				buttongroup_changes.$$scope = { dirty, ctx };
    			}

    			buttongroup.$set(buttongroup_changes);

    			const switch_instance_changes = (dirty[0] & /*selected*/ 2)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*selected*/ ctx[1].props)])
    			: {};

    			if (switch_value !== (switch_value = /*selected*/ ctx[1].component)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div1, null);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(buttongroup.$$.fragment, local);
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(buttongroup.$$.fragment, local);
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div2);
    			destroy_component(buttongroup);
    			if (switch_instance) destroy_component(switch_instance);
    		}
    	};
    }

    // (14:20) <Button                          on:click={(event, index=i) => {selected = tabs[index] }}                         active={selected === tabs[i]}>
    function create_default_slot_1(ctx) {
    	let t0_value = /*tab*/ ctx[3].title + "";
    	let t0;
    	let t1;

    	return {
    		c() {
    			t0 = text(t0_value);
    			t1 = space();
    		},
    		l(nodes) {
    			t0 = claim_text(nodes, t0_value);
    			t1 = claim_space(nodes);
    		},
    		m(target, anchor) {
    			insert(target, t0, anchor);
    			insert(target, t1, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*tabs*/ 1 && t0_value !== (t0_value = /*tab*/ ctx[3].title + "")) set_data(t0, t0_value);
    		},
    		d(detaching) {
    			if (detaching) detach(t0);
    			if (detaching) detach(t1);
    		}
    	};
    }

    // (13:16) {#each tabs as tab, i}
    function create_each_block(ctx) {
    	let current;

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[2](/*i*/ ctx[5], ...args);
    	}

    	const button = new Button({
    			props: {
    				active: /*selected*/ ctx[1] === /*tabs*/ ctx[0][/*i*/ ctx[5]],
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			}
    		});

    	button.$on("click", function () {
    		click_handler.apply(this, arguments);
    	});

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		l(nodes) {
    			claim_component(button.$$.fragment, nodes);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;
    			const button_changes = {};
    			if (dirty[0] & /*selected, tabs*/ 3) button_changes.active = /*selected*/ ctx[1] === /*tabs*/ ctx[0][/*i*/ ctx[5]];

    			if (dirty[0] & /*$$scope, tabs*/ 65) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (12:12) <ButtonGroup>
    function create_default_slot(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*tabs*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	return {
    		c() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		l(nodes) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].l(nodes);
    			}

    			each_1_anchor = empty();
    		},
    		m(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*selected, tabs*/ 3) {
    				each_value = /*tabs*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach(each_1_anchor);
    		}
    	};
    }

    function create_fragment$3(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*tabs*/ ctx[0].length > 0 && create_if_block$1(ctx);

    	return {
    		c() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l(nodes) {
    			if (if_block) if_block.l(nodes);
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			if (/*tabs*/ ctx[0].length > 0) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { tabs = [] } = $$props;
    	let selected = tabs[0];

    	const click_handler = (i, event, index = i) => {
    		$$invalidate(1, selected = tabs[index]);
    	};

    	$$self.$set = $$props => {
    		if ("tabs" in $$props) $$invalidate(0, tabs = $$props.tabs);
    	};

    	return [tabs, selected, click_handler];
    }

    class Tabs extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-1knqyjw-style")) add_css$3();
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { tabs: 0 });
    	}

    	get tabs() {
    		return this.$$.ctx[0];
    	}

    	set tabs(tabs) {
    		this.$set({ tabs });
    		flush();
    	}
    }

    Button.Group    = Group;
    Button.Tabs     = Tabs;

    return Button;

})));
//# sourceMappingURL=Button.js.map
