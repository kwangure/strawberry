import{S as B,i as F,s as I,D as L,e as N,c as W,a as q,d as i,b as E,M as H,f as c,N as A,E as G,F as J,G as M,x as p,u as m,j as _,m as d,o as g,v as h,k,n as v,t as w,g as b}from"../../chunks/vendor-412a35aa.js";import{D as O}from"../../chunks/Link.svelte_svelte_type_style_lang-c4e86ebe.js";import{c as V}from"../../chunks/forward-events-b416819d.js";import{B as z}from"../../chunks/Tabs.svelte_svelte_type_style_lang-49fc7b73.js";import{C as K}from"../../chunks/component-a9528d38.js";import"../../chunks/Path.svelte_svelte_type_style_lang-1dbfe6f8.js";import"../../chunks/Code-cf8b8d74.js";import"../../chunks/preload-helper-9f4c7634.js";function Q(f){let e,t,n,a;const r=f[3].default,l=L(r,f,f[2],null);return{c(){e=N("div"),l&&l.c(),this.h()},l(o){e=W(o,"DIV",{class:!0});var $=q(e);l&&l.l($),$.forEach(i),this.h()},h(){E(e,"class","menu-item svelte-115pxkd"),H(e,"active",f[0])},m(o,$){c(o,e,$),l&&l.m(e,null),t=!0,n||(a=A(f[1].call(null,e)),n=!0)},p(o,[$]){l&&l.p&&(!t||$&4)&&G(l,r,o,o[2],t?M(r,o[2],$,null):J(o[2]),null),$&1&&H(e,"active",o[0])},i(o){t||(p(l,o),t=!0)},o(o){m(l,o),t=!1},d(o){o&&i(e),l&&l.d(o),n=!1,a()}}}function R(f,e,t){let{$$slots:n={},$$scope:a}=e,{active:r=!1}=e;const l=V();return f.$$set=o=>{"active"in o&&t(0,r=o.active),"$$scope"in o&&t(2,a=o.$$scope)},[r,l,a,n]}class S extends B{constructor(e){super();F(this,e,R,Q,I,{active:0})}}function U(f){let e,t,n,a;const r=f[5].default,l=L(r,f,f[4],null);return{c(){e=N("a"),l&&l.c(),this.h()},l(o){e=W(o,"A",{href:!0,class:!0});var $=q(e);l&&l.l($),$.forEach(i),this.h()},h(){E(e,"href",f[0]),E(e,"class","menu-item svelte-1nf8ii4"),H(e,"active",f[1])},m(o,$){c(o,e,$),l&&l.m(e,null),t=!0,n||(a=A(f[2].call(null,e)),n=!0)},p(o,[$]){l&&l.p&&(!t||$&16)&&G(l,r,o,o[4],t?M(r,o[4],$,null):J(o[4]),null),(!t||$&1)&&E(e,"href",o[0]),$&2&&H(e,"active",o[1])},i(o){t||(p(l,o),t=!0)},o(o){m(l,o),t=!1},d(o){o&&i(e),l&&l.d(o),n=!1,a()}}}function X(f,e,t){let n,{$$slots:a={},$$scope:r}=e,{path:l=""}=e,{href:o=""}=e;const $=V();return f.$$set=s=>{"path"in s&&t(3,l=s.path),"href"in s&&t(0,o=s.href),"$$scope"in s&&t(4,r=s.$$scope)},f.$$.update=()=>{f.$$.dirty&9&&t(1,n=o===l)},[o,n,$,l,r,a]}class T extends B{constructor(e){super();F(this,e,X,U,I,{path:3,href:0})}}const Y=JSON.parse('{"name":"Dropdown","slots":[null,null],"description":"","props":[{"kind":"let","name":"placement","optional":true,"value":"bottom-start","jsDoc":{"description":"Where to position the popup relative to the dropdown button.","tags":[{"description":"","name":"","tag":"type","type":"\\"top\\" | \\"top-start\\" | \\"top-end\\" | \\"right\\" | \\"right-start\\" | \\"right-end\\" | \\"bottom\\" | \\"bottom-start\\" | \\"bottom-end\\" | \\"left\\" | \\"left-start\\" | \\"left-end\\""}]}},{"kind":"let","name":"visible","optional":true,"value":false,"jsDoc":{"description":"Whether the popup is visible","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}}],"exports":[],"customProperties":[{"property":"--br-dropdown-background-color","value":" ","cssDoc":null},{"property":"--br-dropdown-border-radius","value":" ","cssDoc":null},{"property":"--br-dropdown-box-shadow","value":" ","cssDoc":null}]}'),Z={main:Y};function y(f){let e;return{c(){e=w("Purple.")},l(t){e=b(t,"Purple.")},m(t,n){c(t,e,n)},d(t){t&&i(e)}}}function x(f){let e;return{c(){e=w("Penguin.")},l(t){e=b(t,"Penguin.")},m(t,n){c(t,e,n)},d(t){t&&i(e)}}}function ee(f){let e;return{c(){e=w("Has.")},l(t){e=b(t,"Has.")},m(t,n){c(t,e,n)},d(t){t&&i(e)}}}function te(f){let e;return{c(){e=w("Dropped.")},l(t){e=b(t,"Dropped.")},m(t,n){c(t,e,n)},d(t){t&&i(e)}}}function ne(f){let e,t,n,a,r,l,o,$;return e=new S({props:{$$slots:{default:[y]},$$scope:{ctx:f}}}),n=new S({props:{$$slots:{default:[x]},$$scope:{ctx:f}}}),r=new S({props:{$$slots:{default:[ee]},$$scope:{ctx:f}}}),o=new S({props:{$$slots:{default:[te]},$$scope:{ctx:f}}}),{c(){_(e.$$.fragment),t=k(),_(n.$$.fragment),a=k(),_(r.$$.fragment),l=k(),_(o.$$.fragment)},l(s){d(e.$$.fragment,s),t=v(s),d(n.$$.fragment,s),a=v(s),d(r.$$.fragment,s),l=v(s),d(o.$$.fragment,s)},m(s,u){g(e,s,u),c(s,t,u),g(n,s,u),c(s,a,u),g(r,s,u),c(s,l,u),g(o,s,u),$=!0},p(s,u){const D={};u&1&&(D.$$scope={dirty:u,ctx:s}),e.$set(D);const C={};u&1&&(C.$$scope={dirty:u,ctx:s}),n.$set(C);const j={};u&1&&(j.$$scope={dirty:u,ctx:s}),r.$set(j);const P={};u&1&&(P.$$scope={dirty:u,ctx:s}),o.$set(P)},i(s){$||(p(e.$$.fragment,s),p(n.$$.fragment,s),p(r.$$.fragment,s),p(o.$$.fragment,s),$=!0)},o(s){m(e.$$.fragment,s),m(n.$$.fragment,s),m(r.$$.fragment,s),m(o.$$.fragment,s),$=!1},d(s){h(e,s),s&&i(t),h(n,s),s&&i(a),h(r,s),s&&i(l),h(o,s)}}}function se(f){let e;return{c(){e=w("Click for regular dropdown")},l(t){e=b(t,"Click for regular dropdown")},m(t,n){c(t,e,n)},d(t){t&&i(e)}}}function oe(f){let e,t;return e=new z({props:{slot:"button",$$slots:{default:[se]},$$scope:{ctx:f}}}),{c(){_(e.$$.fragment)},l(n){d(e.$$.fragment,n)},m(n,a){g(e,n,a),t=!0},p(n,a){const r={};a&1&&(r.$$scope={dirty:a,ctx:n}),e.$set(r)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){m(e.$$.fragment,n),t=!1},d(n){h(e,n)}}}function re(f){let e;return{c(){e=w("Click.")},l(t){e=b(t,"Click.")},m(t,n){c(t,e,n)},d(t){t&&i(e)}}}function le(f){let e;return{c(){e=w("To.")},l(t){e=b(t,"To.")},m(t,n){c(t,e,n)},d(t){t&&i(e)}}}function fe(f){let e;return{c(){e=w("Change.")},l(t){e=b(t,"Change.")},m(t,n){c(t,e,n)},d(t){t&&i(e)}}}function ae(f){let e;return{c(){e=w("Hash.")},l(t){e=b(t,"Hash.")},m(t,n){c(t,e,n)},d(t){t&&i(e)}}}function $e(f){let e,t,n,a,r,l,o,$;return e=new T({props:{href:"#click",$$slots:{default:[re]},$$scope:{ctx:f}}}),n=new T({props:{href:"#to",$$slots:{default:[le]},$$scope:{ctx:f}}}),r=new T({props:{href:"#change",$$slots:{default:[fe]},$$scope:{ctx:f}}}),o=new T({props:{href:"#hash",$$slots:{default:[ae]},$$scope:{ctx:f}}}),{c(){_(e.$$.fragment),t=k(),_(n.$$.fragment),a=k(),_(r.$$.fragment),l=k(),_(o.$$.fragment)},l(s){d(e.$$.fragment,s),t=v(s),d(n.$$.fragment,s),a=v(s),d(r.$$.fragment,s),l=v(s),d(o.$$.fragment,s)},m(s,u){g(e,s,u),c(s,t,u),g(n,s,u),c(s,a,u),g(r,s,u),c(s,l,u),g(o,s,u),$=!0},p(s,u){const D={};u&1&&(D.$$scope={dirty:u,ctx:s}),e.$set(D);const C={};u&1&&(C.$$scope={dirty:u,ctx:s}),n.$set(C);const j={};u&1&&(j.$$scope={dirty:u,ctx:s}),r.$set(j);const P={};u&1&&(P.$$scope={dirty:u,ctx:s}),o.$set(P)},i(s){$||(p(e.$$.fragment,s),p(n.$$.fragment,s),p(r.$$.fragment,s),p(o.$$.fragment,s),$=!0)},o(s){m(e.$$.fragment,s),m(n.$$.fragment,s),m(r.$$.fragment,s),m(o.$$.fragment,s),$=!1},d(s){h(e,s),s&&i(t),h(n,s),s&&i(a),h(r,s),s&&i(l),h(o,s)}}}function ue(f){let e;return{c(){e=w("Click for linked dropdown")},l(t){e=b(t,"Click for linked dropdown")},m(t,n){c(t,e,n)},d(t){t&&i(e)}}}function ie(f){let e,t;return e=new z({props:{slot:"button",$$slots:{default:[ue]},$$scope:{ctx:f}}}),{c(){_(e.$$.fragment)},l(n){d(e.$$.fragment,n)},m(n,a){g(e,n,a),t=!0},p(n,a){const r={};a&1&&(r.$$scope={dirty:a,ctx:n}),e.$set(r)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){m(e.$$.fragment,n),t=!1},d(n){h(e,n)}}}function ce(f){let e,t,n,a;return e=new O({props:{$$slots:{button:[oe],default:[ne]},$$scope:{ctx:f}}}),n=new O({props:{$$slots:{button:[ie],default:[$e]},$$scope:{ctx:f}}}),{c(){_(e.$$.fragment),t=k(),_(n.$$.fragment)},l(r){d(e.$$.fragment,r),t=v(r),d(n.$$.fragment,r)},m(r,l){g(e,r,l),c(r,t,l),g(n,r,l),a=!0},p(r,l){const o={};l&1&&(o.$$scope={dirty:l,ctx:r}),e.$set(o);const $={};l&1&&($.$$scope={dirty:l,ctx:r}),n.$set($)},i(r){a||(p(e.$$.fragment,r),p(n.$$.fragment,r),a=!0)},o(r){m(e.$$.fragment,r),m(n.$$.fragment,r),a=!1},d(r){h(e,r),r&&i(t),h(n,r)}}}function pe(f){let e,t;return e=new K({props:{docs:Z,$$slots:{inline:[ce]},$$scope:{ctx:f}}}),{c(){_(e.$$.fragment)},l(n){d(e.$$.fragment,n)},m(n,a){g(e,n,a),t=!0},p(n,[a]){const r={};a&1&&(r.$$scope={dirty:a,ctx:n}),e.$set(r)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){m(e.$$.fragment,n),t=!1},d(n){h(e,n)}}}class ve extends B{constructor(e){super();F(this,e,null,pe,I,{})}}export{ve as default};
