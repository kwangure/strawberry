import{S as t,i as e,s,D as n,k as o,e as a,n as l,c as i,a as r,d as c,b as p,L as u,f as d,M as m,E as h,a6 as f,x as v,u as $,ab as b,ac as g}from"./vendor-60cb395e.js";import{c as k}from"./forward-events-13fb088f.js";const y=t=>({}),x=t=>({});function E(t){let e,s,g,k,E,D;const S=t[5].button,j=n(S,t,t[4],x),L=t[5].default,P=n(L,t,t[4],null);return{c(){j&&j.c(),e=o(),s=a("div"),P&&P.c(),this.h()},l(t){j&&j.l(t),e=l(t),s=i(t,"DIV",{class:!0});var n=r(s);P&&P.l(n),n.forEach(c),this.h()},h(){p(s,"class","berry-dropdown-menu svelte-1m71jv8"),u(s,"visible",t[0])},m(n,o){j&&j.m(n,o),d(n,e,o),d(n,s,o),P&&P.m(s,null),k=!0,E||(D=[m(g=t[1].call(null,s,t[0])),m(t[2].call(null,s))],E=!0)},p(t,[e]){j&&j.p&&(!k||16&e)&&h(j,S,t,t[4],k?e:-1,y,x),P&&P.p&&(!k||16&e)&&h(P,L,t,t[4],k?e:-1,null,null),g&&f(g.update)&&1&e&&g.update.call(null,t[0]),1&e&&u(s,"visible",t[0])},i(t){k||(v(j,t),v(P,t),k=!0)},o(t){$(j,t),$(P,t),k=!1},d(t){j&&j.d(t),t&&c(e),t&&c(s),P&&P.d(t),E=!1,b(D)}}}function D(t,e,s){let{$$slots:n={},$$scope:o}=e,{placement:a="bottom-start"}=e,{visible:l=!1}=e;return t.$$set=t=>{"placement"in t&&s(3,a=t.placement),"visible"in t&&s(0,l=t.visible),"$$scope"in t&&s(4,o=t.$$scope)},[l,function(t,e){const s=t.previousElementSibling,n=g(s,t,{placement:a,modifiers:[{name:"offset",options:{offset:[0,5]}}]});return{update(t){t&&n.update()},destroy(){n.destroy()}}},function(t){const e=t.previousElementSibling;function n(t){const[n]=t.path||t.composedPath&&t.composedPath();e.contains(n)?s(0,l=!l):l&&s(0,l=!1)}return document.addEventListener("click",n,!0),{destroy:()=>{document.removeEventListener("click",n)}}},a,o,n]}class S extends t{constructor(t){super(),e(this,t,D,E,s,{placement:3,visible:0})}}const j=JSON.parse('{"name":"Dropdown","props":[{"kind":"let","name":"placement","optional":true,"value":"bottom-start","jsDoc":{"description":"Where to position the popup relative to the dropdown button.","tags":[{"tag":"type","name":"","type":"\\"top\\" | \\"top-start\\" | \\"top-end\\" | \\"right\\" | \\"right-start\\" | \\"right-end\\" | \\"bottom\\" | \\"bottom-start\\" | \\"bottom-end\\" | \\"left\\" | \\"left-start\\" | \\"left-end\\"","optional":false,"description":""}]}},{"kind":"let","name":"visible","optional":true,"value":false,"jsDoc":{"description":"Whether the popup is visible","tags":[{"tag":"type","name":"","type":"boolean","optional":false,"description":""}]}}],"exports":[],"customProperties":[]}');function L(t){let e,s,o,l;const f=t[3].default,b=n(f,t,t[2],null);return{c(){e=a("div"),b&&b.c(),this.h()},l(t){e=i(t,"DIV",{class:!0});var s=r(e);b&&b.l(s),s.forEach(c),this.h()},h(){p(e,"class","menu-item svelte-5mpppd"),u(e,"active",t[0])},m(n,a){d(n,e,a),b&&b.m(e,null),s=!0,o||(l=m(t[1].call(null,e)),o=!0)},p(t,[n]){b&&b.p&&(!s||4&n)&&h(b,f,t,t[2],s?n:-1,null,null),1&n&&u(e,"active",t[0])},i(t){s||(v(b,t),s=!0)},o(t){$(b,t),s=!1},d(t){t&&c(e),b&&b.d(t),o=!1,l()}}}function P(t,e,s){let{$$slots:n={},$$scope:o}=e,{active:a=!1}=e;const l=k();return t.$$set=t=>{"active"in t&&s(0,a=t.active),"$$scope"in t&&s(2,o=t.$$scope)},[a,l,o,n]}class w extends t{constructor(t){super(),e(this,t,P,L,s,{active:0})}}JSON.parse('{"name":"Item","props":[{"kind":"let","name":"active","optional":true,"value":false}],"exports":[],"customProperties":[]}');function I(t){let e,s,o,l;const f=t[5].default,b=n(f,t,t[4],null);return{c(){e=a("a"),b&&b.c(),this.h()},l(t){e=i(t,"A",{href:!0,class:!0});var s=r(e);b&&b.l(s),s.forEach(c),this.h()},h(){p(e,"href",t[0]),p(e,"class","menu-item svelte-zcd3ru"),u(e,"active",t[1])},m(n,a){d(n,e,a),b&&b.m(e,null),s=!0,o||(l=m(t[2].call(null,e)),o=!0)},p(t,[n]){b&&b.p&&(!s||16&n)&&h(b,f,t,t[4],s?n:-1,null,null),(!s||1&n)&&p(e,"href",t[0]),2&n&&u(e,"active",t[1])},i(t){s||(v(b,t),s=!0)},o(t){$(b,t),s=!1},d(t){t&&c(e),b&&b.d(t),o=!1,l()}}}function J(t,e,s){let n,{$$slots:o={},$$scope:a}=e,{path:l=""}=e,{href:i=""}=e;const r=k();return t.$$set=t=>{"path"in t&&s(3,l=t.path),"href"in t&&s(0,i=t.href),"$$scope"in t&&s(4,a=t.$$scope)},t.$$.update=()=>{9&t.$$.dirty&&s(1,n=i===l)},[i,n,r,l,a,o]}class N extends t{constructor(t){super(),e(this,t,J,I,s,{path:3,href:0})}}JSON.parse('{"name":"Link","props":[{"kind":"let","name":"path","optional":true,"value":""},{"kind":"let","name":"href","optional":true,"value":""}],"exports":[],"customProperties":[]}');export{S as D,w as I,N as L,j as d};
