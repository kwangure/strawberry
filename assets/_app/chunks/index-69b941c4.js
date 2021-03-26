function t() {} const n=(t) => t;function e(t, n) {
    for (const e in n)t[e]=n[e];return t;
} function o(t) {
    return t();
} function r() {
    return Object.create(null);
} function s(t) {
    t.forEach(o);
} function c(t) {
    return typeof t=="function";
} function u(t, n) {
    return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function";
} function i(n, e, o) {
    n.$$.on_destroy.push(function (n, ...e) {
        if (n==null) return t;const o=n.subscribe(...e);return o.unsubscribe?() => o.unsubscribe():o;
    }(e, o));
} function a(t, n, e, o) {
    if (t) {
        const r=f(t, n, e, o);return t[0](r);
    }
} function f(t, n, o, r) {
    return t[1]&&r?e(o.ctx.slice(), t[1](r(n))):o.ctx;
} function l(t, n, e, o, r, s, c) {
    const u=(function (t, n, e, o) {
        if (t[2]&&o) {
            const r=t[2](o(e));if (void 0===n.dirty) return r;if (typeof r=="object") {
                const t=[], e=Math.max(n.dirty.length, r.length);for (let o=0;o<e;o+=1)t[o]=n.dirty[o]|r[o];return t;
            } return n.dirty|r;
        } return n.dirty;
    }(n, o, r, s));if (u) {
        const r=f(n, e, o, c);t.p(r, u);
    }
} function d(t) {
    const n={};for (const e in t)e[0]!=="$"&&(n[e]=t[e]);return n;
} function h(t, n) {
    const e={};n=new Set(n);for (const o in t)n.has(o)||o[0]==="$"||(e[o]=t[o]);return e;
} function p(t) {
    const n={};for (const e in t)n[e]=!0;return n;
} function $(t, n, e=n) {
    return t.set(e), n;
} function g(n) {
    return n&&c(n.destroy)?n.destroy:t;
} const m=typeof window!="undefined";const _=m?() => window.performance.now():() => Date.now(), b=m?(t) => requestAnimationFrame(t):t;const y=new Set;function v(t) {
    y.forEach(((n) => {
        n.c(t)||(y.delete(n), n.f());
    })), y.size!==0&&b(v);
} function x(t) {
    let n;return y.size===0&&b(v), { promise: new Promise(((e) => {
        y.add(n={ c: t, f: e });
    })),
    abort() {
        y.delete(n);
    } };
} function w(t, n) {
    t.appendChild(n);
} function E(t, n, e) {
    t.insertBefore(n, e||null);
} function k(t) {
    t.parentNode.removeChild(t);
} function A(t, n) {
    for (let e=0;e<t.length;e+=1)t[e]&&t[e].d(n);
} function O(t) {
    return document.createElement(t);
} function j(t) {
    return document.createElementNS("http://www.w3.org/2000/svg", t);
} function S(t) {
    return document.createTextNode(t);
} function C() {
    return S(" ");
} function N() {
    return S("");
} function P(t, n, e, o) {
    return t.addEventListener(n, e, o), () => t.removeEventListener(n, e, o);
} function R(t) {
    return function (n) {
        return n.stopPropagation(), t.call(this, n);
    };
} function T(t) {
    return function (n) {
        n.target===this&&t.call(this, n);
    };
} function q(t, n, e) {
    e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n, e);
} function z(t, n) {
    const e=Object.getOwnPropertyDescriptors(t.__proto__);for (const o in n)n[o]==null?t.removeAttribute(o):o==="style"?t.style.cssText=n[o]:o==="__value"?t.value=t[o]=n[o]:e[o]&&e[o].set?t[o]=n[o]:q(t, o, n[o]);
} function D(t) {
    return Array.from(t.childNodes);
} function L(t, n, e, o) {
    for (let r=0;r<t.length;r+=1) {
        const o=t[r];if (o.nodeName===n) {
            let n=0;const s=[];for (;n<o.attributes.length;) {
                const t=o.attributes[n++];e[t.name]||s.push(t.name);
            } for (let t=0;t<s.length;t++)o.removeAttribute(s[t]);return t.splice(r, 1)[0];
        }
    } return o?j(n):O(n);
} function M(t, n) {
    for (let e=0;e<t.length;e+=1) {
        const o=t[e];if (o.nodeType===3) return o.data=`${n}`, t.splice(e, 1)[0];
    } return S(n);
} function F(t) {
    return M(t, " ");
} function B(t, n) {
    n=`${n}`, t.wholeText!==n&&(t.data=n);
} function G(t, n) {
    t.value=n==null?"":n;
} function H(t, n, e) {
    t.classList[e?"add":"remove"](n);
} function I(t, n) {
    const e=document.createEvent("CustomEvent");return e.initCustomEvent(t, !1, !1, n), e;
} function J(t, n=document.body) {
    return Array.from(n.querySelectorAll(t));
} const K=new Set;let Q, U=0;function V(t, n, e, o, r, s, c, u=0) {
    const i=16.666/o;let a="{\n";for (let g=0;g<=1;g+=i) {
        const t=n+(e-n)*s(g);a+=`${100*g}%{${c(t, 1-t)}}\n`;
    } const f=`${a}100% {${c(e, 1-e)}}\n}`, l=`__svelte_${(function (t) {
        let n=5381, e=t.length;for (;e--;)n=(n<<5)-n^t.charCodeAt(e);return n>>>0;
    }(f))}_${u}`, d=t.ownerDocument;K.add(d);const h=d.__svelte_stylesheet||(d.__svelte_stylesheet=d.head.appendChild(O("style")).sheet), p=d.__svelte_rules||(d.__svelte_rules={});p[l]||(p[l]=!0, h.insertRule(`@keyframes ${l} ${f}`, h.cssRules.length));const $=t.style.animation||"";return t.style.animation=`${$?`${$}, `:""}${l} ${o}ms linear ${r}ms 1 both`, U+=1, l;
} function W(t, n) {
    const e=(t.style.animation||"").split(", "), o=e.filter(n?(t) => t.indexOf(n)<0:(t) => t.indexOf("__svelte")===-1), r=e.length-o.length;r&&(t.style.animation=o.join(", "), U-=r, U||b((() => {
        U||(K.forEach(((t) => {
            const n=t.__svelte_stylesheet;let e=n.cssRules.length;for (;e--;)n.deleteRule(e);t.__svelte_rules={};
        })), K.clear());
    })));
} function X(t) {
    Q=t;
} function Y() {
    if (!Q) throw new Error("Function called outside component initialization");return Q;
} function Z(t) {
    Y().$$.on_mount.push(t);
} function tt(t) {
    Y().$$.after_update.push(t);
} function nt(t) {
    Y().$$.on_destroy.push(t);
} function et() {
    const t=Y();return (n, e) => {
        const o=t.$$.callbacks[n];if (o) {
            const r=I(n, e);o.slice().forEach(((n) => {
                n.call(t, r);
            }));
        }
    };
} function ot(t, n) {
    Y().$$.context.set(t, n);
} function rt(t) {
    return Y().$$.context.get(t);
} function st(t, n) {
    const e=t.$$.callbacks[n.type];e&&e.slice().forEach(((t) => t(n)));
} const ct=[], ut=[], it=[], at=[], ft=Promise.resolve();let lt=!1;function dt() {
    lt||(lt=!0, ft.then(_t));
} function ht() {
    return dt(), ft;
} function pt(t) {
    it.push(t);
} function $t(t) {
    at.push(t);
}let gt=!1;const mt=new Set;function _t() {
    if (!gt) {
        gt=!0;do {
            for (let t=0;t<ct.length;t+=1) {
                const n=ct[t];X(n), bt(n.$$);
            } for (X(null), ct.length=0;ut.length;)ut.pop()();for (let t=0;t<it.length;t+=1) {
                const n=it[t];mt.has(n)||(mt.add(n), n());
            }it.length=0;
        } while (ct.length);for (;at.length;)at.pop()();lt=!1, gt=!1, mt.clear();
    }
} function bt(t) {
    if (t.fragment!==null) {
        t.update(), s(t.before_update);const n=t.dirty;t.dirty=[-1], t.fragment&&t.fragment.p(t.ctx, n), t.after_update.forEach(pt);
    }
}let yt;function vt() {
    return yt||(yt=Promise.resolve(), yt.then((() => {
        yt=null;
    }))), yt;
} function xt(t, n, e) {
    t.dispatchEvent(I(`${n?"intro":"outro"}${e}`));
} const wt=new Set;let Et;function kt() {
    Et={ r: 0, c: [], p: Et };
} function At() {
    Et.r||s(Et.c), Et=Et.p;
} function Ot(t, n) {
    t&&t.i&&(wt.delete(t), t.i(n));
} function jt(t, n, e, o) {
    if (t&&t.o) {
        if (wt.has(t)) return;wt.add(t), Et.c.push((() => {
            wt.delete(t), o&&(e&&t.d(1), o());
        })), t.o(n);
    }
} const St={ duration: 0 };function Ct(e, o, r) {
    let s, u, i=o(e, r), a=!1, f=0;function l() {
        s&&W(e, s);
    } function d() {
        const { delay: o=0, duration: r=300, easing: c=n, tick: d=t, css: h }=i||St;h&&(s=V(e, 0, 1, r, o, c, h, f++)), d(0, 1);const p=_()+o, $=p+r;u&&u.abort(), a=!0, pt((() => xt(e, !0, "start"))), u=x(((t) => {
            if (a) {
                if (t>=$) return d(1, 0), xt(e, !0, "end"), l(), a=!1;if (t>=p) {
                    const n=c((t-p)/r);d(n, 1-n);
                }
            } return a;
        }));
    }let h=!1;return { start() {
        h||(W(e), c(i)?(i=i(), vt().then(d)):d());
    },
    invalidate() {
        h=!1;
    },
    end() {
        a&&(l(), a=!1);
    } };
} function Nt(e, o, r) {
    let u, i=o(e, r), a=!0;const f=Et;function l() {
        const { delay: o=0, duration: r=300, easing: c=n, tick: l=t, css: d }=i||St;d&&(u=V(e, 1, 0, r, o, c, d));const h=_()+o, p=h+r;pt((() => xt(e, !1, "start"))), x(((t) => {
            if (a) {
                if (t>=p) return l(0, 1), xt(e, !1, "end"), --f.r||s(f.c), !1;if (t>=h) {
                    const n=c((t-h)/r);l(1-n, n);
                }
            } return a;
        }));
    } return f.r+=1, c(i)
        ?vt().then((() => {
            i=i(), l();
        }))
        :l(), { end(t) {
        t&&i.tick&&i.tick(1, 0), a&&(u&&W(e, u), a=!1);
    } };
} function Pt(e, o, r, u) {
    let i=o(e, r), a=u?0:1, f=null, l=null, d=null;function h() {
        d&&W(e, d);
    } function p(t, n) {
        const e=t.b-a;return n*=Math.abs(e), { a: a, b: t.b, d: e, duration: n, start: t.start, end: t.start+n, group: t.group };
    } function $(o) {
        const { delay: r=0, duration: c=300, easing: u=n, tick: $=t, css: g }=i||St, m={ start: _()+r, b: o };o||(m.group=Et, Et.r+=1), f||l
            ?l=m
            :(g&&(h(), d=V(e, a, o, c, r, u, g)), o&&$(0, 1), f=p(m, c), pt((() => xt(e, o, "start"))), x(((t) => {
                    if (l&&t>l.start&&(f=p(l, c), l=null, xt(e, f.b, "start"), g&&(h(), d=V(e, a, f.b, f.duration, 0, u, i.css))), f) if (t>=f.end)$(a=f.b, 1-a), xt(e, f.b, "end"), l||(f.b?h():--f.group.r||s(f.group.c)), f=null;else if (t>=f.start) {
                        const n=t-f.start;a=f.a+f.d*u(n/f.duration), $(a, 1-a);
                    } return !(!f&&!l);
                })));
    } return { run(t) {
        c(i)
            ?vt().then((() => {
                i=i(), $(t);
            }))
            :$(t);
    },
    end() {
        h(), f=l=null;
    } };
} function Rt(t, n) {
    const e={}, o={}, r={ $$scope: 1 };let s=t.length;for (;s--;) {
        const c=t[s], u=n[s];if (u) {
            for (const t in c)t in u||(o[t]=1);for (const t in u)r[t]||(e[t]=u[t], r[t]=1);t[s]=u;
        } else for (const t in c)r[t]=1;
    } for (const c in o)c in e||(e[c]=void 0);return e;
} function Tt(t) {
    return typeof t=="object"&&t!==null?t:{};
} function qt(t, n, e) {
    const o=t.$$.props[n];void 0!==o&&(t.$$.bound[o]=e, e(t.$$.ctx[o]));
} function zt(t) {
    t&&t.c();
} function Dt(t, n) {
    t&&t.l(n);
} function Lt(t, n, e, r) {
    const { fragment: u, on_mount: i, on_destroy: a, after_update: f }=t.$$;u&&u.m(n, e), r||pt((() => {
        const n=i.map(o).filter(c);a?a.push(...n):s(n), t.$$.on_mount=[];
    })), f.forEach(pt);
} function Mt(t, n) {
    const e=t.$$;e.fragment!==null&&(s(e.on_destroy), e.fragment&&e.fragment.d(n), e.on_destroy=e.fragment=null, e.ctx=[]);
} function Ft(n, e, o, c, u, i, a=[-1]) {
    const f=Q;X(n);const l=n.$$={ fragment: null, ctx: null, props: i, update: t, not_equal: u, bound: r(), on_mount: [], on_destroy: [], on_disconnect: [], before_update: [], after_update: [], context: new Map(f?f.$$.context:[]), callbacks: r(), dirty: a, skip_bound: !1 };let d=!1;if (l.ctx=o
        ?o(n, e.props||{}, ((t, e, ...o) => {
            const r=o.length?o[0]:e;return l.ctx&&u(l.ctx[t], l.ctx[t]=r)&&(!l.skip_bound&&l.bound[t]&&l.bound[t](r), d&&(function (t, n) {
                t.$$.dirty[0]===-1&&(ct.push(t), dt(), t.$$.dirty.fill(0)), t.$$.dirty[n/31|0]|=1<<n%31;
            }(n, t))), e;
        }))
        :[], l.update(), d=!0, s(l.before_update), l.fragment=Boolean(c)&&c(l.ctx), e.target) {
        if (e.hydrate) {
            const t=D(e.target);l.fragment&&l.fragment.l(t), t.forEach(k);
        } else l.fragment&&l.fragment.c();e.intro&&Ot(n.$$.fragment), Lt(n, e.target, e.anchor, e.customElement), _t();
    }X(f);
} class Bt {
    $destroy() {
        Mt(this, 1), this.$destroy=t;
    }$on(t, n) {
        const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n), () => {
            const t=e.indexOf(n);t!==-1&&e.splice(t, 1);
        };
    }$set(t) {
        let n;this.$$set&&(n=t, Object.keys(n).length!==0)&&(this.$$.skip_bound=!0, this.$$set(t), this.$$.skip_bound=!1);
    }
} const Gt=[];function Ht(n, e=t) {
    let o;const r=[];function s(t) {
        if (u(n, t)&&(n=t, o)) {
            const t=!Gt.length;for (let e=0;e<r.length;e+=1) {
                const t=r[e];t[1](), Gt.push(t, n);
            } if (t) {
                for (let t=0;t<Gt.length;t+=2)Gt[t][0](Gt[t+1]);Gt.length=0;
            }
        }
    } return { set: s,
        update: function (t) {
            s(t(n));
        },
        subscribe: function (c, u=t) {
            const i=[c, u];return r.push(i), r.length===1&&(o=e(s)||t), c(n), () => {
                const t=r.indexOf(i);t!==-1&&r.splice(t, 1), r.length===0&&(o(), o=null);
            };
        } };
} export { nt as $, ot as A, tt as B, Z as C, kt as D, At as E, a as F, l as G, Ht as H, P as I, Y as J, st as K, j as L, g as M, z as N, H as O, h as P, p as Q, d as R, Bt as S, n as T, pt as U, Pt as V, G as W, c as X, s as Y, R as Z, rt as _, C as a, ut as a0, et as a1, i as a2, qt as a3, $t as a4, $ as a5, ht as a6, T as a7, Ct as a8, Nt as a9, A as aa, L as b, F as c, k as d, O as e, D as f, M as g, q as h, Ft as i, E as j, w as k, B as l, e as m, t as n, zt as o, N as p, J as q, Dt as r, u as s, S as t, Lt as u, Rt as v, Tt as w, Ot as x, jt as y, Mt as z };
