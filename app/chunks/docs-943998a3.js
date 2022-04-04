import{S as H,i as K,s as Q,e as X,j as T,c as Y,a as Z,m as O,d as E,b as $,M as w,f as ee,o as D,x as f,u as _,v as S,O as V,a8 as te,T as U,y as j,B as k,P as ne,D as A,E as N,F as q,G as F,aa as ae,ab as oe,p as se,q as le,ac as re,C as L,ai as x,aj as ie,ak as ce,I as pe}from"./vendor-5dcc93bd.js";import{D as ue}from"./Link-cb9bf92c.js";import{I as de}from"./Path-bec9dc29.js";import{T as me}from"./Text-8021bcd1.js";const fe=o=>({}),B=o=>({slot:"label"});function _e(o){let e;const a=o[11].default,n=A(a,o,o[13],null);return{c(){n&&n.c()},l(t){n&&n.l(t)},m(t,s){n&&n.m(t,s),e=!0},p(t,s){n&&n.p&&(!e||s&8192)&&N(n,a,t,t[13],e?F(a,t[13],s,null):q(t[13]),null)},i(t){e||(f(n,t),e=!0)},o(t){_(n,t),e=!1},d(t){n&&n.d(t)}}}function he(o){let e;const a=o[11].label,n=A(a,o,o[13],B);return{c(){n&&n.c()},l(t){n&&n.l(t)},m(t,s){n&&n.m(t,s),e=!0},p(t,s){n&&n.p&&(!e||s&8192)&&N(n,a,t,t[13],e?F(a,t[13],s,fe):q(t[13]),B)},i(t){e||(f(n,t),e=!0)},o(t){_(n,t),e=!1},d(t){n&&n.d(t)}}}function ge(o){let e,a;return e=new de({props:{slot:"postfix",path:ce}}),{c(){T(e.$$.fragment)},l(n){O(e.$$.fragment,n)},m(n,t){D(e,n,t),a=!0},p:pe,i(n){a||(f(e.$$.fragment,n),a=!0)},o(n){_(e.$$.fragment,n),a=!1},d(n){S(e,n)}}}function be(o){let e,a,n;const t=[{slot:"button"},o[5],{readonly:!0}];function s(r){o[12](r)}let i={$$slots:{postfix:[ge],label:[he]},$$scope:{ctx:o}};for(let r=0;r<t.length;r+=1)i=k(i,t[r]);return o[1]!==void 0&&(i.value=o[1]),e=new me({props:i}),ae.push(()=>oe(e,"value",s)),{c(){T(e.$$.fragment)},l(r){O(e.$$.fragment,r)},m(r,c){D(e,r,c),n=!0},p(r,c){const u=c&32?se(t,[t[0],le(r[5]),t[2]]):{};c&8192&&(u.$$scope={dirty:c,ctx:r}),!a&&c&2&&(a=!0,u.value=r[1],re(()=>a=!1)),e.$set(u)},i(r){n||(f(e.$$.fragment,r),n=!0)},o(r){_(e.$$.fragment,r),n=!1},d(r){S(e,r)}}}function ve(o){let e,a,n;return a=new ue({props:{placement:o[0],$$slots:{button:[be],default:[_e]},$$scope:{ctx:o}}}),{c(){e=X("div"),T(a.$$.fragment),this.h()},l(t){e=Y(t,"DIV",{class:!0});var s=Z(e);O(a.$$.fragment,s),s.forEach(E),this.h()},h(){$(e,"class","berry-select svelte-f44ryo"),w(e,"placeholder",o[2])},m(t,s){ee(t,e,s),D(a,e,null),n=!0},p(t,[s]){const i={};s&1&&(i.placement=t[0]),s&8226&&(i.$$scope={dirty:s,ctx:t}),a.$set(i),s&4&&w(e,"placeholder",t[2])},i(t){n||(f(a.$$.fragment,t),n=!0)},o(t){_(a.$$.fragment,t),n=!1},d(t){t&&E(e),S(a)}}}const ye="select-active-option",Te="select-options-map",Oe="select-update-func",De=JSON.parse('{"name":"Select","slots":[{"name":"label","htmlDoc":null},{"name":"default","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"placeholder","optional":true,"value":"","jsDoc":{"description":"Text that appears in the form control when it has no value set","tags":[{"description":"","name":"","tag":"type","type":"string"}]}},{"kind":"let","name":"placement","optional":true,"value":"bottom-start","jsDoc":{"description":"Where to position the popup relative to the dropdown button.","tags":[{"description":"","name":"","tag":"type","type":"\\"top\\" | \\"top-start\\" | \\"top-end\\" | \\"right\\" | \\"right-start\\" | \\"right-end\\" | \\"bottom\\" | \\"bottom-start\\" | \\"bottom-end\\" | \\"left\\" | \\"left-start\\" | \\"left-end\\""}]}},{"kind":"let","name":"value","optional":true,"value":"","jsDoc":{"description":"The initial value of the component.","tags":[{"description":"","name":"","tag":"type","type":"any"}]}},{"kind":"function","name":"compare","jsDoc":{"description":"Compares whether the `Select.value` an `Option.value` are equal.","tags":[{"description":"","name":"","tag":"type","type":"(value, optionValue) => boolean"}]}},{"kind":"function","name":"format","jsDoc":{"description":"Choose the text displayed when an Option is selected.","tags":[{"description":"","name":"","tag":"type","type":"({ optionValue, optionDisplayText }) => string"}]}}],"exports":[{"kind":"const","name":"ACTIVE_OPTION","optional":true,"value":"select-active-option","jsDoc":{"description":"Internally used to identify the active option","tags":[{"description":"","name":"","tag":"private","type":""}]}},{"kind":"const","name":"OPTIONS_STORE","optional":true,"value":"select-options-map","jsDoc":{"description":"Used internally to communicate between `Select` an `Option`","tags":[{"description":"","name":"","tag":"private","type":""}]}},{"kind":"const","name":"UPDATE_VALUE_FUNC","optional":true,"value":"select-update-func","jsDoc":{"description":"Used internally to update `Select` when an `Option` is selected.","tags":[{"description":"","name":"","tag":"private","type":""}]}},{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[]}');function I(o,e){return o===e}function b({optionDisplayText:o}){return o}function Se(o,e,a){const n=["placeholder","placement","value","compare","format"];let t=V(e,n),s,i,{$$slots:r={},$$scope:c}=e;console.error(`
This component is deprecated and no longer maintained. Please use the Select component at "@kwangure/strawberry/components/Input/Select".
`.trim());let{placeholder:u=""}=e,{placement:P="bottom-start"}=e,{value:p=""}=e;const M=te(),m=L("");U(o,m,l=>a(15,s=l));const v=L(new Map);U(o,v,l=>a(10,i=l));let y=!1,d="",h=!1;function R(l){C(l,p)}function C(l,z){a(2,h=!1);for(const[,g]of l)if(I(g.value,z)){a(1,d=b({optionDisplayText:g.displayText,value:g.value})),x(m,s=g.id,s);return}a(2,h=!0),a(1,d=u)}function W(l){y||C(i,l)}async function G(l){a(6,{value:p}=l,p),a(1,d=b({optionDisplayText:l.displayText,value:p})),x(m,s=l.id,s),y=!0,await ie(),y=!1,M("change",p),a(2,h=!1)}j(ye,m),j(Te,v),j(Oe,G);function J(l){d=l,a(1,d)}return o.$$set=l=>{e=k(k({},e),ne(l)),a(5,t=V(e,n)),"placeholder"in l&&a(7,u=l.placeholder),"placement"in l&&a(0,P=l.placement),"value"in l&&a(6,p=l.value),"$$scope"in l&&a(13,c=l.$$scope)},o.$$.update=()=>{o.$$.dirty&64&&W(p),o.$$.dirty&1024&&R(i)},[P,d,h,m,v,t,p,u,I,b,i,r,J,c]}class Ce extends H{constructor(e){super();K(this,e,Se,ve,Q,{placeholder:7,placement:0,value:6,compare:8,format:9})}get compare(){return I}get format(){return b}}const Ee={main:De};export{ye as A,Te as O,Ce as S,Oe as U,Ee as d};
