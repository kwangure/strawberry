import{Q as P,R as G,S as H,i as N,s as A,D as w,e as m,c as g,a as v,d as u,b as d,M as T,f as y,H as k,N as Q,E as D,F as E,G as L,x as h,u as _,T as z,k as j,n as q,U as W,V as X,r as S,w as C,W as B,y as Y,C as Z,X as x,I,A as $}from"./vendor-3934c3b2.js";import{c as ee}from"./forward-events-e36204ce.js";let O=null;typeof window!="undefined"&&(O=window.location);const te=P(O,s=>{if(typeof window=="undefined")return;function e(){s(window.location)}return window.addEventListener("DOMContentLoaded",e),window.addEventListener("hashchange",e),()=>{window.removeEventListener("DOMContentLoaded",e),window.removeEventListener("hashchange",e)}}),M=new Map;function se(s,e){if(!Array.isArray(s))switch(typeof s){case"string":s=[s];break;case"undefined":s=[];break;default:throw new TypeError(`Expected '${e}' to be a string                 or an array, but got a type of '${typeof s}'`)}return s.filter(t=>{if(typeof t!="string"){if(typeof t=="undefined")return!1;throw new TypeError(`Expected '${e}' to be an array of             strings, but found a type of '${typeof t}' in the array`)}return!0})}function ne(s){const e=s;if(M.has(e))return M.get(e);s=G(s).replace(/\\\*/g,"[\\s\\S]*");const t=new RegExp(`^${s}$`);return M.set(e,t),t}function ae(s,e){e=se(e,"patterns"),e=e.map(ne);for(const t of e)if(t.test(s))return!0;return!1}function re(s){let e,t,o,a,n;const i=s[6].default,l=w(i,s,s[5],null);return{c(){e=m("li"),t=m("a"),l&&l.c(),this.h()},l(r){e=g(r,"LI",{class:!0});var c=v(e);t=g(c,"A",{href:!0,class:!0});var f=v(t);l&&l.l(f),f.forEach(u),c.forEach(u),this.h()},h(){d(t,"href",s[0]),d(t,"class","svelte-15fdnq3"),T(t,"active",s[1]),d(e,"class","berry-navbar-link svelte-15fdnq3")},m(r,c){y(r,e,c),k(e,t),l&&l.m(t,null),o=!0,a||(n=Q(s[2].call(null,t)),a=!0)},p(r,[c]){l&&l.p&&(!o||c&32)&&D(l,i,r,r[5],o?L(i,r[5],c,null):E(r[5]),null),(!o||c&1)&&d(t,"href",r[0]),c&2&&T(t,"active",r[1])},i(r){o||(h(l,r),o=!0)},o(r){_(l,r),o=!1},d(r){r&&u(e),l&&l.d(r),a=!1,n()}}}JSON.parse('{"name":"Link","slots":[{"name":"default","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"href","optional":false,"jsDoc":{"description":"","tags":[{"description":"","name":"","tag":"type","type":"string"}]}},{"kind":"let","name":"pattern","optional":false,"jsDoc":{"description":"The link is colored active `window.location.pathname` satisfies any of the pattern(s).","tags":[{"description":"","name":"","tag":"type","type":"string | string[]"}]}}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[]}');function le(s,e,t){let o,a;z(s,te,f=>t(4,a=f));let{$$slots:n={},$$scope:i}=e,{href:l}=e,{pattern:r}=e;const c=ee();return s.$$set=f=>{"href"in f&&t(0,l=f.href),"pattern"in f&&t(3,r=f.pattern),"$$scope"in f&&t(5,i=f.$$scope)},s.$$.update=()=>{s.$$.dirty&24&&t(1,o=ae(a==null?void 0:a.pathname,r))},[l,o,c,r,a,i,n]}class ge extends H{constructor(e){super();N(this,e,le,re,A,{href:0,pattern:3})}}const oe=s=>({}),R=s=>({}),ie=s=>({}),U=s=>({}),ce=s=>({}),V=s=>({});function F(s){let e,t;const o=s[5].logo,a=w(o,s,s[4],V);return{c(){e=m("a"),a&&a.c(),this.h()},l(n){e=g(n,"A",{class:!0,href:!0});var i=v(e);a&&a.l(i),i.forEach(u),this.h()},h(){d(e,"class","logo svelte-h4i5ca"),d(e,"href",s[0])},m(n,i){y(n,e,i),a&&a.m(e,null),t=!0},p(n,i){a&&a.p&&(!t||i&16)&&D(a,o,n,n[4],t?L(o,n[4],i,ce):E(n[4]),V),(!t||i&1)&&d(e,"href",n[0])},i(n){t||(h(a,n),t=!0)},o(n){_(a,n),t=!1},d(n){n&&u(e),a&&a.d(n)}}}function J(s){let e,t;const o=s[5].links,a=w(o,s,s[4],U);return{c(){e=m("ul"),a&&a.c(),this.h()},l(n){e=g(n,"UL",{class:!0});var i=v(e);a&&a.l(i),i.forEach(u),this.h()},h(){d(e,"class","links svelte-h4i5ca")},m(n,i){y(n,e,i),a&&a.m(e,null),t=!0},p(n,i){a&&a.p&&(!t||i&16)&&D(a,o,n,n[4],t?L(o,n[4],i,ie):E(n[4]),U)},i(n){t||(h(a,n),t=!0)},o(n){_(a,n),t=!1},d(n){n&&u(e),a&&a.d(n)}}}function K(s){let e,t;const o=s[5].actions,a=w(o,s,s[4],R);return{c(){e=m("ul"),a&&a.c(),this.h()},l(n){e=g(n,"UL",{class:!0});var i=v(e);a&&a.l(i),i.forEach(u),this.h()},h(){d(e,"class","actions svelte-h4i5ca")},m(n,i){y(n,e,i),a&&a.m(e,null),t=!0},p(n,i){a&&a.p&&(!t||i&16)&&D(a,o,n,n[4],t?L(o,n[4],i,oe):E(n[4]),R)},i(n){t||(h(a,n),t=!0)},o(n){_(a,n),t=!1},d(n){n&&u(e),a&&a.d(n)}}}function fe(s){let e,t,o,a,n,i,l=s[3].logo&&F(s),r=s[3].links&&J(s),c=s[3].actions&&K(s);return{c(){e=m("nav"),t=m("div"),l&&l.c(),o=j(),r&&r.c(),a=j(),c&&c.c(),this.h()},l(f){e=g(f,"NAV",{class:!0});var p=v(e);t=g(p,"DIV",{class:!0});var b=v(t);l&&l.l(b),o=q(b),r&&r.l(b),a=q(b),c&&c.l(b),b.forEach(u),p.forEach(u),this.h()},h(){d(t,"class","wrapper svelte-h4i5ca"),d(e,"class","svelte-h4i5ca"),W(()=>s[6].call(e))},m(f,p){y(f,e,p),k(e,t),l&&l.m(t,null),k(t,o),r&&r.m(t,null),k(t,a),c&&c.m(t,null),n=X(e,s[6].bind(e)),i=!0},p(f,[p]){f[3].logo?l?(l.p(f,p),p&8&&h(l,1)):(l=F(f),l.c(),h(l,1),l.m(t,o)):l&&(S(),_(l,1,1,()=>{l=null}),C()),f[3].links?r?(r.p(f,p),p&8&&h(r,1)):(r=J(f),r.c(),h(r,1),r.m(t,a)):r&&(S(),_(r,1,1,()=>{r=null}),C()),f[3].actions?c?(c.p(f,p),p&8&&h(c,1)):(c=K(f),c.c(),h(c,1),c.m(t,null)):c&&(S(),_(c,1,1,()=>{c=null}),C())},i(f){i||(h(l),h(r),h(c),i=!0)},o(f){_(l),_(r),_(c),i=!1},d(f){f&&u(e),l&&l.d(),r&&r.d(),c&&c.d(),n()}}}JSON.parse('{"name":"Navbar","slots":[{"name":"logo","htmlDoc":null},{"name":"links","htmlDoc":null},{"name":"actions","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"logoHref","optional":true,"value":"/"}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true},{"kind":"function","name":"stores"}],"customProperties":[{"property":"--br-navbar-border-bottom","value":" ","cssDoc":null},{"property":"--br-navbar-margin-block","value":" ","cssDoc":null},{"property":"--br-navbar-padding-inline","value":" ","cssDoc":null},{"property":"--br-navbar-height","value":" ","cssDoc":null},{"property":"--br-navbar-max-width","value":" ","cssDoc":null},{"property":"--br-navbar-logo-width","value":" ","cssDoc":null},{"property":"--br-navbar-logo-padding-inline","value":" ","cssDoc":null},{"property":"--br-navbar-link-padding-inline","value":" ","cssDoc":null},{"property":"--br-navbar-actions-padding-inline","value":" ","cssDoc":null},{"property":"--br-navbar-items-padding-inline","value":" ","cssDoc":null},{"property":"--br-navbar-items-gap","value":" ","cssDoc":null}]}');const ue={};function de(s,e,t){let o,{$$slots:a={},$$scope:n}=e;const i=B(a);let{logoHref:l="/"}=e;const r=Z("");z(s,r,f=>t(1,o=f)),Y(ue,{navHeight:r});function c(){o=this.offsetHeight,r.set(o)}return s.$$set=f=>{"logoHref"in f&&t(0,l=f.logoHref),"$$scope"in f&&t(4,n=f.$$scope)},[l,o,r,i,n,a,c]}class ve extends H{constructor(e){super();N(this,e,de,fe,A,{logoHref:0})}}function he(s){let e;return{c(){e=m("link"),this.h()},l(t){const o=x('[data-svelte="svelte-adw9kz"]',document.head);e=g(o,"LINK",{rel:!0,href:!0}),o.forEach(u),this.h()},h(){d(e,"rel","stylesheet"),d(e,"href",s[0])},m(t,o){k(document.head,e)},p(t,[o]){o&1&&d(e,"href",t[0])},i:I,o:I,d(t){u(e)}}}function pe(s,e,t){let o,a,{theme:n="berry"}=e,{mode:i=""}=e,l="light",r={berry:{dark:"/strawberry/app/assets/berry.dark-4a01524b.css",light:"/strawberry/app/assets/berry.dark-4a21848a.css"}};return $(()=>{const c=matchMedia("(prefers-color-scheme: dark)");t(3,l=c.matches?"dark":"light"),c.addEventListener("change",({matches:f})=>{t(3,l=f?"dark":"light")})}),s.$$set=c=>{"theme"in c&&t(1,n=c.theme),"mode"in c&&t(2,i=c.mode)},s.$$.update=()=>{s.$$.dirty&12&&t(4,o=i||l),s.$$.dirty&18&&t(0,a=r[n][o])},[a,n,i,l,o]}class be extends H{constructor(e){super();N(this,e,pe,he,A,{theme:1,mode:2})}}export{ge as L,ve as N,be as T};
