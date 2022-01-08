import{S as z,i as G,s as H,D as J,e as w,c as E,a as $,d,b as y,f as b,k as M,n as T,M as O,H as j,N as B,E as R,F as W,G as X,a7 as Z,x as _,u as k,ad as x,ae as ee,j as L,m as N,o as V,v as q,r as te,w as oe,ac as le,t as S,g as C,I as Y}from"../../chunks/vendor-9f6e7ae3.js";import{B as ne}from"../../chunks/Tabs.svelte_svelte_type_style_lang-b4301ec9.js";import{C as se}from"../../chunks/component-cbb1e6bb.js";import"../../chunks/forward-events-77cf227d.js";import"../../chunks/Path-1af2aefa.js";import"../../chunks/Code-61dd9ba6.js";import"../../chunks/preload-helper-9f4c7634.js";function re(s){let e=()=>{};const t={x:0,y:0,top:0,left:0,width:0,height:0};return s.addEventListener("mousemove",o=>{t.x=o.clientX,t.left=o.clientX,t.y=o.clientY,t.top=o.clientY,e()}),{getBoundingClientRect:()=>t,onchange:o=>{e=o}}}function A(s,e,t,o){s[o?"addEventListener":"removeEventListener"](e,t)}const ae=s=>({}),F=s=>({});function K(s){let e;return{c(){e=w("div"),this.h()},l(t){e=E(t,"DIV",{class:!0}),$(e).forEach(d),this.h()},h(){y(e,"class","arrow svelte-13w6j2z")},m(t,o){b(t,e,o)},d(t){t&&d(e)}}}function ie(s){let e,t,o,l,i,r,c;const a=s[9].default,u=J(a,s,s[8],null);let f=s[1]&&K();const D=s[9].popup,m=J(D,s,s[8],F);return{c(){u&&u.c(),e=M(),t=w("div"),f&&f.c(),o=M(),m&&m.c(),this.h()},l(n){u&&u.l(n),e=T(n),t=E(n,"DIV",{class:!0,"data-popper-placement":!0});var p=$(t);f&&f.l(p),o=T(p),m&&m.l(p),p.forEach(d),this.h()},h(){y(t,"class","berry-tooltip svelte-13w6j2z"),y(t,"data-popper-placement",s[0]),O(t,"visible",s[2])},m(n,p){u&&u.m(n,p),b(n,e,p),b(n,t,p),f&&f.m(t,null),j(t,o),m&&m.m(t,null),i=!0,r||(c=[B(l=s[3].call(null,t,s[2])),B(s[5].call(null,t)),B(s[4].call(null,t))],r=!0)},p(n,[p]){u&&u.p&&(!i||p&256)&&R(u,a,n,n[8],i?X(a,n[8],p,null):W(n[8]),null),n[1]?f||(f=K(),f.c(),f.m(t,o)):f&&(f.d(1),f=null),m&&m.p&&(!i||p&256)&&R(m,D,n,n[8],i?X(D,n[8],p,ae):W(n[8]),F),(!i||p&1)&&y(t,"data-popper-placement",n[0]),l&&Z(l.update)&&p&4&&l.update.call(null,n[2]),p&4&&O(t,"visible",n[2])},i(n){i||(_(u,n),_(m,n),i=!0)},o(n){k(u,n),k(m,n),i=!1},d(n){u&&u.d(n),n&&d(e),n&&d(t),f&&f.d(),m&&m.d(n),r=!1,x(c)}}}const ce=JSON.parse('{"name":"Tooltip","slots":[{"name":"default","htmlDoc":null},{"name":"popup","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"placement","optional":true,"value":"bottom","jsDoc":{"description":"Where to position the popup relative to the reference element.","tags":[{"description":"","name":"","tag":"type","type":"\\"top\\" | \\"top-start\\" | \\"top-end\\" | \\"right\\" | \\"right-start\\" | \\"right-end\\" | \\"bottom\\" | \\"bottom-start\\" | \\"bottom-end\\" | \\"left\\" | \\"left-start\\" | \\"left-end\\""}]}},{"kind":"let","name":"followMouse","optional":true,"value":false},{"kind":"let","name":"gesture","optional":true,"value":"hover"},{"kind":"let","name":"arrow","optional":true,"value":true}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[{"property":"--br-tooltip-arrow-skidding-inline","value":" ","cssDoc":null},{"property":"--br-tooltip-arrow-skidding-block","value":" ","cssDoc":null},{"property":"--br-tooltip-box-shadow","value":" ","cssDoc":null},{"property":"--br-tooltip-background-color","value":" ","cssDoc":null},{"property":"--br-tooltip-text-color","value":" ","cssDoc":null},{"property":"--br-tooltip-padding-inline","value":" ","cssDoc":null},{"property":"--br-tooltip-padding-block","value":" ","cssDoc":null},{"property":"--br-tooltip-transition-duration","value":" ","cssDoc":null},{"property":"--br-tooltip-transition-delay","value":" ","cssDoc":null},{"property":"--br-tooltip-transition-function","value":" ","cssDoc":null}]}');function ue(s,e,t){let{$$slots:o={},$$scope:l}=e,{placement:i="bottom"}=e,{followMouse:r=!1}=e,{gesture:c="hover"}=e,{arrow:a=!0}=e,u=!1;function f(n,p){const v=n.previousElementSibling,h=r?re(v):v,g=ee(h,n,{placement:i,modifiers:[{name:"offset",options:{offset:[0,5]}}]});return r&&h.onchange(g.update),{update:P=>{P&&g.update()},destroy:()=>{g.destroy()}}}function D(n){if(c!=="hover")return;const p=n.previousElementSibling,v=["focus","mouseenter"],h=["blur","mouseleave"];function g(){t(2,u=!0)}function P(){t(2,u=!1)}v.forEach(I=>{A(p,I,g,!0)}),h.forEach(I=>{A(p,I,P,!0)})}function m(n){if(c!=="click")return;const p=n.previousElementSibling;document.addEventListener("click",v,!0);function v(h){const[g]=h.path||h.composedPath&&h.composedPath();p.contains(g)?t(2,u=!u):u&&t(2,u=!1)}return{destroy:()=>{document.removeEventListener("click",v)}}}return s.$$set=n=>{"placement"in n&&t(0,i=n.placement),"followMouse"in n&&t(6,r=n.followMouse),"gesture"in n&&t(7,c=n.gesture),"arrow"in n&&t(1,a=n.arrow),"$$scope"in n&&t(8,l=n.$$scope)},[i,a,u,f,D,m,r,c,l,o]}class pe extends z{constructor(e){super();G(this,e,ue,ie,H,{placement:0,followMouse:6,gesture:7,arrow:1})}}const fe={main:ce};JSON.parse('{"name":"Svgtooltip","slots":[{"name":"default","htmlDoc":null},{"name":"popup","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"placement","optional":true,"value":"auto","jsDoc":{"description":"Where to position the popup relative to the reference element.","tags":[{"description":"","name":"","tag":"type","type":"\\"top\\" | \\"top-start\\" | \\"top-end\\" | \\"right\\" | \\"right-start\\" | \\"right-end\\" | \\"bottom\\" | \\"bottom-start\\" | \\"bottom-end\\" | \\"left\\" | \\"left-start\\" | \\"left-end\\""}]}},{"kind":"let","name":"followMouse","optional":true,"value":false},{"kind":"let","name":"arrow","optional":true,"value":true}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[{"property":"--br-tooltip-arrow-skidding-inline","value":" ","cssDoc":null},{"property":"--br-tooltip-arrow-skidding-block","value":" ","cssDoc":null},{"property":"--br-tooltip-box-shadow","value":" ","cssDoc":null},{"property":"--br-tooltip-background-color","value":" ","cssDoc":null},{"property":"--br-tooltip-text-color","value":" ","cssDoc":null},{"property":"--br-tooltip-padding-inline","value":" ","cssDoc":null},{"property":"--br-tooltip-padding-block","value":" ","cssDoc":null},{"property":"--br-tooltip-transition-duration","value":" ","cssDoc":null},{"property":"--br-tooltip-transition-delay","value":" ","cssDoc":null},{"property":"--br-tooltip-transition-function","value":" ","cssDoc":null}]}');function Q(s,e,t){const o=s.slice();return o[3]=e[t],o}function me(s){let e=s[3]+"",t;return{c(){t=S(e)},l(o){t=C(o,e)},m(o,l){b(o,t,l)},p:Y,d(o){o&&d(t)}}}function de(s){let e,t,o;return e=new ne({props:{primary:!0,$$slots:{default:[me]},$$scope:{ctx:s}}}),{c(){L(e.$$.fragment),t=M()},l(l){N(e.$$.fragment,l),t=T(l)},m(l,i){V(e,l,i),b(l,t,i),o=!0},p(l,i){const r={};i&64&&(r.$$scope={dirty:i,ctx:l}),e.$set(r)},i(l){o||(_(e.$$.fragment,l),o=!0)},o(l){k(e.$$.fragment,l),o=!1},d(l){q(e,l),l&&d(t)}}}function he(s){let e,t,o,l=s[3]+"",i,r;return{c(){e=w("span"),t=S("I'm a "),o=w("b"),i=S(l),r=S(" tooltip!"),this.h()},l(c){e=E(c,"SPAN",{slot:!0});var a=$(e);t=C(a,"I'm a "),o=E(a,"B",{});var u=$(o);i=C(u,l),u.forEach(d),r=C(a," tooltip!"),a.forEach(d),this.h()},h(){y(e,"slot","popup")},m(c,a){b(c,e,a),j(e,t),j(e,o),j(o,i),j(e,r)},p:Y,d(c){c&&d(e)}}}function U(s){let e,t;return e=new pe({props:{placement:s[3],$$slots:{popup:[he],default:[de]},$$scope:{ctx:s}}}),{c(){L(e.$$.fragment)},l(o){N(e.$$.fragment,o)},m(o,l){V(e,o,l),t=!0},p(o,l){const i={};l&64&&(i.$$scope={dirty:l,ctx:o}),e.$set(i)},i(o){t||(_(e.$$.fragment,o),t=!0)},o(o){k(e.$$.fragment,o),t=!1},d(o){q(e,o)}}}function _e(s){let e,t,o=s[0],l=[];for(let r=0;r<o.length;r+=1)l[r]=U(Q(s,o,r));const i=r=>k(l[r],1,1,()=>{l[r]=null});return{c(){e=w("div");for(let r=0;r<l.length;r+=1)l[r].c();this.h()},l(r){e=E(r,"DIV",{class:!0});var c=$(e);for(let a=0;a<l.length;a+=1)l[a].l(c);c.forEach(d),this.h()},h(){y(e,"class","properties examples svelte-jq2pvc")},m(r,c){b(r,e,c);for(let a=0;a<l.length;a+=1)l[a].m(e,null);t=!0},p(r,c){if(c&1){o=r[0];let a;for(a=0;a<o.length;a+=1){const u=Q(r,o,a);l[a]?(l[a].p(u,c),_(l[a],1)):(l[a]=U(u),l[a].c(),_(l[a],1),l[a].m(e,null))}for(te(),a=o.length;a<l.length;a+=1)i(a);oe()}},i(r){if(!t){for(let c=0;c<o.length;c+=1)_(l[c]);t=!0}},o(r){l=l.filter(Boolean);for(let c=0;c<l.length;c+=1)k(l[c]);t=!1},d(r){r&&d(e),le(l,r)}}}function ve(s){let e,t;return e=new se({props:{docs:fe,$$slots:{block:[_e]},$$scope:{ctx:s}}}),{c(){L(e.$$.fragment)},l(o){N(e.$$.fragment,o)},m(o,l){V(e,o,l),t=!0},p(o,[l]){const i={};l&64&&(i.$$scope={dirty:l,ctx:o}),e.$set(i)},i(o){t||(_(e.$$.fragment,o),t=!0)},o(o){k(e.$$.fragment,o),t=!1},d(o){q(e,o)}}}function ge(s){const e=["top","right","bottom","left"],t=["","-start","-end"],o=[];for(const l of e)o.push(...t.map(i=>l+i));return[o]}class je extends z{constructor(e){super();G(this,e,ge,ve,H,{})}}export{je as default};
