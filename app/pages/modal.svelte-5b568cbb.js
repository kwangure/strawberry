var t=Object.prototype.hasOwnProperty,e=Object.getOwnPropertySymbols,s=Object.prototype.propertyIsEnumerable;import{S as a,i as n,s as r,e as c,k as o,c as l,a as i,d as u,n as f,b as $,E as d,f as m,H as p,K as h,a5 as v,G as g,v as y,j as b,m as k,o as x,C as w,r as I,w as j,B as E,u as O,O as D,a6 as V,P as C,a7 as P,l as B,a0 as M,D as S,t as H,g as N,R,T as q,U as T}from"../chunks/index-f035eec9.js";import{B as A}from"../chunks/Tabs.svelte-39e2e804.js";import{c as G,a as K}from"../chunks/index-b859a8b0.js";import{m as U}from"../chunks/mdi-7d43e9a7.js";import"../chunks/forward-events-b23ffd0e.js";import"../chunks/Icon-46dcd0dd.js";/* empty css                            */function z(t,e){for(const s in e)({}).hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t}const F=function(a){var{fallback:n}=a,r=((a,n)=>{var r={};for(var c in a)t.call(a,c)&&n.indexOf(c)<0&&(r[c]=a[c]);if(null!=a&&e)for(var c of e(a))n.indexOf(c)<0&&s.call(a,c)&&(r[c]=a[c]);return r})(a,["fallback"]);const c=new Map,o=new Map;function l(t,e,s){return(a,c)=>(t.set(c.key,{rect:a.getBoundingClientRect()}),()=>{if(e.has(c.key)){const{rect:t}=e.get(c.key);return e.delete(c.key),function(t,e,s){const{delay:a=0,duration:n=(t=>30*Math.sqrt(t)),easing:c=G,fade:o=!0}=z(z({},r),s),l=e.getBoundingClientRect(),i=t.left-l.left,u=t.top-l.top,f=t.width/l.width,$=t.height/l.height,d=Math.sqrt(i*i+u*u),m=getComputedStyle(e),p="none"===m.transform?"":m.transform,h=Number(m.opacity);return{delay:a,duration:(v=n,"function"==typeof v?n(d):n),easing:c,css:(t,e)=>`\n\t\t\t\topacity: ${o?1.5*t*h:h};\n\t\t\t\ttransform-origin: top left;\n\t\t\t\ttransform: ${p} translate(${e*i}px,${e*u}px) scale(${t+(1-t)*f}, ${t+(1-t)*$});\n\t\t\t`};var v}(t,a,c)}return t.delete(c.key),n&&n(a,c,s)})}return[l(o,c,!1),l(c,o,!0)]}({duration:300,fade:!1});const J=t=>({}),L=t=>({}),Q=t=>({}),W=t=>({});function X(t){let e,s,a,n,r,b,k,x,w,j,B,M,H,N;const R=t[7].header,q=S(R,t,t[6],W);let T=t[1]&&Y(t);const A=t[7].content,G=S(A,t,t[6],L);return{c(){e=c("div"),s=c("div"),a=c("div"),n=c("div"),r=c("div"),q&&q.c(),b=o(),T&&T.c(),k=o(),x=c("div"),G&&G.c(),this.h()},l(t){e=l(t,"DIV",{class:!0});var c=i(e);s=l(c,"DIV",{class:!0});var o=i(s);a=l(o,"DIV",{class:!0});var $=i(a);n=l($,"DIV",{class:!0});var d=i(n);r=l(d,"DIV",{class:!0});var m=i(r);q&&q.l(m),m.forEach(u),b=f(d),T&&T.l(d),d.forEach(u),k=f($),x=l($,"DIV",{class:!0});var p=i(x);G&&G.l(p),p.forEach(u),$.forEach(u),o.forEach(u),c.forEach(u),this.h()},h(){$(r,"class","header-content svelte-1ur9gyc"),$(n,"class","header svelte-1ur9gyc"),$(x,"class","content svelte-1ur9gyc"),$(a,"class","modal svelte-1ur9gyc"),d(a,"closable",t[1]),$(s,"class","wrapper svelte-1ur9gyc"),$(e,"class","berry-modal overlay svelte-1ur9gyc")},m(c,o){m(c,e,o),p(e,s),p(s,a),p(a,n),p(n,r),q&&q.m(r,null),p(n,b),T&&T.m(n,null),p(a,k),p(a,x),G&&G.m(x,null),M=!0,H||(N=h(e,"click",v(t[9])),H=!0)},p(t,e){q&&q.p&&64&e&&g(q,R,t,t[6],e,Q,W),t[1]?T?(T.p(t,e),2&e&&y(T,1)):(T=Y(t),T.c(),y(T,1),T.m(n,null)):T&&(E(),I(T,1,1,(()=>{T=null})),O()),G&&G.p&&64&e&&g(G,A,t,t[6],e,J,L),2&e&&d(a,"closable",t[1])},i(s){M||(y(q,s),y(T),y(G,s),D((()=>{j&&j.end(1),w||(w=V(a,t[3],{key:"modal"})),w.start()})),D((()=>{B||(B=C(e,K,{},!0)),B.run(1)})),M=!0)},o(s){I(q,s),I(T),I(G,s),w&&w.invalidate(),j=P(a,t[2],{key:"modal"}),B||(B=C(e,K,{},!1)),B.run(0),M=!1},d(t){t&&u(e),q&&q.d(t),T&&T.d(),G&&G.d(t),t&&j&&j.end(),t&&B&&B.end(),H=!1,N()}}}function Y(t){let e,s,a;return s=new A({props:{icon:U}}),s.$on("click",t[8]),{c(){e=c("div"),b(s.$$.fragment),this.h()},l(t){e=l(t,"DIV",{class:!0});var a=i(e);k(s.$$.fragment,a),a.forEach(u),this.h()},h(){$(e,"class","close svelte-1ur9gyc")},m(t,n){m(t,e,n),x(s,e,null),a=!0},p:w,i(t){a||(y(s.$$.fragment,t),a=!0)},o(t){I(s.$$.fragment,t),a=!1},d(t){t&&u(e),j(s)}}}function Z(t){let e,s,a=t[0]&&X(t);return{c(){a&&a.c(),e=B()},l(t){a&&a.l(t),e=B()},m(t,n){a&&a.m(t,n),m(t,e,n),s=!0},p(t,[s]){t[0]?a?(a.p(t,s),1&s&&y(a,1)):(a=X(t),a.c(),y(a,1),a.m(e.parentNode,e)):a&&(E(),I(a,1,1,(()=>{a=null})),O())},i(t){s||(y(a),s=!0)},o(t){I(a),s=!1},d(t){a&&a.d(t),t&&u(e)}}}function _(t,e,s){let{$$slots:a={},$$scope:n}=e,{visible:r=!1}=e,{closable:c=!0}=e;const o=M(),[l,i]=F;return t.$$set=t=>{"visible"in t&&s(0,r=t.visible),"closable"in t&&s(1,c=t.closable),"$$scope"in t&&s(6,n=t.$$scope)},t.$$.update=()=>{1&t.$$.dirty&&o(r?"open":"close")},[r,c,l,i,function(){s(0,r=!0)},function(){s(0,r=!1)},n,a,()=>{s(0,r=!1)},()=>{s(0,r=!c&&r)}]}class tt extends a{constructor(t){super(),n(this,t,_,Z,r,{visible:0,closable:1,open:4,close:5})}get open(){return this.$$.ctx[4]}get close(){return this.$$.ctx[5]}}function et(t){let e;return{c(){e=H("Open modal")},l(t){e=N(t,"Open modal")},m(t,s){m(t,e,s)},d(t){t&&u(e)}}}function st(t){let e;return{c(){e=H("Close me!")},l(t){e=N(t,"Close me!")},m(t,s){m(t,e,s)},d(t){t&&u(e)}}}function at(t){let e,s,a,n,r,d;return r=new A({props:{primary:!0,fullwidth:!0,$$slots:{default:[st]},$$scope:{ctx:t}}}),{c(){e=c("span"),s=c("div"),a=H("I am a modal. Hear me cry!"),n=o(),b(r.$$.fragment),this.h()},l(t){e=l(t,"SPAN",{slot:!0});var c=i(e);s=l(c,"DIV",{class:!0});var o=i(s);a=N(o,"I am a modal. Hear me cry!"),o.forEach(u),n=f(c),k(r.$$.fragment,c),c.forEach(u),this.h()},h(){$(s,"class","modal-content svelte-d2myit"),$(e,"slot","content")},m(t,c){m(t,e,c),p(e,s),p(s,a),p(e,n),x(r,e,null),d=!0},p(t,e){const s={};8&e&&(s.$$scope={dirty:e,ctx:t}),r.$set(s)},i(t){d||(y(r.$$.fragment,t),d=!0)},o(t){I(r.$$.fragment,t),d=!1},d(t){t&&u(e),j(r)}}}function nt(t){let e,s,a,n,r;function c(e){t[2](e)}e=new A({props:{$$slots:{default:[et]},$$scope:{ctx:t}}}),e.$on("click",t[1]);let l={$$slots:{content:[at]},$$scope:{ctx:t}};return void 0!==t[0]&&(l.visible=t[0]),a=new tt({props:l}),R.push((()=>q(a,"visible",c))),{c(){b(e.$$.fragment),s=o(),b(a.$$.fragment)},l(t){k(e.$$.fragment,t),s=f(t),k(a.$$.fragment,t)},m(t,n){x(e,t,n),m(t,s,n),x(a,t,n),r=!0},p(t,[s]){const r={};8&s&&(r.$$scope={dirty:s,ctx:t}),e.$set(r);const c={};8&s&&(c.$$scope={dirty:s,ctx:t}),!n&&1&s&&(n=!0,c.visible=t[0],T((()=>n=!1))),a.$set(c)},i(t){r||(y(e.$$.fragment,t),y(a.$$.fragment,t),r=!0)},o(t){I(e.$$.fragment,t),I(a.$$.fragment,t),r=!1},d(t){j(e,t),t&&u(s),j(a,t)}}}function rt(t,e,s){let a=!1;return[a,function(){s(0,a=!0)},function(t){a=t,s(0,a)}]}export default class extends a{constructor(t){super(),n(this,t,rt,nt,r,{})}}
