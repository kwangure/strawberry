import{S as N,i as V,s as T,e as g,t as B,k as P,j as k,c as $,a as y,g as S,d as u,n as q,m as j,b as w,f as C,H as h,o as I,W as G,h as J,x as m,T as K,a3 as H,a4 as W,u as p,v as D,l as z,r as L,w as M,a5 as O,a6 as Q,a7 as R,a8 as U,a9 as X,aa as Y}from"../../chunks/vendor-73f7aab9.js";import{B as Z}from"../../chunks/Tabs.svelte_svelte_type_style_lang-cffa63c4.js";import{C as x}from"../../chunks/component-5ce82bf8.js";import{I as ee}from"../../chunks/Path.svelte_svelte_type_style_lang-9374e05c.js";import"../../chunks/forward-events-fae2cca0.js";import"../../chunks/Code-cb795b16.js";import"../../chunks/preload-helper-9f4c7634.js";function F(n){let t,s,e,i,o,l,c,a,r,_,v;return c=new ee({props:{path:Q}}),{c(){t=g("div"),s=g("div"),e=g("div"),i=B(n[2]),o=P(),l=g("div"),k(c.$$.fragment),this.h()},l(f){t=$(f,"DIV",{class:!0});var d=y(t);s=$(d,"DIV",{class:!0});var b=y(s);e=$(b,"DIV",{class:!0});var E=y(e);i=S(E,n[2]),E.forEach(u),o=q(b),l=$(b,"DIV",{class:!0});var A=y(l);j(c.$$.fragment,A),A.forEach(u),b.forEach(u),d.forEach(u),this.h()},h(){w(e,"class","message svelte-kyj5dv"),w(l,"class","close svelte-kyj5dv"),w(s,"class","notification svelte-kyj5dv"),w(t,"class","berry-notification wrapper svelte-kyj5dv")},m(f,d){C(f,t,d),h(t,s),h(s,e),h(e,i),h(s,o),h(s,l),I(c,l,null),r=!0,_||(v=G(l,"click",n[3]),_=!0)},p(f,d){n=f,(!r||d&4)&&J(i,n[2])},i(f){r||(m(c.$$.fragment,f),K(()=>{a||(a=H(s,W,{x:200,duration:n[1]},!0)),a.run(1)}),r=!0)},o(f){p(c.$$.fragment,f),a||(a=H(s,W,{x:200,duration:n[1]},!1)),a.run(0),r=!1},d(f){f&&u(t),D(c),f&&a&&a.end(),_=!1,v()}}}function te(n){let t,s,e=n[0]&&F(n);return{c(){e&&e.c(),t=z()},l(i){e&&e.l(i),t=z()},m(i,o){e&&e.m(i,o),C(i,t,o),s=!0},p(i,[o]){i[0]?e?(e.p(i,o),o&1&&m(e,1)):(e=F(i),e.c(),m(e,1),e.m(t.parentNode,t)):e&&(L(),p(e,1,1,()=>{e=null}),M())},i(i){s||(m(e),s=!0)},o(i){p(e),s=!1},d(i){e&&e.d(i),i&&u(t)}}}const se=!0;function ie(n,t,s){const e=O();let{removeAfter:i=4e3}=t,{duration:o=500}=t,{visible:l=!1}=t,{message:c}=t;function a(){s(0,l=!1),e("dismiss")}return n.$$set=r=>{"removeAfter"in r&&s(4,i=r.removeAfter),"duration"in r&&s(1,o=r.duration),"visible"in r&&s(0,l=r.visible),"message"in r&&s(2,c=r.message)},n.$$.update=()=>{n.$$.dirty&17&&l&&i&&setTimeout(()=>{s(0,l=!1)},i)},[l,o,c,a,i]}class ne extends N{constructor(t){super();V(this,t,ie,te,T,{removeAfter:4,duration:1,visible:0,message:2})}}const ae={main:se};function oe(n){let t;return{c(){t=B("Click to show notification")},l(s){t=S(s,"Click to show notification")},m(s,e){C(s,t,e)},d(s){s&&u(t)}}}function re(n){let t,s,e,i,o;t=new Z({props:{primary:!0,$$slots:{default:[oe]},$$scope:{ctx:n}}}),t.$on("click",function(){R(n[1])&&n[1].apply(this,arguments)});function l(a){n[2](a)}let c={message:"Prepare yee the way!"};return n[0]!==void 0&&(c.visible=n[0]),e=new ne({props:c}),U.push(()=>X(e,"visible",l)),{c(){k(t.$$.fragment),s=P(),k(e.$$.fragment)},l(a){j(t.$$.fragment,a),s=q(a),j(e.$$.fragment,a)},m(a,r){I(t,a,r),C(a,s,r),I(e,a,r),o=!0},p(a,r){n=a;const _={};r&8&&(_.$$scope={dirty:r,ctx:n}),t.$set(_);const v={};!i&&r&1&&(i=!0,v.visible=n[0],Y(()=>i=!1)),e.$set(v)},i(a){o||(m(t.$$.fragment,a),m(e.$$.fragment,a),o=!0)},o(a){p(t.$$.fragment,a),p(e.$$.fragment,a),o=!1},d(a){D(t,a),a&&u(s),D(e,a)}}}function le(n){let t,s;return t=new x({props:{docs:ae,$$slots:{inline:[re]},$$scope:{ctx:n}}}),{c(){k(t.$$.fragment)},l(e){j(t.$$.fragment,e)},m(e,i){I(t,e,i),s=!0},p(e,[i]){const o={};i&11&&(o.$$scope={dirty:i,ctx:e}),t.$set(o)},i(e){s||(m(t.$$.fragment,e),s=!0)},o(e){p(t.$$.fragment,e),s=!1},d(e){D(t,e)}}}function ce(n,t,s){let e,i;function o(l){i=l,s(0,i)}return n.$$.update=()=>{n.$$.dirty&1&&s(1,e=i?()=>{}:()=>{s(0,i=!0)})},[i,e,o]}class he extends N{constructor(t){super();V(this,t,ce,le,T,{})}}export{he as default};
