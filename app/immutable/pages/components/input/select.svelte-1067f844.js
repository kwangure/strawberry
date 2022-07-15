import{S as v,i as w,s as x,w as a,x as i,y as c,q as u,o as f,B as $,t as _,h as d,g as m,E as y,d as p,k as O,m as S}from"../../../chunks/index-9f7629f3.js";import{C,c as I}from"../../../chunks/svelte-02f513e0.js";import{d as Y,S as k,O as h}from"../../../chunks/docs-63a5e3db.js";import{C as q}from"../../../chunks/component-5b135dda.js";/* empty css                                 */import"../../../chunks/forward-events-932ef468.js";function F(l){let e;return{c(){e=_("Undercover Onion")},l(n){e=d(n,"Undercover Onion")},m(n,t){m(n,e,t)},d(n){n&&p(e)}}}function R(l){let e;return{c(){e=_("Testicle Rainbow")},l(n){e=d(n,"Testicle Rainbow")},m(n,t){m(n,e,t)},d(n){n&&p(e)}}}function T(l){let e,n,t,s;return e=new h({props:{value:"onion",$$slots:{default:[F]},$$scope:{ctx:l}}}),t=new h({props:{value:"testicle",$$slots:{default:[R]},$$scope:{ctx:l}}}),{c(){a(e.$$.fragment),n=O(),a(t.$$.fragment)},l(o){i(e.$$.fragment,o),n=S(o),i(t.$$.fragment,o)},m(o,r){c(e,o,r),m(o,n,r),c(t,o,r),s=!0},p(o,r){const g={};r&1&&(g.$$scope={dirty:r,ctx:o}),e.$set(g);const b={};r&1&&(b.$$scope={dirty:r,ctx:o}),t.$set(b)},i(o){s||(u(e.$$.fragment,o),u(t.$$.fragment,o),s=!0)},o(o){f(e.$$.fragment,o),f(t.$$.fragment,o),s=!1},d(o){$(e,o),o&&p(n),$(t,o)}}}function U(l){let e;return{c(){e=_("I label selects.")},l(n){e=d(n,"I label selects.")},m(n,t){m(n,e,t)},d(n){n&&p(e)}}}function B(l){let e,n;return e=new k({props:{placeholder:"Like I said...",$$slots:{label:[U],default:[T]},$$scope:{ctx:l}}}),{c(){a(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,s){c(e,t,s),n=!0},p(t,s){const o={};s&1&&(o.$$scope={dirty:s,ctx:t}),e.$set(o)},i(t){n||(u(e.$$.fragment,t),n=!0)},o(t){f(e.$$.fragment,t),n=!1},d(t){$(e,t)}}}function E(l){let e,n,t;return n=new C({props:{language:I,code:`
<div class="element">
    <Select>
        <svelte:fragment slot="label">
            Ice cream
        </svelte:fragment>
        <Option value="1">Strawberry</Option>
        <Option value="2">Vanilla</Option>
        <Option value="3">Chocolate</Option>
    </Select>
</div>

<style>
    .element {
        --br-select-label-position: absolute;
        --br-select-label-height: 1px;
        --br-select-label-width: 1px;
        --br-select-label-overflow: hidden;
    }
</style>
`}}),{c(){e=_(`You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        `),a(n.$$.fragment)},l(s){e=d(s,`You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        `),i(n.$$.fragment,s)},m(s,o){m(s,e,o),c(n,s,o),t=!0},p:y,i(s){t||(u(n.$$.fragment,s),t=!0)},o(s){f(n.$$.fragment,s),t=!1},d(s){s&&p(e),$(n,s)}}}function L(l){let e,n;return e=new q({props:{docs:Y,$$slots:{accessibility:[E],inline:[B]},$$scope:{ctx:l}}}),{c(){a(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,s){c(e,t,s),n=!0},p(t,[s]){const o={};s&1&&(o.$$scope={dirty:s,ctx:t}),e.$set(o)},i(t){n||(u(e.$$.fragment,t),n=!0)},o(t){f(e.$$.fragment,t),n=!1},d(t){$(e,t)}}}class H extends v{constructor(e){super(),w(this,e,null,L,x,{})}}export{H as default};
