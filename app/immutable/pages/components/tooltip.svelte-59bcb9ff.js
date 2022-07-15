import{S as K,i as Z,s as z,F as V,e as y,c as P,a as D,d as _,b as k,g as b,k as J,m as N,K as W,J as E,L as q,G as X,H,I as O,W as U,q as d,o as g,X as x,w as B,x as L,y as M,B as T,n as ee,p as te,Z as oe,t as S,h as C,E as Q}from"../../chunks/index-9f7629f3.js";import{B as ne}from"../../chunks/primary.svelte_svelte_type_style_lang-62f41d54.js";import{P as le}from"../../chunks/primary-d40b99e3.js";import{C as se}from"../../chunks/component-5b135dda.js";/* empty css                              */import{c as re}from"../../chunks/popper-fb5abc9f.js";import"../../chunks/forward-events-932ef468.js";import"../../chunks/svelte-02f513e0.js";function ae(s){let e=()=>{};const o={x:0,y:0,top:0,left:0,width:0,height:0};return s.addEventListener("mousemove",t=>{o.x=t.clientX,o.left=t.clientX,o.y=t.clientY,o.top=t.clientY,e()}),{getBoundingClientRect:()=>o,onchange:t=>{e=t}}}function R(s,e,o,t){s[t?"addEventListener":"removeEventListener"](e,o)}const ie=s=>({}),Y=s=>({});function A(s){let e;return{c(){e=y("div"),this.h()},l(o){e=P(o,"DIV",{class:!0}),D(e).forEach(_),this.h()},h(){k(e,"class","arrow svelte-1npg1b2")},m(o,t){b(o,e,t)},d(o){o&&_(e)}}}function ce(s){let e,o,t,n,i,r,c;const a=s[9].default,u=V(a,s,s[8],null);let f=s[1]&&A();const w=s[9].popup,m=V(w,s,s[8],Y);return{c(){u&&u.c(),e=J(),o=y("div"),f&&f.c(),t=J(),m&&m.c(),this.h()},l(l){u&&u.l(l),e=N(l),o=P(l,"DIV",{class:!0,"data-popper-placement":!0});var p=D(o);f&&f.l(p),t=N(p),m&&m.l(p),p.forEach(_),this.h()},h(){k(o,"class","berry-tooltip svelte-1npg1b2"),k(o,"data-popper-placement",s[0]),W(o,"visible",s[2])},m(l,p){u&&u.m(l,p),b(l,e,p),b(l,o,p),f&&f.m(o,null),E(o,t),m&&m.m(o,null),i=!0,r||(c=[q(n=s[3].call(null,o,s[2])),q(s[5].call(null,o)),q(s[4].call(null,o))],r=!0)},p(l,[p]){u&&u.p&&(!i||p&256)&&X(u,a,l,l[8],i?O(a,l[8],p,null):H(l[8]),null),l[1]?f||(f=A(),f.c(),f.m(o,t)):f&&(f.d(1),f=null),m&&m.p&&(!i||p&256)&&X(m,w,l,l[8],i?O(w,l[8],p,ie):H(l[8]),Y),(!i||p&1)&&k(o,"data-popper-placement",l[0]),n&&U(n.update)&&p&4&&n.update.call(null,l[2]),p&4&&W(o,"visible",l[2])},i(l){i||(d(u,l),d(m,l),i=!0)},o(l){g(u,l),g(m,l),i=!1},d(l){u&&u.d(l),l&&_(e),l&&_(o),f&&f.d(),m&&m.d(l),r=!1,x(c)}}}const ue=JSON.parse('{"name":"Tooltip","slots":[{"name":"default","htmlDoc":null},{"name":"popup","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"placement","optional":true,"value":"bottom","jsDoc":{"description":"Where to position the popup relative to the reference element.","tags":[{"description":"","name":"","tag":"type","type":"\\"top\\" | \\"top-start\\" | \\"top-end\\" | \\"right\\" | \\"right-start\\" | \\"right-end\\" | \\"bottom\\" | \\"bottom-start\\" | \\"bottom-end\\" | \\"left\\" | \\"left-start\\" | \\"left-end\\""}]}},{"kind":"let","name":"followMouse","optional":true,"value":false},{"kind":"let","name":"gesture","optional":true,"value":"hover"},{"kind":"let","name":"arrow","optional":true,"value":true}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[]}');function pe(s,e,o){let{$$slots:t={},$$scope:n}=e,{placement:i="bottom"}=e,{followMouse:r=!1}=e,{gesture:c="hover"}=e,{arrow:a=!0}=e,u=!1;function f(l,p){const v=l.previousElementSibling,h=r?ae(v):v,$=re(h,l,{placement:i,modifiers:[{name:"offset",options:{offset:[0,5]}}]});return r&&h.onchange($.update),{update:I=>{I&&$.update()},destroy:()=>{$.destroy()}}}function w(l){if(c!=="hover")return;const p=l.previousElementSibling,v=["focus","mouseenter"],h=["blur","mouseleave"];function $(){o(2,u=!0)}function I(){o(2,u=!1)}v.forEach(j=>{R(p,j,$,!0)}),h.forEach(j=>{R(p,j,I,!0)})}function m(l){if(c!=="click")return;const p=l.previousElementSibling;document.addEventListener("click",v,!0);function v(h){const[$]=h.path||h.composedPath&&h.composedPath();p.contains($)?o(2,u=!u):u&&o(2,u=!1)}return{destroy:()=>{document.removeEventListener("click",v)}}}return s.$$set=l=>{"placement"in l&&o(0,i=l.placement),"followMouse"in l&&o(6,r=l.followMouse),"gesture"in l&&o(7,c=l.gesture),"arrow"in l&&o(1,a=l.arrow),"$$scope"in l&&o(8,n=l.$$scope)},[i,a,u,f,w,m,r,c,n,t]}class fe extends K{constructor(e){super(),Z(this,e,pe,ce,z,{placement:0,followMouse:6,gesture:7,arrow:1})}}const me={main:ue};JSON.parse('{"name":"Svg_tooltip","slots":[{"name":"default","htmlDoc":null},{"name":"popup","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"placement","optional":true,"value":"auto","jsDoc":{"description":"Where to position the popup relative to the reference element.","tags":[{"description":"","name":"","tag":"type","type":"\\"top\\" | \\"top-start\\" | \\"top-end\\" | \\"right\\" | \\"right-start\\" | \\"right-end\\" | \\"bottom\\" | \\"bottom-start\\" | \\"bottom-end\\" | \\"left\\" | \\"left-start\\" | \\"left-end\\""}]}},{"kind":"let","name":"followMouse","optional":true,"value":false},{"kind":"let","name":"arrow","optional":true,"value":true}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[]}');function F(s,e,o){const t=s.slice();return t[3]=e[o],t}function _e(s){let e=s[3]+"",o;return{c(){o=S(e)},l(t){o=C(t,e)},m(t,n){b(t,o,n)},p:Q,d(t){t&&_(o)}}}function de(s){let e,o;return e=new ne({props:{$$slots:{default:[_e]},$$scope:{ctx:s}}}),{c(){B(e.$$.fragment)},l(t){L(e.$$.fragment,t)},m(t,n){M(e,t,n),o=!0},p(t,n){const i={};n&64&&(i.$$scope={dirty:n,ctx:t}),e.$set(i)},i(t){o||(d(e.$$.fragment,t),o=!0)},o(t){g(e.$$.fragment,t),o=!1},d(t){T(e,t)}}}function he(s){let e,o,t,n=s[3]+"",i,r;return{c(){e=y("span"),o=S("I'm a "),t=y("b"),i=S(n),r=S(" tooltip!"),this.h()},l(c){e=P(c,"SPAN",{slot:!0});var a=D(e);o=C(a,"I'm a "),t=P(a,"B",{});var u=D(t);i=C(u,n),u.forEach(_),r=C(a," tooltip!"),a.forEach(_),this.h()},h(){k(e,"slot","popup")},m(c,a){b(c,e,a),E(e,o),E(e,t),E(t,i),E(e,r)},p:Q,d(c){c&&_(e)}}}function ge(s){let e,o,t;return e=new fe({props:{placement:s[3],$$slots:{popup:[he],default:[de]},$$scope:{ctx:s}}}),{c(){B(e.$$.fragment),o=J()},l(n){L(e.$$.fragment,n),o=N(n)},m(n,i){M(e,n,i),b(n,o,i),t=!0},p(n,i){const r={};i&64&&(r.$$scope={dirty:i,ctx:n}),e.$set(r)},i(n){t||(d(e.$$.fragment,n),t=!0)},o(n){g(e.$$.fragment,n),t=!1},d(n){T(e,n),n&&_(o)}}}function G(s){let e,o;return e=new le({props:{$$slots:{default:[ge]},$$scope:{ctx:s}}}),{c(){B(e.$$.fragment)},l(t){L(e.$$.fragment,t)},m(t,n){M(e,t,n),o=!0},p(t,n){const i={};n&64&&(i.$$scope={dirty:n,ctx:t}),e.$set(i)},i(t){o||(d(e.$$.fragment,t),o=!0)},o(t){g(e.$$.fragment,t),o=!1},d(t){T(e,t)}}}function ve(s){let e,o,t=s[0],n=[];for(let r=0;r<t.length;r+=1)n[r]=G(F(s,t,r));const i=r=>g(n[r],1,1,()=>{n[r]=null});return{c(){e=y("div");for(let r=0;r<n.length;r+=1)n[r].c();this.h()},l(r){e=P(r,"DIV",{class:!0});var c=D(e);for(let a=0;a<n.length;a+=1)n[a].l(c);c.forEach(_),this.h()},h(){k(e,"class","properties examples svelte-jq2pvc")},m(r,c){b(r,e,c);for(let a=0;a<n.length;a+=1)n[a].m(e,null);o=!0},p(r,c){if(c&1){t=r[0];let a;for(a=0;a<t.length;a+=1){const u=F(r,t,a);n[a]?(n[a].p(u,c),d(n[a],1)):(n[a]=G(u),n[a].c(),d(n[a],1),n[a].m(e,null))}for(ee(),a=t.length;a<n.length;a+=1)i(a);te()}},i(r){if(!o){for(let c=0;c<t.length;c+=1)d(n[c]);o=!0}},o(r){n=n.filter(Boolean);for(let c=0;c<n.length;c+=1)g(n[c]);o=!1},d(r){r&&_(e),oe(n,r)}}}function $e(s){let e,o;return e=new se({props:{docs:me,$$slots:{block:[ve]},$$scope:{ctx:s}}}),{c(){B(e.$$.fragment)},l(t){L(e.$$.fragment,t)},m(t,n){M(e,t,n),o=!0},p(t,[n]){const i={};n&64&&(i.$$scope={dirty:n,ctx:t}),e.$set(i)},i(t){o||(d(e.$$.fragment,t),o=!0)},o(t){g(e.$$.fragment,t),o=!1},d(t){T(e,t)}}}function be(s){const e=["top","right","bottom","left"],o=["","-start","-end"],t=[];for(const n of e)t.push(...o.map(i=>n+i));return[t]}class Ce extends K{constructor(e){super(),Z(this,e,be,$e,z,{})}}export{Ce as default};
