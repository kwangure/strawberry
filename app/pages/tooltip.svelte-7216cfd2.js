import{S as t,i as e,s,D as o,k as n,e as l,n as a,c,a as r,d as i,b as p,E as u,f,F as $,G as m,v as d,r as h,a2 as v,j as g,m as y,o as w,w as E,t as b,g as x,H as j}from"../chunks/vendor-f19757b3.js";import{B as k}from"../chunks/Tabs.svelte_svelte&type=style&lang-e5631783.js";import"../chunks/forward-events-aecd99fd.js";import"../chunks/Icon-bf885f20.js";/* empty css                                                   */function M(t,e,s,o){t[o?"addEventListener":"removeEventListener"](e,s)}const Y=t=>({}),H=t=>({});function I(t){let e,s,v,g,y;const w=t[5].default,E=o(w,t,t[4],null),b=t[5].popup,x=o(b,t,t[4],H);return{c(){E&&E.c(),e=n(),s=l("div"),x&&x.c(),this.h()},l(t){E&&E.l(t),e=a(t),s=c(t,"DIV",{class:!0});var o=r(s);x&&x.l(o),o.forEach(i),this.h()},h(){p(s,"class","berry-tooltip svelte-92otam"),u(s,"showTooltip",t[0])},m(o,n){E&&E.m(o,n),f(o,e,n),f(o,s,n),x&&x.m(s,null),v=!0,g||(y=$(t[1].call(null,s)),g=!0)},p(t,[e]){E&&E.p&&(!v||16&e)&&m(E,w,t,t[4],e,null,null),x&&x.p&&(!v||16&e)&&m(x,b,t,t[4],e,Y,H),1&e&&u(s,"showTooltip",t[0])},i(t){v||(d(E,t),d(x,t),v=!0)},o(t){h(E,t),h(x,t),v=!1},d(t){E&&E.d(t),t&&i(e),t&&i(s),x&&x.d(t),g=!1,y()}}}function L(t,e,s){let{$$slots:o={},$$scope:n}=e,{placement:l="bottom"}=e,{followMouse:a=!1}=e,c=!1;function r(){s(0,c=!0)}function i(){s(0,c=!1)}return t.$$set=t=>{"placement"in t&&s(2,l=t.placement),"followMouse"in t&&s(3,a=t.followMouse),"$$scope"in t&&s(4,n=t.$$scope)},[c,function t(e){const s=e.previousElementSibling,o=a?function(t){let e=()=>{};const s={x:0,y:0,top:0,left:0,width:0,height:0};return t.addEventListener("mousemove",(t=>{s.x=t.clientX,s.left=t.clientX,s.y=t.clientY,s.top=t.clientY,e()})),{getBoundingClientRect:()=>s,onchange:t=>{e=t}}}(s):s,n=v(o,e,{placement:l,modifiers:[{name:"offset",options:{offset:[0,5]}}]}),c=["focus","mouseenter"],p=["blur","mouseleave"];return c.forEach((t=>{M(s,t,r,!0)})),p.forEach((t=>{M(s,t,i,!0)})),a&&o.onchange(n.update),{update:()=>{n.destroy(),t(e)},destroy:()=>{c.forEach((t=>{M(s,t,r,!1)})),p.forEach((t=>{M(s,t,i,!1)})),n.destroy()}}},l,a,n,o]}class S extends t{constructor(t){super(),e(this,t,L,I,s,{placement:2,followMouse:3})}}function T(t){let e;return{c(){e=b("Hover for tooltip.")},l(t){e=x(t,"Hover for tooltip.")},m(t,s){f(t,e,s)},d(t){t&&i(e)}}}function B(t){let e,s;return e=new k({props:{$$slots:{default:[T]},$$scope:{ctx:t}}}),{c(){g(e.$$.fragment)},l(t){y(e.$$.fragment,t)},m(t,o){w(e,t,o),s=!0},p(t,s){const o={};1&s&&(o.$$scope={dirty:s,ctx:t}),e.$set(o)},i(t){s||(d(e.$$.fragment,t),s=!0)},o(t){h(e.$$.fragment,t),s=!1},d(t){E(e,t)}}}function D(t){let e,s;return{c(){e=l("span"),s=b("Yes, Mi tooltip."),this.h()},l(t){e=c(t,"SPAN",{slot:!0});var o=r(e);s=x(o,"Yes, Mi tooltip."),o.forEach(i),this.h()},h(){p(e,"slot","popup")},m(t,o){f(t,e,o),j(e,s)},d(t){t&&i(e)}}}function X(t){let e,s;return e=new S({props:{$$slots:{popup:[D],default:[B]},$$scope:{ctx:t}}}),{c(){g(e.$$.fragment)},l(t){y(e.$$.fragment,t)},m(t,o){w(e,t,o),s=!0},p(t,[s]){const o={};1&s&&(o.$$scope={dirty:s,ctx:t}),e.$set(o)},i(t){s||(d(e.$$.fragment,t),s=!0)},o(t){h(e.$$.fragment,t),s=!1},d(t){E(e,t)}}}export default class extends t{constructor(t){super(),e(this,t,null,X,s,{})}}
