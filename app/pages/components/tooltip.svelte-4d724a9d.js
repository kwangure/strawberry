import{S as t,i as e,s as o,D as n,e as s,c as a,a as r,d as l,b as p,f as c,k as i,n as u,L as m,G as f,M as d,E as h,a6 as $,x as g,u as v,ab as b,ac as k,j as w,m as y,o as x,v as E,r as j,w as S,aa as M,t as D,g as L,H as P}from"../../chunks/vendor-60cb395e.js";import{B as I}from"../../chunks/Tabs-2f7d063e.js";import{C as B}from"../../chunks/component-51763a4d.js";import"../../chunks/forward-events-13fb088f.js";import"../../chunks/Path-a25a428a.js";import"../../chunks/Code-1d083102.js";import"../../chunks/preload-helper-13c00eaa.js";function T(t,e,o,n){t[n?"addEventListener":"removeEventListener"](e,o)}const A=t=>({}),C=t=>({});function N(t){let e;return{c(){e=s("div"),this.h()},l(t){e=a(t,"DIV",{class:!0}),r(e).forEach(l),this.h()},h(){p(e,"class","arrow svelte-15sd8k9")},m(t,o){c(t,e,o)},d(t){t&&l(e)}}}function V(t){let e,o,k,w,y,x,E;const j=t[9].default,S=n(j,t,t[8],null);let M=t[1]&&N();const D=t[9].popup,L=n(D,t,t[8],C);return{c(){S&&S.c(),e=i(),o=s("div"),M&&M.c(),k=i(),L&&L.c(),this.h()},l(t){S&&S.l(t),e=u(t),o=a(t,"DIV",{class:!0,"data-popper-placement":!0});var n=r(o);M&&M.l(n),k=u(n),L&&L.l(n),n.forEach(l),this.h()},h(){p(o,"class","berry-tooltip svelte-15sd8k9"),p(o,"data-popper-placement",t[0]),m(o,"visible",t[2])},m(n,s){S&&S.m(n,s),c(n,e,s),c(n,o,s),M&&M.m(o,null),f(o,k),L&&L.m(o,null),y=!0,x||(E=[d(w=t[3].call(null,o,t[2])),d(t[5].call(null,o)),d(t[4].call(null,o))],x=!0)},p(t,[e]){S&&S.p&&(!y||256&e)&&h(S,j,t,t[8],y?e:-1,null,null),t[1]?M||(M=N(),M.c(),M.m(o,k)):M&&(M.d(1),M=null),L&&L.p&&(!y||256&e)&&h(L,D,t,t[8],y?e:-1,A,C),(!y||1&e)&&p(o,"data-popper-placement",t[0]),w&&$(w.update)&&4&e&&w.update.call(null,t[2]),4&e&&m(o,"visible",t[2])},i(t){y||(g(S,t),g(L,t),y=!0)},o(t){v(S,t),v(L,t),y=!1},d(t){S&&S.d(t),t&&l(e),t&&l(o),M&&M.d(),L&&L.d(t),x=!1,b(E)}}}function J(t,e,o){let{$$slots:n={},$$scope:s}=e,{placement:a="bottom"}=e,{followMouse:r=!1}=e,{gesture:l="hover"}=e,{arrow:p=!0}=e,c=!1;return t.$$set=t=>{"placement"in t&&o(0,a=t.placement),"followMouse"in t&&o(6,r=t.followMouse),"gesture"in t&&o(7,l=t.gesture),"arrow"in t&&o(1,p=t.arrow),"$$scope"in t&&o(8,s=t.$$scope)},[a,p,c,function(t,e){const o=t.previousElementSibling,n=r?function(t){let e=()=>{};const o={x:0,y:0,top:0,left:0,width:0,height:0};return t.addEventListener("mousemove",(t=>{o.x=t.clientX,o.left=t.clientX,o.y=t.clientY,o.top=t.clientY,e()})),{getBoundingClientRect:()=>o,onchange:t=>{e=t}}}(o):o,s=k(n,t,{placement:a,modifiers:[{name:"offset",options:{offset:[0,5]}}]});return r&&n.onchange(s.update),{update:t=>{t&&s.update()},destroy:()=>{s.destroy()}}},function(t){if("hover"!==l)return;const e=t.previousElementSibling;function n(){o(2,c=!0)}function s(){o(2,c=!1)}["focus","mouseenter"].forEach((t=>{T(e,t,n,!0)})),["blur","mouseleave"].forEach((t=>{T(e,t,s,!0)}))},function(t){if("click"!==l)return;const e=t.previousElementSibling;function n(t){const[n]=t.path||t.composedPath&&t.composedPath();e.contains(n)?o(2,c=!c):c&&o(2,c=!1)}return document.addEventListener("click",n,!0),{destroy:()=>{document.removeEventListener("click",n)}}},r,l,s,n]}class O extends t{constructor(t){super(),e(this,t,J,V,o,{placement:0,followMouse:6,gesture:7,arrow:1})}}const W={main:JSON.parse('{"name":"Tooltip","slots":[{"name":"default"},{"name":{"start":2931,"end":2943,"type":"Attribute","name":"name","value":[{"start":2937,"end":2942,"type":"Text","raw":"popup","data":"popup"}]}}],"description":"","props":[{"kind":"let","name":"placement","optional":true,"value":"bottom","jsDoc":{"description":"Where to position the popup relative to the reference element.","tags":[{"description":"","name":"","tag":"type","type":"\\"top\\" | \\"top-start\\" | \\"top-end\\" | \\"right\\" | \\"right-start\\" | \\"right-end\\" | \\"bottom\\" | \\"bottom-start\\" | \\"bottom-end\\" | \\"left\\" | \\"left-start\\" | \\"left-end\\""}]}},{"kind":"let","name":"followMouse","optional":true,"value":false},{"kind":"let","name":"gesture","optional":true,"value":"hover"},{"kind":"let","name":"arrow","optional":true,"value":true}],"exports":[],"customProperties":[]}')};JSON.parse('{"name":"Svgtooltip","slots":[{"name":"default"},{"name":{"start":2490,"end":2502,"type":"Attribute","name":"name","value":[{"start":2496,"end":2501,"type":"Text","raw":"popup","data":"popup"}]}}],"description":"","props":[{"kind":"let","name":"placement","optional":true,"value":"auto","jsDoc":{"description":"Where to position the popup relative to the reference element.","tags":[{"description":"","name":"","tag":"type","type":"\\"top\\" | \\"top-start\\" | \\"top-end\\" | \\"right\\" | \\"right-start\\" | \\"right-end\\" | \\"bottom\\" | \\"bottom-start\\" | \\"bottom-end\\" | \\"left\\" | \\"left-start\\" | \\"left-end\\""}]}},{"kind":"let","name":"followMouse","optional":true,"value":false},{"kind":"let","name":"arrow","optional":true,"value":true}],"exports":[],"customProperties":[]}');function X(t,e,o){const n=t.slice();return n[3]=e[o],n}function Y(t){let e,o=t[3]+"";return{c(){e=D(o)},l(t){e=L(t,o)},m(t,o){c(t,e,o)},p:P,d(t){t&&l(e)}}}function q(t){let e,o,n;return e=new I({props:{primary:!0,$$slots:{default:[Y]},$$scope:{ctx:t}}}),{c(){w(e.$$.fragment),o=i()},l(t){y(e.$$.fragment,t),o=u(t)},m(t,s){x(e,t,s),c(t,o,s),n=!0},p(t,o){const n={};64&o&&(n.$$scope={dirty:o,ctx:t}),e.$set(n)},i(t){n||(g(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){E(e,t),t&&l(o)}}}function G(t){let e,o,n,i,u,m=t[3]+"";return{c(){e=s("span"),o=D("I'm a "),n=s("b"),i=D(m),u=D(" tooltip!"),this.h()},l(t){e=a(t,"SPAN",{slot:!0});var s=r(e);o=L(s,"I'm a "),n=a(s,"B",{});var p=r(n);i=L(p,m),p.forEach(l),u=L(s," tooltip!"),s.forEach(l),this.h()},h(){p(e,"slot","popup")},m(t,s){c(t,e,s),f(e,o),f(e,n),f(n,i),f(e,u)},p:P,d(t){t&&l(e)}}}function H(t){let e,o;return e=new O({props:{placement:t[3],$$slots:{popup:[G],default:[q]},$$scope:{ctx:t}}}),{c(){w(e.$$.fragment)},l(t){y(e.$$.fragment,t)},m(t,n){x(e,t,n),o=!0},p(t,o){const n={};64&o&&(n.$$scope={dirty:o,ctx:t}),e.$set(n)},i(t){o||(g(e.$$.fragment,t),o=!0)},o(t){v(e.$$.fragment,t),o=!1},d(t){E(e,t)}}}function R(t){let e,o,n=t[0],i=[];for(let s=0;s<n.length;s+=1)i[s]=H(X(t,n,s));const u=t=>v(i[t],1,1,(()=>{i[t]=null}));return{c(){e=s("div");for(let t=0;t<i.length;t+=1)i[t].c();this.h()},l(t){e=a(t,"DIV",{class:!0});var o=r(e);for(let e=0;e<i.length;e+=1)i[e].l(o);o.forEach(l),this.h()},h(){p(e,"class","properties examples svelte-jq2pvc")},m(t,n){c(t,e,n);for(let o=0;o<i.length;o+=1)i[o].m(e,null);o=!0},p(t,o){if(1&o){let s;for(n=t[0],s=0;s<n.length;s+=1){const a=X(t,n,s);i[s]?(i[s].p(a,o),g(i[s],1)):(i[s]=H(a),i[s].c(),g(i[s],1),i[s].m(e,null))}for(j(),s=n.length;s<i.length;s+=1)u(s);S()}},i(t){if(!o){for(let t=0;t<n.length;t+=1)g(i[t]);o=!0}},o(t){i=i.filter(Boolean);for(let e=0;e<i.length;e+=1)v(i[e]);o=!1},d(t){t&&l(e),M(i,t)}}}function z(t){let e,o;return e=new B({props:{docs:W,$$slots:{block:[R]},$$scope:{ctx:t}}}),{c(){w(e.$$.fragment)},l(t){y(e.$$.fragment,t)},m(t,n){x(e,t,n),o=!0},p(t,[o]){const n={};64&o&&(n.$$scope={dirty:o,ctx:t}),e.$set(n)},i(t){o||(g(e.$$.fragment,t),o=!0)},o(t){v(e.$$.fragment,t),o=!1},d(t){E(e,t)}}}function F(t){const e=["top","right","bottom","left"],o=["","-start","-end"],n=[];for(const s of e)n.push(...o.map((t=>s+t)));return[n]}export default class extends t{constructor(t){super(),e(this,t,F,z,o,{})}}
