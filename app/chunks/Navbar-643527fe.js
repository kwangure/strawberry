import{Q as e,R as t,S as a,i as n,s,D as r,e as o,c as i,a as l,d as c,b as f,L as p,f as d,G as u,M as h,E as v,x as g,u as m,T as w,k as $,n as y,U as b,V as E,y as k,C as L}from"./vendor-017d3a3b.js";import{c as x}from"./forward-events-09f32f9a.js";let q=null;"undefined"!=typeof window&&(q=window.location);const H=e(q,(e=>{if("undefined"!=typeof window)return window.addEventListener("DOMContentLoaded",t),window.addEventListener("hashchange",t),()=>{window.removeEventListener("DOMContentLoaded",t),window.removeEventListener("hashchange",t)};function t(){e(window.location)}})),D=new Map;function A(e){const a=e;if(D.has(a))return D.get(a);e=t(e).replace(/\\\*/g,"[\\s\\S]*");const n=new RegExp(`^${e}$`);return D.set(a,n),n}function N(e,t){t=(t=function(e,t){if(!Array.isArray(e))switch(typeof e){case"string":e=[e];break;case"undefined":e=[];break;default:throw new TypeError(`Expected '${t}' to be a string                 or an array, but got a type of '${typeof e}'`)}return e.filter((e=>{if("string"!=typeof e){if(void 0===e)return!1;throw new TypeError(`Expected '${t}' to be an array of             strings, but found a type of '${typeof e}' in the array`)}return!0}))}(t,"patterns")).map(A);for(const a of t)if(a.test(e))return!0;return!1}function j(e){let t,a,n,s,w;const $=e[6].default,y=r($,e,e[5],null);return{c(){t=o("li"),a=o("a"),y&&y.c(),this.h()},l(e){t=i(e,"LI",{class:!0});var n=l(t);a=i(n,"A",{href:!0,class:!0});var s=l(a);y&&y.l(s),s.forEach(c),n.forEach(c),this.h()},h(){f(a,"href",e[0]),f(a,"class","svelte-15fdnq3"),p(a,"active",e[1]),f(t,"class","berry-navbar-link svelte-15fdnq3")},m(r,o){d(r,t,o),u(t,a),y&&y.m(a,null),n=!0,s||(w=h(e[2].call(null,a)),s=!0)},p(e,[t]){y&&y.p&&(!n||32&t)&&v(y,$,e,e[5],n?t:-1,null,null),(!n||1&t)&&f(a,"href",e[0]),2&t&&p(a,"active",e[1])},i(e){n||(g(y,e),n=!0)},o(e){m(y,e),n=!1},d(e){e&&c(t),y&&y.d(e),s=!1,w()}}}function M(e,t,a){let n,s;w(e,H,(e=>a(4,s=e)));let{$$slots:r={},$$scope:o}=t,{href:i}=t,{pattern:l}=t;const c=x();return e.$$set=e=>{"href"in e&&a(0,i=e.href),"pattern"in e&&a(3,l=e.pattern),"$$scope"in e&&a(5,o=e.$$scope)},e.$$.update=()=>{24&e.$$.dirty&&a(1,n=N(null==s?void 0:s.pathname,l))},[i,n,c,l,s,o,r]}class O extends a{constructor(e){super(),n(this,e,M,j,s,{href:0,pattern:3})}}JSON.parse('{"name":"Link","props":[{"kind":"let","name":"href","optional":false,"jsDoc":{"description":"","tags":[{"tag":"type","name":"","type":"string","optional":false,"description":""}]}},{"kind":"let","name":"pattern","optional":false,"jsDoc":{"description":"The link is colored active `window.location.pathname` satisfies any of the pattern(s).","tags":[{"tag":"type","name":"","type":"string | string[]","optional":false,"description":""}]}}],"exports":[],"customProperties":[]}');const S=e=>({}),T=e=>({}),C=e=>({}),U=e=>({}),V=e=>({}),I=e=>({});function J(e){let t,a,n,s,p,h,w,k,L;const x=e[4].logo,q=r(x,e,e[3],I),H=e[4]["nav-links"],D=r(H,e,e[3],U),A=e[4]["calls-to-action"],N=r(A,e,e[3],T);return{c(){t=o("nav"),a=o("div"),n=o("a"),q&&q.c(),s=$(),p=o("ul"),D&&D.c(),h=$(),w=o("ul"),N&&N.c(),this.h()},l(e){t=i(e,"NAV",{class:!0});var r=l(t);a=i(r,"DIV",{class:!0});var o=l(a);n=i(o,"A",{class:!0,href:!0});var f=l(n);q&&q.l(f),f.forEach(c),s=y(o),p=i(o,"UL",{class:!0});var d=l(p);D&&D.l(d),d.forEach(c),h=y(o),w=i(o,"UL",{class:!0});var u=l(w);N&&N.l(u),u.forEach(c),o.forEach(c),r.forEach(c),this.h()},h(){f(n,"class","logo svelte-1dicqgr"),f(n,"href",e[0]),f(p,"class","nav-links svelte-1dicqgr"),f(w,"class","calls-to-action svelte-1dicqgr"),f(a,"class","nav-wrapper  svelte-1dicqgr"),f(t,"class","berry-navbar svelte-1dicqgr"),b((()=>e[5].call(t)))},m(r,o){d(r,t,o),u(t,a),u(a,n),q&&q.m(n,null),u(a,s),u(a,p),D&&D.m(p,null),u(a,h),u(a,w),N&&N.m(w,null),k=E(t,e[5].bind(t)),L=!0},p(e,[t]){q&&q.p&&(!L||8&t)&&v(q,x,e,e[3],L?t:-1,V,I),(!L||1&t)&&f(n,"href",e[0]),D&&D.p&&(!L||8&t)&&v(D,H,e,e[3],L?t:-1,C,U),N&&N.p&&(!L||8&t)&&v(N,A,e,e[3],L?t:-1,S,T)},i(e){L||(g(q,e),g(D,e),g(N,e),L=!0)},o(e){m(q,e),m(D,e),m(N,e),L=!1},d(e){e&&c(t),q&&q.d(e),D&&D.d(e),N&&N.d(e),k()}}}const P={};function R(e,t,a){let n,{$$slots:s={},$$scope:r}=t,{logoHref:o="/"}=t;const i=L("");return w(e,i,(e=>a(1,n=e))),k(P,{navHeight:i}),e.$$set=e=>{"logoHref"in e&&a(0,o=e.logoHref),"$$scope"in e&&a(3,r=e.$$scope)},[o,n,i,r,s,function(){n=this.offsetHeight,i.set(n)}]}class G extends a{constructor(e){super(),n(this,e,R,J,s,{logoHref:0})}}JSON.parse('{"name":"Navbar","props":[{"kind":"let","name":"logoHref","optional":true,"value":"/"}],"exports":[{"kind":"function","name":"stores"}],"customProperties":[{"name":"--br-nav-block-padding","value":"var(--br-outer-gutter)"},{"name":"--br-nav-border","value":"none"},{"name":"--br-nav-height","value":"48px"},{"name":"--br-nav-max-width","value":"100%"},{"name":"--br-nav-width","value":"100%"},{"name":"--br-logo-width","value":"auto"}]}');export{O as L,G as N};
