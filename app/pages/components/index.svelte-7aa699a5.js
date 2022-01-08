import{S as d,i as f,s as _,e as $,t as m,k as g,j as y,c as b,a as h,g as u,d as l,n as w,m as k,f as i,H as v,o as x,x as C,u as S,v as j,I as B}from"../../chunks/vendor-412a35aa.js";import{C as U}from"../../chunks/Code-cf8b8d74.js";import"../../chunks/preload-helper-9f4c7634.js";function E(a){let t;return{c(){t=m(a[0])},l(s){t=u(s,a[0])},m(s,n){i(s,t,n)},p:B,d(s){s&&l(t)}}}function G(a){let t,s,n,r,c;return r=new U({props:{language:"svelte",$$slots:{default:[E]},$$scope:{ctx:a}}}),{c(){t=$("p"),s=m("General Usage:"),n=g(),y(r.$$.fragment)},l(e){t=b(e,"P",{});var o=h(t);s=u(o,"General Usage:"),o.forEach(l),n=w(e),k(r.$$.fragment,e)},m(e,o){i(e,t,o),v(t,s),i(e,n,o),x(r,e,o),c=!0},p(e,[o]){const p={};o&2&&(p.$$scope={dirty:o,ctx:e}),r.$set(p)},i(e){c||(C(r.$$.fragment,e),c=!0)},o(e){S(r.$$.fragment,e),c=!1},d(e){e&&l(t),e&&l(n),j(r,e)}}}function I(a){return[`
<script>
    /* Import a global stylesheet in root file */
    // Style for standard document
    import "@kwangure/strawberry/css/standardDOM";
    // Style for shadow root
    import "@kwangure/strawberry/css/customElement";

    import Button from "@kwangure/strawberry/components/Button";
<\/script>

<!--
    Use attribute or <style/> custom properties to override styles.
    See docs for supported \`--br-[component]-#\` custom properties.
-->

<div class="document">
    Text
    <Button primary --br-button-width="50px"
        on:click={() => console.log('strawberry')}>
        Click me!
    </Button>
</div>

<style>
    .document {
        --br-button-border: 3px solid red;
    }
</style>
    `.trim()]}class M extends d{constructor(t){super();f(this,t,I,G,_,{})}}export{M as default};
