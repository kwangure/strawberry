import{S as s,i as t,s as e,j as n,m as a,o,x as r,u as $,v as c,k as f,e as l,t as i,n as m,c as u,a as p,g as d,d as g,f as x,G as j,H as v}from"../../chunks/vendor-60cb395e.js";import{d as h,C as k}from"../../chunks/Code-662f6bfa.js";import{C as y}from"../../chunks/component-86562754.js";import"../../chunks/preload-helper-13c00eaa.js";const b={main:h};function w(s){let t;return{c(){t=i("const five = 5;")},l(s){t=d(s,"const five = 5;")},m(s,e){x(s,t,e)},d(s){s&&g(t)}}}function C(s){let t,e="\x3c!-- codeblock --\x3e";return{c(){t=i(e)},l(s){t=d(s,e)},m(s,e){x(s,t,e)},p:v,d(s){s&&g(t)}}}function A(s){let t,e,v,h,y,b,A;return t=new k({props:{language:"javascript",$$slots:{default:[w]},$$scope:{ctx:s}}}),y=new k({props:{language:"svelte",inline:!0,$$slots:{default:[C]},$$scope:{ctx:s}}}),{c(){n(t.$$.fragment),e=f(),v=l("div"),h=i("An inline "),n(y.$$.fragment),b=i(" just for you!")},l(s){a(t.$$.fragment,s),e=m(s),v=u(s,"DIV",{});var n=p(v);h=d(n,"An inline "),a(y.$$.fragment,n),b=d(n," just for you!"),n.forEach(g)},m(s,n){o(t,s,n),x(s,e,n),x(s,v,n),j(v,h),o(y,v,null),j(v,b),A=!0},p(s,e){const n={};1&e&&(n.$$scope={dirty:e,ctx:s}),t.$set(n);const a={};1&e&&(a.$$scope={dirty:e,ctx:s}),y.$set(a)},i(s){A||(r(t.$$.fragment,s),r(y.$$.fragment,s),A=!0)},o(s){$(t.$$.fragment,s),$(y.$$.fragment,s),A=!1},d(s){c(t,s),s&&g(e),s&&g(v),c(y)}}}function D(s){let t,e;return t=new y({props:{docs:b,$$slots:{block:[A]},$$scope:{ctx:s}}}),{c(){n(t.$$.fragment)},l(s){a(t.$$.fragment,s)},m(s,n){o(t,s,n),e=!0},p(s,[e]){const n={};1&e&&(n.$$scope={dirty:e,ctx:s}),t.$set(n)},i(s){e||(r(t.$$.fragment,s),e=!0)},o(s){$(t.$$.fragment,s),e=!1},d(s){c(t,s)}}}export default class extends s{constructor(s){super(),t(this,s,null,D,e,{})}}
