(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Tooltip = factory());
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
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
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

    /* js/components/Tooltip.svelte generated by Svelte v3.16.4 */

    function add_css() {
    	var style = element("style");
    	style.id = "svelte-gj462b-style";
    	style.textContent = ".tooltipped.svelte-gj462b{display:inline-block;position:relative}.tooltipped.breakParent.svelte-gj462b{position:static}.tooltipped.svelte-gj462b:hover:after{line-height:1em;background:#4a4e57;border-radius:4px;bottom:auto;top:calc(100% + 7px);color:#fff;content:attr(aria-label);display:block;padding:7px 10px;position:absolute;white-space:nowrap;z-index:300;font-size:12px;text-transform:none;font-weight:400;pointer-events:none}.tooltipped.left.svelte-gj462b:hover:after{left:0%}.tooltipped.center.svelte-gj462b:hover:after{left:50%;transform:translateX(-50%)}.tooltipped.right.svelte-gj462b:hover:after{right:0%}.tooltipped.svelte-gj462b:hover:before{border:solid;border-color:#4a4e57 transparent;bottom:auto;top:calc(100% + 2px);border-width:0 5px 5px 5px;content:\"\";display:block;position:absolute;z-index:301}.tooltipped.left.svelte-gj462b:hover:before{left:10%}.tooltipped.center.svelte-gj462b:hover:before{left:50%;transform:translateX(-50%)}.tooltipped.right.svelte-gj462b:hover:before{right:10%}";
    	append(document.head, style);
    }

    function create_fragment(ctx) {
    	let span;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	return {
    		c() {
    			span = element("span");
    			if (default_slot) default_slot.c();
    			this.h();
    		},
    		l(nodes) {
    			span = claim_element(nodes, "SPAN", { "aria-label": true, class: true });
    			var span_nodes = children(span);
    			if (default_slot) default_slot.l(span_nodes);
    			span_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(span, "aria-label", /*label*/ ctx[3]);
    			attr(span, "class", "svelte-gj462b");
    			toggle_class(span, "tooltipped", /*label*/ ctx[3]);
    			toggle_class(span, "left", /*left*/ ctx[1]);
    			toggle_class(span, "center", !/*left*/ ctx[1] && !/*right*/ ctx[2]);
    			toggle_class(span, "right", /*right*/ ctx[2]);
    			toggle_class(span, "breakParent", /*breakParent*/ ctx[0]);
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);

    			if (default_slot) {
    				default_slot.m(span, null);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (default_slot && default_slot.p && dirty[0] & /*$$scope*/ 16) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[4], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null));
    			}

    			if (!current || dirty[0] & /*label*/ 8) {
    				attr(span, "aria-label", /*label*/ ctx[3]);
    			}

    			if (dirty[0] & /*label*/ 8) {
    				toggle_class(span, "tooltipped", /*label*/ ctx[3]);
    			}

    			if (dirty[0] & /*left*/ 2) {
    				toggle_class(span, "left", /*left*/ ctx[1]);
    			}

    			if (dirty[0] & /*left, right*/ 6) {
    				toggle_class(span, "center", !/*left*/ ctx[1] && !/*right*/ ctx[2]);
    			}

    			if (dirty[0] & /*right*/ 4) {
    				toggle_class(span, "right", /*right*/ ctx[2]);
    			}

    			if (dirty[0] & /*breakParent*/ 1) {
    				toggle_class(span, "breakParent", /*breakParent*/ ctx[0]);
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
    			if (detaching) detach(span);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let { break: breakParent = false } = $$props;
    	let { left = false } = $$props;
    	let { right = false } = $$props;
    	let { label = "" } = $$props;
    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ("break" in $$props) $$invalidate(0, breakParent = $$props.break);
    		if ("left" in $$props) $$invalidate(1, left = $$props.left);
    		if ("right" in $$props) $$invalidate(2, right = $$props.right);
    		if ("label" in $$props) $$invalidate(3, label = $$props.label);
    		if ("$$scope" in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	return [breakParent, left, right, label, $$scope, $$slots];
    }

    class Tooltip extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-gj462b-style")) add_css();
    		init(this, options, instance, create_fragment, safe_not_equal, { break: 0, left: 1, right: 2, label: 3 });
    	}

    	get break() {
    		return this.$$.ctx[0];
    	}

    	set break(breakParent) {
    		this.$set({ break: breakParent });
    		flush();
    	}

    	get left() {
    		return this.$$.ctx[1];
    	}

    	set left(left) {
    		this.$set({ left });
    		flush();
    	}

    	get right() {
    		return this.$$.ctx[2];
    	}

    	set right(right) {
    		this.$set({ right });
    		flush();
    	}

    	get label() {
    		return this.$$.ctx[3];
    	}

    	set label(label) {
    		this.$set({ label });
    		flush();
    	}
    }

    return Tooltip;

})));
//# sourceMappingURL=Tooltip.js.map
