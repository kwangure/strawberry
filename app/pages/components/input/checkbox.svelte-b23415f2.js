import{S as j,i as E,s as D,B as v,D as O,e as d,k as P,c as b,a as W,n as S,d as m,L as B,M as G,b as F,f,H as N,N as R,p as T,E as q,F as H,G as I,x as h,u as k,O as A,a1 as M,P as U,j as x,m as y,o as w,v as C,t as $,g}from"../../../chunks/vendor-d49c0083.js";import{c as z}from"../../../chunks/forward-events-e4dd3255.js";import{C as K}from"../../../chunks/component-649a662c.js";import"../../../chunks/JavaScript.svelte_svelte_type_style_lang-7c4d7229.js";const Q="berry-checkbox-group";JSON.parse('{"name":"Group","slots":[{"name":"default","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"group","optional":true}],"exports":[{"kind":"const","name":"checkboxGroup","optional":true,"value":"berry-checkbox-group"},{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[]}');const V=n=>({}),J=n=>({});function X(n){let e,l,s,t,o,i,u=[{type:"checkbox"},n[1]],p={};for(let a=0;a<u.length;a+=1)p=v(p,u[a]);const _=n[5].label,r=O(_,n,n[4],J);return{c(){e=d("label"),l=d("input"),s=P(),r&&r.c(),this.h()},l(a){e=b(a,"LABEL",{class:!0});var c=W(e);l=b(c,"INPUT",{type:!0}),s=S(c),r&&r.l(c),c.forEach(m),this.h()},h(){B(l,p),G(l,"svelte-9dokb8",!0),F(e,"class","input-wrapper svelte-9dokb8")},m(a,c){f(a,e,c),N(e,l),l.autofocus&&l.focus(),N(e,s),r&&r.m(e,null),t=!0,o||(i=R(n[0].call(null,l)),o=!0)},p(a,[c]){B(l,p=T(u,[{type:"checkbox"},c&2&&a[1]])),G(l,"svelte-9dokb8",!0),r&&r.p&&(!t||c&16)&&q(r,_,a,a[4],t?I(_,a[4],c,V):H(a[4]),J)},i(a){t||(h(r,a),t=!0)},o(a){k(r,a),t=!1},d(a){a&&m(e),r&&r.d(a),o=!1,i()}}}const Y=JSON.parse('{"name":"Checkbox","slots":[{"name":"label","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"value","optional":false,"jsDoc":{"description":"The value of the component if checked.","tags":[{"description":"","name":"","tag":"type","type":"string"}]}},{"kind":"let","name":"checked","optional":true,"value":false,"jsDoc":{"description":"Whether the command or control is checked","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[]}');function Z(n,e,l){const s=["value","checked"];let t=A(e,s),{$$slots:o={},$$scope:i}=e,{value:u}=e,{checked:p=!1}=e;const _=z(),r=M(Q);function a(c){!r||(c?r.add(u):r.remove(u))}return n.$$set=c=>{e=v(v({},e),U(c)),l(1,t=A(e,s)),"value"in c&&l(2,u=c.value),"checked"in c&&l(3,p=c.checked),"$$scope"in c&&l(4,i=c.$$scope)},n.$$.update=()=>{n.$$.dirty&8&&a(p)},[_,t,u,p,i,o]}class L extends j{constructor(e){super();E(this,e,Z,X,D,{value:2,checked:3})}}const ee={main:Y};function te(n){let e,l,s;return{c(){e=$("Awesome label..."),l=d("wbr"),s=$("check!")},l(t){e=g(t,"Awesome label..."),l=b(t,"WBR",{}),s=g(t,"check!")},m(t,o){f(t,e,o),f(t,l,o),f(t,s,o)},d(t){t&&m(e),t&&m(l),t&&m(s)}}}function se(n){let e,l,s;return{c(){e=$("Even awesomer label..."),l=d("wbr"),s=$("check!")},l(t){e=g(t,"Even awesomer label..."),l=b(t,"WBR",{}),s=g(t,"check!")},m(t,o){f(t,e,o),f(t,l,o),f(t,s,o)},d(t){t&&m(e),t&&m(l),t&&m(s)}}}function oe(n){let e,l,s,t;return e=new L({props:{$$slots:{label:[te]},$$scope:{ctx:n}}}),s=new L({props:{$$slots:{label:[se]},$$scope:{ctx:n}}}),{c(){x(e.$$.fragment),l=P(),x(s.$$.fragment)},l(o){y(e.$$.fragment,o),l=S(o),y(s.$$.fragment,o)},m(o,i){w(e,o,i),f(o,l,i),w(s,o,i),t=!0},p(o,i){const u={};i&1&&(u.$$scope={dirty:i,ctx:o}),e.$set(u);const p={};i&1&&(p.$$scope={dirty:i,ctx:o}),s.$set(p)},i(o){t||(h(e.$$.fragment,o),h(s.$$.fragment,o),t=!0)},o(o){k(e.$$.fragment,o),k(s.$$.fragment,o),t=!1},d(o){C(e,o),o&&m(l),C(s,o)}}}function le(n){let e,l;return e=new K({props:{docs:ee,$$slots:{block:[oe]},$$scope:{ctx:n}}}),{c(){x(e.$$.fragment)},l(s){y(e.$$.fragment,s)},m(s,t){w(e,s,t),l=!0},p(s,[t]){const o={};t&1&&(o.$$scope={dirty:t,ctx:s}),e.$set(o)},i(s){l||(h(e.$$.fragment,s),l=!0)},o(s){k(e.$$.fragment,s),l=!1},d(s){C(e,s)}}}class ie extends j{constructor(e){super();E(this,e,null,le,D,{})}}export{ie as default};
