import{S as H,i as N,s as R,D as X,e as w,c as y,a as j,d as m,b as k,f as b,k as L,n as M,M as Y,H as C,N as T,E as A,F,G as z,a7 as Z,x as d,u as E,ad as x,ae as ee,j as D,m as V,o as q,v as G,r as te,w as oe,ac as ne,t as P,g as S,I as J}from"../../chunks/vendor-73f7aab9.js";import{B as se}from"../../chunks/Tabs.svelte_svelte_type_style_lang-f95a142e.js";import{C as le}from"../../chunks/component-5ce82bf8.js";import"../../chunks/forward-events-fae2cca0.js";import"../../chunks/Path.svelte_svelte_type_style_lang-9374e05c.js";import"../../chunks/Code-cb795b16.js";import"../../chunks/preload-helper-9f4c7634.js";function re(l){let e=()=>{};const t={x:0,y:0,top:0,left:0,width:0,height:0};return l.addEventListener("mousemove",o=>{t.x=o.clientX,t.left=o.clientX,t.y=o.clientY,t.top=o.clientY,e()}),{getBoundingClientRect:()=>t,onchange:o=>{e=o}}}function K(l,e,t,o){l[o?"addEventListener":"removeEventListener"](e,t)}const ae=l=>({}),O=l=>({});function Q(l){let e;return{c(){e=w("div"),this.h()},l(t){e=y(t,"DIV",{class:!0}),j(e).forEach(m),this.h()},h(){k(e,"class","arrow svelte-1mpi09r")},m(t,o){b(t,e,o)},d(t){t&&m(e)}}}function ce(l){let e,t,o,n,c,r,i;const a=l[9].default,f=X(a,l,l[8],null);let p=l[1]&&Q();const $=l[9].popup,_=X($,l,l[8],O);return{c(){f&&f.c(),e=L(),t=w("div"),p&&p.c(),o=L(),_&&_.c(),this.h()},l(s){f&&f.l(s),e=M(s),t=y(s,"DIV",{class:!0,"data-popper-placement":!0});var u=j(t);p&&p.l(u),o=M(u),_&&_.l(u),u.forEach(m),this.h()},h(){k(t,"class","berry-tooltip svelte-1mpi09r"),k(t,"data-popper-placement",l[0]),Y(t,"visible",l[2])},m(s,u){f&&f.m(s,u),b(s,e,u),b(s,t,u),p&&p.m(t,null),C(t,o),_&&_.m(t,null),c=!0,r||(i=[T(n=l[3].call(null,t,l[2])),T(l[5].call(null,t)),T(l[4].call(null,t))],r=!0)},p(s,[u]){f&&f.p&&(!c||u&256)&&A(f,a,s,s[8],c?z(a,s[8],u,null):F(s[8]),null),s[1]?p||(p=Q(),p.c(),p.m(t,o)):p&&(p.d(1),p=null),_&&_.p&&(!c||u&256)&&A(_,$,s,s[8],c?z($,s[8],u,ae):F(s[8]),O),(!c||u&1)&&k(t,"data-popper-placement",s[0]),n&&Z(n.update)&&u&4&&n.update.call(null,s[2]),u&4&&Y(t,"visible",s[2])},i(s){c||(d(f,s),d(_,s),c=!0)},o(s){E(f,s),E(_,s),c=!1},d(s){f&&f.d(s),s&&m(e),s&&m(t),p&&p.d(),_&&_.d(s),r=!1,x(i)}}}const ie=!0;function fe(l,e,t){let{$$slots:o={},$$scope:n}=e,{placement:c="bottom"}=e,{followMouse:r=!1}=e,{gesture:i="hover"}=e,{arrow:a=!0}=e,f=!1;function p(s,u){const g=s.previousElementSibling,h=r?re(g):g,v=ee(h,s,{placement:c,modifiers:[{name:"offset",options:{offset:[0,5]}}]});return r&&h.onchange(v.update),{update:I=>{I&&v.update()},destroy:()=>{v.destroy()}}}function $(s){if(i!=="hover")return;const u=s.previousElementSibling,g=["focus","mouseenter"],h=["blur","mouseleave"];function v(){t(2,f=!0)}function I(){t(2,f=!1)}g.forEach(B=>{K(u,B,v,!0)}),h.forEach(B=>{K(u,B,I,!0)})}function _(s){if(i!=="click")return;const u=s.previousElementSibling;document.addEventListener("click",g,!0);function g(h){const[v]=h.path||h.composedPath&&h.composedPath();u.contains(v)?t(2,f=!f):f&&t(2,f=!1)}return{destroy:()=>{document.removeEventListener("click",g)}}}return l.$$set=s=>{"placement"in s&&t(0,c=s.placement),"followMouse"in s&&t(6,r=s.followMouse),"gesture"in s&&t(7,i=s.gesture),"arrow"in s&&t(1,a=s.arrow),"$$scope"in s&&t(8,n=s.$$scope)},[c,a,f,p,$,_,r,i,n,o]}class ue extends H{constructor(e){super();N(this,e,fe,ce,R,{placement:0,followMouse:6,gesture:7,arrow:1})}}const pe={main:ie};function U(l,e,t){const o=l.slice();return o[3]=e[t],o}function _e(l){let e=l[3]+"",t;return{c(){t=P(e)},l(o){t=S(o,e)},m(o,n){b(o,t,n)},p:J,d(o){o&&m(t)}}}function me(l){let e,t,o;return e=new se({props:{primary:!0,$$slots:{default:[_e]},$$scope:{ctx:l}}}),{c(){D(e.$$.fragment),t=L()},l(n){V(e.$$.fragment,n),t=M(n)},m(n,c){q(e,n,c),b(n,t,c),o=!0},p(n,c){const r={};c&64&&(r.$$scope={dirty:c,ctx:n}),e.$set(r)},i(n){o||(d(e.$$.fragment,n),o=!0)},o(n){E(e.$$.fragment,n),o=!1},d(n){G(e,n),n&&m(t)}}}function he(l){let e,t,o,n=l[3]+"",c,r;return{c(){e=w("span"),t=P("I'm a "),o=w("b"),c=P(n),r=P(" tooltip!"),this.h()},l(i){e=y(i,"SPAN",{slot:!0});var a=j(e);t=S(a,"I'm a "),o=y(a,"B",{});var f=j(o);c=S(f,n),f.forEach(m),r=S(a," tooltip!"),a.forEach(m),this.h()},h(){k(e,"slot","popup")},m(i,a){b(i,e,a),C(e,t),C(e,o),C(o,c),C(e,r)},p:J,d(i){i&&m(e)}}}function W(l){let e,t;return e=new ue({props:{placement:l[3],$$slots:{popup:[he],default:[me]},$$scope:{ctx:l}}}),{c(){D(e.$$.fragment)},l(o){V(e.$$.fragment,o)},m(o,n){q(e,o,n),t=!0},p(o,n){const c={};n&64&&(c.$$scope={dirty:n,ctx:o}),e.$set(c)},i(o){t||(d(e.$$.fragment,o),t=!0)},o(o){E(e.$$.fragment,o),t=!1},d(o){G(e,o)}}}function de(l){let e,t,o=l[0],n=[];for(let r=0;r<o.length;r+=1)n[r]=W(U(l,o,r));const c=r=>E(n[r],1,1,()=>{n[r]=null});return{c(){e=w("div");for(let r=0;r<n.length;r+=1)n[r].c();this.h()},l(r){e=y(r,"DIV",{class:!0});var i=j(e);for(let a=0;a<n.length;a+=1)n[a].l(i);i.forEach(m),this.h()},h(){k(e,"class","properties examples svelte-jq2pvc")},m(r,i){b(r,e,i);for(let a=0;a<n.length;a+=1)n[a].m(e,null);t=!0},p(r,i){if(i&1){o=r[0];let a;for(a=0;a<o.length;a+=1){const f=U(r,o,a);n[a]?(n[a].p(f,i),d(n[a],1)):(n[a]=W(f),n[a].c(),d(n[a],1),n[a].m(e,null))}for(te(),a=o.length;a<n.length;a+=1)c(a);oe()}},i(r){if(!t){for(let i=0;i<o.length;i+=1)d(n[i]);t=!0}},o(r){n=n.filter(Boolean);for(let i=0;i<n.length;i+=1)E(n[i]);t=!1},d(r){r&&m(e),ne(n,r)}}}function ge(l){let e,t;return e=new le({props:{docs:pe,$$slots:{block:[de]},$$scope:{ctx:l}}}),{c(){D(e.$$.fragment)},l(o){V(e.$$.fragment,o)},m(o,n){q(e,o,n),t=!0},p(o,[n]){const c={};n&64&&(c.$$scope={dirty:n,ctx:o}),e.$set(c)},i(o){t||(d(e.$$.fragment,o),t=!0)},o(o){E(e.$$.fragment,o),t=!1},d(o){G(e,o)}}}function ve(l){const e=["top","right","bottom","left"],t=["","-start","-end"],o=[];for(const n of e)o.push(...t.map(c=>n+c));return[o]}class Ce extends H{constructor(e){super();N(this,e,ve,ge,R,{})}}export{Ce as default};
