import{S as f,i as d,s as _,e as $,t as m,k as g,j as h,c as b,a as k,g as p,d as l,n as y,m as v,f as i,H as w,o as x,x as C,u as j,v as B,I as G}from"../../chunks/vendor-70f2b995.js";import{C as S}from"../../chunks/Code-d262dce8.js";import"../../chunks/preload-helper-9f4c7634.js";function U(a){let t;return{c(){t=m(a[0])},l(s){t=p(s,a[0])},m(s,r){i(s,t,r)},p:G,d(s){s&&l(t)}}}function q(a){let t,s,r,o,c;return o=new S({props:{language:"svelte",$$slots:{default:[U]},$$scope:{ctx:a}}}),{c(){t=$("p"),s=m("General Usage:"),r=g(),h(o.$$.fragment)},l(e){t=b(e,"P",{});var n=k(t);s=p(n,"General Usage:"),n.forEach(l),r=y(e),v(o.$$.fragment,e)},m(e,n){i(e,t,n),w(t,s),i(e,r,n),x(o,e,n),c=!0},p(e,[n]){const u={};n&2&&(u.$$scope={dirty:n,ctx:e}),o.$set(u)},i(e){c||(C(o.$$.fragment,e),c=!0)},o(e){j(o.$$.fragment,e),c=!1},d(e){e&&l(t),e&&l(r),B(o,e)}}}function E(a){return[`
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
        --br-button-border: 3px solid red;
    }
</style>
    `.trim()]}class z extends f{constructor(t){super();d(this,t,E,q,_,{})}}export{z as default};
