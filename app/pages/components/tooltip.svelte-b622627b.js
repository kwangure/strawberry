import{S as Y,i as q,s as G,D as H,e as y,c as $,a as D,d,b as w,f as b,k as M,n as T,M as O,H as S,N as B,E as R,F as W,G as X,Y as U,x as h,u as k,Z as x,ag as ee,j as L,m as N,o as V,v as J,r as te,w as oe,ad as ne,t as I,g as P,I as A}from"../../chunks/vendor-d49c0083.js";import{B as le}from"../../chunks/Tabs.svelte_svelte_type_style_lang-471159a0.js";import{C as se}from"../../chunks/component-16d3d5b8.js";import"../../chunks/forward-events-e4dd3255.js";import"../../chunks/JavaScript.svelte_svelte_type_style_lang-6c5e6a2f.js";function re(s){let e=()=>{};const t={x:0,y:0,top:0,left:0,width:0,height:0};return s.addEventListener("mousemove",o=>{t.x=o.clientX,t.left=o.clientX,t.y=o.clientY,t.top=o.clientY,e()}),{getBoundingClientRect:()=>t,onchange:o=>{e=o}}}function F(s,e,t,o){s[o?"addEventListener":"removeEventListener"](e,t)}const ae=s=>({}),Z=s=>({});function z(s){let e;return{c(){e=y("div"),this.h()},l(t){e=$(t,"DIV",{class:!0}),D(e).forEach(d),this.h()},h(){w(e,"class","arrow svelte-1mpi09r")},m(t,o){b(t,e,o)},d(t){t&&d(e)}}}function ie(s){let e,t,o,n,i,r,c;const a=s[9].default,u=H(a,s,s[8],null);let f=s[1]&&z();const E=s[9].popup,m=H(E,s,s[8],Z);return{c(){u&&u.c(),e=M(),t=y("div"),f&&f.c(),o=M(),m&&m.c(),this.h()},l(l){u&&u.l(l),e=T(l),t=$(l,"DIV",{class:!0,"data-popper-placement":!0});var p=D(t);f&&f.l(p),o=T(p),m&&m.l(p),p.forEach(d),this.h()},h(){w(t,"class","berry-tooltip svelte-1mpi09r"),w(t,"data-popper-placement",s[0]),O(t,"visible",s[2])},m(l,p){u&&u.m(l,p),b(l,e,p),b(l,t,p),f&&f.m(t,null),S(t,o),m&&m.m(t,null),i=!0,r||(c=[B(n=s[3].call(null,t,s[2])),B(s[5].call(null,t)),B(s[4].call(null,t))],r=!0)},p(l,[p]){u&&u.p&&(!i||p&256)&&R(u,a,l,l[8],i?X(a,l[8],p,null):W(l[8]),null),l[1]?f||(f=z(),f.c(),f.m(t,o)):f&&(f.d(1),f=null),m&&m.p&&(!i||p&256)&&R(m,E,l,l[8],i?X(E,l[8],p,ae):W(l[8]),Z),(!i||p&1)&&w(t,"data-popper-placement",l[0]),n&&U(n.update)&&p&4&&n.update.call(null,l[2]),p&4&&O(t,"visible",l[2])},i(l){i||(h(u,l),h(m,l),i=!0)},o(l){k(u,l),k(m,l),i=!1},d(l){u&&u.d(l),l&&d(e),l&&d(t),f&&f.d(),m&&m.d(l),r=!1,x(c)}}}const ce=JSON.parse('{"name":"Tooltip","slots":[{"name":"default","htmlDoc":null},{"name":"popup","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"placement","optional":true,"value":"bottom","jsDoc":{"description":"Where to position the popup relative to the reference element.","tags":[{"description":"","name":"","tag":"type","type":"\\"top\\" | \\"top-start\\" | \\"top-end\\" | \\"right\\" | \\"right-start\\" | \\"right-end\\" | \\"bottom\\" | \\"bottom-start\\" | \\"bottom-end\\" | \\"left\\" | \\"left-start\\" | \\"left-end\\""}]}},{"kind":"let","name":"followMouse","optional":true,"value":false},{"kind":"let","name":"gesture","optional":true,"value":"hover"},{"kind":"let","name":"arrow","optional":true,"value":true}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[]}');function ue(s,e,t){let{$$slots:o={},$$scope:n}=e,{placement:i="bottom"}=e,{followMouse:r=!1}=e,{gesture:c="hover"}=e,{arrow:a=!0}=e,u=!1;function f(l,p){const g=l.previousElementSibling,_=r?re(g):g,v=ee(_,l,{placement:i,modifiers:[{name:"offset",options:{offset:[0,5]}}]});return r&&_.onchange(v.update),{update:j=>{j&&v.update()},destroy:()=>{v.destroy()}}}function E(l){if(c!=="hover")return;const p=l.previousElementSibling,g=["focus","mouseenter"],_=["blur","mouseleave"];function v(){t(2,u=!0)}function j(){t(2,u=!1)}g.forEach(C=>{F(p,C,v,!0)}),_.forEach(C=>{F(p,C,j,!0)})}function m(l){if(c!=="click")return;const p=l.previousElementSibling;document.addEventListener("click",g,!0);function g(_){const[v]=_.path||_.composedPath&&_.composedPath();p.contains(v)?t(2,u=!u):u&&t(2,u=!1)}return{destroy:()=>{document.removeEventListener("click",g)}}}return s.$$set=l=>{"placement"in l&&t(0,i=l.placement),"followMouse"in l&&t(6,r=l.followMouse),"gesture"in l&&t(7,c=l.gesture),"arrow"in l&&t(1,a=l.arrow),"$$scope"in l&&t(8,n=l.$$scope)},[i,a,u,f,E,m,r,c,n,o]}class pe extends Y{constructor(e){super();q(this,e,ue,ie,G,{placement:0,followMouse:6,gesture:7,arrow:1})}}const fe={main:ce};JSON.parse('{"name":"Svgtooltip","slots":[{"name":"default","htmlDoc":null},{"name":"popup","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"placement","optional":true,"value":"auto","jsDoc":{"description":"Where to position the popup relative to the reference element.","tags":[{"description":"","name":"","tag":"type","type":"\\"top\\" | \\"top-start\\" | \\"top-end\\" | \\"right\\" | \\"right-start\\" | \\"right-end\\" | \\"bottom\\" | \\"bottom-start\\" | \\"bottom-end\\" | \\"left\\" | \\"left-start\\" | \\"left-end\\""}]}},{"kind":"let","name":"followMouse","optional":true,"value":false},{"kind":"let","name":"arrow","optional":true,"value":true}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[]}');function K(s,e,t){const o=s.slice();return o[3]=e[t],o}function me(s){let e=s[3]+"",t;return{c(){t=I(e)},l(o){t=P(o,e)},m(o,n){b(o,t,n)},p:A,d(o){o&&d(t)}}}function de(s){let e,t,o;return e=new le({props:{primary:!0,$$slots:{default:[me]},$$scope:{ctx:s}}}),{c(){L(e.$$.fragment),t=M()},l(n){N(e.$$.fragment,n),t=T(n)},m(n,i){V(e,n,i),b(n,t,i),o=!0},p(n,i){const r={};i&64&&(r.$$scope={dirty:i,ctx:n}),e.$set(r)},i(n){o||(h(e.$$.fragment,n),o=!0)},o(n){k(e.$$.fragment,n),o=!1},d(n){J(e,n),n&&d(t)}}}function _e(s){let e,t,o,n=s[3]+"",i,r;return{c(){e=y("span"),t=I("I'm a "),o=y("b"),i=I(n),r=I(" tooltip!"),this.h()},l(c){e=$(c,"SPAN",{slot:!0});var a=D(e);t=P(a,"I'm a "),o=$(a,"B",{});var u=D(o);i=P(u,n),u.forEach(d),r=P(a," tooltip!"),a.forEach(d),this.h()},h(){w(e,"slot","popup")},m(c,a){b(c,e,a),S(e,t),S(e,o),S(o,i),S(e,r)},p:A,d(c){c&&d(e)}}}function Q(s){let e,t;return e=new pe({props:{placement:s[3],$$slots:{popup:[_e],default:[de]},$$scope:{ctx:s}}}),{c(){L(e.$$.fragment)},l(o){N(e.$$.fragment,o)},m(o,n){V(e,o,n),t=!0},p(o,n){const i={};n&64&&(i.$$scope={dirty:n,ctx:o}),e.$set(i)},i(o){t||(h(e.$$.fragment,o),t=!0)},o(o){k(e.$$.fragment,o),t=!1},d(o){J(e,o)}}}function he(s){let e,t,o=s[0],n=[];for(let r=0;r<o.length;r+=1)n[r]=Q(K(s,o,r));const i=r=>k(n[r],1,1,()=>{n[r]=null});return{c(){e=y("div");for(let r=0;r<n.length;r+=1)n[r].c();this.h()},l(r){e=$(r,"DIV",{class:!0});var c=D(e);for(let a=0;a<n.length;a+=1)n[a].l(c);c.forEach(d),this.h()},h(){w(e,"class","properties examples svelte-jq2pvc")},m(r,c){b(r,e,c);for(let a=0;a<n.length;a+=1)n[a].m(e,null);t=!0},p(r,c){if(c&1){o=r[0];let a;for(a=0;a<o.length;a+=1){const u=K(r,o,a);n[a]?(n[a].p(u,c),h(n[a],1)):(n[a]=Q(u),n[a].c(),h(n[a],1),n[a].m(e,null))}for(te(),a=o.length;a<n.length;a+=1)i(a);oe()}},i(r){if(!t){for(let c=0;c<o.length;c+=1)h(n[c]);t=!0}},o(r){n=n.filter(Boolean);for(let c=0;c<n.length;c+=1)k(n[c]);t=!1},d(r){r&&d(e),ne(n,r)}}}function ge(s){let e,t;return e=new se({props:{docs:fe,$$slots:{block:[he]},$$scope:{ctx:s}}}),{c(){L(e.$$.fragment)},l(o){N(e.$$.fragment,o)},m(o,n){V(e,o,n),t=!0},p(o,[n]){const i={};n&64&&(i.$$scope={dirty:n,ctx:o}),e.$set(i)},i(o){t||(h(e.$$.fragment,o),t=!0)},o(o){k(e.$$.fragment,o),t=!1},d(o){J(e,o)}}}function ve(s){const e=["top","right","bottom","left"],t=["","-start","-end"],o=[];for(const n of e)o.push(...t.map(i=>n+i));return[o]}class $e extends Y{constructor(e){super();q(this,e,ve,ge,G,{})}}export{$e as default};
