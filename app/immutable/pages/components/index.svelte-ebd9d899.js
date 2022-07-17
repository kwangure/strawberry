import{S as c,i as p,s as u,e as f,t as d,k as g,w as y,c as _,a as b,h,d as l,m as w,x as $,g as m,J as k,y as v,E as x,q as C,o as B,B as q}from"../../chunks/index-2f8740a7.js";import{C as E,c as G}from"../../chunks/svelte-66471546.js";/* empty css                              */function S(n){let t,i,o,r,a;return r=new E({props:{language:G,code:n[0]}}),{c(){t=f("p"),i=d("General Usage:"),o=g(),y(r.$$.fragment)},l(e){t=_(e,"P",{});var s=b(t);i=h(s,"General Usage:"),s.forEach(l),o=w(e),$(r.$$.fragment,e)},m(e,s){m(e,t,s),k(t,i),m(e,o,s),v(r,e,s),a=!0},p:x,i(e){a||(C(r.$$.fragment,e),a=!0)},o(e){B(r.$$.fragment,e),a=!1},d(e){e&&l(t),e&&l(o),q(r,e)}}}function U(n){return[`
<script>
    import Button from "@kwangure/strawberry/components/button";

    const hello = () => alert("strawberry");
<\/script>

<div class="element">
    <Button on:click={hello}>Click me!</Button>
</div>

<style>
    /* Import style presets */
    @import "@kwangure/strawberry/components/button/layout.css";
    @import "@kwangure/strawberry/components/button/dark.css" (prefers-color-scheme: dark);
    @import "@kwangure/strawberry/components/button/light.css" (prefers-color-scheme: light);

    /* Override imported preset values */
    .element {
        --br-button-width: 50px;
        --br-button-border: 3px solid var(--my-primary-color);
    }
</style>
    `.trim()]}class P extends c{constructor(t){super(),p(this,t,U,S,u,{})}}export{P as default};
