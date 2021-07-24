import{S as e,i as s,s as t,B as o,D as a,e as c,k as n,c as r,a as l,n as p,d as $,K as i,L as u,b as m,f as d,G as h,M as f,p as k,E as b,x as g,u as v,N as x,_ as y,P as w,j,m as E,o as B,v as N,t as P,g as A}from"../../../chunks/vendor-60cb395e.js";import{c as C}from"../../../chunks/forward-events-13fb088f.js";import{C as D}from"../../../chunks/component-813341d9.js";import"../../../chunks/Code-10b34005.js";import"../../../chunks/preload-helper-13c00eaa.js";JSON.parse('{"name":"Group","props":[{"kind":"let","name":"group","optional":true}],"exports":[{"kind":"const","name":"checkboxGroup","optional":true,"value":"berry-checkbox-group"}],"customProperties":[]}');const G=e=>({}),L=e=>({});function S(e){let s,t,x,y,w,j,E=[{type:"checkbox"},e[1]],B={};for(let a=0;a<E.length;a+=1)B=o(B,E[a]);const N=e[5].label,P=a(N,e,e[4],L);return{c(){s=c("label"),t=c("input"),x=n(),P&&P.c(),this.h()},l(e){s=r(e,"LABEL",{class:!0});var o=l(s);t=r(o,"INPUT",{type:!0}),x=p(o),P&&P.l(o),o.forEach($),this.h()},h(){i(t,B),u(t,"svelte-1gsk93r",!0),m(s,"class","berry-input-checkbox input-wrapper svelte-1gsk93r")},m(o,a){d(o,s,a),h(s,t),h(s,x),P&&P.m(s,null),y=!0,w||(j=f(e[0].call(null,t)),w=!0)},p(e,[s]){i(t,B=k(E,[{type:"checkbox"},2&s&&e[1]])),u(t,"svelte-1gsk93r",!0),P&&P.p&&(!y||16&s)&&b(P,N,e,e[4],y?s:-1,G,L)},i(e){y||(g(P,e),y=!0)},o(e){v(P,e),y=!1},d(e){e&&$(s),P&&P.d(e),w=!1,j()}}}function W(e,s,t){const a=["value","checked"];let c=x(s,a),{$$slots:n={},$$scope:r}=s,{value:l}=s,{checked:p=!1}=s;const $=C(),i=y("berry-checkbox-group");return e.$$set=e=>{s=o(o({},s),w(e)),t(1,c=x(s,a)),"value"in e&&t(2,l=e.value),"checked"in e&&t(3,p=e.checked),"$$scope"in e&&t(4,r=e.$$scope)},e.$$.update=()=>{var s;8&e.$$.dirty&&(s=p,i&&(s?i.add(l):i.remove(l)))},[$,c,l,p,r,n]}class J extends e{constructor(e){super(),s(this,e,W,S,t,{value:2,checked:3})}}const O={main:JSON.parse('{"name":"Checkbox","props":[{"kind":"let","name":"value","optional":false,"jsDoc":{"description":"The value of the component if checked.","tags":[{"tag":"type","name":"","type":"string","optional":false,"description":""}]}},{"kind":"let","name":"checked","optional":true,"value":false,"jsDoc":{"description":"Whether the command or control is checked","tags":[{"tag":"type","name":"","type":"boolean","optional":false,"description":""}]}}],"exports":[],"customProperties":[]}')};function R(e){let s,t,o;return{c(){s=P("Awesome label..."),t=c("wbr"),o=P("check!")},l(e){s=A(e,"Awesome label..."),t=r(e,"WBR",{}),o=A(e,"check!")},m(e,a){d(e,s,a),d(e,t,a),d(e,o,a)},d(e){e&&$(s),e&&$(t),e&&$(o)}}}function T(e){let s,t,o;return{c(){s=P("Even awesomer label..."),t=c("wbr"),o=P("check!")},l(e){s=A(e,"Even awesomer label..."),t=r(e,"WBR",{}),o=A(e,"check!")},m(e,a){d(e,s,a),d(e,t,a),d(e,o,a)},d(e){e&&$(s),e&&$(t),e&&$(o)}}}function I(e){let s,t,o,a;return s=new J({props:{$$slots:{label:[R]},$$scope:{ctx:e}}}),o=new J({props:{$$slots:{label:[T]},$$scope:{ctx:e}}}),{c(){j(s.$$.fragment),t=n(),j(o.$$.fragment)},l(e){E(s.$$.fragment,e),t=p(e),E(o.$$.fragment,e)},m(e,c){B(s,e,c),d(e,t,c),B(o,e,c),a=!0},p(e,t){const a={};1&t&&(a.$$scope={dirty:t,ctx:e}),s.$set(a);const c={};1&t&&(c.$$scope={dirty:t,ctx:e}),o.$set(c)},i(e){a||(g(s.$$.fragment,e),g(o.$$.fragment,e),a=!0)},o(e){v(s.$$.fragment,e),v(o.$$.fragment,e),a=!1},d(e){N(s,e),e&&$(t),N(o,e)}}}function K(e){let s,t;return s=new D({props:{docs:O,$$slots:{block:[I]},$$scope:{ctx:e}}}),{c(){j(s.$$.fragment)},l(e){E(s.$$.fragment,e)},m(e,o){B(s,e,o),t=!0},p(e,[t]){const o={};1&t&&(o.$$scope={dirty:t,ctx:e}),s.$set(o)},i(e){t||(g(s.$$.fragment,e),t=!0)},o(e){v(s.$$.fragment,e),t=!1},d(e){N(s,e)}}}export default class extends e{constructor(e){super(),s(this,e,null,K,t,{})}}
