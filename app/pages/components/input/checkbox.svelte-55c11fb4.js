const e={};import{S as t,i as s,s as n,D as r,E as o,v as a,r as c,x as l,A as $,e as u,k as i,c as p,a as h,n as f,d,K as m,L as g,b as v,f as k,G as b,M as x,p as y,N as I,Z as E,P as A,a7 as w,a8 as N,j as P,m as D,o as S,a9 as j,w as z,t as L,g as M,h as V}from"../../../chunks/vendor-9d63b597.js";import{c as C}from"../../../chunks/forward-events-c6737fa2.js";function B(e){let t;const s=e[2].default,n=r(s,e,e[1],null);return{c(){n&&n.c()},l(e){n&&n.l(e)},m(e,s){n&&n.m(e,s),t=!0},p(e,[r]){n&&n.p&&(!t||2&r)&&o(n,s,e,e[1],r,null,null)},i(e){t||(a(n,e),t=!0)},o(e){c(n,e),t=!1},d(e){n&&n.d(e)}}}function G(t,s,n){let{$$slots:r={},$$scope:o}=s,{group:a=[]}=s;return l("berry-checkbox-group",{add:e=>{n(0,a=[...a,e])},remove:e=>{n(0,a=a.filter((t=>t===e)))}}),e.DEV&&!Array.isArray(a)&&console.error("'group' prop must be an Array"),t.$$set=e=>{"group"in e&&n(0,a=e.group),"$$scope"in e&&n(1,o=e.$$scope)},[a,o,r]}class K extends t{constructor(e){super(),s(this,e,G,B,n,{group:0})}}const T=e=>({}),U=e=>({});function Z(e){let t,s,n,l,I,E,A=[{type:"checkbox"},e[1]],w={};for(let r=0;r<A.length;r+=1)w=$(w,A[r]);const N=e[5].label,P=r(N,e,e[4],U);return{c(){t=u("label"),s=u("input"),n=i(),P&&P.c(),this.h()},l(e){t=p(e,"LABEL",{class:!0});var r=h(t);s=p(r,"INPUT",{type:!0}),n=f(r),P&&P.l(r),r.forEach(d),this.h()},h(){m(s,w),g(s,"svelte-1thz2i1",!0),v(t,"class","berry-input-checkbox input-wrapper svelte-1thz2i1")},m(r,o){k(r,t,o),b(t,s),b(t,n),P&&P.m(t,null),l=!0,I||(E=x(e[0].call(null,s)),I=!0)},p(e,[t]){m(s,w=y(A,[{type:"checkbox"},2&t&&e[1]])),g(s,"svelte-1thz2i1",!0),P&&P.p&&(!l||16&t)&&o(P,N,e,e[4],t,T,U)},i(e){l||(a(P,e),l=!0)},o(e){c(P,e),l=!1},d(e){e&&d(t),P&&P.d(e),I=!1,E()}}}function q(e,t,s){const n=["value","checked"];let r=I(t,n),{$$slots:o={},$$scope:a}=t,{value:c}=t,{checked:l=!1}=t;const u=C(),i=E("berry-checkbox-group");return e.$$set=e=>{t=$($({},t),A(e)),s(1,r=I(t,n)),"value"in e&&s(2,c=e.value),"checked"in e&&s(3,l=e.checked),"$$scope"in e&&s(4,a=e.$$scope)},e.$$.update=()=>{var t;8&e.$$.dirty&&(t=l,i&&(t?i.add(c):i.remove(c)))},[u,r,c,l,a,o]}class F extends t{constructor(e){super(),s(this,e,q,Z,n,{value:2,checked:3})}}function H(e){let t,s;return{c(){t=u("span"),s=L("Check me out! I'm checkbox"),this.h()},l(e){t=p(e,"SPAN",{slot:!0});var n=h(t);s=M(n,"Check me out! I'm checkbox"),n.forEach(d),this.h()},h(){v(t,"slot","label")},m(e,n){k(e,t,n),b(t,s)},d(e){e&&d(t)}}}function J(e){let t,s;return{c(){t=u("span"),s=L("Mango"),this.h()},l(e){t=p(e,"SPAN",{slot:!0});var n=h(t);s=M(n,"Mango"),n.forEach(d),this.h()},h(){v(t,"slot","label")},m(e,n){k(e,t,n),b(t,s)},d(e){e&&d(t)}}}function O(e){let t,s;return{c(){t=u("span"),s=L("Nothing else"),this.h()},l(e){t=p(e,"SPAN",{slot:!0});var n=h(t);s=M(n,"Nothing else"),n.forEach(d),this.h()},h(){v(t,"slot","label")},m(e,n){k(e,t,n),b(t,s)},d(e){e&&d(t)}}}function Q(e){let t,s,n,r,o,a,c,l=e[0][0]+"",$=e[0][0]+"",u=e[0][1]+"";return{c(){t=L("I like "),s=L(l),n=L(", "),r=L($),o=L(" and "),a=L(u),c=L("!")},l(e){t=M(e,"I like "),s=M(e,l),n=M(e,", "),r=M(e,$),o=M(e," and "),a=M(e,u),c=M(e,"!")},m(e,l){k(e,t,l),k(e,s,l),k(e,n,l),k(e,r,l),k(e,o,l),k(e,a,l),k(e,c,l)},p(e,t){1&t&&l!==(l=e[0][0]+"")&&V(s,l),1&t&&$!==($=e[0][0]+"")&&V(r,$),1&t&&u!==(u=e[0][1]+"")&&V(a,u)},d(e){e&&d(t),e&&d(s),e&&d(n),e&&d(r),e&&d(o),e&&d(a),e&&d(c)}}}function R(e){let t,s,n=e[0][0]+"";return{c(){t=L("I like "),s=L(n)},l(e){t=M(e,"I like "),s=M(e,n)},m(e,n){k(e,t,n),k(e,s,n)},p(e,t){1&t&&n!==(n=e[0][0]+"")&&V(s,n)},d(e){e&&d(t),e&&d(s)}}}function W(e){let t,s,n,r,o,l,$,m,g;function v(e,t){return 1==e[0].length?R:e[0].length>1?Q:void 0}r=new F({props:{value:"mango",$$slots:{label:[J]},$$scope:{ctx:e}}}),l=new F({props:{value:"nothing else",$$slots:{label:[O]},$$scope:{ctx:e}}});let x=v(e),y=x&&x(e);return{c(){t=u("div"),s=L("I like:"),n=i(),P(r.$$.fragment),o=i(),P(l.$$.fragment),$=i(),m=u("div"),y&&y.c()},l(e){t=p(e,"DIV",{});var a=h(t);s=M(a,"I like:"),a.forEach(d),n=f(e),D(r.$$.fragment,e),o=f(e),D(l.$$.fragment,e),$=f(e),m=p(e,"DIV",{});var c=h(m);y&&y.l(c),c.forEach(d)},m(e,a){k(e,t,a),b(t,s),k(e,n,a),S(r,e,a),k(e,o,a),S(l,e,a),k(e,$,a),k(e,m,a),y&&y.m(m,null),g=!0},p(e,t){const s={};4&t&&(s.$$scope={dirty:t,ctx:e}),r.$set(s);const n={};4&t&&(n.$$scope={dirty:t,ctx:e}),l.$set(n),x===(x=v(e))&&y?y.p(e,t):(y&&y.d(1),y=x&&x(e),y&&(y.c(),y.m(m,null)))},i(e){g||(a(r.$$.fragment,e),a(l.$$.fragment,e),g=!0)},o(e){c(r.$$.fragment,e),c(l.$$.fragment,e),g=!1},d(e){e&&d(t),e&&d(n),z(r,e),e&&d(o),z(l,e),e&&d($),e&&d(m),y&&y.d()}}}function X(e){let t,s,n,r,o;function l(t){e[1](t)}t=new F({props:{value:"checkie",$$slots:{label:[H]},$$scope:{ctx:e}}});let $={$$slots:{default:[W]},$$scope:{ctx:e}};return void 0!==e[0]&&($.group=e[0]),n=new K({props:$}),w.push((()=>N(n,"group",l))),{c(){P(t.$$.fragment),s=i(),P(n.$$.fragment)},l(e){D(t.$$.fragment,e),s=f(e),D(n.$$.fragment,e)},m(e,r){S(t,e,r),k(e,s,r),S(n,e,r),o=!0},p(e,[s]){const o={};4&s&&(o.$$scope={dirty:s,ctx:e}),t.$set(o);const a={};5&s&&(a.$$scope={dirty:s,ctx:e}),!r&&1&s&&(r=!0,a.group=e[0],j((()=>r=!1))),n.$set(a)},i(e){o||(a(t.$$.fragment,e),a(n.$$.fragment,e),o=!0)},o(e){c(t.$$.fragment,e),c(n.$$.fragment,e),o=!1},d(e){z(t,e),e&&d(s),z(n,e)}}}function Y(e,t,s){let n=[];return[n,function(e){n=e,s(0,n)}]}export default class extends t{constructor(e){super(),s(this,e,Y,X,n,{})}}