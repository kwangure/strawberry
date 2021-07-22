import{S as t,i as e,s as o,D as n,e as s,c as l,a as r,d as a,b as c,f as i,k as p,n as u,L as m,G as f,M as d,E as h,a6 as $,x as g,u as v,ab as b,ac as k,j as w,m as y,o as E,v as x,r as j,w as S,aa as M,t as D,g as L,H as P}from"../../chunks/vendor-1cf73c7e.js";import{B as I}from"../../chunks/Tabs-f16964da.js";import{C as B}from"../../chunks/component-c866c031.js";import"../../chunks/forward-events-c1af8394.js";import"../../chunks/Path-40082edd.js";import"../../chunks/Code-01c9966a.js";import"../../chunks/preload-helper-13c00eaa.js";function q(t,e,o,n){t[n?"addEventListener":"removeEventListener"](e,o)}const C=t=>({}),N=t=>({});function V(t){let e;return{c(){e=s("div"),this.h()},l(t){e=l(t,"DIV",{class:!0}),r(e).forEach(a),this.h()},h(){c(e,"class","arrow svelte-yq62dl")},m(t,o){i(t,e,o)},d(t){t&&a(e)}}}function J(t){let e,o,k,w,y,E,x;const j=t[9].default,S=n(j,t,t[8],null);let M=t[1]&&V();const D=t[9].popup,L=n(D,t,t[8],N);return{c(){S&&S.c(),e=p(),o=s("div"),M&&M.c(),k=p(),L&&L.c(),this.h()},l(t){S&&S.l(t),e=u(t),o=l(t,"DIV",{class:!0,"data-popper-placement":!0});var n=r(o);M&&M.l(n),k=u(n),L&&L.l(n),n.forEach(a),this.h()},h(){c(o,"class","berry-tooltip svelte-yq62dl"),c(o,"data-popper-placement",t[0]),m(o,"visible",t[2])},m(n,s){S&&S.m(n,s),i(n,e,s),i(n,o,s),M&&M.m(o,null),f(o,k),L&&L.m(o,null),y=!0,E||(x=[d(w=t[3].call(null,o,t[2])),d(t[5].call(null,o)),d(t[4].call(null,o))],E=!0)},p(t,[e]){S&&S.p&&(!y||256&e)&&h(S,j,t,t[8],y?e:-1,null,null),t[1]?M||(M=V(),M.c(),M.m(o,k)):M&&(M.d(1),M=null),L&&L.p&&(!y||256&e)&&h(L,D,t,t[8],y?e:-1,C,N),(!y||1&e)&&c(o,"data-popper-placement",t[0]),w&&$(w.update)&&4&e&&w.update.call(null,t[2]),4&e&&m(o,"visible",t[2])},i(t){y||(g(S,t),g(L,t),y=!0)},o(t){v(S,t),v(L,t),y=!1},d(t){S&&S.d(t),t&&a(e),t&&a(o),M&&M.d(),L&&L.d(t),E=!1,b(x)}}}function O(t,e,o){let{$$slots:n={},$$scope:s}=e,{placement:l="bottom"}=e,{followMouse:r=!1}=e,{gesture:a="hover"}=e,{arrow:c=!0}=e,i=!1;return t.$$set=t=>{"placement"in t&&o(0,l=t.placement),"followMouse"in t&&o(6,r=t.followMouse),"gesture"in t&&o(7,a=t.gesture),"arrow"in t&&o(1,c=t.arrow),"$$scope"in t&&o(8,s=t.$$scope)},[l,c,i,function(t,e){const o=t.previousElementSibling,n=r?function(t){let e=()=>{};const o={x:0,y:0,top:0,left:0,width:0,height:0};return t.addEventListener("mousemove",(t=>{o.x=t.clientX,o.left=t.clientX,o.y=t.clientY,o.top=t.clientY,e()})),{getBoundingClientRect:()=>o,onchange:t=>{e=t}}}(o):o,s=k(n,t,{placement:l,modifiers:[{name:"offset",options:{offset:[0,5]}}]});return r&&n.onchange(s.update),{update:t=>{t&&s.update()},destroy:()=>{s.destroy()}}},function(t){if("hover"!==a)return;const e=t.previousElementSibling;function n(){o(2,i=!0)}function s(){o(2,i=!1)}["focus","mouseenter"].forEach((t=>{q(e,t,n,!0)})),["blur","mouseleave"].forEach((t=>{q(e,t,s,!0)}))},function(t){if("click"!==a)return;const e=t.previousElementSibling;function n(t){const[n]=t.path||t.composedPath&&t.composedPath();e.contains(n)?o(2,i=!i):i&&o(2,i=!1)}return document.addEventListener("click",n,!0),{destroy:()=>{document.removeEventListener("click",n)}}},r,a,s,n]}class T extends t{constructor(t){super(),e(this,t,O,J,o,{placement:0,followMouse:6,gesture:7,arrow:1})}}const W={main:JSON.parse('{"name":"Tooltip","props":[{"kind":"let","name":"placement","optional":true,"value":"bottom","jsDoc":{"description":"Where to position the popup relative to the reference element.","tags":[{"tag":"type","name":"","type":"\\"top\\" | \\"top-start\\" | \\"top-end\\" | \\"right\\" | \\"right-start\\" | \\"right-end\\" | \\"bottom\\" | \\"bottom-start\\" | \\"bottom-end\\" | \\"left\\" | \\"left-start\\" | \\"left-end\\"","optional":false,"description":""}]}},{"kind":"let","name":"followMouse","optional":true,"value":false},{"kind":"let","name":"gesture","optional":true,"value":"hover"},{"kind":"let","name":"arrow","optional":true,"value":true}],"exports":[],"customProperties":[]}')};JSON.parse('{"name":"Svgtooltip","props":[{"kind":"let","name":"placement","optional":true,"value":"auto","jsDoc":{"description":"Where to position the popup relative to the reference element.","tags":[{"tag":"type","name":"","type":"\\"top\\" | \\"top-start\\" | \\"top-end\\" | \\"right\\" | \\"right-start\\" | \\"right-end\\" | \\"bottom\\" | \\"bottom-start\\" | \\"bottom-end\\" | \\"left\\" | \\"left-start\\" | \\"left-end\\"","optional":false,"description":""}]}},{"kind":"let","name":"followMouse","optional":true,"value":false},{"kind":"let","name":"arrow","optional":true,"value":true}],"exports":[],"customProperties":[]}');function X(t,e,o){const n=t.slice();return n[3]=e[o],n}function Y(t){let e,o=t[3]+"";return{c(){e=D(o)},l(t){e=L(t,o)},m(t,o){i(t,e,o)},p:P,d(t){t&&a(e)}}}function A(t){let e,o,n;return e=new I({props:{primary:!0,$$slots:{default:[Y]},$$scope:{ctx:t}}}),{c(){w(e.$$.fragment),o=p()},l(t){y(e.$$.fragment,t),o=u(t)},m(t,s){E(e,t,s),i(t,o,s),n=!0},p(t,o){const n={};64&o&&(n.$$scope={dirty:o,ctx:t}),e.$set(n)},i(t){n||(g(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){x(e,t),t&&a(o)}}}function G(t){let e,o,n,p,u,m=t[3]+"";return{c(){e=s("span"),o=D("I'm a "),n=s("b"),p=D(m),u=D(" tooltip!"),this.h()},l(t){e=l(t,"SPAN",{slot:!0});var s=r(e);o=L(s,"I'm a "),n=l(s,"B",{});var c=r(n);p=L(c,m),c.forEach(a),u=L(s," tooltip!"),s.forEach(a),this.h()},h(){c(e,"slot","popup")},m(t,s){i(t,e,s),f(e,o),f(e,n),f(n,p),f(e,u)},p:P,d(t){t&&a(e)}}}function H(t){let e,o;return e=new T({props:{placement:t[3],$$slots:{popup:[G],default:[A]},$$scope:{ctx:t}}}),{c(){w(e.$$.fragment)},l(t){y(e.$$.fragment,t)},m(t,n){E(e,t,n),o=!0},p(t,o){const n={};64&o&&(n.$$scope={dirty:o,ctx:t}),e.$set(n)},i(t){o||(g(e.$$.fragment,t),o=!0)},o(t){v(e.$$.fragment,t),o=!1},d(t){x(e,t)}}}function R(t){let e,o,n=t[0],p=[];for(let s=0;s<n.length;s+=1)p[s]=H(X(t,n,s));const u=t=>v(p[t],1,1,(()=>{p[t]=null}));return{c(){e=s("div");for(let t=0;t<p.length;t+=1)p[t].c();this.h()},l(t){e=l(t,"DIV",{class:!0});var o=r(e);for(let e=0;e<p.length;e+=1)p[e].l(o);o.forEach(a),this.h()},h(){c(e,"class","properties examples svelte-jq2pvc")},m(t,n){i(t,e,n);for(let o=0;o<p.length;o+=1)p[o].m(e,null);o=!0},p(t,o){if(1&o){let s;for(n=t[0],s=0;s<n.length;s+=1){const l=X(t,n,s);p[s]?(p[s].p(l,o),g(p[s],1)):(p[s]=H(l),p[s].c(),g(p[s],1),p[s].m(e,null))}for(j(),s=n.length;s<p.length;s+=1)u(s);S()}},i(t){if(!o){for(let t=0;t<n.length;t+=1)g(p[t]);o=!0}},o(t){p=p.filter(Boolean);for(let e=0;e<p.length;e+=1)v(p[e]);o=!1},d(t){t&&a(e),M(p,t)}}}function z(t){let e,o;return e=new B({props:{docs:W,$$slots:{block:[R]},$$scope:{ctx:t}}}),{c(){w(e.$$.fragment)},l(t){y(e.$$.fragment,t)},m(t,n){E(e,t,n),o=!0},p(t,[o]){const n={};64&o&&(n.$$scope={dirty:o,ctx:t}),e.$set(n)},i(t){o||(g(e.$$.fragment,t),o=!0)},o(t){v(e.$$.fragment,t),o=!1},d(t){x(e,t)}}}function F(t){const e=["top","right","bottom","left"],o=["","-start","-end"],n=[];for(const s of e)n.push(...o.map((t=>s+t)));return[n]}export default class extends t{constructor(t){super(),e(this,t,F,z,o,{})}}
