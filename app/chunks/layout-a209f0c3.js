import{S as C,i as P,s as S,D as B,j as g,k,e as j,m as h,n as N,c as T,a as E,d as i,b as m,o as v,f as c,H,E as D,F as M,G as q,x as p,u as _,v as b,t as w,g as d,J as F,K as I}from"./vendor-3934c3b2.js";import{T as J,N as K,L}from"./Theme-b455ad55.js";import{b as y}from"./paths-28a87002.js";import{B as A}from"./Tabs.svelte_svelte_type_style_lang-648e6a50.js";function V($){let t,e,a;return{c(){t=w("\u{1F353} "),e=j("span"),a=w("strawberry"),this.h()},l(n){t=d(n,"\u{1F353} "),e=T(n,"SPAN",{class:!0});var s=E(e);a=d(s,"strawberry"),s.forEach(i),this.h()},h(){m(e,"class","text")},m(n,s){c(n,t,s),c(n,e,s),H(e,a)},d(n){n&&i(t),n&&i(e)}}}function x($){let t;return{c(){t=w("Components")},l(e){t=d(e,"Components")},m(e,a){c(e,t,a)},d(e){e&&i(t)}}}function z($){let t;return{c(){t=w("Typography")},l(e){t=d(e,"Typography")},m(e,a){c(e,t,a)},d(e){e&&i(t)}}}function O($){let t,e,a,n;return t=new L({props:{href:""+(y+"/components"),pattern:[`${y}/components`,`${y}/components/*`],$$slots:{default:[x]},$$scope:{ctx:$}}}),a=new L({props:{href:""+(y+"/typography"),pattern:""+(y+"/typography"),$$slots:{default:[z]},$$scope:{ctx:$}}}),{c(){g(t.$$.fragment),e=k(),g(a.$$.fragment)},l(s){h(t.$$.fragment,s),e=N(s),h(a.$$.fragment,s)},m(s,f){v(t,s,f),c(s,e,f),v(a,s,f),n=!0},p(s,f){const o={};f&2&&(o.$$scope={dirty:f,ctx:s}),t.$set(o);const l={};f&2&&(l.$$scope={dirty:f,ctx:s}),a.$set(l)},i(s){n||(p(t.$$.fragment,s),p(a.$$.fragment,s),n=!0)},o(s){_(t.$$.fragment,s),_(a.$$.fragment,s),n=!1},d(s){b(t,s),s&&i(e),b(a,s)}}}function Q($){let t;return{c(){t=w("GitHub")},l(e){t=d(e,"GitHub")},m(e,a){c(e,t,a)},d(e){e&&i(t)}}}function R($){let t;return{c(){t=w("NPM")},l(e){t=d(e,"NPM")},m(e,a){c(e,t,a)},d(e){e&&i(t)}}}function U($){let t,e,a,n,s,f;return e=new A({props:{icon:F,$$slots:{default:[Q]},$$scope:{ctx:$}}}),s=new A({props:{icon:I,$$slots:{default:[R]},$$scope:{ctx:$}}}),{c(){t=j("a"),g(e.$$.fragment),a=k(),n=j("a"),g(s.$$.fragment),this.h()},l(o){t=T(o,"A",{class:!0,href:!0,target:!0});var l=E(t);h(e.$$.fragment,l),l.forEach(i),a=N(o),n=T(o,"A",{class:!0,href:!0,target:!0});var r=E(n);h(s.$$.fragment,r),r.forEach(i),this.h()},h(){m(t,"class","cta svelte-1shyw6w"),m(t,"href","https://github.com/kwangure/strawberry"),m(t,"target","_blank"),m(n,"class","cta svelte-1shyw6w"),m(n,"href","https://www.npmjs.com/package/@kwangure/strawberry"),m(n,"target","_blank")},m(o,l){c(o,t,l),v(e,t,null),c(o,a,l),c(o,n,l),v(s,n,null),f=!0},p(o,l){const r={};l&2&&(r.$$scope={dirty:l,ctx:o}),e.$set(r);const u={};l&2&&(u.$$scope={dirty:l,ctx:o}),s.$set(u)},i(o){f||(p(e.$$.fragment,o),p(s.$$.fragment,o),f=!0)},o(o){_(e.$$.fragment,o),_(s.$$.fragment,o),f=!1},d(o){o&&i(t),b(e),o&&i(a),o&&i(n),b(s)}}}function W($){let t,e,a,n,s,f;t=new J({}),n=new K({props:{logoHref:""+(y+"/"),$$slots:{actions:[U],links:[O],logo:[V]},$$scope:{ctx:$}}});const o=$[0].default,l=B(o,$,$[1],null);return{c(){g(t.$$.fragment),e=k(),a=j("div"),g(n.$$.fragment),s=k(),l&&l.c(),this.h()},l(r){h(t.$$.fragment,r),e=N(r),a=T(r,"DIV",{class:!0});var u=E(a);h(n.$$.fragment,u),s=N(u),l&&l.l(u),u.forEach(i),this.h()},h(){m(a,"class","app-layout svelte-1shyw6w")},m(r,u){v(t,r,u),c(r,e,u),c(r,a,u),v(n,a,null),H(a,s),l&&l.m(a,null),f=!0},p(r,[u]){const G={};u&2&&(G.$$scope={dirty:u,ctx:r}),n.$set(G),l&&l.p&&(!f||u&2)&&D(l,o,r,r[1],f?q(o,r[1],u,null):M(r[1]),null)},i(r){f||(p(t.$$.fragment,r),p(n.$$.fragment,r),p(l,r),f=!0)},o(r){_(t.$$.fragment,r),_(n.$$.fragment,r),_(l,r),f=!1},d(r){b(t,r),r&&i(e),r&&i(a),b(n),l&&l.d(r)}}}function X($,t,e){let{$$slots:a={},$$scope:n}=t;return $.$$set=s=>{"$$scope"in s&&e(1,n=s.$$scope)},[a,n]}class st extends C{constructor(t){super();P(this,t,X,W,S,{})}}export{st as L};
