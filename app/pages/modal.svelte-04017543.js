var t=Object.prototype.hasOwnProperty,e=Object.getOwnPropertySymbols,s=Object.prototype.propertyIsEnumerable;import{S as a,i as n,s as r,e as c,a as o,b as l,f as i,d as u,c as $,h as f,G as d,j as p,k as m,O as h,a7 as v,I as g,x as y,o as b,r as k,u as x,n as w,y as I,z as E,D as O,E as j,R as D,a8 as V,T as C,a9 as M,p as P,a1 as S,F as B,t as N,g as R,U as q,V as H,W as T}from"../chunks/index-d5522c54.js";import{B as z}from"../chunks/Tabs.svelte-23a25ff8.js";import{c as A,a as F}from"../chunks/index-94c9e8d2.js";import{m as G}from"../chunks/mdi-7d43e9a7.js";import"../chunks/forward-events-c767c60c.js";import"../chunks/Icon-bb327692.js";function U(t,e){for(const s in e)({}).hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t}const W=function(a){var{fallback:n}=a,r=((a,n)=>{var r={};for(var c in a)t.call(a,c)&&n.indexOf(c)<0&&(r[c]=a[c]);if(null!=a&&e)for(var c of e(a))n.indexOf(c)<0&&s.call(a,c)&&(r[c]=a[c]);return r})(a,["fallback"]);const c=new Map,o=new Map;function l(t,e,s){return(a,c)=>(t.set(c.key,{rect:a.getBoundingClientRect()}),()=>{if(e.has(c.key)){const{rect:t}=e.get(c.key);return e.delete(c.key),function(t,e,s){const{delay:a=0,duration:n=(t=>30*Math.sqrt(t)),easing:c=A,fade:o=!0}=U(U({},r),s),l=e.getBoundingClientRect(),i=t.left-l.left,u=t.top-l.top,$=t.width/l.width,f=t.height/l.height,d=Math.sqrt(i*i+u*u),p=getComputedStyle(e),m="none"===p.transform?"":p.transform,h=Number(p.opacity);return{delay:a,duration:(v=n,"function"==typeof v?n(d):n),easing:c,css:(t,e)=>`\n\t\t\t\topacity: ${o?1.5*t*h:h};\n\t\t\t\ttransform-origin: top left;\n\t\t\t\ttransform: ${m} translate(${e*i}px,${e*u}px) scale(${t+(1-t)*$}, ${t+(1-t)*f});\n\t\t\t`};var v}(t,a,c)}return t.delete(c.key),n&&n(a,c,s)})}return[l(o,c,!1),l(c,o,!0)]}({duration:300,fade:!1});const J=t=>({}),K=t=>({}),L=t=>({}),Q=t=>({});function X(t){let e,s,a,n,r,b,k,x,w,E,P,S,N,R;const q=t[7].header,H=B(q,t,t[6],Q);let T=t[1]&&Y(t);const z=t[7].content,A=B(z,t,t[6],K);return{c(){e=c("div"),s=c("div"),a=c("div"),n=c("div"),r=c("div"),H&&H.c(),b=o(),T&&T.c(),k=o(),x=c("div"),A&&A.c(),this.h()},l(t){e=l(t,"DIV",{class:!0});var c=i(e);s=l(c,"DIV",{class:!0});var o=i(s);a=l(o,"DIV",{class:!0});var f=i(a);n=l(f,"DIV",{class:!0});var d=i(n);r=l(d,"DIV",{class:!0});var p=i(r);H&&H.l(p),p.forEach(u),b=$(d),T&&T.l(d),d.forEach(u),k=$(f),x=l(f,"DIV",{class:!0});var m=i(x);A&&A.l(m),m.forEach(u),f.forEach(u),o.forEach(u),c.forEach(u),this.h()},h(){f(r,"class","header-content svelte-1ur9gyc"),f(n,"class","header svelte-1ur9gyc"),f(x,"class","content svelte-1ur9gyc"),f(a,"class","modal svelte-1ur9gyc"),d(a,"closable",t[1]),f(s,"class","wrapper svelte-1ur9gyc"),f(e,"class","berry-modal overlay svelte-1ur9gyc")},m(c,o){p(c,e,o),m(e,s),m(s,a),m(a,n),m(n,r),H&&H.m(r,null),m(n,b),T&&T.m(n,null),m(a,k),m(a,x),A&&A.m(x,null),S=!0,N||(R=h(e,"click",v(t[9])),N=!0)},p(t,e){H&&H.p&&64&e&&g(H,q,t,t[6],e,L,Q),t[1]?T?(T.p(t,e),2&e&&y(T,1)):(T=Y(t),T.c(),y(T,1),T.m(n,null)):T&&(O(),I(T,1,1,(()=>{T=null})),j()),A&&A.p&&64&e&&g(A,z,t,t[6],e,J,K),2&e&&d(a,"closable",t[1])},i(s){S||(y(H,s),y(T),y(A,s),D((()=>{E&&E.end(1),w||(w=V(a,t[3],{key:"modal"})),w.start()})),D((()=>{P||(P=C(e,F,{},!0)),P.run(1)})),S=!0)},o(s){I(H,s),I(T),I(A,s),w&&w.invalidate(),E=M(a,t[2],{key:"modal"}),P||(P=C(e,F,{},!1)),P.run(0),S=!1},d(t){t&&u(e),H&&H.d(t),T&&T.d(),A&&A.d(t),t&&E&&E.end(),t&&P&&P.end(),N=!1,R()}}}function Y(t){let e,s,a;return s=new z({props:{icon:G}}),s.$on("click",t[8]),{c(){e=c("div"),b(s.$$.fragment),this.h()},l(t){e=l(t,"DIV",{class:!0});var a=i(e);k(s.$$.fragment,a),a.forEach(u),this.h()},h(){f(e,"class","close svelte-1ur9gyc")},m(t,n){p(t,e,n),x(s,e,null),a=!0},p:w,i(t){a||(y(s.$$.fragment,t),a=!0)},o(t){I(s.$$.fragment,t),a=!1},d(t){t&&u(e),E(s)}}}function Z(t){let e,s,a=t[0]&&X(t);return{c(){a&&a.c(),e=P()},l(t){a&&a.l(t),e=P()},m(t,n){a&&a.m(t,n),p(t,e,n),s=!0},p(t,[s]){t[0]?a?(a.p(t,s),1&s&&y(a,1)):(a=X(t),a.c(),y(a,1),a.m(e.parentNode,e)):a&&(O(),I(a,1,1,(()=>{a=null})),j())},i(t){s||(y(a),s=!0)},o(t){I(a),s=!1},d(t){a&&a.d(t),t&&u(e)}}}function _(t,e,s){let{$$slots:a={},$$scope:n}=e,{visible:r=!1}=e,{closable:c=!0}=e;const o=S(),[l,i]=W;return t.$$set=t=>{"visible"in t&&s(0,r=t.visible),"closable"in t&&s(1,c=t.closable),"$$scope"in t&&s(6,n=t.$$scope)},t.$$.update=()=>{1&t.$$.dirty&&o(r?"open":"close")},[r,c,l,i,function(){s(0,r=!0)},function(){s(0,r=!1)},n,a,()=>{s(0,r=!1)},()=>{s(0,r=!c&&r)}]}class tt extends a{constructor(t){super(),n(this,t,_,Z,r,{visible:0,closable:1,open:4,close:5})}get open(){return this.$$.ctx[4]}get close(){return this.$$.ctx[5]}}function et(t){let e;return{c(){e=N("Open modal")},l(t){e=R(t,"Open modal")},m(t,s){p(t,e,s)},d(t){t&&u(e)}}}function st(t){let e;return{c(){e=N("Close me!")},l(t){e=R(t,"Close me!")},m(t,s){p(t,e,s)},d(t){t&&u(e)}}}function at(t){let e,s,a,n,r,d;return r=new z({props:{primary:!0,fullwidth:!0,$$slots:{default:[st]},$$scope:{ctx:t}}}),{c(){e=c("span"),s=c("div"),a=N("I am a modal. Hear me cry!"),n=o(),b(r.$$.fragment),this.h()},l(t){e=l(t,"SPAN",{slot:!0});var c=i(e);s=l(c,"DIV",{class:!0});var o=i(s);a=R(o,"I am a modal. Hear me cry!"),o.forEach(u),n=$(c),k(r.$$.fragment,c),c.forEach(u),this.h()},h(){f(s,"class","modal-content svelte-d2myit"),f(e,"slot","content")},m(t,c){p(t,e,c),m(e,s),m(s,a),m(e,n),x(r,e,null),d=!0},p(t,e){const s={};8&e&&(s.$$scope={dirty:e,ctx:t}),r.$set(s)},i(t){d||(y(r.$$.fragment,t),d=!0)},o(t){I(r.$$.fragment,t),d=!1},d(t){t&&u(e),E(r)}}}function nt(t){let e,s,a,n,r;function c(e){t[2](e)}e=new z({props:{$$slots:{default:[et]},$$scope:{ctx:t}}}),e.$on("click",t[1]);let l={$$slots:{content:[at]},$$scope:{ctx:t}};return void 0!==t[0]&&(l.visible=t[0]),a=new tt({props:l}),q.push((()=>H(a,"visible",c))),{c(){b(e.$$.fragment),s=o(),b(a.$$.fragment)},l(t){k(e.$$.fragment,t),s=$(t),k(a.$$.fragment,t)},m(t,n){x(e,t,n),p(t,s,n),x(a,t,n),r=!0},p(t,[s]){const r={};8&s&&(r.$$scope={dirty:s,ctx:t}),e.$set(r);const c={};8&s&&(c.$$scope={dirty:s,ctx:t}),!n&&1&s&&(n=!0,c.visible=t[0],T((()=>n=!1))),a.$set(c)},i(t){r||(y(e.$$.fragment,t),y(a.$$.fragment,t),r=!0)},o(t){I(e.$$.fragment,t),I(a.$$.fragment,t),r=!1},d(t){E(e,t),t&&u(s),E(a,t)}}}function rt(t,e,s){let a=!1;return[a,function(){s(0,a=!0)},function(t){a=t,s(0,a)}]}export default class extends a{constructor(t){super(),n(this,t,rt,nt,r,{})}}
