(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Dropdown = factory());
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
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
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

    const globals = (typeof window !== 'undefined' ? window : global);
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

    /* js/components/Dropdown/Item.svelte generated by Svelte v3.16.4 */

    function add_css() {
    	var style = element("style");
    	style.id = "svelte-eb77km-style";
    	style.textContent = ".menu-item.svelte-eb77km{--vertical-padding:8px;--horizontal-padding:16px}.menu-item.svelte-eb77km{clear:both;font-weight:normal;font-size:14px;line-height:22px;white-space:nowrap;cursor:pointer;transition:all .3s;min-width:130px;background-color:#fff}.menu-item.svelte-eb77km:not(.linked){padding:8px 16px}.menu-item.svelte-eb77km a{display:flex;padding:var(--vertical-padding) var(--horizontal-padding);margin:calc(-1 * var(--vertical-padding)) calc(-1 * var(--horizontal-padding));text-decoration:none;color:inherit}.menu-item.active.svelte-eb77km,.menu-item.svelte-eb77km:hover{color:#1870ff;background-color:#deeaff}";
    	append(document.head, style);
    }

    function create_fragment(ctx) {
    	let div;
    	let current;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

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
    			attr(div, "class", "menu-item svelte-eb77km");
    			toggle_class(div, "active", /*active*/ ctx[0]);
    			dispose = listen(div, "click", /*click_handler*/ ctx[3]);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (default_slot && default_slot.p && dirty[0] & /*$$scope*/ 2) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[1], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null));
    			}

    			if (dirty[0] & /*active*/ 1) {
    				toggle_class(div, "active", /*active*/ ctx[0]);
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
    			dispose();
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let { active = false } = $$props;
    	let { $$slots = {}, $$scope } = $$props;

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	$$self.$set = $$props => {
    		if ("active" in $$props) $$invalidate(0, active = $$props.active);
    		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	return [active, $$scope, $$slots, click_handler];
    }

    class Item extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-eb77km-style")) add_css();
    		init(this, options, instance, create_fragment, safe_not_equal, { active: 0 });
    	}

    	get active() {
    		return this.$$.ctx[0];
    	}

    	set active(active) {
    		this.$set({ active });
    		flush();
    	}
    }

    /* js/components/Dropdown/Dropdown.svelte generated by Svelte v3.16.4 */

    const { document: document_1 } = globals;

    function add_css$1() {
    	var style = element("style");
    	style.id = "svelte-qrzcn2-style";
    	style.textContent = ".dropdown.svelte-qrzcn2{position:relative;display:inline-block}.dropdown-button.svelte-qrzcn2{display:inline-block}.dropdown-menu.svelte-qrzcn2{position:absolute;margin-top:5px;background-color:#fff;border-radius:4px;outline:none;box-shadow:0 2px 8px rgba(0,0,0,0.15);z-index:100;overflow:hidden}.dropdown-menu.top.svelte-qrzcn2{margin-bottom:5px;bottom:100%}.dropdown-menu.bottom.svelte-qrzcn2{margin-top:5px;top:100%}.dropdown-menu.left.svelte-qrzcn2{left:0}.dropdown-menu.right.svelte-qrzcn2{right:0}.menu-item>.svelte-qrzcn2{display:block}";
    	append(document_1.head, style);
    }

    const get_menu_slot_changes = dirty => ({ item: dirty[0] & /*items*/ 2 });

    const get_menu_slot_context = ctx => ({
    	item: {
    		.../*item*/ ctx[19],
    		index: /*index*/ ctx[21]
    	}
    });

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[19] = list[i];
    	child_ctx[21] = i;
    	return child_ctx;
    }

    const get_button_slot_changes = dirty => ({});
    const get_button_slot_context = ctx => ({});

    // (55:4) {#if visible}
    function create_if_block(ctx) {
    	let div;
    	let current;
    	let dispose;
    	let each_value = /*items*/ ctx[1];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	let each_1_else = null;

    	if (!each_value.length) {
    		each_1_else = create_else_block(ctx);
    		each_1_else.c();
    	}

    	return {
    		c() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			this.h();
    		},
    		l(nodes) {
    			div = claim_element(nodes, "DIV", { class: true });
    			var div_nodes = children(div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].l(div_nodes);
    			}

    			div_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(div, "class", "dropdown-menu svelte-qrzcn2");
    			toggle_class(div, "bottom", /*bottom*/ ctx[7]);
    			toggle_class(div, "left", /*left*/ ctx[8]);
    			toggle_class(div, "right", /*right*/ ctx[9]);
    			toggle_class(div, "top", /*top*/ ctx[6]);
    			dispose = listen(div, "click", /*close*/ ctx[3]);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			if (each_1_else) {
    				each_1_else.m(div, null);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*is_active, items, $$scope*/ 262178) {
    				each_value = /*items*/ ctx[1];
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
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!each_value.length && each_1_else) {
    				each_1_else.p(ctx, dirty);
    			} else if (!each_value.length) {
    				each_1_else = create_else_block(ctx);
    				each_1_else.c();
    				each_1_else.m(div, null);
    			} else if (each_1_else) {
    				each_1_else.d(1);
    				each_1_else = null;
    			}

    			if (dirty[0] & /*bottom*/ 128) {
    				toggle_class(div, "bottom", /*bottom*/ ctx[7]);
    			}

    			if (dirty[0] & /*left*/ 256) {
    				toggle_class(div, "left", /*left*/ ctx[8]);
    			}

    			if (dirty[0] & /*right*/ 512) {
    				toggle_class(div, "right", /*right*/ ctx[9]);
    			}

    			if (dirty[0] & /*top*/ 64) {
    				toggle_class(div, "top", /*top*/ ctx[6]);
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
    			if (detaching) detach(div);
    			destroy_each(each_blocks, detaching);
    			if (each_1_else) each_1_else.d();
    			dispose();
    		}
    	};
    }

    // (62:12) {:else}
    function create_else_block(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[16].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);

    	return {
    		c() {
    			if (default_slot) default_slot.c();
    		},
    		l(nodes) {
    			if (default_slot) default_slot.l(nodes);
    		},
    		m(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (default_slot && default_slot.p && dirty[0] & /*$$scope*/ 262144) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[18], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, null));
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
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    // (59:16) <Item on:click={item.onclick} active={is_active(index)}>
    function create_default_slot(ctx) {
    	let t;
    	let current;
    	const menu_slot_template = /*$$slots*/ ctx[16].menu;
    	const menu_slot = create_slot(menu_slot_template, ctx, /*$$scope*/ ctx[18], get_menu_slot_context);

    	return {
    		c() {
    			if (menu_slot) menu_slot.c();
    			t = space();
    		},
    		l(nodes) {
    			if (menu_slot) menu_slot.l(nodes);
    			t = claim_space(nodes);
    		},
    		m(target, anchor) {
    			if (menu_slot) {
    				menu_slot.m(target, anchor);
    			}

    			insert(target, t, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			if (menu_slot && menu_slot.p && dirty[0] & /*$$scope, items*/ 262146) {
    				menu_slot.p(get_slot_context(menu_slot_template, ctx, /*$$scope*/ ctx[18], get_menu_slot_context), get_slot_changes(menu_slot_template, /*$$scope*/ ctx[18], dirty, get_menu_slot_changes));
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(menu_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(menu_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (menu_slot) menu_slot.d(detaching);
    			if (detaching) detach(t);
    		}
    	};
    }

    // (58:12) {#each items as item, index}
    function create_each_block(ctx) {
    	let current;

    	const item = new Item({
    			props: {
    				active: /*is_active*/ ctx[5](/*index*/ ctx[21]),
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			}
    		});

    	item.$on("click", /*item*/ ctx[19].onclick);

    	return {
    		c() {
    			create_component(item.$$.fragment);
    		},
    		l(nodes) {
    			claim_component(item.$$.fragment, nodes);
    		},
    		m(target, anchor) {
    			mount_component(item, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const item_changes = {};
    			if (dirty[0] & /*is_active*/ 32) item_changes.active = /*is_active*/ ctx[5](/*index*/ ctx[21]);

    			if (dirty[0] & /*$$scope, items*/ 262146) {
    				item_changes.$$scope = { dirty, ctx };
    			}

    			item.$set(item_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(item.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(item.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(item, detaching);
    		}
    	};
    }

    function create_fragment$1(ctx) {
    	let div1;
    	let div0;
    	let t;
    	let current;
    	let dispose;
    	const button_slot_template = /*$$slots*/ ctx[16].button;
    	const button_slot = create_slot(button_slot_template, ctx, /*$$scope*/ ctx[18], get_button_slot_context);
    	let if_block = /*visible*/ ctx[0] && create_if_block(ctx);

    	return {
    		c() {
    			div1 = element("div");
    			div0 = element("div");
    			if (button_slot) button_slot.c();
    			t = space();
    			if (if_block) if_block.c();
    			this.h();
    		},
    		l(nodes) {
    			div1 = claim_element(nodes, "DIV", { class: true });
    			var div1_nodes = children(div1);
    			div0 = claim_element(div1_nodes, "DIV", { class: true });
    			var div0_nodes = children(div0);
    			if (button_slot) button_slot.l(div0_nodes);
    			div0_nodes.forEach(detach);
    			t = claim_space(div1_nodes);
    			if (if_block) if_block.l(div1_nodes);
    			div1_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(div0, "class", "dropdown-button svelte-qrzcn2");
    			attr(div1, "class", "dropdown svelte-qrzcn2");
    			dispose = listen(div0, "click", stop_propagation(/*toggle*/ ctx[2]));
    		},
    		m(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, div0);

    			if (button_slot) {
    				button_slot.m(div0, null);
    			}

    			append(div1, t);
    			if (if_block) if_block.m(div1, null);
    			/*div1_binding*/ ctx[17](div1);
    			current = true;
    		},
    		p(ctx, dirty) {
    			if (button_slot && button_slot.p && dirty[0] & /*$$scope*/ 262144) {
    				button_slot.p(get_slot_context(button_slot_template, ctx, /*$$scope*/ ctx[18], get_button_slot_context), get_slot_changes(button_slot_template, /*$$scope*/ ctx[18], dirty, get_button_slot_changes));
    			}

    			if (/*visible*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, null);
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
    			transition_in(button_slot, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(button_slot, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div1);
    			if (button_slot) button_slot.d(detaching);
    			if (if_block) if_block.d();
    			/*div1_binding*/ ctx[17](null);
    			dispose();
    		}
    	};
    }

    function valid(placement) {
    	let positions = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
    	return positions.includes(placement);
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { items = [] } = $$props;
    	let { active = [] } = $$props;
    	let { placement = "bottomLeft" } = $$props;
    	let { visible = false } = $$props;
    	const dispatch = createEventDispatcher();
    	let dropdown = null;

    	function handleDocumentClick(e) {
    		if (!dropdown.contains(event.target)) {
    			$$invalidate(0, visible = false);
    		}
    	}

    	function toggle() {
    		$$invalidate(0, visible = !visible);
    	}

    	function open() {
    		$$invalidate(0, visible = true);
    	}

    	function close() {
    		$$invalidate(0, visible = false);
    	}

    	let { $$slots = {}, $$scope } = $$props;

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(4, dropdown = $$value);
    		});
    	}

    	$$self.$set = $$props => {
    		if ("items" in $$props) $$invalidate(1, items = $$props.items);
    		if ("active" in $$props) $$invalidate(10, active = $$props.active);
    		if ("placement" in $$props) $$invalidate(11, placement = $$props.placement);
    		if ("visible" in $$props) $$invalidate(0, visible = $$props.visible);
    		if ("$$scope" in $$props) $$invalidate(18, $$scope = $$props.$$scope);
    	};

    	let active_set;
    	let is_active;
    	let top;
    	let bottom;
    	let left;
    	let right;

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*active*/ 1024) {
    			 $$invalidate(10, active = Number.isInteger(active) ? [active] : active);
    		}

    		if ($$self.$$.dirty[0] & /*active*/ 1024) {
    			 $$invalidate(13, active_set = new Set(active));
    		}

    		if ($$self.$$.dirty[0] & /*active_set*/ 8192) {
    			 $$invalidate(5, is_active = index => active_set.has(index));
    		}

    		if ($$self.$$.dirty[0] & /*placement*/ 2048) {
    			 $$invalidate(6, top = valid(placement) && placement.includes("top"));
    		}

    		if ($$self.$$.dirty[0] & /*placement*/ 2048) {
    			 $$invalidate(7, bottom = valid(placement) && placement.includes("bottom"));
    		}

    		if ($$self.$$.dirty[0] & /*placement*/ 2048) {
    			 $$invalidate(8, left = valid(placement) && placement.includes("Left"));
    		}

    		if ($$self.$$.dirty[0] & /*placement*/ 2048) {
    			 $$invalidate(9, right = valid(placement) && placement.includes("Right"));
    		}

    		if ($$self.$$.dirty[0] & /*visible*/ 1) {
    			 {
    				visible
    				? document.addEventListener("click", handleDocumentClick)
    				: document.removeEventListener("click", handleDocumentClick);
    			}
    		}
    	};

    	return [
    		visible,
    		items,
    		toggle,
    		close,
    		dropdown,
    		is_active,
    		top,
    		bottom,
    		left,
    		right,
    		active,
    		placement,
    		open,
    		active_set,
    		dispatch,
    		handleDocumentClick,
    		$$slots,
    		div1_binding,
    		$$scope
    	];
    }

    class Dropdown extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document_1.getElementById("svelte-qrzcn2-style")) add_css$1();

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			items: 1,
    			active: 10,
    			placement: 11,
    			visible: 0,
    			toggle: 2,
    			open: 12,
    			close: 3
    		});
    	}

    	get items() {
    		return this.$$.ctx[1];
    	}

    	set items(items) {
    		this.$set({ items });
    		flush();
    	}

    	get active() {
    		return this.$$.ctx[10];
    	}

    	set active(active) {
    		this.$set({ active });
    		flush();
    	}

    	get placement() {
    		return this.$$.ctx[11];
    	}

    	set placement(placement) {
    		this.$set({ placement });
    		flush();
    	}

    	get visible() {
    		return this.$$.ctx[0];
    	}

    	set visible(visible) {
    		this.$set({ visible });
    		flush();
    	}

    	get toggle() {
    		return this.$$.ctx[2];
    	}

    	get open() {
    		return this.$$.ctx[12];
    	}

    	get close() {
    		return this.$$.ctx[3];
    	}
    }

    Dropdown.Item = Item;

    return Dropdown;

})));
//# sourceMappingURL=Dropdown.js.map
