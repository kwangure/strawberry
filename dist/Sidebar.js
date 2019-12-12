(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Sidebar = factory());
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

    /* js/components/Sidebar/Item.svelte generated by Svelte v3.16.4 */

    function add_css() {
    	var style = element("style");
    	style.id = "svelte-1of14uc-style";
    	style.textContent = ".sidebar-item.svelte-1of14uc{cursor:pointer;background-color:transparent;border-radius:4px;position:relative}.sidebar-item.svelte-1of14uc{display:flex;min-height:40px;line-height:24px;text-decoration:none;padding:8px 12px}.sidebar-item.svelte-1of14uc:not(.active):hover{background-color:#f9f9f9}.sidebar-item.active.svelte-1of14uc{background-color:#e8f0fe;color:#2885ff}.sidebar-item+.sidebar-item.svelte-1of14uc{margin-top:3px}";
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
    			attr(div, "class", "sidebar-item svelte-1of14uc");
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
    		if (!document.getElementById("svelte-1of14uc-style")) add_css();
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

    /* js/components/Sidebar/Sidebar.svelte generated by Svelte v3.16.4 */

    function add_css$1() {
    	var style = element("style");
    	style.id = "svelte-a4lsv8-style";
    	style.textContent = ".sidebar.svelte-a4lsv8{width:240px;padding:0 10px;height:100%;display:flex;flex-direction:column;flex:none;user-select:none}.sidebar-items.svelte-a4lsv8{overflow:hidden;overflow-y:scroll}.sidebar-foot.svelte-a4lsv8{margin-top:auto}.sidebar-head.svelte-a4lsv8{display:block;min-height:40px;line-height:24px;text-decoration:none;padding:8px 12px}";
    	append(document.head, style);
    }

    const get_foot_slot_changes = dirty => ({});
    const get_foot_slot_context = ctx => ({});
    const get_item_slot_changes = dirty => ({ item: dirty[0] & /*items*/ 1 });

    const get_item_slot_context = ctx => ({
    	item: {
    		.../*item*/ ctx[3],
    		index: /*index*/ ctx[5]
    	}
    });

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    const get_head_slot_changes = dirty => ({});
    const get_head_slot_context = ctx => ({});

    // (17:8) {:else}
    function create_else_block(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

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
    			if (default_slot && default_slot.p && dirty[0] & /*$$scope*/ 4) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[2], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null));
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

    // (14:12) <Item on:click={item.onclick} active={item.active}>
    function create_default_slot(ctx) {
    	let t;
    	let current;
    	const item_slot_template = /*$$slots*/ ctx[1].item;
    	const item_slot = create_slot(item_slot_template, ctx, /*$$scope*/ ctx[2], get_item_slot_context);

    	return {
    		c() {
    			if (item_slot) item_slot.c();
    			t = space();
    		},
    		l(nodes) {
    			if (item_slot) item_slot.l(nodes);
    			t = claim_space(nodes);
    		},
    		m(target, anchor) {
    			if (item_slot) {
    				item_slot.m(target, anchor);
    			}

    			insert(target, t, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			if (item_slot && item_slot.p && dirty[0] & /*$$scope, items*/ 5) {
    				item_slot.p(get_slot_context(item_slot_template, ctx, /*$$scope*/ ctx[2], get_item_slot_context), get_slot_changes(item_slot_template, /*$$scope*/ ctx[2], dirty, get_item_slot_changes));
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(item_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(item_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (item_slot) item_slot.d(detaching);
    			if (detaching) detach(t);
    		}
    	};
    }

    // (13:8) {#each items as item, index}
    function create_each_block(ctx) {
    	let current;

    	const item = new Item({
    			props: {
    				active: /*item*/ ctx[3].active,
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			}
    		});

    	item.$on("click", /*item*/ ctx[3].onclick);

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
    			if (dirty[0] & /*items*/ 1) item_changes.active = /*item*/ ctx[3].active;

    			if (dirty[0] & /*$$scope, items*/ 5) {
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
    	let div3;
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div2;
    	let current;
    	const head_slot_template = /*$$slots*/ ctx[1].head;
    	const head_slot = create_slot(head_slot_template, ctx, /*$$scope*/ ctx[2], get_head_slot_context);
    	let each_value = /*items*/ ctx[0];
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

    	const foot_slot_template = /*$$slots*/ ctx[1].foot;
    	const foot_slot = create_slot(foot_slot_template, ctx, /*$$scope*/ ctx[2], get_foot_slot_context);

    	return {
    		c() {
    			div3 = element("div");
    			div0 = element("div");
    			if (head_slot) head_slot.c();
    			t0 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			div2 = element("div");
    			if (foot_slot) foot_slot.c();
    			this.h();
    		},
    		l(nodes) {
    			div3 = claim_element(nodes, "DIV", { class: true });
    			var div3_nodes = children(div3);
    			div0 = claim_element(div3_nodes, "DIV", { class: true });
    			var div0_nodes = children(div0);
    			if (head_slot) head_slot.l(div0_nodes);
    			div0_nodes.forEach(detach);
    			t0 = claim_space(div3_nodes);
    			div1 = claim_element(div3_nodes, "DIV", { class: true });
    			var div1_nodes = children(div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].l(div1_nodes);
    			}

    			div1_nodes.forEach(detach);
    			t1 = claim_space(div3_nodes);
    			div2 = claim_element(div3_nodes, "DIV", { class: true });
    			var div2_nodes = children(div2);
    			if (foot_slot) foot_slot.l(div2_nodes);
    			div2_nodes.forEach(detach);
    			div3_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(div0, "class", "sidebar-head svelte-a4lsv8");
    			attr(div1, "class", "sidebar-items svelte-a4lsv8");
    			attr(div2, "class", "sidebar-foot svelte-a4lsv8");
    			attr(div3, "class", "sidebar svelte-a4lsv8");
    		},
    		m(target, anchor) {
    			insert(target, div3, anchor);
    			append(div3, div0);

    			if (head_slot) {
    				head_slot.m(div0, null);
    			}

    			append(div3, t0);
    			append(div3, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			if (each_1_else) {
    				each_1_else.m(div1, null);
    			}

    			append(div3, t1);
    			append(div3, div2);

    			if (foot_slot) {
    				foot_slot.m(div2, null);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (head_slot && head_slot.p && dirty[0] & /*$$scope*/ 4) {
    				head_slot.p(get_slot_context(head_slot_template, ctx, /*$$scope*/ ctx[2], get_head_slot_context), get_slot_changes(head_slot_template, /*$$scope*/ ctx[2], dirty, get_head_slot_changes));
    			}

    			if (dirty[0] & /*items, $$scope*/ 5) {
    				each_value = /*items*/ ctx[0];
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
    						each_blocks[i].m(div1, null);
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
    				each_1_else.m(div1, null);
    			} else if (each_1_else) {
    				each_1_else.d(1);
    				each_1_else = null;
    			}

    			if (foot_slot && foot_slot.p && dirty[0] & /*$$scope*/ 4) {
    				foot_slot.p(get_slot_context(foot_slot_template, ctx, /*$$scope*/ ctx[2], get_foot_slot_context), get_slot_changes(foot_slot_template, /*$$scope*/ ctx[2], dirty, get_foot_slot_changes));
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(head_slot, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(foot_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(head_slot, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(foot_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div3);
    			if (head_slot) head_slot.d(detaching);
    			destroy_each(each_blocks, detaching);
    			if (each_1_else) each_1_else.d();
    			if (foot_slot) foot_slot.d(detaching);
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { items = [] } = $$props;
    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ("items" in $$props) $$invalidate(0, items = $$props.items);
    		if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	return [items, $$slots, $$scope];
    }

    class Sidebar extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-a4lsv8-style")) add_css$1();
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { items: 0 });
    	}

    	get items() {
    		return this.$$.ctx[0];
    	}

    	set items(items) {
    		this.$set({ items });
    		flush();
    	}
    }

    Sidebar.Item = Item;

    return Sidebar;

})));
//# sourceMappingURL=Sidebar.js.map
