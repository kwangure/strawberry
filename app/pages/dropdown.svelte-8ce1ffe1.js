import{S as t,i as s,s as e,F as n,e as $,c as r,a as c,d as o,m as a,G as l,f,H as p,I as u,x as m,y as i,p as d,r as g,u as x,z as h,j as v,l as b,t as w,b as k}from"../chunks/index-c1703bba.js";import{D as j}from"../chunks/Item.svelte-80d4dd4b.js";import{c as y}from"../chunks/forward-events-e98659b2.js";import{B as I}from"../chunks/Tabs.svelte-da3b3964.js";import"../chunks/popper-69ff30e9.js";import"../chunks/Icon-c3f127b6.js";/* empty css                            */function D(t){let s,e,d,g;const x=t[3].default,h=n(x,t,t[2],null);return{c(){s=$("div"),h&&h.c(),this.h()},l(t){s=r(t,"DIV",{class:!0});var e=c(s);h&&h.l(e),e.forEach(o),this.h()},h(){a(s,"class","menu-item svelte-wf42l4"),l(s,"active",t[0])},m(n,$){f(n,s,$),h&&h.m(s,null),e=!0,d||(g=p(t[1].call(null,s)),d=!0)},p(t,[e]){h&&h.p&&4&e&&u(h,x,t,t[2],e,null,null),1&e&&l(s,"active",t[0])},i(t){e||(m(h,t),e=!0)},o(t){i(h,t),e=!1},d(t){t&&o(s),h&&h.d(t),d=!1,g()}}}function P(t,s,e){let{$$slots:n={},$$scope:$}=s,{active:r=!1}=s;const c=y();return t.$$set=t=>{"active"in t&&e(0,r=t.active),"$$scope"in t&&e(2,$=t.$$scope)},[r,c,$,n]}class H extends t{constructor(t){super(),s(this,t,P,D,e,{active:0})}}function C(t){let s;return{c(){s=w("Purple.")},l(t){s=k(t,"Purple.")},m(t,e){f(t,s,e)},d(t){t&&o(s)}}}function z(t){let s;return{c(){s=w("Penguin.")},l(t){s=k(t,"Penguin.")},m(t,e){f(t,s,e)},d(t){t&&o(s)}}}function B(t){let s;return{c(){s=w("Has.")},l(t){s=k(t,"Has.")},m(t,e){f(t,s,e)},d(t){t&&o(s)}}}function E(t){let s;return{c(){s=w("Dropped.")},l(t){s=k(t,"Dropped.")},m(t,e){f(t,s,e)},d(t){t&&o(s)}}}function F(t){let s,e,n,$,r,c,a,l;return s=new H({props:{$$slots:{default:[C]},$$scope:{ctx:t}}}),n=new H({props:{$$slots:{default:[z]},$$scope:{ctx:t}}}),r=new H({props:{$$slots:{default:[B]},$$scope:{ctx:t}}}),a=new H({props:{$$slots:{default:[E]},$$scope:{ctx:t}}}),{c(){d(s.$$.fragment),e=v(),d(n.$$.fragment),$=v(),d(r.$$.fragment),c=v(),d(a.$$.fragment)},l(t){g(s.$$.fragment,t),e=b(t),g(n.$$.fragment,t),$=b(t),g(r.$$.fragment,t),c=b(t),g(a.$$.fragment,t)},m(t,o){x(s,t,o),f(t,e,o),x(n,t,o),f(t,$,o),x(r,t,o),f(t,c,o),x(a,t,o),l=!0},p(t,e){const $={};1&e&&($.$$scope={dirty:e,ctx:t}),s.$set($);const c={};1&e&&(c.$$scope={dirty:e,ctx:t}),n.$set(c);const o={};1&e&&(o.$$scope={dirty:e,ctx:t}),r.$set(o);const l={};1&e&&(l.$$scope={dirty:e,ctx:t}),a.$set(l)},i(t){l||(m(s.$$.fragment,t),m(n.$$.fragment,t),m(r.$$.fragment,t),m(a.$$.fragment,t),l=!0)},o(t){i(s.$$.fragment,t),i(n.$$.fragment,t),i(r.$$.fragment,t),i(a.$$.fragment,t),l=!1},d(t){h(s,t),t&&o(e),h(n,t),t&&o($),h(r,t),t&&o(c),h(a,t)}}}function G(t){let s;return{c(){s=w("Click for dropdown")},l(t){s=k(t,"Click for dropdown")},m(t,e){f(t,s,e)},d(t){t&&o(s)}}}function S(t){let s,e;return s=new I({props:{slot:"button",$$slots:{default:[G]},$$scope:{ctx:t}}}),{c(){d(s.$$.fragment)},l(t){g(s.$$.fragment,t)},m(t,n){x(s,t,n),e=!0},p(t,e){const n={};1&e&&(n.$$scope={dirty:e,ctx:t}),s.$set(n)},i(t){e||(m(s.$$.fragment,t),e=!0)},o(t){i(s.$$.fragment,t),e=!1},d(t){h(s,t)}}}function T(t){let s,e;return s=new j({props:{$$slots:{button:[S],default:[F]},$$scope:{ctx:t}}}),{c(){d(s.$$.fragment)},l(t){g(s.$$.fragment,t)},m(t,n){x(s,t,n),e=!0},p(t,[e]){const n={};1&e&&(n.$$scope={dirty:e,ctx:t}),s.$set(n)},i(t){e||(m(s.$$.fragment,t),e=!0)},o(t){i(s.$$.fragment,t),e=!1},d(t){h(s,t)}}}export default class extends t{constructor(t){super(),s(this,t,null,T,e,{})}}
