import{a2 as v,a3 as h,a4 as $,S as u,i as g,s as m,D as y,e as d,c as p,a as f,d as i,b as x,f as c,E as k,F as w,G as L,x as _,u as b,t as B,k as C,j as E,g as S,n as j,m as G,H as M,o as N,I as D,v as I}from"../../chunks/vendor-fab38dda.js";import{C as O}from"../../chunks/JavaScript.svelte_svelte_type_style_lang-99e8b40e.js";function T(n){let a,r;const l=n[1].default,e=y(l,n,n[0],null);return{c(){a=d("div"),e&&e.c(),this.h()},l(t){a=p(t,"DIV",{class:!0});var s=f(a);e&&e.l(s),s.forEach(i),this.h()},h(){x(a,"class","language-svelte")},m(t,s){c(t,a,s),e&&e.m(a,null),r=!0},p(t,[s]){e&&e.p&&(!r||s&1)&&k(e,l,t,t[0],r?L(l,t[0],s,null):w(t[0]),null)},i(t){r||(_(e,t),r=!0)},o(t){b(e,t),r=!1},d(t){t&&i(a),e&&e.d(t)}}}function U(n){return n.registerLanguage("css",v),n.registerLanguage("javascript",h),n.registerLanguage("xml",$),{name:"svelte",subLanguage:"xml",contains:[n.COMMENT("<!--","-->",{relevance:10}),{begin:/^(\s*)(<script(\s*context="module")?>)/gm,end:/^(\s*)(<\/script>)/gm,subLanguage:"javascript",excludeBegin:!0,excludeEnd:!0,contains:[{begin:/^(\s*)(\$:)/gm,end:/(\s*)/gm,className:"keyword"}]},{begin:/^(\s*)(<st{1}yle.*>)/gm,end:/^(\s*)(<\/style>)/gm,subLanguage:"css",excludeBegin:!0,excludeEnd:!0},{begin:/\{/gm,end:/\}/gm,subLanguage:"javascript",contains:[{begin:/[{]/,end:/[}]/,skip:!0},{begin:/([#:/@])(if|else|each|await|then|catch|debug|html)/gm,className:"keyword",relevance:10}]}]}}function q(n,a,r){let{$$slots:l={},$$scope:e}=a;return n.$$set=t=>{"$$scope"in t&&r(0,e=t.$$scope)},[e,l]}class z extends u{constructor(a){super();g(this,a,q,T,m,{})}}var F=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:z,highlighter:U});function H(n){let a,r,l,e,t;return e=new O({props:{language:F,code:n[0]}}),{c(){a=d("p"),r=B("General Usage:"),l=C(),E(e.$$.fragment)},l(s){a=p(s,"P",{});var o=f(a);r=S(o,"General Usage:"),o.forEach(i),l=j(s),G(e.$$.fragment,s)},m(s,o){c(s,a,o),M(a,r),c(s,l,o),N(e,s,o),t=!0},p:D,i(s){t||(_(e.$$.fragment,s),t=!0)},o(s){b(e.$$.fragment,s),t=!1},d(s){s&&i(a),s&&i(l),I(e,s)}}}function J(n){return[`
<script>
    import "@kwangure/strawberry/css/styles";

    import Button from "@kwangure/strawberry/components/Button";

    const hello = () => console.log('strawberry');
<\/script>

<div class="document">
    <Button on:click={hello}>Click me!</Button>
</div>

<style>
    .document {
        --br-button-width: 50px;
        --br-button-border: 3px solid var(--my-primary-color);
    }
</style>
    `.trim()]}class A extends u{constructor(a){super();g(this,a,J,H,m,{})}}export{A as default};
