import{S as e,i as a,s,D as n,e as t,k as l,c as i,a as r,d as o,n as c,b as u,L as p,f as g,M as d,E as h,x as m,u as j,$ as f,a0 as v,a1 as _}from"./vendor-017d3a3b.js";import{_ as E}from"./preload-helper-13c00eaa.js";async function $(e){return(await function(e){switch(e){case"./languages/css.js":return E((()=>import("./css-19850087.js")),["/strawberry/app/chunks/css-19850087.js","/strawberry/app/chunks/css-079943c4.js"]);case"./languages/javascript.js":return E((()=>import("./javascript-de537279.js")),["/strawberry/app/chunks/javascript-de537279.js","/strawberry/app/chunks/javascript-22e65c84.js"]);case"./languages/svelte.js":return E((()=>import("./svelte-db53c107.js")),["/strawberry/app/chunks/svelte-db53c107.js","/strawberry/app/chunks/css-079943c4.js","/strawberry/app/chunks/javascript-22e65c84.js"]);default:return Promise.reject(new Error("Unknown variable dynamic import: "+e))}}(`./languages/${e}.js`)).default}function b(e){let a,s,f,v,_,E;const $=e[5].default,b=n($,e,e[4],null);return{c(){a=t("pre"),b&&b.c(),s=l(),f=t("pre"),this.h()},l(e){a=i(e,"PRE",{class:!0});var n=r(a);b&&b.l(n),n.forEach(o),s=c(e),f=i(e,"PRE",{class:!0}),r(f).forEach(o),this.h()},h(){u(a,"class","input svelte-a9jkpn"),u(f,"class","berry-code svelte-a9jkpn"),p(f,"inline",e[0])},m(n,t){g(n,a,t),b&&b.m(a,null),g(n,s,t),g(n,f,t),f.innerHTML=e[1],v=!0,_||(E=d(e[2].call(null,a)),_=!0)},p(e,[a]){b&&b.p&&(!v||16&a)&&h(b,$,e,e[4],v?a:-1,null,null),(!v||2&a)&&(f.innerHTML=e[1]),1&a&&p(f,"inline",e[0])},i(e){v||(m(b,e),v=!0)},o(e){j(b,e),v=!1},d(e){e&&o(a),b&&b.d(e),e&&o(s),e&&o(f),_=!1,E()}}}function y(e,a,s){let{$$slots:n={},$$scope:t}=a,{language:l=""}=a,{inline:i=!1}=a,r="";return e.$$set=e=>{"language"in e&&s(3,l=e.language),"inline"in e&&s(0,i=e.inline),"$$scope"in e&&s(4,t=e.$$scope)},[i,r,function({textContent:e}){s(1,r=f(e)),v(),l&&$(l).then((a=>{_.registerLanguage(l,a),s(1,r=_.highlight(e,{language:l}).value)}))},l,t,n]}class k extends e{constructor(e){super(),a(this,e,y,b,s,{language:3,inline:0})}}const L=JSON.parse('{"name":"Code","props":[{"kind":"let","name":"language","optional":true,"value":"","jsDoc":{"description":"Which syntax highlighter to use.","tags":[{"tag":"type","name":"","type":"\\"\\" | \\"css\\"| \\"javascript\\" | \\"svelte\\"","optional":false,"description":""}]}},{"kind":"let","name":"inline","optional":true,"value":false,"jsDoc":{"description":"Whether to treat a codeblock as an inline element.","tags":[{"tag":"type","name":"","type":"boolean","optional":false,"description":""}]}}],"exports":[],"customProperties":[{"name":"--br-code-background","value":"var(--br-grey-lightest)"}]}');export{k as C,L as d};
