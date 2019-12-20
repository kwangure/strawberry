(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Input = factory());
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
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function stop_propagation(fn) {
        return function (event) {
            event.stopPropagation();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? undefined : +value;
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
    function set_input_value(input, value) {
        if (value != null || input.value) {
            input.value = value;
        }
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

    /* js/components/Input/Input.svelte generated by Svelte v3.16.4 */

    function add_css$1() {
    	var style = element("style");
    	style.id = "svelte-lgadpo-style";
    	style.textContent = ".input-wrapper.svelte-lgadpo{display:inline-block;position:relative;width:100%;line-height:1.5}.input-wrapper.svelte-lgadpo{--vertical-padding:5px;--horizontal-padding:12px;--vertical-padding-focus:calc(var(--vertical-padding) - 1px);--horizontal-padding-focus:calc(var(--horizontal-padding) - 1px)}.input-prefix.svelte-lgadpo{position:absolute;top:52%;z-index:2;color:rgba(0,0,0,0.65);line-height:0;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);left:12px}input.svelte-lgadpo{text-align:inherit;display:inline-block;padding:var(--vertical-padding) var(--horizontal-padding);color:rgba(0,0,0,0.65);font-size:14px;line-height:1.5;background-color:#fff;background-image:none;border:1px solid #d9d9d9;border-radius:4px}input.svelte-lgadpo{width:100%;height:35px}input.svelte-lgadpo:hover{border-color:#aaa}input.svelte-lgadpo:focus{border:2px solid #1870ff;padding:var(--vertical-padding-focus) var(--horizontal-padding-focus);outline:0}.icon.svelte-lgadpo{padding-left:30px}.label.svelte-lgadpo{margin-bottom:5px}";
    	append(document.head, style);
    }

    // (13:4) {#if label}
    function create_if_block_1(ctx) {
    	let div;

    	let t_value = (/*label*/ ctx[2].length
    	? /*label*/ ctx[2]
    	: /*placeholder*/ ctx[3]) + "";

    	let t;

    	return {
    		c() {
    			div = element("div");
    			t = text(t_value);
    			this.h();
    		},
    		l(nodes) {
    			div = claim_element(nodes, "DIV", { class: true });
    			var div_nodes = children(div);
    			t = claim_text(div_nodes, t_value);
    			div_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(div, "class", "label svelte-lgadpo");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, t);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*label, placeholder*/ 12 && t_value !== (t_value = (/*label*/ ctx[2].length
    			? /*label*/ ctx[2]
    			: /*placeholder*/ ctx[3]) + "")) set_data(t, t_value);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (16:4) {#if icon}
    function create_if_block(ctx) {
    	let span;
    	let current;
    	const icon_1 = new Icon({ props: { path: /*icon*/ ctx[4] } });

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
    			attr(span, "class", "input-prefix svelte-lgadpo");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			mount_component(icon_1, span, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const icon_1_changes = {};
    			if (dirty[0] & /*icon*/ 16) icon_1_changes.path = /*icon*/ ctx[4];
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

    function create_fragment$1(ctx) {
    	let label_1;
    	let t0;
    	let t1;
    	let input;
    	let current;
    	let dispose;
    	let if_block0 = /*label*/ ctx[2] && create_if_block_1(ctx);
    	let if_block1 = /*icon*/ ctx[4] && create_if_block(ctx);

    	return {
    		c() {
    			label_1 = element("label");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			input = element("input");
    			this.h();
    		},
    		l(nodes) {
    			label_1 = claim_element(nodes, "LABEL", { class: true });
    			var label_1_nodes = children(label_1);
    			if (if_block0) if_block0.l(label_1_nodes);
    			t0 = claim_space(label_1_nodes);
    			if (if_block1) if_block1.l(label_1_nodes);
    			t1 = claim_space(label_1_nodes);

    			input = claim_element(label_1_nodes, "INPUT", {
    				autofocus: true,
    				disabled: true,
    				name: true,
    				placeholder: true,
    				type: true,
    				class: true
    			});

    			label_1_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			input.autofocus = /*autofocus*/ ctx[6];
    			input.disabled = /*disabled*/ ctx[5];
    			attr(input, "name", /*name*/ ctx[1]);
    			attr(input, "placeholder", /*placeholder*/ ctx[3]);
    			attr(input, "type", "text");
    			attr(input, "class", "svelte-lgadpo");
    			toggle_class(input, "icon", /*icon*/ ctx[4]);
    			attr(label_1, "class", "input-wrapper svelte-lgadpo");

    			dispose = [
    				listen(input, "input", /*input_input_handler*/ ctx[13]),
    				listen(input, "blur", /*blur_handler*/ ctx[7]),
    				listen(input, "change", /*change_handler*/ ctx[8]),
    				listen(input, "input", /*input_handler*/ ctx[9]),
    				listen(input, "keypress", /*keypress_handler*/ ctx[10]),
    				listen(input, "focus", /*focus_handler*/ ctx[11]),
    				listen(input, "keydown", /*keydown_handler*/ ctx[12])
    			];
    		},
    		m(target, anchor) {
    			insert(target, label_1, anchor);
    			if (if_block0) if_block0.m(label_1, null);
    			append(label_1, t0);
    			if (if_block1) if_block1.m(label_1, null);
    			append(label_1, t1);
    			append(label_1, input);
    			set_input_value(input, /*value*/ ctx[0]);
    			current = true;
    		},
    		p(ctx, dirty) {
    			if (/*label*/ ctx[2]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					if_block0.m(label_1, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*icon*/ ctx[4]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    					transition_in(if_block1, 1);
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(label_1, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty[0] & /*autofocus*/ 64) {
    				input.autofocus = /*autofocus*/ ctx[6];
    			}

    			if (!current || dirty[0] & /*disabled*/ 32) {
    				input.disabled = /*disabled*/ ctx[5];
    			}

    			if (!current || dirty[0] & /*name*/ 2) {
    				attr(input, "name", /*name*/ ctx[1]);
    			}

    			if (!current || dirty[0] & /*placeholder*/ 8) {
    				attr(input, "placeholder", /*placeholder*/ ctx[3]);
    			}

    			if (dirty[0] & /*value*/ 1 && input.value !== /*value*/ ctx[0]) {
    				set_input_value(input, /*value*/ ctx[0]);
    			}

    			if (dirty[0] & /*icon*/ 16) {
    				toggle_class(input, "icon", /*icon*/ ctx[4]);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block1);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(label_1);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			run_all(dispose);
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { name = "" } = $$props;
    	let { label = "" } = $$props;
    	let { placeholder = "" } = $$props;
    	let { icon = "" } = $$props;
    	let { value = "" } = $$props;
    	let { disabled = false } = $$props;
    	let { autofocus = false } = $$props;

    	function blur_handler(event) {
    		bubble($$self, event);
    	}

    	function change_handler(event) {
    		bubble($$self, event);
    	}

    	function input_handler(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler(event) {
    		bubble($$self, event);
    	}

    	function focus_handler(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler(event) {
    		bubble($$self, event);
    	}

    	function input_input_handler() {
    		value = this.value;
    		$$invalidate(0, value);
    	}

    	$$self.$set = $$props => {
    		if ("name" in $$props) $$invalidate(1, name = $$props.name);
    		if ("label" in $$props) $$invalidate(2, label = $$props.label);
    		if ("placeholder" in $$props) $$invalidate(3, placeholder = $$props.placeholder);
    		if ("icon" in $$props) $$invalidate(4, icon = $$props.icon);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("disabled" in $$props) $$invalidate(5, disabled = $$props.disabled);
    		if ("autofocus" in $$props) $$invalidate(6, autofocus = $$props.autofocus);
    	};

    	return [
    		value,
    		name,
    		label,
    		placeholder,
    		icon,
    		disabled,
    		autofocus,
    		blur_handler,
    		change_handler,
    		input_handler,
    		keypress_handler,
    		focus_handler,
    		keydown_handler,
    		input_input_handler
    	];
    }

    class Input extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-lgadpo-style")) add_css$1();

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			name: 1,
    			label: 2,
    			placeholder: 3,
    			icon: 4,
    			value: 0,
    			disabled: 5,
    			autofocus: 6
    		});
    	}

    	get name() {
    		return this.$$.ctx[1];
    	}

    	set name(name) {
    		this.$set({ name });
    		flush();
    	}

    	get label() {
    		return this.$$.ctx[2];
    	}

    	set label(label) {
    		this.$set({ label });
    		flush();
    	}

    	get placeholder() {
    		return this.$$.ctx[3];
    	}

    	set placeholder(placeholder) {
    		this.$set({ placeholder });
    		flush();
    	}

    	get icon() {
    		return this.$$.ctx[4];
    	}

    	set icon(icon) {
    		this.$set({ icon });
    		flush();
    	}

    	get value() {
    		return this.$$.ctx[0];
    	}

    	set value(value) {
    		this.$set({ value });
    		flush();
    	}

    	get disabled() {
    		return this.$$.ctx[5];
    	}

    	set disabled(disabled) {
    		this.$set({ disabled });
    		flush();
    	}

    	get autofocus() {
    		return this.$$.ctx[6];
    	}

    	set autofocus(autofocus) {
    		this.$set({ autofocus });
    		flush();
    	}
    }

    /* js/components/Input/Checkbox.svelte generated by Svelte v3.16.4 */

    function add_css$2() {
    	var style = element("style");
    	style.id = "svelte-1yjlybu-style";
    	style.textContent = ".input-wrapper.svelte-1yjlybu{display:inline-block;position:relative;line-height:inherit}input.svelte-1yjlybu{display:inline-block;line-height:1.5;-webkit-transition:all .3s;transition:all .3s}.label.svelte-1yjlybu{margin-bottom:5px}";
    	append(document.head, style);
    }

    // (12:4) {#if label}
    function create_if_block$1(ctx) {
    	let span;
    	let t;

    	return {
    		c() {
    			span = element("span");
    			t = text(/*label*/ ctx[2]);
    			this.h();
    		},
    		l(nodes) {
    			span = claim_element(nodes, "SPAN", { class: true });
    			var span_nodes = children(span);
    			t = claim_text(span_nodes, /*label*/ ctx[2]);
    			span_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(span, "class", "label svelte-1yjlybu");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			append(span, t);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*label*/ 4) set_data(t, /*label*/ ctx[2]);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    function create_fragment$2(ctx) {
    	let label_1;
    	let input;
    	let t;
    	let dispose;
    	let if_block = /*label*/ ctx[2] && create_if_block$1(ctx);

    	return {
    		c() {
    			label_1 = element("label");
    			input = element("input");
    			t = space();
    			if (if_block) if_block.c();
    			this.h();
    		},
    		l(nodes) {
    			label_1 = claim_element(nodes, "LABEL", { class: true });
    			var label_1_nodes = children(label_1);

    			input = claim_element(label_1_nodes, "INPUT", {
    				disabled: true,
    				name: true,
    				type: true,
    				class: true
    			});

    			t = claim_space(label_1_nodes);
    			if (if_block) if_block.l(label_1_nodes);
    			label_1_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			input.disabled = /*disabled*/ ctx[3];
    			attr(input, "name", /*name*/ ctx[1]);
    			attr(input, "type", "checkbox");
    			attr(input, "class", "svelte-1yjlybu");
    			attr(label_1, "class", "input-wrapper svelte-1yjlybu");

    			dispose = [
    				listen(input, "change", /*input_change_handler*/ ctx[9]),
    				listen(input, "blur", /*blur_handler*/ ctx[5]),
    				listen(input, "change", /*change_handler*/ ctx[6]),
    				listen(input, "input", /*input_handler*/ ctx[7]),
    				listen(input, "focus", /*focus_handler*/ ctx[8]),
    				listen(label_1, "click", /*click_handler*/ ctx[4])
    			];
    		},
    		m(target, anchor) {
    			insert(target, label_1, anchor);
    			append(label_1, input);
    			input.checked = /*checked*/ ctx[0];
    			append(label_1, t);
    			if (if_block) if_block.m(label_1, null);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*disabled*/ 8) {
    				input.disabled = /*disabled*/ ctx[3];
    			}

    			if (dirty[0] & /*name*/ 2) {
    				attr(input, "name", /*name*/ ctx[1]);
    			}

    			if (dirty[0] & /*checked*/ 1) {
    				input.checked = /*checked*/ ctx[0];
    			}

    			if (/*label*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(label_1, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(label_1);
    			if (if_block) if_block.d();
    			run_all(dispose);
    		}
    	};
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { name = "" } = $$props;
    	let { label = "" } = $$props;
    	let { checked = false } = $$props;
    	let { disabled = false } = $$props;

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	function blur_handler(event) {
    		bubble($$self, event);
    	}

    	function change_handler(event) {
    		bubble($$self, event);
    	}

    	function input_handler(event) {
    		bubble($$self, event);
    	}

    	function focus_handler(event) {
    		bubble($$self, event);
    	}

    	function input_change_handler() {
    		checked = this.checked;
    		$$invalidate(0, checked);
    	}

    	$$self.$set = $$props => {
    		if ("name" in $$props) $$invalidate(1, name = $$props.name);
    		if ("label" in $$props) $$invalidate(2, label = $$props.label);
    		if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
    		if ("disabled" in $$props) $$invalidate(3, disabled = $$props.disabled);
    	};

    	return [
    		checked,
    		name,
    		label,
    		disabled,
    		click_handler,
    		blur_handler,
    		change_handler,
    		input_handler,
    		focus_handler,
    		input_change_handler
    	];
    }

    class Checkbox extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-1yjlybu-style")) add_css$2();

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			name: 1,
    			label: 2,
    			checked: 0,
    			disabled: 3
    		});
    	}

    	get name() {
    		return this.$$.ctx[1];
    	}

    	set name(name) {
    		this.$set({ name });
    		flush();
    	}

    	get label() {
    		return this.$$.ctx[2];
    	}

    	set label(label) {
    		this.$set({ label });
    		flush();
    	}

    	get checked() {
    		return this.$$.ctx[0];
    	}

    	set checked(checked) {
    		this.$set({ checked });
    		flush();
    	}

    	get disabled() {
    		return this.$$.ctx[3];
    	}

    	set disabled(disabled) {
    		this.$set({ disabled });
    		flush();
    	}
    }

    // Material Design Icons v4.2.95
    var mdiChevronDown = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";
    var mdiChevronUp = "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z";

    /* js/components/Input/Number.svelte generated by Svelte v3.16.4 */

    function add_css$3() {
    	var style = element("style");
    	style.id = "svelte-1rceuta-style";
    	style.textContent = ".input-wrapper.svelte-1rceuta{display:inline-block;position:relative;width:100%;line-height:1.5}.input-wrapper.svelte-1rceuta{--vertical-padding:5px;--horizontal-padding:12px;--padding-right:25px;--vertical-padding-focus:calc(var(--vertical-padding) - 1px);--horizontal-padding-focus:calc(var(--horizontal-padding) - 1px);--padding-right-focus:calc(var(--padding-right) - 1px)}.input-prefix.svelte-1rceuta{position:absolute;top:52%;z-index:2;color:rgba(0,0,0,0.65);line-height:0;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);left:12px}input.svelte-1rceuta{text-align:inherit;display:inline-block;padding:var(--vertical-padding) var(--horizontal-padding);padding-right:var(--padding-right);color:rgba(0,0,0,0.65);font-size:14px;line-height:1.5;background-color:#fff;background-image:none;border:1px solid #d9d9d9;border-radius:4px;width:100%;height:35px}input.svelte-1rceuta:hover{border-color:#aaa}input.svelte-1rceuta:focus{border:2px solid #1870ff;outline:0;padding:var(--vertical-padding-focus) var(--horizontal-padding-focus);padding-right:var(--padding-right-focus)}input[type=number].svelte-1rceuta::-webkit-inner-spin-button,input[type=number].svelte-1rceuta::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:none;appearance:none;margin:0}input.icon.svelte-1rceuta{padding-left:30px}.input-postfix.svelte-1rceuta{position:absolute;top:52%;right:6px;z-index:2;color:rgba(0,0,0,0.65);line-height:0;transform:translateY(-50%);display:flex;flex-direction:column}.postfix-up.svelte-1rceuta{margin-bottom:-3px}.postfix-down.svelte-1rceuta{margin-top:-3px}.label.svelte-1rceuta{margin-bottom:5px}";
    	append(document.head, style);
    }

    // (22:4) {#if label}
    function create_if_block_1$1(ctx) {
    	let div;

    	let t_value = (/*label*/ ctx[2].length
    	? /*label*/ ctx[2]
    	: /*placeholder*/ ctx[3]) + "";

    	let t;

    	return {
    		c() {
    			div = element("div");
    			t = text(t_value);
    			this.h();
    		},
    		l(nodes) {
    			div = claim_element(nodes, "DIV", { class: true });
    			var div_nodes = children(div);
    			t = claim_text(div_nodes, t_value);
    			div_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(div, "class", "label svelte-1rceuta");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, t);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*label, placeholder*/ 12 && t_value !== (t_value = (/*label*/ ctx[2].length
    			? /*label*/ ctx[2]
    			: /*placeholder*/ ctx[3]) + "")) set_data(t, t_value);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (25:4) {#if icon}
    function create_if_block$2(ctx) {
    	let span;
    	let current;
    	const icon_1 = new Icon({ props: { path: /*icon*/ ctx[4] } });

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
    			attr(span, "class", "input-prefix svelte-1rceuta");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			mount_component(icon_1, span, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const icon_1_changes = {};
    			if (dirty[0] & /*icon*/ 16) icon_1_changes.path = /*icon*/ ctx[4];
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

    function create_fragment$3(ctx) {
    	let label_1;
    	let t0;
    	let t1;
    	let input;
    	let input_updating = false;
    	let t2;
    	let div;
    	let span0;
    	let t3;
    	let span1;
    	let current;
    	let dispose;
    	let if_block0 = /*label*/ ctx[2] && create_if_block_1$1(ctx);
    	let if_block1 = /*icon*/ ctx[4] && create_if_block$2(ctx);

    	function input_input_handler() {
    		input_updating = true;
    		/*input_input_handler*/ ctx[17].call(input);
    	}

    	const icon0 = new Icon({ props: { path: mdiChevronUp, size: 21 } });

    	const icon1 = new Icon({
    			props: { path: mdiChevronDown, size: 21 }
    		});

    	return {
    		c() {
    			label_1 = element("label");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			input = element("input");
    			t2 = space();
    			div = element("div");
    			span0 = element("span");
    			create_component(icon0.$$.fragment);
    			t3 = space();
    			span1 = element("span");
    			create_component(icon1.$$.fragment);
    			this.h();
    		},
    		l(nodes) {
    			label_1 = claim_element(nodes, "LABEL", { class: true });
    			var label_1_nodes = children(label_1);
    			if (if_block0) if_block0.l(label_1_nodes);
    			t0 = claim_space(label_1_nodes);
    			if (if_block1) if_block1.l(label_1_nodes);
    			t1 = claim_space(label_1_nodes);

    			input = claim_element(label_1_nodes, "INPUT", {
    				autofocus: true,
    				disabled: true,
    				min: true,
    				max: true,
    				name: true,
    				placeholder: true,
    				readonly: true,
    				type: true,
    				class: true
    			});

    			t2 = claim_space(label_1_nodes);
    			div = claim_element(label_1_nodes, "DIV", { class: true });
    			var div_nodes = children(div);
    			span0 = claim_element(div_nodes, "SPAN", { class: true });
    			var span0_nodes = children(span0);
    			claim_component(icon0.$$.fragment, span0_nodes);
    			span0_nodes.forEach(detach);
    			t3 = claim_space(div_nodes);
    			span1 = claim_element(div_nodes, "SPAN", { class: true });
    			var span1_nodes = children(span1);
    			claim_component(icon1.$$.fragment, span1_nodes);
    			span1_nodes.forEach(detach);
    			div_nodes.forEach(detach);
    			label_1_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			input.autofocus = /*autofocus*/ ctx[10];
    			input.disabled = /*disabled*/ ctx[9];
    			attr(input, "min", /*min*/ ctx[5]);
    			attr(input, "max", /*max*/ ctx[6]);
    			attr(input, "name", /*name*/ ctx[1]);
    			attr(input, "placeholder", /*placeholder*/ ctx[3]);
    			input.readOnly = /*stepOnly*/ ctx[8];
    			attr(input, "type", "number");
    			attr(input, "class", "svelte-1rceuta");
    			toggle_class(input, "icon", /*icon*/ ctx[4]);
    			attr(span0, "class", "postfix-up svelte-1rceuta");
    			attr(span1, "class", "postfix-down svelte-1rceuta");
    			attr(div, "class", "input-postfix svelte-1rceuta");
    			attr(label_1, "class", "input-wrapper svelte-1rceuta");

    			dispose = [
    				listen(input, "input", input_input_handler),
    				listen(input, "blur", /*blur_handler*/ ctx[11]),
    				listen(input, "change", /*change_handler*/ ctx[12]),
    				listen(input, "change", /*change_handler_1*/ ctx[18]),
    				listen(input, "input", /*input_handler*/ ctx[13]),
    				listen(input, "keypress", /*keypress_handler*/ ctx[14]),
    				listen(input, "focus", /*focus_handler*/ ctx[15]),
    				listen(input, "keydown", /*keydown_handler*/ ctx[16]),
    				listen(span0, "click", stop_propagation(/*click_handler*/ ctx[19])),
    				listen(span1, "click", stop_propagation(/*click_handler_1*/ ctx[20]))
    			];
    		},
    		m(target, anchor) {
    			insert(target, label_1, anchor);
    			if (if_block0) if_block0.m(label_1, null);
    			append(label_1, t0);
    			if (if_block1) if_block1.m(label_1, null);
    			append(label_1, t1);
    			append(label_1, input);
    			set_input_value(input, /*value*/ ctx[0]);
    			append(label_1, t2);
    			append(label_1, div);
    			append(div, span0);
    			mount_component(icon0, span0, null);
    			append(div, t3);
    			append(div, span1);
    			mount_component(icon1, span1, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			if (/*label*/ ctx[2]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$1(ctx);
    					if_block0.c();
    					if_block0.m(label_1, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*icon*/ ctx[4]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    					transition_in(if_block1, 1);
    				} else {
    					if_block1 = create_if_block$2(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(label_1, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty[0] & /*autofocus*/ 1024) {
    				input.autofocus = /*autofocus*/ ctx[10];
    			}

    			if (!current || dirty[0] & /*disabled*/ 512) {
    				input.disabled = /*disabled*/ ctx[9];
    			}

    			if (!current || dirty[0] & /*min*/ 32) {
    				attr(input, "min", /*min*/ ctx[5]);
    			}

    			if (!current || dirty[0] & /*max*/ 64) {
    				attr(input, "max", /*max*/ ctx[6]);
    			}

    			if (!current || dirty[0] & /*name*/ 2) {
    				attr(input, "name", /*name*/ ctx[1]);
    			}

    			if (!current || dirty[0] & /*placeholder*/ 8) {
    				attr(input, "placeholder", /*placeholder*/ ctx[3]);
    			}

    			if (!current || dirty[0] & /*stepOnly*/ 256) {
    				input.readOnly = /*stepOnly*/ ctx[8];
    			}

    			if (!input_updating && dirty[0] & /*value*/ 1) {
    				set_input_value(input, /*value*/ ctx[0]);
    			}

    			input_updating = false;

    			if (dirty[0] & /*icon*/ 16) {
    				toggle_class(input, "icon", /*icon*/ ctx[4]);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block1);
    			transition_in(icon0.$$.fragment, local);
    			transition_in(icon1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block1);
    			transition_out(icon0.$$.fragment, local);
    			transition_out(icon1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(label_1);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			destroy_component(icon0);
    			destroy_component(icon1);
    			run_all(dispose);
    		}
    	};
    }

    function clamp(value, min, max) {
    	return Math.min(Math.max(value, min), max);
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { name = "" } = $$props;
    	let { label = "" } = $$props;
    	let { placeholder = "" } = $$props;
    	let { icon = "" } = $$props;
    	let { min = -Infinity } = $$props;
    	let { max = Infinity } = $$props;
    	let { value = 0 } = $$props;
    	let { step = 1 } = $$props;
    	let { stepOnly = false } = $$props;
    	let { disabled = false } = $$props;
    	let { autofocus = false } = $$props;

    	function blur_handler(event) {
    		bubble($$self, event);
    	}

    	function change_handler(event) {
    		bubble($$self, event);
    	}

    	function input_handler(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler(event) {
    		bubble($$self, event);
    	}

    	function focus_handler(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler(event) {
    		bubble($$self, event);
    	}

    	function input_input_handler() {
    		value = to_number(this.value);
    		$$invalidate(0, value);
    	}

    	const change_handler_1 = () => $$invalidate(0, value = clamp(value, min, max));
    	const click_handler = () => $$invalidate(0, value = clamp(value + step, min, max));
    	const click_handler_1 = () => $$invalidate(0, value = clamp(value - step, min, max));

    	$$self.$set = $$props => {
    		if ("name" in $$props) $$invalidate(1, name = $$props.name);
    		if ("label" in $$props) $$invalidate(2, label = $$props.label);
    		if ("placeholder" in $$props) $$invalidate(3, placeholder = $$props.placeholder);
    		if ("icon" in $$props) $$invalidate(4, icon = $$props.icon);
    		if ("min" in $$props) $$invalidate(5, min = $$props.min);
    		if ("max" in $$props) $$invalidate(6, max = $$props.max);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("step" in $$props) $$invalidate(7, step = $$props.step);
    		if ("stepOnly" in $$props) $$invalidate(8, stepOnly = $$props.stepOnly);
    		if ("disabled" in $$props) $$invalidate(9, disabled = $$props.disabled);
    		if ("autofocus" in $$props) $$invalidate(10, autofocus = $$props.autofocus);
    	};

    	return [
    		value,
    		name,
    		label,
    		placeholder,
    		icon,
    		min,
    		max,
    		step,
    		stepOnly,
    		disabled,
    		autofocus,
    		blur_handler,
    		change_handler,
    		input_handler,
    		keypress_handler,
    		focus_handler,
    		keydown_handler,
    		input_input_handler,
    		change_handler_1,
    		click_handler,
    		click_handler_1
    	];
    }

    class Number extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-1rceuta-style")) add_css$3();

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			name: 1,
    			label: 2,
    			placeholder: 3,
    			icon: 4,
    			min: 5,
    			max: 6,
    			value: 0,
    			step: 7,
    			stepOnly: 8,
    			disabled: 9,
    			autofocus: 10
    		});
    	}

    	get name() {
    		return this.$$.ctx[1];
    	}

    	set name(name) {
    		this.$set({ name });
    		flush();
    	}

    	get label() {
    		return this.$$.ctx[2];
    	}

    	set label(label) {
    		this.$set({ label });
    		flush();
    	}

    	get placeholder() {
    		return this.$$.ctx[3];
    	}

    	set placeholder(placeholder) {
    		this.$set({ placeholder });
    		flush();
    	}

    	get icon() {
    		return this.$$.ctx[4];
    	}

    	set icon(icon) {
    		this.$set({ icon });
    		flush();
    	}

    	get min() {
    		return this.$$.ctx[5];
    	}

    	set min(min) {
    		this.$set({ min });
    		flush();
    	}

    	get max() {
    		return this.$$.ctx[6];
    	}

    	set max(max) {
    		this.$set({ max });
    		flush();
    	}

    	get value() {
    		return this.$$.ctx[0];
    	}

    	set value(value) {
    		this.$set({ value });
    		flush();
    	}

    	get step() {
    		return this.$$.ctx[7];
    	}

    	set step(step) {
    		this.$set({ step });
    		flush();
    	}

    	get stepOnly() {
    		return this.$$.ctx[8];
    	}

    	set stepOnly(stepOnly) {
    		this.$set({ stepOnly });
    		flush();
    	}

    	get disabled() {
    		return this.$$.ctx[9];
    	}

    	set disabled(disabled) {
    		this.$set({ disabled });
    		flush();
    	}

    	get autofocus() {
    		return this.$$.ctx[10];
    	}

    	set autofocus(autofocus) {
    		this.$set({ autofocus });
    		flush();
    	}
    }

    /* js/components/Input/Password.svelte generated by Svelte v3.16.4 */

    function add_css$4() {
    	var style = element("style");
    	style.id = "svelte-5i17kk-style";
    	style.textContent = ".input-wrapper.svelte-5i17kk{display:inline-block;position:relative}.input-wrapper.svelte-5i17kk{--vertical-padding:5px;--horizontal-padding:12px;--vertical-padding-focus:calc(var(--vertical-padding) - 1px);--horizontal-padding-focus:calc(var(--horizontal-padding) - 1px)}.input-wrapper.svelte-5i17kk{width:100%;line-height:1.5}.input-prefix.svelte-5i17kk{position:absolute;top:52%;z-index:2;color:rgba(0,0,0,0.65);line-height:0;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);left:12px}input.svelte-5i17kk{text-align:inherit;display:inline-block;padding:var(--vertical-padding) var(--horizontal-padding);color:rgba(0,0,0,0.65);font-size:14px;line-height:1.5;background-color:#fff;background-image:none;border:1px solid #d9d9d9;border-radius:4px}input.svelte-5i17kk:not(.checkbox):not(.radio){width:100%;height:35px}input.svelte-5i17kk:hover{border-color:#aaa}input.svelte-5i17kk:focus{border:2px solid #1870ff;padding:var(--vertical-padding-focus) var(--horizontal-padding-focus);outline:0}.icon.svelte-5i17kk{padding-left:30px}.label.svelte-5i17kk{margin-bottom:5px}";
    	append(document.head, style);
    }

    // (13:4) {#if label}
    function create_if_block_1$2(ctx) {
    	let div;

    	let t_value = (/*label*/ ctx[2].length
    	? /*label*/ ctx[2]
    	: /*placeholder*/ ctx[3]) + "";

    	let t;

    	return {
    		c() {
    			div = element("div");
    			t = text(t_value);
    			this.h();
    		},
    		l(nodes) {
    			div = claim_element(nodes, "DIV", { class: true });
    			var div_nodes = children(div);
    			t = claim_text(div_nodes, t_value);
    			div_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(div, "class", "label svelte-5i17kk");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, t);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*label, placeholder*/ 12 && t_value !== (t_value = (/*label*/ ctx[2].length
    			? /*label*/ ctx[2]
    			: /*placeholder*/ ctx[3]) + "")) set_data(t, t_value);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (16:4) {#if icon}
    function create_if_block$3(ctx) {
    	let span;
    	let current;
    	const icon_1 = new Icon({ props: { path: /*icon*/ ctx[4] } });

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
    			attr(span, "class", "input-prefix svelte-5i17kk");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			mount_component(icon_1, span, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const icon_1_changes = {};
    			if (dirty[0] & /*icon*/ 16) icon_1_changes.path = /*icon*/ ctx[4];
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

    function create_fragment$4(ctx) {
    	let label_1;
    	let t0;
    	let t1;
    	let input;
    	let current;
    	let dispose;
    	let if_block0 = /*label*/ ctx[2] && create_if_block_1$2(ctx);
    	let if_block1 = /*icon*/ ctx[4] && create_if_block$3(ctx);

    	return {
    		c() {
    			label_1 = element("label");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			input = element("input");
    			this.h();
    		},
    		l(nodes) {
    			label_1 = claim_element(nodes, "LABEL", { class: true });
    			var label_1_nodes = children(label_1);
    			if (if_block0) if_block0.l(label_1_nodes);
    			t0 = claim_space(label_1_nodes);
    			if (if_block1) if_block1.l(label_1_nodes);
    			t1 = claim_space(label_1_nodes);

    			input = claim_element(label_1_nodes, "INPUT", {
    				autofocus: true,
    				disabled: true,
    				name: true,
    				placeholder: true,
    				type: true,
    				class: true
    			});

    			label_1_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			input.autofocus = /*autofocus*/ ctx[6];
    			input.disabled = /*disabled*/ ctx[5];
    			attr(input, "name", /*name*/ ctx[1]);
    			attr(input, "placeholder", /*placeholder*/ ctx[3]);
    			attr(input, "type", "password");
    			attr(input, "class", "svelte-5i17kk");
    			toggle_class(input, "icon", /*icon*/ ctx[4]);
    			attr(label_1, "class", "input-wrapper svelte-5i17kk");

    			dispose = [
    				listen(input, "input", /*input_input_handler*/ ctx[13]),
    				listen(input, "blur", /*blur_handler*/ ctx[7]),
    				listen(input, "change", /*change_handler*/ ctx[8]),
    				listen(input, "input", /*input_handler*/ ctx[9]),
    				listen(input, "keypress", /*keypress_handler*/ ctx[10]),
    				listen(input, "focus", /*focus_handler*/ ctx[11]),
    				listen(input, "keydown", /*keydown_handler*/ ctx[12])
    			];
    		},
    		m(target, anchor) {
    			insert(target, label_1, anchor);
    			if (if_block0) if_block0.m(label_1, null);
    			append(label_1, t0);
    			if (if_block1) if_block1.m(label_1, null);
    			append(label_1, t1);
    			append(label_1, input);
    			set_input_value(input, /*value*/ ctx[0]);
    			current = true;
    		},
    		p(ctx, dirty) {
    			if (/*label*/ ctx[2]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$2(ctx);
    					if_block0.c();
    					if_block0.m(label_1, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*icon*/ ctx[4]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    					transition_in(if_block1, 1);
    				} else {
    					if_block1 = create_if_block$3(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(label_1, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty[0] & /*autofocus*/ 64) {
    				input.autofocus = /*autofocus*/ ctx[6];
    			}

    			if (!current || dirty[0] & /*disabled*/ 32) {
    				input.disabled = /*disabled*/ ctx[5];
    			}

    			if (!current || dirty[0] & /*name*/ 2) {
    				attr(input, "name", /*name*/ ctx[1]);
    			}

    			if (!current || dirty[0] & /*placeholder*/ 8) {
    				attr(input, "placeholder", /*placeholder*/ ctx[3]);
    			}

    			if (dirty[0] & /*value*/ 1 && input.value !== /*value*/ ctx[0]) {
    				set_input_value(input, /*value*/ ctx[0]);
    			}

    			if (dirty[0] & /*icon*/ 16) {
    				toggle_class(input, "icon", /*icon*/ ctx[4]);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block1);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(label_1);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			run_all(dispose);
    		}
    	};
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { name = "" } = $$props;
    	let { label = "" } = $$props;
    	let { placeholder = "" } = $$props;
    	let { icon = "" } = $$props;
    	let { value = "" } = $$props;
    	let { disabled = false } = $$props;
    	let { autofocus = false } = $$props;

    	function blur_handler(event) {
    		bubble($$self, event);
    	}

    	function change_handler(event) {
    		bubble($$self, event);
    	}

    	function input_handler(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler(event) {
    		bubble($$self, event);
    	}

    	function focus_handler(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler(event) {
    		bubble($$self, event);
    	}

    	function input_input_handler() {
    		value = this.value;
    		$$invalidate(0, value);
    	}

    	$$self.$set = $$props => {
    		if ("name" in $$props) $$invalidate(1, name = $$props.name);
    		if ("label" in $$props) $$invalidate(2, label = $$props.label);
    		if ("placeholder" in $$props) $$invalidate(3, placeholder = $$props.placeholder);
    		if ("icon" in $$props) $$invalidate(4, icon = $$props.icon);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("disabled" in $$props) $$invalidate(5, disabled = $$props.disabled);
    		if ("autofocus" in $$props) $$invalidate(6, autofocus = $$props.autofocus);
    	};

    	return [
    		value,
    		name,
    		label,
    		placeholder,
    		icon,
    		disabled,
    		autofocus,
    		blur_handler,
    		change_handler,
    		input_handler,
    		keypress_handler,
    		focus_handler,
    		keydown_handler,
    		input_input_handler
    	];
    }

    class Password extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-5i17kk-style")) add_css$4();

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			name: 1,
    			label: 2,
    			placeholder: 3,
    			icon: 4,
    			value: 0,
    			disabled: 5,
    			autofocus: 6
    		});
    	}

    	get name() {
    		return this.$$.ctx[1];
    	}

    	set name(name) {
    		this.$set({ name });
    		flush();
    	}

    	get label() {
    		return this.$$.ctx[2];
    	}

    	set label(label) {
    		this.$set({ label });
    		flush();
    	}

    	get placeholder() {
    		return this.$$.ctx[3];
    	}

    	set placeholder(placeholder) {
    		this.$set({ placeholder });
    		flush();
    	}

    	get icon() {
    		return this.$$.ctx[4];
    	}

    	set icon(icon) {
    		this.$set({ icon });
    		flush();
    	}

    	get value() {
    		return this.$$.ctx[0];
    	}

    	set value(value) {
    		this.$set({ value });
    		flush();
    	}

    	get disabled() {
    		return this.$$.ctx[5];
    	}

    	set disabled(disabled) {
    		this.$set({ disabled });
    		flush();
    	}

    	get autofocus() {
    		return this.$$.ctx[6];
    	}

    	set autofocus(autofocus) {
    		this.$set({ autofocus });
    		flush();
    	}
    }

    /* js/components/Input/Radio.svelte generated by Svelte v3.16.4 */

    function add_css$5() {
    	var style = element("style");
    	style.id = "svelte-1yjlybu-style";
    	style.textContent = ".input-wrapper.svelte-1yjlybu{display:inline-block;position:relative;line-height:inherit}input.svelte-1yjlybu{display:inline-block;line-height:1.5;-webkit-transition:all .3s;transition:all .3s}.label.svelte-1yjlybu{margin-bottom:5px}";
    	append(document.head, style);
    }

    // (11:4) {#if label}
    function create_if_block$4(ctx) {
    	let span;
    	let t;

    	return {
    		c() {
    			span = element("span");
    			t = text(/*label*/ ctx[1]);
    			this.h();
    		},
    		l(nodes) {
    			span = claim_element(nodes, "SPAN", { class: true });
    			var span_nodes = children(span);
    			t = claim_text(span_nodes, /*label*/ ctx[1]);
    			span_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(span, "class", "label svelte-1yjlybu");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			append(span, t);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*label*/ 2) set_data(t, /*label*/ ctx[1]);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    function create_fragment$5(ctx) {
    	let label_1;
    	let input;
    	let t;
    	let dispose;
    	let if_block = /*label*/ ctx[1] && create_if_block$4(ctx);

    	return {
    		c() {
    			label_1 = element("label");
    			input = element("input");
    			t = space();
    			if (if_block) if_block.c();
    			this.h();
    		},
    		l(nodes) {
    			label_1 = claim_element(nodes, "LABEL", { class: true });
    			var label_1_nodes = children(label_1);

    			input = claim_element(label_1_nodes, "INPUT", {
    				checked: true,
    				disabled: true,
    				name: true,
    				type: true,
    				class: true
    			});

    			t = claim_space(label_1_nodes);
    			if (if_block) if_block.l(label_1_nodes);
    			label_1_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			input.checked = true;
    			input.disabled = /*disabled*/ ctx[2];
    			attr(input, "name", /*name*/ ctx[0]);
    			attr(input, "type", "radio");
    			attr(input, "class", "svelte-1yjlybu");
    			attr(label_1, "class", "input-wrapper svelte-1yjlybu");

    			dispose = [
    				listen(input, "blur", /*blur_handler*/ ctx[4]),
    				listen(input, "change", /*change_handler*/ ctx[5]),
    				listen(input, "input", /*input_handler*/ ctx[6]),
    				listen(input, "focus", /*focus_handler*/ ctx[7]),
    				listen(label_1, "click", /*click_handler*/ ctx[3])
    			];
    		},
    		m(target, anchor) {
    			insert(target, label_1, anchor);
    			append(label_1, input);
    			append(label_1, t);
    			if (if_block) if_block.m(label_1, null);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*disabled*/ 4) {
    				input.disabled = /*disabled*/ ctx[2];
    			}

    			if (dirty[0] & /*name*/ 1) {
    				attr(input, "name", /*name*/ ctx[0]);
    			}

    			if (/*label*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					if_block.m(label_1, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(label_1);
    			if (if_block) if_block.d();
    			run_all(dispose);
    		}
    	};
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { name = "" } = $$props;
    	let { label = "" } = $$props;
    	let { disabled = false } = $$props;

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	function blur_handler(event) {
    		bubble($$self, event);
    	}

    	function change_handler(event) {
    		bubble($$self, event);
    	}

    	function input_handler(event) {
    		bubble($$self, event);
    	}

    	function focus_handler(event) {
    		bubble($$self, event);
    	}

    	$$self.$set = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    		if ("label" in $$props) $$invalidate(1, label = $$props.label);
    		if ("disabled" in $$props) $$invalidate(2, disabled = $$props.disabled);
    	};

    	return [
    		name,
    		label,
    		disabled,
    		click_handler,
    		blur_handler,
    		change_handler,
    		input_handler,
    		focus_handler
    	];
    }

    class Radio extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-1yjlybu-style")) add_css$5();
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { name: 0, label: 1, disabled: 2 });
    	}

    	get name() {
    		return this.$$.ctx[0];
    	}

    	set name(name) {
    		this.$set({ name });
    		flush();
    	}

    	get label() {
    		return this.$$.ctx[1];
    	}

    	set label(label) {
    		this.$set({ label });
    		flush();
    	}

    	get disabled() {
    		return this.$$.ctx[2];
    	}

    	set disabled(disabled) {
    		this.$set({ disabled });
    		flush();
    	}
    }

    /* js/components/Input/Textarea.svelte generated by Svelte v3.16.4 */

    function add_css$6() {
    	var style = element("style");
    	style.id = "svelte-rqhrt2-style";
    	style.textContent = ".wrapper.svelte-rqhrt2{line-height:1.5;display:inline-block;width:100%}.wrapper.svelte-rqhrt2{--vertical-padding:5px;--horizontal-padding:12px;--vertical-padding-focus:calc(var(--vertical-padding) - 1px);--horizontal-padding-focus:calc(var(--horizontal-padding) - 1px)}textarea.svelte-rqhrt2{text-align:inherit;display:inline-block;width:100%;padding:var(--vertical-padding) var(--horizontal-padding);color:rgba(0,0,0,0.65);font-size:14px;line-height:1.5;background-color:#fff;background-image:none;border:1px solid #d9d9d9;border-radius:4px;overflow:scroll;overflow-x:hidden;-ms-overflow-style:none;scrollbar-width:none}textarea.svelte-rqhrt2::-webkit-scrollbar{display:none}textarea.svelte-rqhrt2:focus,textarea.svelte-rqhrt2:hover{border:2px solid #1870ff;padding:var(--vertical-padding-focus) var(--horizontal-padding-focus)}.label.svelte-rqhrt2{margin-bottom:5px}";
    	append(document.head, style);
    }

    // (24:4) {#if label}
    function create_if_block$5(ctx) {
    	let div;

    	let t_value = (/*label*/ ctx[5].length
    	? /*label*/ ctx[5]
    	: /*placeholder*/ ctx[2]) + "";

    	let t;

    	return {
    		c() {
    			div = element("div");
    			t = text(t_value);
    			this.h();
    		},
    		l(nodes) {
    			div = claim_element(nodes, "DIV", { class: true });
    			var div_nodes = children(div);
    			t = claim_text(div_nodes, t_value);
    			div_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(div, "class", "label svelte-rqhrt2");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, t);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*label, placeholder*/ 36 && t_value !== (t_value = (/*label*/ ctx[5].length
    			? /*label*/ ctx[5]
    			: /*placeholder*/ ctx[2]) + "")) set_data(t, t_value);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    function create_fragment$6(ctx) {
    	let span;
    	let t;
    	let textarea_1;
    	let dispose;
    	let if_block = /*label*/ ctx[5] && create_if_block$5(ctx);

    	return {
    		c() {
    			span = element("span");
    			if (if_block) if_block.c();
    			t = space();
    			textarea_1 = element("textarea");
    			this.h();
    		},
    		l(nodes) {
    			span = claim_element(nodes, "SPAN", { class: true });
    			var span_nodes = children(span);
    			if (if_block) if_block.l(span_nodes);
    			t = claim_space(span_nodes);

    			textarea_1 = claim_element(span_nodes, "TEXTAREA", {
    				disabled: true,
    				name: true,
    				placeholder: true,
    				rows: true,
    				class: true
    			});

    			children(textarea_1).forEach(detach);
    			span_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			textarea_1.disabled = /*disabled*/ ctx[3];
    			attr(textarea_1, "name", /*name*/ ctx[1]);
    			attr(textarea_1, "placeholder", /*placeholder*/ ctx[2]);
    			attr(textarea_1, "rows", /*rows*/ ctx[4]);
    			attr(textarea_1, "class", "svelte-rqhrt2");
    			attr(span, "class", "wrapper svelte-rqhrt2");

    			dispose = [
    				listen(textarea_1, "input", /*textarea_1_input_handler*/ ctx[8]),
    				listen(textarea_1, "input", /*autosize*/ ctx[7])
    			];
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			if (if_block) if_block.m(span, null);
    			append(span, t);
    			append(span, textarea_1);
    			set_input_value(textarea_1, /*value*/ ctx[0]);
    			/*textarea_1_binding*/ ctx[9](textarea_1);
    		},
    		p(ctx, dirty) {
    			if (/*label*/ ctx[5]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					if_block.m(span, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty[0] & /*disabled*/ 8) {
    				textarea_1.disabled = /*disabled*/ ctx[3];
    			}

    			if (dirty[0] & /*name*/ 2) {
    				attr(textarea_1, "name", /*name*/ ctx[1]);
    			}

    			if (dirty[0] & /*placeholder*/ 4) {
    				attr(textarea_1, "placeholder", /*placeholder*/ ctx[2]);
    			}

    			if (dirty[0] & /*rows*/ 16) {
    				attr(textarea_1, "rows", /*rows*/ ctx[4]);
    			}

    			if (dirty[0] & /*value*/ 1) {
    				set_input_value(textarea_1, /*value*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(span);
    			if (if_block) if_block.d();
    			/*textarea_1_binding*/ ctx[9](null);
    			run_all(dispose);
    		}
    	};
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { name = "" } = $$props;
    	let { placeholder = "" } = $$props;
    	let { value = "" } = $$props;
    	let { disabled = false } = $$props;
    	let { rows = 3 } = $$props;
    	let { label = "" } = $$props;
    	let textarea;

    	function autosize() {
    		const computed = getComputedStyle(textarea);
    		let newHeight;
    		newHeight = parseInt(computed.getPropertyValue("border-top-width"));
    		newHeight += parseInt(computed.getPropertyValue("border-bottom-width"));
    		newHeight += textarea.scrollHeight;
    		$$invalidate(6, textarea.style.height = `${newHeight}px`, textarea);
    	}

    	function textarea_1_input_handler() {
    		value = this.value;
    		$$invalidate(0, value);
    	}

    	function textarea_1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(6, textarea = $$value);
    		});
    	}

    	$$self.$set = $$props => {
    		if ("name" in $$props) $$invalidate(1, name = $$props.name);
    		if ("placeholder" in $$props) $$invalidate(2, placeholder = $$props.placeholder);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("disabled" in $$props) $$invalidate(3, disabled = $$props.disabled);
    		if ("rows" in $$props) $$invalidate(4, rows = $$props.rows);
    		if ("label" in $$props) $$invalidate(5, label = $$props.label);
    	};

    	return [
    		value,
    		name,
    		placeholder,
    		disabled,
    		rows,
    		label,
    		textarea,
    		autosize,
    		textarea_1_input_handler,
    		textarea_1_binding
    	];
    }

    class Textarea extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-rqhrt2-style")) add_css$6();

    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
    			name: 1,
    			placeholder: 2,
    			value: 0,
    			disabled: 3,
    			rows: 4,
    			label: 5
    		});
    	}

    	get name() {
    		return this.$$.ctx[1];
    	}

    	set name(name) {
    		this.$set({ name });
    		flush();
    	}

    	get placeholder() {
    		return this.$$.ctx[2];
    	}

    	set placeholder(placeholder) {
    		this.$set({ placeholder });
    		flush();
    	}

    	get value() {
    		return this.$$.ctx[0];
    	}

    	set value(value) {
    		this.$set({ value });
    		flush();
    	}

    	get disabled() {
    		return this.$$.ctx[3];
    	}

    	set disabled(disabled) {
    		this.$set({ disabled });
    		flush();
    	}

    	get rows() {
    		return this.$$.ctx[4];
    	}

    	set rows(rows) {
    		this.$set({ rows });
    		flush();
    	}

    	get label() {
    		return this.$$.ctx[5];
    	}

    	set label(label) {
    		this.$set({ label });
    		flush();
    	}
    }

    Input.Checkbox = Checkbox;
    Input.Number = Number;
    Input.Password = Password;
    Input.Radio = Radio;
    Input.Text = Textarea;

    return Input;

})));
//# sourceMappingURL=Input.js.map
