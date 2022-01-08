import{S as d,i as f,s as _,e as $,t as m,k as b,j as g,c as y,a as h,g as u,d as l,n as w,m as k,f as i,H as v,o as x,x as C,u as S,v as j,I as B}from"../../chunks/vendor-73f7aab9.js";import{C as U}from"../../chunks/Code-cb795b16.js";import"../../chunks/preload-helper-9f4c7634.js";function E(n){let t;return{c(){t=m(n[0])},l(s){t=u(s,n[0])},m(s,a){i(s,t,a)},p:B,d(s){s&&l(t)}}}function G(n){let t,s,a,r,c;return r=new U({props:{language:"svelte",$$slots:{default:[E]},$$scope:{ctx:n}}}),{c(){t=$("p"),s=m("General Usage:"),a=b(),g(r.$$.fragment)},l(e){t=y(e,"P",{});var o=h(t);s=u(o,"General Usage:"),o.forEach(l),a=w(e),k(r.$$.fragment,e)},m(e,o){i(e,t,o),v(t,s),i(e,a,o),x(r,e,o),c=!0},p(e,[o]){const p={};o&2&&(p.$$scope={dirty:o,ctx:e}),r.$set(p)},i(e){c||(C(r.$$.fragment,e),c=!0)},o(e){S(r.$$.fragment,e),c=!1},d(e){e&&l(t),e&&l(a),j(r,e)}}}function I(n){return[`
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
