import{S as C,i as I,s as T,v as h,w as $,x as b,f as g,t as v,y as k,k as p,l as f,n as o,b as u,D as P,h as c,q as _,m as y,r as d,H as q,C as m,A as w,u as A}from"../../../chunks/index-27172a48.js";import{C as E}from"../../../chunks/component-213c5865.js";import{C as S}from"../../../chunks/container-f84d14d2.js";/* empty css                              */import{v as j}from"../../../chunks/validate-ae299269.js";function L(i){let e,l,t,s;return{c(){e=p("input"),this.h()},l(n){e=f(n,"INPUT",{id:!0,placeholder:!0}),this.h()},h(){o(e,"id",l=i[1]),o(e,"placeholder","I can say anything!"),e.required=!0},m(n,a){u(n,e,a),t||(s=P(j.call(null,e,{})),t=!0)},p(n,a){a&2&&l!==(l=n[1])&&o(e,"id",l)},d(n){n&&c(e),t=!1,s()}}}function N(i){let e,l,t;return{c(){e=p("label"),l=_("I label inputs like no one else!"),this.h()},l(s){e=f(s,"LABEL",{slot:!0,for:!0});var n=y(e);l=d(n,"I label inputs like no one else!"),n.forEach(c),this.h()},h(){o(e,"slot","label"),o(e,"for",t=i[1])},m(s,n){u(s,e,n),q(e,l)},p(s,n){n&2&&t!==(t=s[1])&&o(e,"for",t)},d(s){s&&c(e)}}}function x(i){let e;return{c(){e=_("This is a description or input hint")},l(l){e=d(l,"This is a description or input hint")},m(l,t){u(l,e,t)},p:w,d(l){l&&c(e)}}}function B(i){let e=i[3]+"",l;return{c(){l=_(e)},l(t){l=d(t,e)},m(t,s){u(t,l,s)},p(t,s){s&8&&e!==(e=t[3]+"")&&A(l,e)},d(t){t&&c(l)}}}function D(i){let e,l;function t(a,r){return a[3]?B:x}let s=t(i),n=s(i);return{c(){e=p("span"),n.c(),this.h()},l(a){e=f(a,"SPAN",{slot:!0,id:!0,class:!0});var r=y(e);n.l(r),r.forEach(c),this.h()},h(){o(e,"slot","hint"),o(e,"id",l=i[2]),o(e,"class","svelte-1iljdeb"),m(e,"invalid",i[3])},m(a,r){u(a,e,r),n.m(e,null)},p(a,r){s===(s=t(a))&&n?n.p(a,r):(n.d(1),n=s(a),n&&(n.c(),n.m(e,null))),r&4&&l!==(l=a[2])&&o(e,"id",l),r&8&&m(e,"invalid",a[3])},d(a){a&&c(e),n.d()}}}function H(i){let e,l;return e=new S({props:{$$slots:{hint:[D,({inputId:t,hintId:s,validationMessage:n})=>({1:t,2:s,3:n}),({inputId:t,hintId:s,validationMessage:n})=>(t?2:0)|(s?4:0)|(n?8:0)],label:[N,({inputId:t,hintId:s,validationMessage:n})=>({1:t,2:s,3:n}),({inputId:t,hintId:s,validationMessage:n})=>(t?2:0)|(s?4:0)|(n?8:0)],default:[L,({inputId:t,hintId:s,validationMessage:n})=>({1:t,2:s,3:n}),({inputId:t,hintId:s,validationMessage:n})=>(t?2:0)|(s?4:0)|(n?8:0)]},$$scope:{ctx:i}}}),{c(){h(e.$$.fragment)},l(t){$(e.$$.fragment,t)},m(t,s){b(e,t,s),l=!0},p(t,s){const n={};s&30&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){l||(g(e.$$.fragment,t),l=!0)},o(t){v(e.$$.fragment,t),l=!1},d(t){k(e,t)}}}function U(i){let e,l;return e=new E({props:{docs:i[0],$$slots:{inline:[H]},$$scope:{ctx:i}}}),{c(){h(e.$$.fragment)},l(t){$(e.$$.fragment,t)},m(t,s){b(e,t,s),l=!0},p(t,[s]){const n={};s&16&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){l||(g(e.$$.fragment,t),l=!0)},o(t){v(e.$$.fragment,t),l=!1},d(t){k(e,t)}}}function z(i){return[{main:{name:"Text",description:"Text lets the user enter inline text. It includes built-in validation to reject invalid entries.",customProperties:[],props:[],slots:[]}}]}class O extends C{constructor(e){super(),I(this,e,z,U,T,{})}}export{O as default};
