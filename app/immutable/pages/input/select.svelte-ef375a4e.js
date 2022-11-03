import{S as v,i as x,s as w,x as a,y as i,z as c,f as u,t as p,C as f,u as _,v as d,b as $,n as y,h as m,a as O,c as S}from"../../chunks/index-8333b970.js";import{C,p as I}from"../../chunks/language-e15a231f.js";/* empty css                           */import{d as L,S as Y,O as h}from"../../chunks/index-d82e92fa.js";import{C as T}from"../../chunks/component-85bd3def.js";import"../../chunks/forward-events-ac79da41.js";function F(r){let e;return{c(){e=_("Undercover Onion")},l(n){e=d(n,"Undercover Onion")},m(n,t){$(n,e,t)},d(n){n&&m(e)}}}function R(r){let e;return{c(){e=_("Testicle Rainbow")},l(n){e=d(n,"Testicle Rainbow")},m(n,t){$(n,e,t)},d(n){n&&m(e)}}}function U(r){let e,n,t,s;return e=new h({props:{value:"onion",$$slots:{default:[F]},$$scope:{ctx:r}}}),t=new h({props:{value:"testicle",$$slots:{default:[R]},$$scope:{ctx:r}}}),{c(){a(e.$$.fragment),n=O(),a(t.$$.fragment)},l(o){i(e.$$.fragment,o),n=S(o),i(t.$$.fragment,o)},m(o,l){c(e,o,l),$(o,n,l),c(t,o,l),s=!0},p(o,l){const b={};l&1&&(b.$$scope={dirty:l,ctx:o}),e.$set(b);const g={};l&1&&(g.$$scope={dirty:l,ctx:o}),t.$set(g)},i(o){s||(u(e.$$.fragment,o),u(t.$$.fragment,o),s=!0)},o(o){p(e.$$.fragment,o),p(t.$$.fragment,o),s=!1},d(o){f(e,o),o&&m(n),f(t,o)}}}function k(r){let e;return{c(){e=_("I label selects.")},l(n){e=d(n,"I label selects.")},m(n,t){$(n,e,t)},d(n){n&&m(e)}}}function q(r){let e,n;return e=new Y({props:{placeholder:"Like I said...",$$slots:{label:[k],default:[U]},$$scope:{ctx:r}}}),{c(){a(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,s){c(e,t,s),n=!0},p(t,s){const o={};s&1&&(o.$$scope={dirty:s,ctx:t}),e.$set(o)},i(t){n||(u(e.$$.fragment,t),n=!0)},o(t){p(e.$$.fragment,t),n=!1},d(t){f(e,t)}}}function z(r){let e,n,t;return n=new C({props:{highlight:I,code:`
<div class="element">
    <Label>
        Ice cream
        <Select slot'input'>
            <Option value="1">Strawberry</Option>
            <Option value="2">Vanilla</Option>
            <Option value="3">Chocolate</Option>
        </Select>
    </Label>
</div>

<style>
    .element {
        --br-input-label-root-position: absolute;
        --br-input-label-root-height: 1px;
        --br-input-label-root-width: 1px;
        --br-input-label-root-overflow: hidden;
    }
</style>
`}}),{c(){e=_(`You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        `),a(n.$$.fragment)},l(s){e=d(s,`You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        `),i(n.$$.fragment,s)},m(s,o){$(s,e,o),c(n,s,o),t=!0},p:y,i(s){t||(u(n.$$.fragment,s),t=!0)},o(s){p(n.$$.fragment,s),t=!1},d(s){s&&m(e),f(n,s)}}}function H(r){let e,n;return e=new T({props:{docs:L,$$slots:{accessibility:[z],inline:[q]},$$scope:{ctx:r}}}),{c(){a(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,s){c(e,t,s),n=!0},p(t,[s]){const o={};s&1&&(o.$$scope={dirty:s,ctx:t}),e.$set(o)},i(t){n||(u(e.$$.fragment,t),n=!0)},o(t){p(e.$$.fragment,t),n=!1},d(t){f(e,t)}}}class E extends v{constructor(e){super(),x(this,e,null,H,w,{})}}export{E as default};
