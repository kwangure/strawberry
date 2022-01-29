import{Q as P,R as G,S as H,i as N,s as S,D as w,e as m,c as v,a as g,d as u,b as d,M as z,f as y,H as k,N as Q,E as D,F as E,G as L,x as h,u as p,T as M,k as j,n as q,U as W,V as X,r as A,w as C,W as B,y as Y,C as Z,X as $,I}from"./vendor-3934c3b2.js";import{c as x}from"./forward-events-e36204ce.js";let O=null;typeof window!="undefined"&&(O=window.location);const ee=P(O,s=>{if(typeof window=="undefined")return;function e(){s(window.location)}return window.addEventListener("DOMContentLoaded",e),window.addEventListener("hashchange",e),()=>{window.removeEventListener("DOMContentLoaded",e),window.removeEventListener("hashchange",e)}}),T=new Map;function te(s,e){if(!Array.isArray(s))switch(typeof s){case"string":s=[s];break;case"undefined":s=[];break;default:throw new TypeError(`Expected '${e}' to be a string                 or an array, but got a type of '${typeof s}'`)}return s.filter(t=>{if(typeof t!="string"){if(typeof t=="undefined")return!1;throw new TypeError(`Expected '${e}' to be an array of             strings, but found a type of '${typeof t}' in the array`)}return!0})}function se(s){const e=s;if(T.has(e))return T.get(e);s=G(s).replace(/\\\*/g,"[\\s\\S]*");const t=new RegExp(`^${s}$`);return T.set(e,t),t}function ne(s,e){e=te(e,"patterns"),e=e.map(se);for(const t of e)if(t.test(s))return!0;return!1}function ae(s){let e,t,o,a,n;const i=s[6].default,r=w(i,s,s[5],null);return{c(){e=m("li"),t=m("a"),r&&r.c(),this.h()},l(l){e=v(l,"LI",{class:!0});var f=g(e);t=v(f,"A",{href:!0,class:!0});var c=g(t);r&&r.l(c),c.forEach(u),f.forEach(u),this.h()},h(){d(t,"href",s[0]),d(t,"class","svelte-15fdnq3"),z(t,"active",s[1]),d(e,"class","berry-navbar-link svelte-15fdnq3")},m(l,f){y(l,e,f),k(e,t),r&&r.m(t,null),o=!0,a||(n=Q(s[2].call(null,t)),a=!0)},p(l,[f]){r&&r.p&&(!o||f&32)&&D(r,i,l,l[5],o?L(i,l[5],f,null):E(l[5]),null),(!o||f&1)&&d(t,"href",l[0]),f&2&&z(t,"active",l[1])},i(l){o||(h(r,l),o=!0)},o(l){p(r,l),o=!1},d(l){l&&u(e),r&&r.d(l),a=!1,n()}}}JSON.parse('{"name":"Link","slots":[{"name":"default","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"href","optional":false,"jsDoc":{"description":"","tags":[{"description":"","name":"","tag":"type","type":"string"}]}},{"kind":"let","name":"pattern","optional":false,"jsDoc":{"description":"The link is colored active `window.location.pathname` satisfies any of the pattern(s).","tags":[{"description":"","name":"","tag":"type","type":"string | string[]"}]}}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[]}');function le(s,e,t){let o,a;M(s,ee,c=>t(4,a=c));let{$$slots:n={},$$scope:i}=e,{href:r}=e,{pattern:l}=e;const f=x();return s.$$set=c=>{"href"in c&&t(0,r=c.href),"pattern"in c&&t(3,l=c.pattern),"$$scope"in c&&t(5,i=c.$$scope)},s.$$.update=()=>{s.$$.dirty&24&&t(1,o=ne(a==null?void 0:a.pathname,l))},[r,o,f,l,a,i,n]}class ve extends H{constructor(e){super();N(this,e,le,ae,S,{href:0,pattern:3})}}const re=s=>({}),R=s=>({}),oe=s=>({}),U=s=>({}),ie=s=>({}),V=s=>({});function F(s){let e,t;const o=s[5].logo,a=w(o,s,s[4],V);return{c(){e=m("a"),a&&a.c(),this.h()},l(n){e=v(n,"A",{class:!0,href:!0});var i=g(e);a&&a.l(i),i.forEach(u),this.h()},h(){d(e,"class","logo svelte-h4i5ca"),d(e,"href",s[0])},m(n,i){y(n,e,i),a&&a.m(e,null),t=!0},p(n,i){a&&a.p&&(!t||i&16)&&D(a,o,n,n[4],t?L(o,n[4],i,ie):E(n[4]),V),(!t||i&1)&&d(e,"href",n[0])},i(n){t||(h(a,n),t=!0)},o(n){p(a,n),t=!1},d(n){n&&u(e),a&&a.d(n)}}}function J(s){let e,t;const o=s[5].links,a=w(o,s,s[4],U);return{c(){e=m("ul"),a&&a.c(),this.h()},l(n){e=v(n,"UL",{class:!0});var i=g(e);a&&a.l(i),i.forEach(u),this.h()},h(){d(e,"class","links svelte-h4i5ca")},m(n,i){y(n,e,i),a&&a.m(e,null),t=!0},p(n,i){a&&a.p&&(!t||i&16)&&D(a,o,n,n[4],t?L(o,n[4],i,oe):E(n[4]),U)},i(n){t||(h(a,n),t=!0)},o(n){p(a,n),t=!1},d(n){n&&u(e),a&&a.d(n)}}}function K(s){let e,t;const o=s[5].actions,a=w(o,s,s[4],R);return{c(){e=m("ul"),a&&a.c(),this.h()},l(n){e=v(n,"UL",{class:!0});var i=g(e);a&&a.l(i),i.forEach(u),this.h()},h(){d(e,"class","actions svelte-h4i5ca")},m(n,i){y(n,e,i),a&&a.m(e,null),t=!0},p(n,i){a&&a.p&&(!t||i&16)&&D(a,o,n,n[4],t?L(o,n[4],i,re):E(n[4]),R)},i(n){t||(h(a,n),t=!0)},o(n){p(a,n),t=!1},d(n){n&&u(e),a&&a.d(n)}}}function ce(s){let e,t,o,a,n,i,r=s[3].logo&&F(s),l=s[3].links&&J(s),f=s[3].actions&&K(s);return{c(){e=m("nav"),t=m("div"),r&&r.c(),o=j(),l&&l.c(),a=j(),f&&f.c(),this.h()},l(c){e=v(c,"NAV",{class:!0});var _=g(e);t=v(_,"DIV",{class:!0});var b=g(t);r&&r.l(b),o=q(b),l&&l.l(b),a=q(b),f&&f.l(b),b.forEach(u),_.forEach(u),this.h()},h(){d(t,"class","wrapper svelte-h4i5ca"),d(e,"class","svelte-h4i5ca"),W(()=>s[6].call(e))},m(c,_){y(c,e,_),k(e,t),r&&r.m(t,null),k(t,o),l&&l.m(t,null),k(t,a),f&&f.m(t,null),n=X(e,s[6].bind(e)),i=!0},p(c,[_]){c[3].logo?r?(r.p(c,_),_&8&&h(r,1)):(r=F(c),r.c(),h(r,1),r.m(t,o)):r&&(A(),p(r,1,1,()=>{r=null}),C()),c[3].links?l?(l.p(c,_),_&8&&h(l,1)):(l=J(c),l.c(),h(l,1),l.m(t,a)):l&&(A(),p(l,1,1,()=>{l=null}),C()),c[3].actions?f?(f.p(c,_),_&8&&h(f,1)):(f=K(c),f.c(),h(f,1),f.m(t,null)):f&&(A(),p(f,1,1,()=>{f=null}),C())},i(c){i||(h(r),h(l),h(f),i=!0)},o(c){p(r),p(l),p(f),i=!1},d(c){c&&u(e),r&&r.d(),l&&l.d(),f&&f.d(),n()}}}JSON.parse('{"name":"Navbar","slots":[{"name":"logo","htmlDoc":null},{"name":"links","htmlDoc":null},{"name":"actions","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"logoHref","optional":true,"value":"/"}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true},{"kind":"function","name":"stores"}],"customProperties":[{"property":"--br-navbar-border-bottom","value":" ","cssDoc":null},{"property":"--br-navbar-margin-block","value":" ","cssDoc":null},{"property":"--br-navbar-padding-inline","value":" ","cssDoc":null},{"property":"--br-navbar-height","value":" ","cssDoc":null},{"property":"--br-navbar-max-width","value":" ","cssDoc":null},{"property":"--br-navbar-logo-width","value":" ","cssDoc":null},{"property":"--br-navbar-logo-padding-inline","value":" ","cssDoc":null},{"property":"--br-navbar-link-padding-inline","value":" ","cssDoc":null},{"property":"--br-navbar-actions-padding-inline","value":" ","cssDoc":null},{"property":"--br-navbar-items-padding-inline","value":" ","cssDoc":null},{"property":"--br-navbar-items-gap","value":" ","cssDoc":null}]}');const fe={};function ue(s,e,t){let o,{$$slots:a={},$$scope:n}=e;const i=B(a);let{logoHref:r="/"}=e;const l=Z("");M(s,l,c=>t(1,o=c)),Y(fe,{navHeight:l});function f(){o=this.offsetHeight,l.set(o)}return s.$$set=c=>{"logoHref"in c&&t(0,r=c.logoHref),"$$scope"in c&&t(4,n=c.$$scope)},[r,o,l,i,n,a,f]}class ge extends H{constructor(e){super();N(this,e,ue,ce,S,{logoHref:0})}}function de(s){let e;return{c(){e=m("link"),this.h()},l(t){const o=$('[data-svelte="svelte-adw9kz"]',document.head);e=v(o,"LINK",{rel:!0,href:!0}),o.forEach(u),this.h()},h(){d(e,"rel","stylesheet"),d(e,"href",s[0])},m(t,o){k(document.head,e)},p(t,[o]){o&1&&d(e,"href",t[0])},i:I,o:I,d(t){u(e)}}}let he="light";function _e(s,e,t){let o,a,{theme:n="berry"}=e,{mode:i=""}=e,r=new Map([["berry",{dark:"/app/assets/berry.dark-f2e409f4.css",light:"/app/assets/berry.dark-4a21848a.css"}]]);return s.$$set=l=>{"theme"in l&&t(1,n=l.theme),"mode"in l&&t(2,i=l.mode)},s.$$.update=()=>{var l;s.$$.dirty&4&&t(3,o=i||he),s.$$.dirty&10&&t(0,a=(l=r==null?void 0:r[n])==null?void 0:l[o])},[a,n,i,o]}class be extends H{constructor(e){super();N(this,e,_e,de,S,{theme:1,mode:2})}}export{ve as L,ge as N,be as T};
