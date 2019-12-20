(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Select = factory());
}(this, (function () { 'use strict';

    function noop() { }
    const identity = x => x;
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

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
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
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }
    class HtmlTag {
        constructor(html, anchor = null) {
            this.e = element('div');
            this.a = anchor;
            this.u(html);
        }
        m(target, anchor = null) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(target, this.n[i], anchor);
            }
            this.t = target;
        }
        u(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        p(html) {
            this.d();
            this.u(html);
            this.m(this.t, this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    let stylesheet;
    let active = 0;
    let current_rules = {};
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        if (!current_rules[name]) {
            if (!stylesheet) {
                const style = element('style');
                document.head.appendChild(style);
                stylesheet = style.sheet;
            }
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        node.style.animation = (node.style.animation || '')
            .split(', ')
            .filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        )
            .join(', ');
        if (name && !--active)
            clear_rules();
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            current_rules = {};
        });
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
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
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

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
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
    const null_transition = { duration: 0 };
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = program.b - t;
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    const globals = (typeof window !== 'undefined' ? window : global);

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
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

    // Material Design Icons v4.2.95
    var mdiChevronDown = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var fuzzy = createCommonjsModule(function (module, exports) {
    /*
     * Fuzzy
     * https://github.com/myork/fuzzy
     *
     * Copyright (c) 2012 Matt York
     * Licensed under the MIT license.
     */

    (function() {

    var fuzzy = {};

    // Use in node or in browser
    {
      module.exports = fuzzy;
    }

    // Return all elements of `array` that have a fuzzy
    // match against `pattern`.
    fuzzy.simpleFilter = function(pattern, array) {
      return array.filter(function(str) {
        return fuzzy.test(pattern, str);
      });
    };

    // Does `pattern` fuzzy match `str`?
    fuzzy.test = function(pattern, str) {
      return fuzzy.match(pattern, str) !== null;
    };

    // If `pattern` matches `str`, wrap each matching character
    // in `opts.pre` and `opts.post`. If no match, return null
    fuzzy.match = function(pattern, str, opts) {
      opts = opts || {};
      var patternIdx = 0
        , result = []
        , len = str.length
        , totalScore = 0
        , currScore = 0
        // prefix
        , pre = opts.pre || ''
        // suffix
        , post = opts.post || ''
        // String to compare against. This might be a lowercase version of the
        // raw string
        , compareString =  opts.caseSensitive && str || str.toLowerCase()
        , ch;

      pattern = opts.caseSensitive && pattern || pattern.toLowerCase();

      // For each character in the string, either add it to the result
      // or wrap in template if it's the next string in the pattern
      for(var idx = 0; idx < len; idx++) {
        ch = str[idx];
        if(compareString[idx] === pattern[patternIdx]) {
          ch = pre + ch + post;
          patternIdx += 1;

          // consecutive characters should increase the score more than linearly
          currScore += 1 + currScore;
        } else {
          currScore = 0;
        }
        totalScore += currScore;
        result[result.length] = ch;
      }

      // return rendered string if we have a match for every char
      if(patternIdx === pattern.length) {
        // if the string is an exact match with pattern, totalScore should be maxed
        totalScore = (compareString === pattern) ? Infinity : totalScore;
        return {rendered: result.join(''), score: totalScore};
      }

      return null;
    };

    // The normal entry point. Filters `arr` for matches against `pattern`.
    // It returns an array with matching values of the type:
    //
    //     [{
    //         string:   '<b>lah' // The rendered string
    //       , index:    2        // The index of the element in `arr`
    //       , original: 'blah'   // The original element in `arr`
    //     }]
    //
    // `opts` is an optional argument bag. Details:
    //
    //    opts = {
    //        // string to put before a matching character
    //        pre:     '<b>'
    //
    //        // string to put after matching character
    //      , post:    '</b>'
    //
    //        // Optional function. Input is an entry in the given arr`,
    //        // output should be the string to test `pattern` against.
    //        // In this example, if `arr = [{crying: 'koala'}]` we would return
    //        // 'koala'.
    //      , extract: function(arg) { return arg.crying; }
    //    }
    fuzzy.filter = function(pattern, arr, opts) {
      if(!arr || arr.length === 0) {
        return [];
      }
      if (typeof pattern !== 'string') {
        return arr;
      }
      opts = opts || {};
      return arr
        .reduce(function(prev, element, idx, arr) {
          var str = element;
          if(opts.extract) {
            str = opts.extract(element);
          }
          var rendered = fuzzy.match(pattern, str, opts);
          if(rendered != null) {
            prev[prev.length] = {
                string: rendered.rendered
              , score: rendered.score
              , index: idx
              , original: element
            };
          }
          return prev;
        }, [])

        // Sort by score. Browsers are inconsistent wrt stable/unstable
        // sorting, so force stable by using the index in the case of tie.
        // See http://ofb.net/~sethml/is-sort-stable.html
        .sort(function(a,b) {
          var compare = b.score - a.score;
          if(compare) return compare;
          return a.index - b.index;
        });
    };


    }());
    });

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

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function slide(node, { delay = 0, duration = 400, easing = cubicOut }) {
        const style = getComputedStyle(node);
        const opacity = +style.opacity;
        const height = parseFloat(style.height);
        const padding_top = parseFloat(style.paddingTop);
        const padding_bottom = parseFloat(style.paddingBottom);
        const margin_top = parseFloat(style.marginTop);
        const margin_bottom = parseFloat(style.marginBottom);
        const border_top_width = parseFloat(style.borderTopWidth);
        const border_bottom_width = parseFloat(style.borderBottomWidth);
        return {
            delay,
            duration,
            easing,
            css: t => `overflow: hidden;` +
                `opacity: ${Math.min(t * 20, 1) * opacity};` +
                `height: ${t * height}px;` +
                `padding-top: ${t * padding_top}px;` +
                `padding-bottom: ${t * padding_bottom}px;` +
                `margin-top: ${t * margin_top}px;` +
                `margin-bottom: ${t * margin_bottom}px;` +
                `border-top-width: ${t * border_top_width}px;` +
                `border-bottom-width: ${t * border_bottom_width}px;`
        };
    }

    /* js/components/Select/Autocomplete/Item.svelte generated by Svelte v3.16.4 */

    function add_css$1() {
    	var style = element("style");
    	style.id = "svelte-11452jr-style";
    	style.textContent = ".menu-item.svelte-11452jr{--vertical-padding:8px;--horizontal-padding:16px}.menu-item.svelte-11452jr{clear:both;font-weight:normal;font-size:14px;line-height:22px;white-space:nowrap;cursor:pointer;transition:all .3s;min-width:130px;background-color:#fff}.menu-item.svelte-11452jr b{color:#1870ff;font-weight:500}.menu-item.svelte-11452jr:not(.linked){padding:8px 16px}.menu-item.svelte-11452jr a{display:flex;padding:var(--vertical-padding) var(--horizontal-padding);margin:calc(-1 * var(--vertical-padding)) calc(-1 * var(--horizontal-padding));text-decoration:none;color:inherit}.menu-item.svelte-11452jr:hover{color:#1870ff;background-color:#deeaff}";
    	append(document.head, style);
    }

    function create_fragment$1(ctx) {
    	let div;
    	let div_transition;
    	let current;
    	let dispose;
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
    			attr(div, "class", "menu-item svelte-11452jr");
    			dispose = listen(div, "click", /*click_handler*/ ctx[2]);
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

    			add_render_callback(() => {
    				if (!div_transition) div_transition = create_bidirectional_transition(div, slide, {}, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			if (!div_transition) div_transition = create_bidirectional_transition(div, slide, {}, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching && div_transition) div_transition.end();
    			dispose();
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots = {}, $$scope } = $$props;

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, $$slots, click_handler];
    }

    class Item extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-11452jr-style")) add_css$1();
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
    	}
    }

    /* js/components/Select/Autocomplete/Autocomplete.svelte generated by Svelte v3.16.4 */

    const { document: document_1 } = globals;

    function add_css$2() {
    	var style = element("style");
    	style.id = "svelte-16j0szf-style";
    	style.textContent = ".wrapper.svelte-16j0szf{display:inline-block;position:relative;width:100%;line-height:1.5}.wrapper.svelte-16j0szf{--vertical-padding:5px;--horizontal-padding:12px;--padding-right:25px;--vertical-padding-focus:calc(var(--vertical-padding) - 1px);--horizontal-padding-focus:calc(var(--horizontal-padding) - 1px);--padding-right-focus:calc(var(--padding-right) - 1px)}input.svelte-16j0szf{text-align:inherit;display:inline-block;padding:var(--vertical-padding) var(--horizontal-padding);padding-right:var(--padding-right);color:rgba(0,0,0,0.65);font-size:14px;line-height:1.5;background-color:#fff;background-image:none;border:1px solid #d9d9d9;border-radius:4px;width:100%;height:35px}input.svelte-16j0szf:hover{border-color:#aaa}input.svelte-16j0szf:focus{border:2px solid #1870ff;outline:0;padding:var(--vertical-padding-focus) var(--horizontal-padding-focus);padding-right:var(--padding-right-focus)}.dropdown-button.svelte-16j0szf{display:inline-block}.dropdown-menu.svelte-16j0szf{position:absolute;margin-top:5px;background-color:#fff;border-radius:4px;outline:none;box-shadow:0 2px 8px rgba(0,0,0,0.15);z-index:100;overflow:hidden}.dropdown-menu.top.svelte-16j0szf{margin-bottom:5px;bottom:100%}.dropdown-menu.bottom.svelte-16j0szf{margin-top:5px;top:100%}.dropdown-menu.left.svelte-16j0szf{left:0}.dropdown-menu.right.svelte-16j0szf{right:0}.menu-item>.svelte-16j0szf{display:block}.input-postfix.svelte-16j0szf{position:absolute;top:2px;right:2px;height:31px;z-index:2;color:rgba(0,0,0,0.65);display:flex;align-items:center;border-radius:0 2px 2px 0;padding:4px}.input-postfix.visible.svelte-16j0szf{color:#1870ff;background-color:#deeaff}";
    	append(document_1.head, style);
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[39] = list[i];
    	child_ctx[41] = i;
    	return child_ctx;
    }

    // (82:4) {#if visible}
    function create_if_block(ctx) {
    	let div;
    	let t;
    	let current;
    	let dispose;
    	let if_block = /*fallback*/ ctx[0] && create_if_block_1(ctx);
    	let each_value = /*filtered_options*/ ctx[18];
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
    			if (if_block) if_block.c();
    			t = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			this.h();
    		},
    		l(nodes) {
    			div = claim_element(nodes, "DIV", { class: true });
    			var div_nodes = children(div);
    			if (if_block) if_block.l(div_nodes);
    			t = claim_space(div_nodes);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].l(div_nodes);
    			}

    			div_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(div, "class", "dropdown-menu svelte-16j0szf");
    			toggle_class(div, "bottom", /*bottom*/ ctx[15]);
    			toggle_class(div, "left", /*left*/ ctx[16]);
    			toggle_class(div, "right", /*right*/ ctx[17]);
    			toggle_class(div, "top", /*top*/ ctx[14]);
    			dispose = listen(div, "click", /*close*/ ctx[8]);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			append(div, t);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			if (each_1_else) {
    				each_1_else.m(div, null);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (/*fallback*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, t);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (dirty[0] & /*set, filtered_options, extract*/ 786944 | dirty[1] & /*$$scope*/ 128) {
    				each_value = /*filtered_options*/ ctx[18];
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

    			if (dirty[0] & /*bottom*/ 32768) {
    				toggle_class(div, "bottom", /*bottom*/ ctx[15]);
    			}

    			if (dirty[0] & /*left*/ 65536) {
    				toggle_class(div, "left", /*left*/ ctx[16]);
    			}

    			if (dirty[0] & /*right*/ 131072) {
    				toggle_class(div, "right", /*right*/ ctx[17]);
    			}

    			if (dirty[0] & /*top*/ 16384) {
    				toggle_class(div, "top", /*top*/ ctx[14]);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (if_block) if_block.d();
    			destroy_each(each_blocks, detaching);
    			if (each_1_else) each_1_else.d();
    			dispose();
    		}
    	};
    }

    // (85:12) {#if fallback}
    function create_if_block_1(ctx) {
    	let current;

    	const item = new Item({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			}
    		});

    	item.$on("click", /*click_handler*/ ctx[35]);

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

    			if (dirty[0] & /*fallback*/ 1 | dirty[1] & /*$$scope*/ 128) {
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

    // (86:16) <Item on:click={() => set(fallback)}>
    function create_default_slot_1(ctx) {
    	let t_value = /*extract*/ ctx[19](/*fallback*/ ctx[0]) + "";
    	let t;

    	return {
    		c() {
    			t = text(t_value);
    		},
    		l(nodes) {
    			t = claim_text(nodes, t_value);
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*fallback*/ 1 && t_value !== (t_value = /*extract*/ ctx[19](/*fallback*/ ctx[0]) + "")) set_data(t, t_value);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (94:12) {:else}
    function create_else_block(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[26].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[38], null);

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
    			if (default_slot && default_slot.p && dirty[1] & /*$$scope*/ 128) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[38], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[38], dirty, null));
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

    // (91:16) <Item on:click={() => set(option)}>
    function create_default_slot(ctx) {
    	let html_tag;
    	let raw_value = /*extract*/ ctx[19](/*option*/ ctx[39]) + "";
    	let t;

    	return {
    		c() {
    			t = space();
    			this.h();
    		},
    		l(nodes) {
    			t = claim_space(nodes);
    			this.h();
    		},
    		h() {
    			html_tag = new HtmlTag(raw_value, t);
    		},
    		m(target, anchor) {
    			html_tag.m(target, anchor);
    			insert(target, t, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*filtered_options*/ 262144 && raw_value !== (raw_value = /*extract*/ ctx[19](/*option*/ ctx[39]) + "")) html_tag.p(raw_value);
    		},
    		d(detaching) {
    			if (detaching) html_tag.d();
    			if (detaching) detach(t);
    		}
    	};
    }

    // (90:12) {#each filtered_options as option, index}
    function create_each_block(ctx) {
    	let current;

    	function click_handler_1(...args) {
    		return /*click_handler_1*/ ctx[36](/*option*/ ctx[39], ...args);
    	}

    	const item = new Item({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			}
    		});

    	item.$on("click", click_handler_1);

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
    		p(new_ctx, dirty) {
    			ctx = new_ctx;
    			const item_changes = {};

    			if (dirty[0] & /*filtered_options*/ 262144 | dirty[1] & /*$$scope*/ 128) {
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

    function create_fragment$2(ctx) {
    	let div2;
    	let div1;
    	let input_1;
    	let t0;
    	let div0;
    	let t1;
    	let current;
    	let dispose;
    	const icon_1 = new Icon({ props: { path: mdiChevronDown } });
    	let if_block = /*visible*/ ctx[12] && create_if_block(ctx);

    	return {
    		c() {
    			div2 = element("div");
    			div1 = element("div");
    			input_1 = element("input");
    			t0 = space();
    			div0 = element("div");
    			create_component(icon_1.$$.fragment);
    			t1 = space();
    			if (if_block) if_block.c();
    			this.h();
    		},
    		l(nodes) {
    			div2 = claim_element(nodes, "DIV", { class: true });
    			var div2_nodes = children(div2);
    			div1 = claim_element(div2_nodes, "DIV", { class: true });
    			var div1_nodes = children(div1);

    			input_1 = claim_element(div1_nodes, "INPUT", {
    				autofocus: true,
    				disabled: true,
    				placeholder: true,
    				placeholder: true,
    				type: true,
    				class: true
    			});

    			t0 = claim_space(div1_nodes);
    			div0 = claim_element(div1_nodes, "DIV", { class: true });
    			var div0_nodes = children(div0);
    			claim_component(icon_1.$$.fragment, div0_nodes);
    			div0_nodes.forEach(detach);
    			div1_nodes.forEach(detach);
    			t1 = claim_space(div2_nodes);
    			if (if_block) if_block.l(div2_nodes);
    			div2_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			input_1.autofocus = /*autofocus*/ ctx[5];
    			input_1.disabled = /*disabled*/ ctx[4];
    			attr(input_1, "placeholder", /*label*/ ctx[1]);
    			attr(input_1, "placeholder", /*placeholder*/ ctx[2]);
    			attr(input_1, "type", "text");
    			attr(input_1, "class", "svelte-16j0szf");
    			toggle_class(input_1, "icon", /*icon*/ ctx[3]);
    			attr(div0, "class", "input-postfix svelte-16j0szf");
    			toggle_class(div0, "visible", /*visible*/ ctx[12]);
    			attr(div1, "class", "dropdown-button svelte-16j0szf");
    			attr(div2, "class", "wrapper svelte-16j0szf");

    			dispose = [
    				listen(input_1, "input", /*input_1_input_handler*/ ctx[33]),
    				listen(input_1, "blur", /*blur_handler*/ ctx[27]),
    				listen(input_1, "change", /*change_handler*/ ctx[28]),
    				listen(input_1, "input", /*input_handler*/ ctx[29]),
    				listen(input_1, "keypress", /*keypress_handler*/ ctx[30]),
    				listen(input_1, "focus", /*focus_handler*/ ctx[31]),
    				listen(input_1, "focus", /*open*/ ctx[7]),
    				listen(input_1, "keydown", /*keydown_handler*/ ctx[32]),
    				listen(div0, "click", stop_propagation(/*toggle*/ ctx[6]))
    			];
    		},
    		m(target, anchor) {
    			insert(target, div2, anchor);
    			append(div2, div1);
    			append(div1, input_1);
    			set_input_value(input_1, /*text*/ ctx[13]);
    			/*input_1_binding*/ ctx[34](input_1);
    			append(div1, t0);
    			append(div1, div0);
    			mount_component(icon_1, div0, null);
    			append(div2, t1);
    			if (if_block) if_block.m(div2, null);
    			/*div2_binding*/ ctx[37](div2);
    			current = true;
    		},
    		p(ctx, dirty) {
    			if (!current || dirty[0] & /*autofocus*/ 32) {
    				input_1.autofocus = /*autofocus*/ ctx[5];
    			}

    			if (!current || dirty[0] & /*disabled*/ 16) {
    				input_1.disabled = /*disabled*/ ctx[4];
    			}

    			if (!current || dirty[0] & /*label*/ 2) {
    				attr(input_1, "placeholder", /*label*/ ctx[1]);
    			}

    			if (!current || dirty[0] & /*placeholder*/ 4) {
    				attr(input_1, "placeholder", /*placeholder*/ ctx[2]);
    			}

    			if (dirty[0] & /*text*/ 8192 && input_1.value !== /*text*/ ctx[13]) {
    				set_input_value(input_1, /*text*/ ctx[13]);
    			}

    			if (dirty[0] & /*icon*/ 8) {
    				toggle_class(input_1, "icon", /*icon*/ ctx[3]);
    			}

    			if (dirty[0] & /*visible*/ 4096) {
    				toggle_class(div0, "visible", /*visible*/ ctx[12]);
    			}

    			if (/*visible*/ ctx[12]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div2, null);
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
    			transition_in(icon_1.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(icon_1.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div2);
    			/*input_1_binding*/ ctx[34](null);
    			destroy_component(icon_1);
    			if (if_block) if_block.d();
    			/*div2_binding*/ ctx[37](null);
    			run_all(dispose);
    		}
    	};
    }

    function valid(placement) {
    	let positions = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
    	return positions.includes(placement);
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { options = [] } = $$props;
    	let { placement = "bottomLeft" } = $$props;
    	let { fallback = "" } = $$props;
    	let { value = "" } = $$props;
    	let { label = "" } = $$props;
    	let { placeholder = "" } = $$props;
    	let { icon = "" } = $$props;
    	let { disabled = false } = $$props;
    	let { autofocus = false } = $$props;
    	let dropdown = null;
    	let input = null;
    	let visible = false;
    	let extract = option => option.html || option.text || option.value;
    	let text = fallback ? extract(fallback) : "";
    	let fuzzy_options = { pre: "<b>", post: "</b>", extract };

    	function toggle() {
    		$$invalidate(12, visible = !visible);
    		visible ? input.focus() : "";
    	}

    	function open() {
    		$$invalidate(12, visible = true);
    		input.setSelectionRange(0, input.value.length);
    	}

    	function close() {
    		$$invalidate(12, visible = false);
    	}

    	function set(option) {
    		$$invalidate(20, value = option.value);
    		$$invalidate(13, text = option.text || option.value);
    	}

    	function handleDocumentClick(e) {
    		if (!dropdown.contains(event.target)) {
    			$$invalidate(12, visible = false);
    		}
    	}

    	let { $$slots = {}, $$scope } = $$props;

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

    	function input_1_input_handler() {
    		text = this.value;
    		$$invalidate(13, text);
    	}

    	function input_1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(11, input = $$value);
    		});
    	}

    	const click_handler = () => set(fallback);
    	const click_handler_1 = option => set(option);

    	function div2_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(10, dropdown = $$value);
    		});
    	}

    	$$self.$set = $$props => {
    		if ("options" in $$props) $$invalidate(21, options = $$props.options);
    		if ("placement" in $$props) $$invalidate(22, placement = $$props.placement);
    		if ("fallback" in $$props) $$invalidate(0, fallback = $$props.fallback);
    		if ("value" in $$props) $$invalidate(20, value = $$props.value);
    		if ("label" in $$props) $$invalidate(1, label = $$props.label);
    		if ("placeholder" in $$props) $$invalidate(2, placeholder = $$props.placeholder);
    		if ("icon" in $$props) $$invalidate(3, icon = $$props.icon);
    		if ("disabled" in $$props) $$invalidate(4, disabled = $$props.disabled);
    		if ("autofocus" in $$props) $$invalidate(5, autofocus = $$props.autofocus);
    		if ("$$scope" in $$props) $$invalidate(38, $$scope = $$props.$$scope);
    	};

    	let top;
    	let bottom;
    	let left;
    	let right;
    	let search;
    	let filtered_options;

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*placement*/ 4194304) {
    			 $$invalidate(14, top = valid(placement) && placement.includes("top"));
    		}

    		if ($$self.$$.dirty[0] & /*placement*/ 4194304) {
    			 $$invalidate(15, bottom = valid(placement) && placement.includes("bottom"));
    		}

    		if ($$self.$$.dirty[0] & /*placement*/ 4194304) {
    			 $$invalidate(16, left = valid(placement) && placement.includes("Left"));
    		}

    		if ($$self.$$.dirty[0] & /*placement*/ 4194304) {
    			 $$invalidate(17, right = valid(placement) && placement.includes("Right"));
    		}

    		if ($$self.$$.dirty[0] & /*text, fallback*/ 8193) {
    			 $$invalidate(23, search = text === extract(fallback) ? "" : text);
    		}

    		if ($$self.$$.dirty[0] & /*search, options*/ 10485760) {
    			 $$invalidate(18, filtered_options = fuzzy.filter(search, options, fuzzy_options).map(({ string, original, ...rest }) => ({ ...original, html: string })));
    		}

    		if ($$self.$$.dirty[0] & /*visible*/ 4096) {
    			 {
    				visible
    				? document.addEventListener("click", handleDocumentClick)
    				: document.removeEventListener("click", handleDocumentClick);
    			}
    		}
    	};

    	return [
    		fallback,
    		label,
    		placeholder,
    		icon,
    		disabled,
    		autofocus,
    		toggle,
    		open,
    		close,
    		set,
    		dropdown,
    		input,
    		visible,
    		text,
    		top,
    		bottom,
    		left,
    		right,
    		filtered_options,
    		extract,
    		value,
    		options,
    		placement,
    		search,
    		fuzzy_options,
    		handleDocumentClick,
    		$$slots,
    		blur_handler,
    		change_handler,
    		input_handler,
    		keypress_handler,
    		focus_handler,
    		keydown_handler,
    		input_1_input_handler,
    		input_1_binding,
    		click_handler,
    		click_handler_1,
    		div2_binding,
    		$$scope
    	];
    }

    class Autocomplete extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document_1.getElementById("svelte-16j0szf-style")) add_css$2();

    		init(
    			this,
    			options,
    			instance$2,
    			create_fragment$2,
    			safe_not_equal,
    			{
    				options: 21,
    				placement: 22,
    				fallback: 0,
    				value: 20,
    				label: 1,
    				placeholder: 2,
    				icon: 3,
    				disabled: 4,
    				autofocus: 5,
    				toggle: 6,
    				open: 7,
    				close: 8,
    				set: 9
    			},
    			[-1, -1]
    		);
    	}

    	get options() {
    		return this.$$.ctx[21];
    	}

    	set options(options) {
    		this.$set({ options });
    		flush();
    	}

    	get placement() {
    		return this.$$.ctx[22];
    	}

    	set placement(placement) {
    		this.$set({ placement });
    		flush();
    	}

    	get fallback() {
    		return this.$$.ctx[0];
    	}

    	set fallback(fallback) {
    		this.$set({ fallback });
    		flush();
    	}

    	get value() {
    		return this.$$.ctx[20];
    	}

    	set value(value) {
    		this.$set({ value });
    		flush();
    	}

    	get label() {
    		return this.$$.ctx[1];
    	}

    	set label(label) {
    		this.$set({ label });
    		flush();
    	}

    	get placeholder() {
    		return this.$$.ctx[2];
    	}

    	set placeholder(placeholder) {
    		this.$set({ placeholder });
    		flush();
    	}

    	get icon() {
    		return this.$$.ctx[3];
    	}

    	set icon(icon) {
    		this.$set({ icon });
    		flush();
    	}

    	get disabled() {
    		return this.$$.ctx[4];
    	}

    	set disabled(disabled) {
    		this.$set({ disabled });
    		flush();
    	}

    	get autofocus() {
    		return this.$$.ctx[5];
    	}

    	set autofocus(autofocus) {
    		this.$set({ autofocus });
    		flush();
    	}

    	get toggle() {
    		return this.$$.ctx[6];
    	}

    	get open() {
    		return this.$$.ctx[7];
    	}

    	get close() {
    		return this.$$.ctx[8];
    	}

    	get set() {
    		return this.$$.ctx[9];
    	}
    }

    Autocomplete.Item = Item;

    /* js/components/Select/Option.svelte generated by Svelte v3.16.4 */

    function add_css$3() {
    	var style = element("style");
    	style.id = "svelte-11452jr-style";
    	style.textContent = ".menu-item.svelte-11452jr{--vertical-padding:8px;--horizontal-padding:16px}.menu-item.svelte-11452jr{clear:both;font-weight:normal;font-size:14px;line-height:22px;white-space:nowrap;cursor:pointer;transition:all .3s;min-width:130px;background-color:#fff}.menu-item.svelte-11452jr b{color:#1870ff;font-weight:500}.menu-item.svelte-11452jr:not(.linked){padding:8px 16px}.menu-item.svelte-11452jr a{display:flex;padding:var(--vertical-padding) var(--horizontal-padding);margin:calc(-1 * var(--vertical-padding)) calc(-1 * var(--horizontal-padding));text-decoration:none;color:inherit}.menu-item.svelte-11452jr:hover{color:#1870ff;background-color:#deeaff}";
    	append(document.head, style);
    }

    function create_fragment$3(ctx) {
    	let div;
    	let div_transition;
    	let current;
    	let dispose;
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
    			attr(div, "class", "menu-item svelte-11452jr");
    			dispose = listen(div, "click", /*click_handler*/ ctx[2]);
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

    			add_render_callback(() => {
    				if (!div_transition) div_transition = create_bidirectional_transition(div, slide, {}, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			if (!div_transition) div_transition = create_bidirectional_transition(div, slide, {}, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching && div_transition) div_transition.end();
    			dispose();
    		}
    	};
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots = {}, $$scope } = $$props;

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, $$slots, click_handler];
    }

    class Option extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-11452jr-style")) add_css$3();
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});
    	}
    }

    /* js/components/Dropdown/Item.svelte generated by Svelte v3.16.4 */

    function add_css$4() {
    	var style = element("style");
    	style.id = "svelte-eb77km-style";
    	style.textContent = ".menu-item.svelte-eb77km{--vertical-padding:8px;--horizontal-padding:16px}.menu-item.svelte-eb77km{clear:both;font-weight:normal;font-size:14px;line-height:22px;white-space:nowrap;cursor:pointer;transition:all .3s;min-width:130px;background-color:#fff}.menu-item.svelte-eb77km:not(.linked){padding:8px 16px}.menu-item.svelte-eb77km a{display:flex;padding:var(--vertical-padding) var(--horizontal-padding);margin:calc(-1 * var(--vertical-padding)) calc(-1 * var(--horizontal-padding));text-decoration:none;color:inherit}.menu-item.active.svelte-eb77km,.menu-item.svelte-eb77km:hover{color:#1870ff;background-color:#deeaff}";
    	append(document.head, style);
    }

    function create_fragment$4(ctx) {
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

    function instance$4($$self, $$props, $$invalidate) {
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

    class Item$1 extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-eb77km-style")) add_css$4();
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { active: 0 });
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

    const { document: document_1$1 } = globals;

    function add_css$5() {
    	var style = element("style");
    	style.id = "svelte-qrzcn2-style";
    	style.textContent = ".dropdown.svelte-qrzcn2{position:relative;display:inline-block}.dropdown-button.svelte-qrzcn2{display:inline-block}.dropdown-menu.svelte-qrzcn2{position:absolute;margin-top:5px;background-color:#fff;border-radius:4px;outline:none;box-shadow:0 2px 8px rgba(0,0,0,0.15);z-index:100;overflow:hidden}.dropdown-menu.top.svelte-qrzcn2{margin-bottom:5px;bottom:100%}.dropdown-menu.bottom.svelte-qrzcn2{margin-top:5px;top:100%}.dropdown-menu.left.svelte-qrzcn2{left:0}.dropdown-menu.right.svelte-qrzcn2{right:0}.menu-item>.svelte-qrzcn2{display:block}";
    	append(document_1$1.head, style);
    }

    const get_menu_slot_changes = dirty => ({ item: dirty[0] & /*items*/ 2 });

    const get_menu_slot_context = ctx => ({
    	item: {
    		.../*item*/ ctx[19],
    		index: /*index*/ ctx[21]
    	}
    });

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[19] = list[i];
    	child_ctx[21] = i;
    	return child_ctx;
    }

    const get_button_slot_changes = dirty => ({});
    const get_button_slot_context = ctx => ({});

    // (55:4) {#if visible}
    function create_if_block$1(ctx) {
    	let div;
    	let current;
    	let dispose;
    	let each_value = /*items*/ ctx[1];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	let each_1_else = null;

    	if (!each_value.length) {
    		each_1_else = create_else_block$1(ctx);
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
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
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
    				each_1_else = create_else_block$1(ctx);
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
    function create_else_block$1(ctx) {
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
    function create_default_slot$1(ctx) {
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
    function create_each_block$1(ctx) {
    	let current;

    	const item = new Item$1({
    			props: {
    				active: /*is_active*/ ctx[5](/*index*/ ctx[21]),
    				$$slots: { default: [create_default_slot$1] },
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

    function create_fragment$5(ctx) {
    	let div1;
    	let div0;
    	let t;
    	let current;
    	let dispose;
    	const button_slot_template = /*$$slots*/ ctx[16].button;
    	const button_slot = create_slot(button_slot_template, ctx, /*$$scope*/ ctx[18], get_button_slot_context);
    	let if_block = /*visible*/ ctx[0] && create_if_block$1(ctx);

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
    					if_block = create_if_block$1(ctx);
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

    function valid$1(placement) {
    	let positions = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
    	return positions.includes(placement);
    }

    function instance$5($$self, $$props, $$invalidate) {
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
    			 $$invalidate(6, top = valid$1(placement) && placement.includes("top"));
    		}

    		if ($$self.$$.dirty[0] & /*placement*/ 2048) {
    			 $$invalidate(7, bottom = valid$1(placement) && placement.includes("bottom"));
    		}

    		if ($$self.$$.dirty[0] & /*placement*/ 2048) {
    			 $$invalidate(8, left = valid$1(placement) && placement.includes("Left"));
    		}

    		if ($$self.$$.dirty[0] & /*placement*/ 2048) {
    			 $$invalidate(9, right = valid$1(placement) && placement.includes("Right"));
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
    		if (!document_1$1.getElementById("svelte-qrzcn2-style")) add_css$5();

    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
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

    Dropdown.Item = Item$1;

    /* js/components/Select/Select.svelte generated by Svelte v3.16.4 */

    function add_css$6() {
    	var style = element("style");
    	style.id = "svelte-tdjane-style";
    	style.textContent = ".wrapper.svelte-tdjane{--vertical-padding:5px;--horizontal-padding:12px;--padding-right:25px;--vertical-padding-focus:calc(var(--vertical-padding) - 1px);--horizontal-padding-focus:calc(var(--horizontal-padding) - 1px);--padding-right-focus:calc(var(--padding-right) - 1px)}input.svelte-tdjane{text-align:inherit;display:inline-block;padding:var(--vertical-padding) var(--horizontal-padding);padding-right:var(--padding-right);color:rgba(0,0,0,0.65);font-size:14px;line-height:1.5;background-color:#fff;background-image:none;border:1px solid #d9d9d9;border-radius:4px;width:100%;height:35px}.wrapper.svelte-tdjane:hover input.svelte-tdjane{border-color:#aaa}input.svelte-tdjane:focus{border:2px solid #1870ff !important;outline:0;padding:var(--vertical-padding-focus) var(--horizontal-padding-focus);padding-right:var(--padding-right-focus)}.input-postfix.svelte-tdjane{position:absolute;top:2px;right:2px;height:31px;z-index:2;color:rgba(0,0,0,0.65);display:flex;align-items:center;border-radius:0 2px 2px 0;padding:4px}.input-postfix.visible.svelte-tdjane{color:#1870ff;background-color:#deeaff}";
    	append(document.head, style);
    }

    // (39:4) <div slot="button" class="wrapper">
    function create_button_slot(ctx) {
    	let div0;
    	let input_1;
    	let t;
    	let div1;
    	let current;
    	let dispose;
    	const icon_1 = new Icon({ props: { path: mdiChevronDown } });

    	return {
    		c() {
    			div0 = element("div");
    			input_1 = element("input");
    			t = space();
    			div1 = element("div");
    			create_component(icon_1.$$.fragment);
    			this.h();
    		},
    		l(nodes) {
    			div0 = claim_element(nodes, "DIV", { slot: true, class: true });
    			var div0_nodes = children(div0);

    			input_1 = claim_element(div0_nodes, "INPUT", {
    				autofocus: true,
    				disabled: true,
    				placeholder: true,
    				readonly: true,
    				type: true,
    				class: true
    			});

    			t = claim_space(div0_nodes);
    			div1 = claim_element(div0_nodes, "DIV", { class: true });
    			var div1_nodes = children(div1);
    			claim_component(icon_1.$$.fragment, div1_nodes);
    			div1_nodes.forEach(detach);
    			div0_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			input_1.autofocus = /*autofocus*/ ctx[6];
    			input_1.disabled = /*disabled*/ ctx[5];
    			attr(input_1, "placeholder", /*label*/ ctx[3]);
    			input_1.readOnly = true;
    			attr(input_1, "type", "text");
    			attr(input_1, "class", "svelte-tdjane");
    			toggle_class(input_1, "icon", /*icon*/ ctx[4]);
    			attr(div1, "class", "input-postfix svelte-tdjane");
    			toggle_class(div1, "visible", /*visible*/ ctx[8]);
    			attr(div0, "slot", "button");
    			attr(div0, "class", "wrapper svelte-tdjane");

    			dispose = [
    				listen(input_1, "input", /*input_1_input_handler*/ ctx[19]),
    				listen(input_1, "blur", /*blur_handler*/ ctx[13]),
    				listen(input_1, "change", /*change_handler*/ ctx[14]),
    				listen(input_1, "input", /*input_handler*/ ctx[15]),
    				listen(input_1, "keypress", /*keypress_handler*/ ctx[16]),
    				listen(input_1, "focus", /*focus_handler*/ ctx[17]),
    				listen(input_1, "keydown", /*keydown_handler*/ ctx[18])
    			];
    		},
    		m(target, anchor) {
    			insert(target, div0, anchor);
    			append(div0, input_1);
    			set_input_value(input_1, /*text*/ ctx[9]);
    			/*input_1_binding*/ ctx[20](input_1);
    			append(div0, t);
    			append(div0, div1);
    			mount_component(icon_1, div1, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			if (!current || dirty[0] & /*autofocus*/ 64) {
    				input_1.autofocus = /*autofocus*/ ctx[6];
    			}

    			if (!current || dirty[0] & /*disabled*/ 32) {
    				input_1.disabled = /*disabled*/ ctx[5];
    			}

    			if (!current || dirty[0] & /*label*/ 8) {
    				attr(input_1, "placeholder", /*label*/ ctx[3]);
    			}

    			if (dirty[0] & /*text*/ 512 && input_1.value !== /*text*/ ctx[9]) {
    				set_input_value(input_1, /*text*/ ctx[9]);
    			}

    			if (dirty[0] & /*icon*/ 16) {
    				toggle_class(input_1, "icon", /*icon*/ ctx[4]);
    			}

    			if (dirty[0] & /*visible*/ 256) {
    				toggle_class(div1, "visible", /*visible*/ ctx[8]);
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
    			if (detaching) detach(div0);
    			/*input_1_binding*/ ctx[20](null);
    			destroy_component(icon_1);
    			run_all(dispose);
    		}
    	};
    }

    // (48:4) <div slot="menu" let:item={option}>
    function create_menu_slot(ctx) {
    	let div;
    	let t_value = /*extract*/ ctx[10](/*option*/ ctx[25]) + "";
    	let t;

    	return {
    		c() {
    			div = element("div");
    			t = text(t_value);
    			this.h();
    		},
    		l(nodes) {
    			div = claim_element(nodes, "DIV", { slot: true });
    			var div_nodes = children(div);
    			t = claim_text(div_nodes, t_value);
    			div_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(div, "slot", "menu");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, t);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*option*/ 33554432 && t_value !== (t_value = /*extract*/ ctx[10](/*option*/ ctx[25]) + "")) set_data(t, t_value);
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (38:0) <Dropdown bind:items={options} bind:placement bind:visible bind:active>
    function create_default_slot$2(ctx) {
    	let t;

    	return {
    		c() {
    			t = space();
    		},
    		l(nodes) {
    			t = claim_space(nodes);
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    function create_fragment$6(ctx) {
    	let updating_items;
    	let updating_placement;
    	let updating_visible;
    	let updating_active;
    	let current;

    	function dropdown_1_items_binding(value_1) {
    		/*dropdown_1_items_binding*/ ctx[21].call(null, value_1);
    	}

    	function dropdown_1_placement_binding(value_2) {
    		/*dropdown_1_placement_binding*/ ctx[22].call(null, value_2);
    	}

    	function dropdown_1_visible_binding(value_3) {
    		/*dropdown_1_visible_binding*/ ctx[23].call(null, value_3);
    	}

    	function dropdown_1_active_binding(value_4) {
    		/*dropdown_1_active_binding*/ ctx[24].call(null, value_4);
    	}

    	let dropdown_1_props = {
    		$$slots: {
    			default: [create_default_slot$2],
    			menu: [
    				create_menu_slot,
    				({ item: option }) => ({ 25: option }),
    				({ item: option }) => [option ? 33554432 : 0]
    			],
    			button: [create_button_slot]
    		},
    		$$scope: { ctx }
    	};

    	if (/*options*/ ctx[0] !== void 0) {
    		dropdown_1_props.items = /*options*/ ctx[0];
    	}

    	if (/*placement*/ ctx[2] !== void 0) {
    		dropdown_1_props.placement = /*placement*/ ctx[2];
    	}

    	if (/*visible*/ ctx[8] !== void 0) {
    		dropdown_1_props.visible = /*visible*/ ctx[8];
    	}

    	if (/*active*/ ctx[1] !== void 0) {
    		dropdown_1_props.active = /*active*/ ctx[1];
    	}

    	const dropdown_1 = new Dropdown({ props: dropdown_1_props });
    	binding_callbacks.push(() => bind(dropdown_1, "items", dropdown_1_items_binding));
    	binding_callbacks.push(() => bind(dropdown_1, "placement", dropdown_1_placement_binding));
    	binding_callbacks.push(() => bind(dropdown_1, "visible", dropdown_1_visible_binding));
    	binding_callbacks.push(() => bind(dropdown_1, "active", dropdown_1_active_binding));

    	return {
    		c() {
    			create_component(dropdown_1.$$.fragment);
    		},
    		l(nodes) {
    			claim_component(dropdown_1.$$.fragment, nodes);
    		},
    		m(target, anchor) {
    			mount_component(dropdown_1, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const dropdown_1_changes = {};

    			if (dirty[0] & /*$$scope, visible, autofocus, disabled, label, input, text, icon, option*/ 100664312) {
    				dropdown_1_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_items && dirty[0] & /*options*/ 1) {
    				updating_items = true;
    				dropdown_1_changes.items = /*options*/ ctx[0];
    				add_flush_callback(() => updating_items = false);
    			}

    			if (!updating_placement && dirty[0] & /*placement*/ 4) {
    				updating_placement = true;
    				dropdown_1_changes.placement = /*placement*/ ctx[2];
    				add_flush_callback(() => updating_placement = false);
    			}

    			if (!updating_visible && dirty[0] & /*visible*/ 256) {
    				updating_visible = true;
    				dropdown_1_changes.visible = /*visible*/ ctx[8];
    				add_flush_callback(() => updating_visible = false);
    			}

    			if (!updating_active && dirty[0] & /*active*/ 2) {
    				updating_active = true;
    				dropdown_1_changes.active = /*active*/ ctx[1];
    				add_flush_callback(() => updating_active = false);
    			}

    			dropdown_1.$set(dropdown_1_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(dropdown_1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(dropdown_1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(dropdown_1, detaching);
    		}
    	};
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { options = [] } = $$props;
    	let { active = options.length > 0 ? 0 : null } = $$props;
    	let { placement = "bottomLeft" } = $$props;
    	let { value = "" } = $$props;
    	let { label = "" } = $$props;
    	let { icon = "" } = $$props;
    	let { disabled = false } = $$props;
    	let { autofocus = false } = $$props;
    	let input = null;
    	let visible = false;
    	let extract = option => option.text || option.value;
    	let text = Number.isInteger(active) ? extract(options[active]) : "";

    	function set(option) {
    		$$invalidate(11, value = option.value);
    		$$invalidate(9, text = option.text || option.value);
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

    	function keypress_handler(event) {
    		bubble($$self, event);
    	}

    	function focus_handler(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler(event) {
    		bubble($$self, event);
    	}

    	function input_1_input_handler() {
    		text = this.value;
    		$$invalidate(9, text);
    	}

    	function input_1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(7, input = $$value);
    		});
    	}

    	function dropdown_1_items_binding(value_1) {
    		options = value_1;
    		$$invalidate(0, options);
    	}

    	function dropdown_1_placement_binding(value_2) {
    		placement = value_2;
    		$$invalidate(2, placement);
    	}

    	function dropdown_1_visible_binding(value_3) {
    		visible = value_3;
    		$$invalidate(8, visible);
    	}

    	function dropdown_1_active_binding(value_4) {
    		active = value_4;
    		($$invalidate(1, active), $$invalidate(0, options));
    	}

    	$$self.$set = $$props => {
    		if ("options" in $$props) $$invalidate(0, options = $$props.options);
    		if ("active" in $$props) $$invalidate(1, active = $$props.active);
    		if ("placement" in $$props) $$invalidate(2, placement = $$props.placement);
    		if ("value" in $$props) $$invalidate(11, value = $$props.value);
    		if ("label" in $$props) $$invalidate(3, label = $$props.label);
    		if ("icon" in $$props) $$invalidate(4, icon = $$props.icon);
    		if ("disabled" in $$props) $$invalidate(5, disabled = $$props.disabled);
    		if ("autofocus" in $$props) $$invalidate(6, autofocus = $$props.autofocus);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*options*/ 1) {
    			 $$invalidate(0, options = options.map((option, index) => {
    				option.onclick = () => {
    					set(option);
    					$$invalidate(1, active = index);
    				};

    				return option;
    			}));
    		}

    		if ($$self.$$.dirty[0] & /*visible, input*/ 384) {
    			 visible && input ? input.focus() : "";
    		}
    	};

    	return [
    		options,
    		active,
    		placement,
    		label,
    		icon,
    		disabled,
    		autofocus,
    		input,
    		visible,
    		text,
    		extract,
    		value,
    		set,
    		blur_handler,
    		change_handler,
    		input_handler,
    		keypress_handler,
    		focus_handler,
    		keydown_handler,
    		input_1_input_handler,
    		input_1_binding,
    		dropdown_1_items_binding,
    		dropdown_1_placement_binding,
    		dropdown_1_visible_binding,
    		dropdown_1_active_binding
    	];
    }

    class Select extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-tdjane-style")) add_css$6();

    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
    			options: 0,
    			active: 1,
    			placement: 2,
    			value: 11,
    			label: 3,
    			icon: 4,
    			disabled: 5,
    			autofocus: 6,
    			set: 12
    		});
    	}

    	get options() {
    		return this.$$.ctx[0];
    	}

    	set options(options) {
    		this.$set({ options });
    		flush();
    	}

    	get active() {
    		return this.$$.ctx[1];
    	}

    	set active(active) {
    		this.$set({ active });
    		flush();
    	}

    	get placement() {
    		return this.$$.ctx[2];
    	}

    	set placement(placement) {
    		this.$set({ placement });
    		flush();
    	}

    	get value() {
    		return this.$$.ctx[11];
    	}

    	set value(value) {
    		this.$set({ value });
    		flush();
    	}

    	get label() {
    		return this.$$.ctx[3];
    	}

    	set label(label) {
    		this.$set({ label });
    		flush();
    	}

    	get icon() {
    		return this.$$.ctx[4];
    	}

    	set icon(icon) {
    		this.$set({ icon });
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

    	get set() {
    		return this.$$.ctx[12];
    	}
    }

    Select.Option = Option;
    Select.Autocomplete = Autocomplete;

    return Select;

})));
//# sourceMappingURL=Select.js.map
