import{Q,R as W,S as H,i as M,s as N,D as w,e as v,c as b,a as y,d,b as h,M as j,f as k,H as D,N as X,E,F as L,G as S,x as _,u as p,T as z,k as A,n as C,U as B,V as Y,r as q,w as I,W as Z,y as x,C as $,X as ee,A as te}from"./vendor-3934c3b2.js";import{c as se}from"./forward-events-e36204ce.js";let O=null;typeof window!="undefined"&&(O=window.location);const ne=Q(O,s=>{if(typeof window=="undefined")return;function e(){s(window.location)}return window.addEventListener("DOMContentLoaded",e),window.addEventListener("hashchange",e),()=>{window.removeEventListener("DOMContentLoaded",e),window.removeEventListener("hashchange",e)}}),T=new Map;function le(s,e){if(!Array.isArray(s))switch(typeof s){case"string":s=[s];break;case"undefined":s=[];break;default:throw new TypeError(`Expected '${e}' to be a string                 or an array, but got a type of '${typeof s}'`)}return s.filter(t=>{if(typeof t!="string"){if(typeof t=="undefined")return!1;throw new TypeError(`Expected '${e}' to be an array of             strings, but found a type of '${typeof t}' in the array`)}return!0})}function oe(s){const e=s;if(T.has(e))return T.get(e);s=W(s).replace(/\\\*/g,"[\\s\\S]*");const t=new RegExp(`^${s}$`);return T.set(e,t),t}function re(s,e){e=le(e,"patterns"),e=e.map(oe);for(const t of e)if(t.test(s))return!0;return!1}function ae(s){let e,t,c,n,l;const r=s[6].default,o=w(r,s,s[5],null);return{c(){e=v("li"),t=v("a"),o&&o.c(),this.h()},l(a){e=b(a,"LI",{class:!0});var f=y(e);t=b(f,"A",{href:!0,class:!0});var i=y(t);o&&o.l(i),i.forEach(d),f.forEach(d),this.h()},h(){h(t,"href",s[0]),h(t,"class","svelte-15fdnq3"),j(t,"active",s[1]),h(e,"class","berry-navbar-link svelte-15fdnq3")},m(a,f){k(a,e,f),D(e,t),o&&o.m(t,null),c=!0,n||(l=X(s[2].call(null,t)),n=!0)},p(a,[f]){o&&o.p&&(!c||f&32)&&E(o,r,a,a[5],c?S(r,a[5],f,null):L(a[5]),null),(!c||f&1)&&h(t,"href",a[0]),f&2&&j(t,"active",a[1])},i(a){c||(_(o,a),c=!0)},o(a){p(o,a),c=!1},d(a){a&&d(e),o&&o.d(a),n=!1,l()}}}JSON.parse('{"name":"Link","slots":[{"name":"default","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"href","optional":false,"jsDoc":{"description":"","tags":[{"description":"","name":"","tag":"type","type":"string"}]}},{"kind":"let","name":"pattern","optional":false,"jsDoc":{"description":"The link is colored active `window.location.pathname` satisfies any of the pattern(s).","tags":[{"description":"","name":"","tag":"type","type":"string | string[]"}]}}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[]}');function ie(s,e,t){let c,n;z(s,ne,i=>t(4,n=i));let{$$slots:l={},$$scope:r}=e,{href:o}=e,{pattern:a}=e;const f=se();return s.$$set=i=>{"href"in i&&t(0,o=i.href),"pattern"in i&&t(3,a=i.pattern),"$$scope"in i&&t(5,r=i.$$scope)},s.$$.update=()=>{s.$$.dirty&24&&t(1,c=re(n==null?void 0:n.pathname,a))},[o,c,f,a,n,r,l]}class ke extends H{constructor(e){super();M(this,e,ie,ae,N,{href:0,pattern:3})}}const ce=s=>({}),R=s=>({}),fe=s=>({}),U=s=>({}),ue=s=>({}),V=s=>({});function F(s){let e,t;const c=s[5].logo,n=w(c,s,s[4],V);return{c(){e=v("a"),n&&n.c(),this.h()},l(l){e=b(l,"A",{class:!0,href:!0});var r=y(e);n&&n.l(r),r.forEach(d),this.h()},h(){h(e,"class","logo svelte-h4i5ca"),h(e,"href",s[0])},m(l,r){k(l,e,r),n&&n.m(e,null),t=!0},p(l,r){n&&n.p&&(!t||r&16)&&E(n,c,l,l[4],t?S(c,l[4],r,ue):L(l[4]),V),(!t||r&1)&&h(e,"href",l[0])},i(l){t||(_(n,l),t=!0)},o(l){p(n,l),t=!1},d(l){l&&d(e),n&&n.d(l)}}}function J(s){let e,t;const c=s[5].links,n=w(c,s,s[4],U);return{c(){e=v("ul"),n&&n.c(),this.h()},l(l){e=b(l,"UL",{class:!0});var r=y(e);n&&n.l(r),r.forEach(d),this.h()},h(){h(e,"class","links svelte-h4i5ca")},m(l,r){k(l,e,r),n&&n.m(e,null),t=!0},p(l,r){n&&n.p&&(!t||r&16)&&E(n,c,l,l[4],t?S(c,l[4],r,fe):L(l[4]),U)},i(l){t||(_(n,l),t=!0)},o(l){p(n,l),t=!1},d(l){l&&d(e),n&&n.d(l)}}}function K(s){let e,t;const c=s[5].actions,n=w(c,s,s[4],R);return{c(){e=v("ul"),n&&n.c(),this.h()},l(l){e=b(l,"UL",{class:!0});var r=y(e);n&&n.l(r),r.forEach(d),this.h()},h(){h(e,"class","actions svelte-h4i5ca")},m(l,r){k(l,e,r),n&&n.m(e,null),t=!0},p(l,r){n&&n.p&&(!t||r&16)&&E(n,c,l,l[4],t?S(c,l[4],r,ce):L(l[4]),R)},i(l){t||(_(n,l),t=!0)},o(l){p(n,l),t=!1},d(l){l&&d(e),n&&n.d(l)}}}function de(s){let e,t,c,n,l,r,o=s[3].logo&&F(s),a=s[3].links&&J(s),f=s[3].actions&&K(s);return{c(){e=v("nav"),t=v("div"),o&&o.c(),c=A(),a&&a.c(),n=A(),f&&f.c(),this.h()},l(i){e=b(i,"NAV",{class:!0});var u=y(e);t=b(u,"DIV",{class:!0});var g=y(t);o&&o.l(g),c=C(g),a&&a.l(g),n=C(g),f&&f.l(g),g.forEach(d),u.forEach(d),this.h()},h(){h(t,"class","wrapper svelte-h4i5ca"),h(e,"class","svelte-h4i5ca"),B(()=>s[6].call(e))},m(i,u){k(i,e,u),D(e,t),o&&o.m(t,null),D(t,c),a&&a.m(t,null),D(t,n),f&&f.m(t,null),l=Y(e,s[6].bind(e)),r=!0},p(i,[u]){i[3].logo?o?(o.p(i,u),u&8&&_(o,1)):(o=F(i),o.c(),_(o,1),o.m(t,c)):o&&(q(),p(o,1,1,()=>{o=null}),I()),i[3].links?a?(a.p(i,u),u&8&&_(a,1)):(a=J(i),a.c(),_(a,1),a.m(t,n)):a&&(q(),p(a,1,1,()=>{a=null}),I()),i[3].actions?f?(f.p(i,u),u&8&&_(f,1)):(f=K(i),f.c(),_(f,1),f.m(t,null)):f&&(q(),p(f,1,1,()=>{f=null}),I())},i(i){r||(_(o),_(a),_(f),r=!0)},o(i){p(o),p(a),p(f),r=!1},d(i){i&&d(e),o&&o.d(),a&&a.d(),f&&f.d(),l()}}}JSON.parse('{"name":"Navbar","slots":[{"name":"logo","htmlDoc":null},{"name":"links","htmlDoc":null},{"name":"actions","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"logoHref","optional":true,"value":"/"}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true},{"kind":"function","name":"stores"}],"customProperties":[{"property":"--br-navbar-border-bottom","value":" ","cssDoc":null},{"property":"--br-navbar-margin-block","value":" ","cssDoc":null},{"property":"--br-navbar-padding-inline","value":" ","cssDoc":null},{"property":"--br-navbar-height","value":" ","cssDoc":null},{"property":"--br-navbar-max-width","value":" ","cssDoc":null},{"property":"--br-navbar-logo-width","value":" ","cssDoc":null},{"property":"--br-navbar-logo-padding-inline","value":" ","cssDoc":null},{"property":"--br-navbar-link-padding-inline","value":" ","cssDoc":null},{"property":"--br-navbar-actions-padding-inline","value":" ","cssDoc":null},{"property":"--br-navbar-items-padding-inline","value":" ","cssDoc":null},{"property":"--br-navbar-items-gap","value":" ","cssDoc":null}]}');const he={};function _e(s,e,t){let c,{$$slots:n={},$$scope:l}=e;const r=Z(n);let{logoHref:o="/"}=e;const a=$("");z(s,a,i=>t(1,c=i)),x(he,{navHeight:a});function f(){c=this.offsetHeight,a.set(c)}return s.$$set=i=>{"logoHref"in i&&t(0,o=i.logoHref),"$$scope"in i&&t(4,l=i.$$scope)},[o,c,a,r,l,n,f]}class we extends H{constructor(e){super();M(this,e,_e,de,N,{logoHref:0})}}function me(s,e){return new Map([["berry",{dark:"assets/berry.dark-4a01524b.css",light:"assets/berry.dark-4a21848a.css"}]]).get(s)[e]}const pe=s=>({mode:s&1}),P=s=>({mode:s[0]});function ge(s){let e,t,c,n;const l=s[9].default,r=w(l,s,s[8],P);return{c(){e=v("link"),c=A(),r&&r.c(),this.h()},l(o){const a=ee('[data-svelte="svelte-1aqrhki"]',document.head);e=b(a,"LINK",{rel:!0,href:!0,media:!0}),a.forEach(d),c=C(o),r&&r.l(o),this.h()},h(){h(e,"rel","stylesheet"),h(e,"href",t="/app/"+s[1]),h(e,"media","all")},m(o,a){D(document.head,e),k(o,c,a),r&&r.m(o,a),n=!0},p(o,[a]){(!n||a&2&&t!==(t="/app/"+o[1]))&&h(e,"href",t),r&&r.p&&(!n||a&257)&&E(r,l,o,o[8],n?S(l,o[8],a,pe):L(o[8]),P)},i(o){n||(_(r,o),n=!0)},o(o){p(r,o),n=!1},d(o){d(e),o&&d(c),r&&r.d(o)}}}function ve(s,e,t){let{$$slots:c={},$$scope:n}=e,{theme:l="berry"}=e,{mode:r="light"}=e,{persist:o=!1}=e;const a=m=>{t(2,o=!0),t(7,u=m)};let f=!1,i=r,u=r,g;return te(()=>{const m=matchMedia("(prefers-color-scheme: dark)");t(6,i=m.matches?"dark":"light"),m.addEventListener(({matches:G})=>{t(6,i=G?"dark":"light")}),t(7,u=localStorage.getItem("dark-mode-toggle")||default_mode||i),t(5,f=!0)}),s.$$set=m=>{"theme"in m&&t(3,l=m.theme),"mode"in m&&t(0,r=m.mode),"persist"in m&&t(2,o=m.persist),"$$scope"in m&&t(8,n=m.$$scope)},s.$$.update=()=>{s.$$.dirty&160&&f&&localStorage.setItem("dark-mode-toggle",u),s.$$.dirty&196&&t(0,r=o?u:i),s.$$.dirty&9&&t(1,g=me(l,r)),s.$$.dirty&2&&console.log({stylesheet:g})},[r,g,o,l,a,f,i,u,n,c]}class De extends H{constructor(e){super();M(this,e,ve,ge,N,{theme:3,mode:0,persist:2,set_mode:4})}get set_mode(){return this.$$.ctx[4]}}export{ke as L,we as N,De as S};
