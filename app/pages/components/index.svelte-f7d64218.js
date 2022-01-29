import{a0 as p,a1 as d,a2 as b,S as i,i as u,s as g,e as f,t as _,k as v,j as y,c as x,a as h,g as $,d as l,n as k,m as w,f as m,H as L,o as B,I as C,x as S,u as j,v as E}from"../../chunks/vendor-3934c3b2.js";import{C as M}from"../../chunks/JavaScript.svelte_svelte_type_style_lang-d3c4b5a4.js";function N(s){return s.registerLanguage("css",p),s.registerLanguage("javascript",d),s.registerLanguage("xml",b),{name:"svelte",subLanguage:"xml",contains:[s.COMMENT("<!--","-->",{relevance:10}),{begin:/^(\s*)(<script(\s*context="module")?>)/gm,end:/^(\s*)(<\/script>)/gm,subLanguage:"javascript",excludeBegin:!0,excludeEnd:!0,contains:[{begin:/^(\s*)(\$:)/gm,end:/(\s*)/gm,className:"keyword"}]},{begin:/^(\s*)(<st{1}yle.*>)/gm,end:/^(\s*)(<\/style>)/gm,subLanguage:"css",excludeBegin:!0,excludeEnd:!0},{begin:/\{/gm,end:/\}/gm,subLanguage:"javascript",contains:[{begin:/[{]/,end:/[}]/,skip:!0},{begin:/([#:/@])(if|else|each|await|then|catch|debug|html)/gm,className:"keyword",relevance:10}]}]}}class G extends i{constructor(t){super();u(this,t,null,null,g,{})}}var O=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:G,highlighter:N});function T(s){let t,c,r,a,o;return a=new M({props:{language:O,code:s[0]}}),{c(){t=f("p"),c=_("General Usage:"),r=v(),y(a.$$.fragment)},l(e){t=x(e,"P",{});var n=h(t);c=$(n,"General Usage:"),n.forEach(l),r=k(e),w(a.$$.fragment,e)},m(e,n){m(e,t,n),L(t,c),m(e,r,n),B(a,e,n),o=!0},p:C,i(e){o||(S(a.$$.fragment,e),o=!0)},o(e){j(a.$$.fragment,e),o=!1},d(e){e&&l(t),e&&l(r),E(a,e)}}}function U(s){return[`
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
    `.trim()]}class H extends i{constructor(t){super();u(this,t,U,T,g,{})}}export{H as default};
