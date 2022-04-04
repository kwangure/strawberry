import{S as m,i as u,s as p,e as d,t as f,k as _,j as g,c as h,a as y,g as $,d as i,n as b,m as v,f as l,H as k,o as w,I as x,x as C,u as B,v as j}from"../../chunks/vendor-5dcc93bd.js";import{C as G,h as S}from"../../chunks/svelte-7f3d56d8.js";function U(r){let e,c,a,s,o;return s=new G({props:{language:S,code:r[0]}}),{c(){e=d("p"),c=f("General Usage:"),a=_(),g(s.$$.fragment)},l(t){e=h(t,"P",{});var n=y(e);c=$(n,"General Usage:"),n.forEach(i),a=b(t),v(s.$$.fragment,t)},m(t,n){l(t,e,n),k(e,c),l(t,a,n),w(s,t,n),o=!0},p:x,i(t){o||(C(s.$$.fragment,t),o=!0)},o(t){B(s.$$.fragment,t),o=!1},d(t){t&&i(e),t&&i(a),j(s,t)}}}function q(r){return[`
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
    `.trim()]}class I extends m{constructor(e){super();u(this,e,q,U,p,{})}}export{I as default};
