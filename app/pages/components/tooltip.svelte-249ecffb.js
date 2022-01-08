import{S as z,i as G,s as H,D as R,e as E,c as $,a as D,d as _,b as y,f as b,k as M,n as T,M as X,H as j,N as B,E as Y,F as A,G as F,a7 as Z,x as h,u as k,ad as x,ae as ee,j as L,m as V,o as N,v as q,r as te,w as oe,ac as le,t as I,g as P,I as J}from"../../chunks/vendor-e131a66c.js";import{B as ne}from"../../chunks/Tabs.svelte_svelte_type_style_lang-caeedc73.js";import{C as se}from"../../chunks/component-c6012510.js";import"../../chunks/forward-events-6f9dd4b6.js";import"../../chunks/Path.svelte_svelte_type_style_lang-51b251eb.js";import"../../chunks/Code-d129abdd.js";import"../../chunks/preload-helper-9f4c7634.js";const re=JSON.parse('{"name":"Tooltip","slots":[null,null],"description":"","props":[{"kind":"let","name":"placement","optional":true,"value":"bottom","jsDoc":{"description":"Where to position the popup relative to the reference element.","tags":[{"description":"","name":"","tag":"type","type":"\\"top\\" | \\"top-start\\" | \\"top-end\\" | \\"right\\" | \\"right-start\\" | \\"right-end\\" | \\"bottom\\" | \\"bottom-start\\" | \\"bottom-end\\" | \\"left\\" | \\"left-start\\" | \\"left-end\\""}]}},{"kind":"let","name":"followMouse","optional":true,"value":false},{"kind":"let","name":"gesture","optional":true,"value":"hover"},{"kind":"let","name":"arrow","optional":true,"value":true}],"exports":[],"customProperties":[{"property":"--br-tooltip-arrow-skidding-inline","value":" ","cssDoc":null},{"property":"--br-tooltip-arrow-skidding-block","value":" ","cssDoc":null},{"property":"--br-tooltip-box-shadow","value":" ","cssDoc":null},{"property":"--br-tooltip-background-color","value":" ","cssDoc":null},{"property":"--br-tooltip-text-color","value":" ","cssDoc":null},{"property":"--br-tooltip-padding-inline","value":" ","cssDoc":null},{"property":"--br-tooltip-padding-block","value":" ","cssDoc":null},{"property":"--br-tooltip-transition-duration","value":" ","cssDoc":null},{"property":"--br-tooltip-transition-delay","value":" ","cssDoc":null},{"property":"--br-tooltip-transition-function","value":" ","cssDoc":null}]}'),ae={main:re};function ie(s){let e=()=>{};const t={x:0,y:0,top:0,left:0,width:0,height:0};return s.addEventListener("mousemove",o=>{t.x=o.clientX,t.left=o.clientX,t.y=o.clientY,t.top=o.clientY,e()}),{getBoundingClientRect:()=>t,onchange:o=>{e=o}}}function O(s,e,t,o){s[o?"addEventListener":"removeEventListener"](e,t)}const ce=s=>({}),W=s=>({});function K(s){let e;return{c(){e=E("div"),this.h()},l(t){e=$(t,"DIV",{class:!0}),D(e).forEach(_),this.h()},h(){y(e,"class","arrow svelte-13w6j2z")},m(t,o){b(t,e,o)},d(t){t&&_(e)}}}function ue(s){let e,t,o,l,i,r,c;const a=s[9].default,u=R(a,s,s[8],null);let f=s[1]&&K();const w=s[9].popup,m=R(w,s,s[8],W);return{c(){u&&u.c(),e=M(),t=E("div"),f&&f.c(),o=M(),m&&m.c(),this.h()},l(n){u&&u.l(n),e=T(n),t=$(n,"DIV",{class:!0,"data-popper-placement":!0});var p=D(t);f&&f.l(p),o=T(p),m&&m.l(p),p.forEach(_),this.h()},h(){y(t,"class","berry-tooltip svelte-13w6j2z"),y(t,"data-popper-placement",s[0]),X(t,"visible",s[2])},m(n,p){u&&u.m(n,p),b(n,e,p),b(n,t,p),f&&f.m(t,null),j(t,o),m&&m.m(t,null),i=!0,r||(c=[B(l=s[3].call(null,t,s[2])),B(s[5].call(null,t)),B(s[4].call(null,t))],r=!0)},p(n,[p]){u&&u.p&&(!i||p&256)&&Y(u,a,n,n[8],i?F(a,n[8],p,null):A(n[8]),null),n[1]?f||(f=K(),f.c(),f.m(t,o)):f&&(f.d(1),f=null),m&&m.p&&(!i||p&256)&&Y(m,w,n,n[8],i?F(w,n[8],p,ce):A(n[8]),W),(!i||p&1)&&y(t,"data-popper-placement",n[0]),l&&Z(l.update)&&p&4&&l.update.call(null,n[2]),p&4&&X(t,"visible",n[2])},i(n){i||(h(u,n),h(m,n),i=!0)},o(n){k(u,n),k(m,n),i=!1},d(n){u&&u.d(n),n&&_(e),n&&_(t),f&&f.d(),m&&m.d(n),r=!1,x(c)}}}function pe(s,e,t){let{$$slots:o={},$$scope:l}=e,{placement:i="bottom"}=e,{followMouse:r=!1}=e,{gesture:c="hover"}=e,{arrow:a=!0}=e,u=!1;function f(n,p){const g=n.previousElementSibling,d=r?ie(g):g,v=ee(d,n,{placement:i,modifiers:[{name:"offset",options:{offset:[0,5]}}]});return r&&d.onchange(v.update),{update:C=>{C&&v.update()},destroy:()=>{v.destroy()}}}function w(n){if(c!=="hover")return;const p=n.previousElementSibling,g=["focus","mouseenter"],d=["blur","mouseleave"];function v(){t(2,u=!0)}function C(){t(2,u=!1)}g.forEach(S=>{O(p,S,v,!0)}),d.forEach(S=>{O(p,S,C,!0)})}function m(n){if(c!=="click")return;const p=n.previousElementSibling;document.addEventListener("click",g,!0);function g(d){const[v]=d.path||d.composedPath&&d.composedPath();p.contains(v)?t(2,u=!u):u&&t(2,u=!1)}return{destroy:()=>{document.removeEventListener("click",g)}}}return s.$$set=n=>{"placement"in n&&t(0,i=n.placement),"followMouse"in n&&t(6,r=n.followMouse),"gesture"in n&&t(7,c=n.gesture),"arrow"in n&&t(1,a=n.arrow),"$$scope"in n&&t(8,l=n.$$scope)},[i,a,u,f,w,m,r,c,l,o]}class fe extends z{constructor(e){super();G(this,e,pe,ue,H,{placement:0,followMouse:6,gesture:7,arrow:1})}}function Q(s,e,t){const o=s.slice();return o[3]=e[t],o}function me(s){let e=s[3]+"",t;return{c(){t=I(e)},l(o){t=P(o,e)},m(o,l){b(o,t,l)},p:J,d(o){o&&_(t)}}}function _e(s){let e,t,o;return e=new ne({props:{primary:!0,$$slots:{default:[me]},$$scope:{ctx:s}}}),{c(){L(e.$$.fragment),t=M()},l(l){V(e.$$.fragment,l),t=T(l)},m(l,i){N(e,l,i),b(l,t,i),o=!0},p(l,i){const r={};i&64&&(r.$$scope={dirty:i,ctx:l}),e.$set(r)},i(l){o||(h(e.$$.fragment,l),o=!0)},o(l){k(e.$$.fragment,l),o=!1},d(l){q(e,l),l&&_(t)}}}function de(s){let e,t,o,l=s[3]+"",i,r;return{c(){e=E("span"),t=I("I'm a "),o=E("b"),i=I(l),r=I(" tooltip!"),this.h()},l(c){e=$(c,"SPAN",{slot:!0});var a=D(e);t=P(a,"I'm a "),o=$(a,"B",{});var u=D(o);i=P(u,l),u.forEach(_),r=P(a," tooltip!"),a.forEach(_),this.h()},h(){y(e,"slot","popup")},m(c,a){b(c,e,a),j(e,t),j(e,o),j(o,i),j(e,r)},p:J,d(c){c&&_(e)}}}function U(s){let e,t;return e=new fe({props:{placement:s[3],$$slots:{popup:[de],default:[_e]},$$scope:{ctx:s}}}),{c(){L(e.$$.fragment)},l(o){V(e.$$.fragment,o)},m(o,l){N(e,o,l),t=!0},p(o,l){const i={};l&64&&(i.$$scope={dirty:l,ctx:o}),e.$set(i)},i(o){t||(h(e.$$.fragment,o),t=!0)},o(o){k(e.$$.fragment,o),t=!1},d(o){q(e,o)}}}function he(s){let e,t,o=s[0],l=[];for(let r=0;r<o.length;r+=1)l[r]=U(Q(s,o,r));const i=r=>k(l[r],1,1,()=>{l[r]=null});return{c(){e=E("div");for(let r=0;r<l.length;r+=1)l[r].c();this.h()},l(r){e=$(r,"DIV",{class:!0});var c=D(e);for(let a=0;a<l.length;a+=1)l[a].l(c);c.forEach(_),this.h()},h(){y(e,"class","properties examples svelte-jq2pvc")},m(r,c){b(r,e,c);for(let a=0;a<l.length;a+=1)l[a].m(e,null);t=!0},p(r,c){if(c&1){o=r[0];let a;for(a=0;a<o.length;a+=1){const u=Q(r,o,a);l[a]?(l[a].p(u,c),h(l[a],1)):(l[a]=U(u),l[a].c(),h(l[a],1),l[a].m(e,null))}for(te(),a=o.length;a<l.length;a+=1)i(a);oe()}},i(r){if(!t){for(let c=0;c<o.length;c+=1)h(l[c]);t=!0}},o(r){l=l.filter(Boolean);for(let c=0;c<l.length;c+=1)k(l[c]);t=!1},d(r){r&&_(e),le(l,r)}}}function ge(s){let e,t;return e=new se({props:{docs:ae,$$slots:{block:[he]},$$scope:{ctx:s}}}),{c(){L(e.$$.fragment)},l(o){V(e.$$.fragment,o)},m(o,l){N(e,o,l),t=!0},p(o,[l]){const i={};l&64&&(i.$$scope={dirty:l,ctx:o}),e.$set(i)},i(o){t||(h(e.$$.fragment,o),t=!0)},o(o){k(e.$$.fragment,o),t=!1},d(o){q(e,o)}}}function ve(s){const e=["top","right","bottom","left"],t=["","-start","-end"],o=[];for(const l of e)o.push(...t.map(i=>l+i));return[o]}class je extends z{constructor(e){super();G(this,e,ve,ge,H,{})}}export{je as default};
