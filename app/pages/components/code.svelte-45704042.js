import{S as n,i as t,s as o,j as s,m as c,o as e,v as r,r as u,w as a,t as l,g as i,f as p,d}from"../../chunks/vendor-8a131ea4.js";import{C as f}from"../../chunks/Code-42f51d82.js";import"../../chunks/preload-helper-9f12a5fd.js";function $(n){let t;return{c(){t=l('<script>\nconst five = 5;\nconst six = 6;\nconst product = five * six;\n\nconsole.log({ product });\n\nfunction shout() {\n    console.log("The product of 5 and 6 is ", product);\n}\n<script/>\n\n<button on:click={shout}>\n    Tell me the product.\n</button>')},l(n){t=i(n,'<script>\nconst five = 5;\nconst six = 6;\nconst product = five * six;\n\nconsole.log({ product });\n\nfunction shout() {\n    console.log("The product of 5 and 6 is ", product);\n}\n<script/>\n\n<button on:click={shout}>\n    Tell me the product.\n</button>')},m(n,o){p(n,t,o)},d(n){n&&d(t)}}}function m(n){let t,o;return t=new f({props:{language:"svelte",$$slots:{default:[$]},$$scope:{ctx:n}}}),{c(){s(t.$$.fragment)},l(n){c(t.$$.fragment,n)},m(n,s){e(t,n,s),o=!0},p(n,[o]){const s={};1&o&&(s.$$scope={dirty:o,ctx:n}),t.$set(s)},i(n){o||(r(t.$$.fragment,n),o=!0)},o(n){u(t.$$.fragment,n),o=!1},d(n){a(t,n)}}}export default class extends n{constructor(n){super(),t(this,n,null,m,o,{})}}
