import{S as X,i as z,s as Q,F as R,e as E,k as V,c as M,a as C,d as _,m as B,b as u,K as G,g as F,J as I,a2 as J,O as ee,L as K,G as Z,H as x,I as $,W as te,n as ne,o as y,p as ae,q as k,X as le,N as ie,t as A,h as H,j as oe,E as L,w as O,x as S,y as W,B as Y}from"../../../chunks/index-9f7629f3.js";import{C as se,c as re}from"../../../chunks/svelte-02f513e0.js";import{C as ue}from"../../../chunks/component-5b135dda.js";/* empty css                                 */import{c as ce}from"../../../chunks/forward-events-932ef468.js";import{v as me}from"../../../chunks/validate-b736ccb8.js";import{w as fe}from"../../../chunks/index-a17fd075.js";const de=i=>({}),P=i=>({}),pe=i=>({}),U=i=>({});function he(i){let e;const t=i[17].hint,n=R(t,i,i[16],P);return{c(){n&&n.c()},l(l){n&&n.l(l)},m(l,a){n&&n.m(l,a),e=!0},p(l,a){n&&n.p&&(!e||a&65536)&&Z(n,t,l,l[16],e?$(t,l[16],a,de):x(l[16]),P)},i(l){e||(k(n,l),e=!0)},o(l){y(n,l),e=!1},d(l){n&&n.d(l)}}}function ge(i){let e;return{c(){e=A(i[13])},l(t){e=H(t,i[13])},m(t,n){F(t,e,n)},p(t,n){n&8192&&oe(e,t[13])},i:L,o:L,d(t){t&&_(e)}}}function _e(i){let e,t,n,l,a,v,w,p,f,d,c,D,T;const j=i[17].label,m=R(j,i,i[16],U),q=[ge,he],h=[];function b(o,r){return o[13]?0:1}return f=b(i),d=h[f]=q[f](i),{c(){e=E("label"),t=E("div"),m&&m.c(),n=V(),l=E("div"),a=E("input"),w=V(),p=E("div"),d.c(),this.h()},l(o){e=M(o,"LABEL",{class:!0});var r=C(e);t=M(r,"DIV",{class:!0});var g=C(t);m&&m.l(g),g.forEach(_),n=B(r),l=M(r,"DIV",{class:!0});var s=C(l);a=M(s,"INPUT",{type:!0,autocomplete:!0,form:!0,list:!0,maxlength:!0,minlength:!0,name:!0,placeholder:!0,class:!0}),s.forEach(_),w=B(r),p=M(r,"DIV",{class:!0});var N=C(p);d.l(N),N.forEach(_),r.forEach(_),this.h()},h(){u(t,"class","label-text svelte-1dkd9yv"),u(a,"type","text"),u(a,"autocomplete",i[1]),a.autofocus=i[2],u(a,"form",i[4]),u(a,"list",i[6]),u(a,"maxlength",i[7]),u(a,"minlength",i[8]),u(a,"name",i[9]),u(a,"placeholder",i[10]),a.readOnly=i[11],a.required=i[12],u(a,"class","svelte-1dkd9yv"),u(l,"class","container svelte-1dkd9yv"),u(p,"class","hint svelte-1dkd9yv"),G(p,"invalid",i[13]),u(e,"class","svelte-1dkd9yv")},m(o,r){F(o,e,r),I(e,t),m&&m.m(t,null),I(e,n),I(e,l),I(l,a),J(a,i[0]),I(e,w),I(e,p),h[f].m(p,null),c=!0,i[2]&&a.focus(),D||(T=[ee(a,"input",i[18]),K(i[14].call(null,a)),K(v=me.call(null,a,{invalid:i[5],error:i[3],errorMessage:i[15]}))],D=!0)},p(o,[r]){m&&m.p&&(!c||r&65536)&&Z(m,j,o,o[16],c?$(j,o[16],r,pe):x(o[16]),U),(!c||r&2)&&u(a,"autocomplete",o[1]),(!c||r&4)&&(a.autofocus=o[2]),(!c||r&16)&&u(a,"form",o[4]),(!c||r&64)&&u(a,"list",o[6]),(!c||r&128)&&u(a,"maxlength",o[7]),(!c||r&256)&&u(a,"minlength",o[8]),(!c||r&512)&&u(a,"name",o[9]),(!c||r&1024)&&u(a,"placeholder",o[10]),(!c||r&2048)&&(a.readOnly=o[11]),(!c||r&4096)&&(a.required=o[12]),r&1&&a.value!==o[0]&&J(a,o[0]),v&&te(v.update)&&r&40&&v.update.call(null,{invalid:o[5],error:o[3],errorMessage:o[15]});let g=f;f=b(o),f===g?h[f].p(o,r):(ne(),y(h[g],1,1,()=>{h[g]=null}),ae(),d=h[f],d?d.p(o,r):(d=h[f]=q[f](o),d.c()),k(d,1),d.m(p,null)),r&8192&&G(p,"invalid",o[13])},i(o){c||(k(m,o),k(d),c=!0)},o(o){y(m,o),y(d),c=!1},d(o){o&&_(e),m&&m.d(o),h[f].d(),D=!1,le(T)}}}const ve=JSON.parse('{"name":"Text","slots":[{"name":"label","htmlDoc":null},{"name":"hint","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"autocomplete","optional":true,"value":"","jsDoc":{"description":"Guidance to the browser on information expected in the field. Helps UserAgent automate filling form field values.","tags":[{"description":"","name":"","tag":"type","type":"\\"off\\" | \\"on\\" | string"}]}},{"kind":"let","name":"autofocus","optional":true,"value":false,"jsDoc":{"description":"Whether select should have input focus when the page loads.","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}},{"kind":"let","name":"error","optional":true,"jsDoc":{"description":"A function that takes a validity state string and returns an error message.","tags":[{"description":"","name":"","tag":"type","type":"((error: string, input: HTMLInputElement) => string) | undefined"}]}},{"kind":"let","name":"form","optional":true,"jsDoc":{"description":"The id of the form to associate with the text input","tags":[{"description":"","name":"","tag":"type","type":"string | undefined"}]}},{"kind":"let","name":"invalid","optional":true,"jsDoc":{"description":"A function that returns the validity of the input.","tags":[{"description":"","name":"","tag":"type","type":"((input: HTMLInputElement) => string) | undefined"}]}},{"kind":"let","name":"list","optional":true,"value":"","jsDoc":{"description":"The id of a <datalist> element located in the same document.","tags":[{"description":"","name":"","tag":"type","type":"string"}]}},{"kind":"let","name":"maxlength","optional":true,"jsDoc":{"description":"The maximum number of characters allowed in the element.","tags":[{"description":"","name":"","tag":"type","type":"number"}]}},{"kind":"let","name":"minlength","optional":true,"jsDoc":{"description":"The minimum number of characters allowed in the element.","tags":[{"description":"","name":"","tag":"type","type":"number"}]}},{"kind":"let","name":"name","optional":true,"value":"","jsDoc":{"description":"The name of the name input. Submitted with its parent form as part of a name/value pair.","tags":[{"description":"","name":"","tag":"type","type":"string"}]}},{"kind":"let","name":"placeholder","optional":true,"value":"","jsDoc":{"description":"Text that appears in the form control when it has no value set","tags":[{"description":"","name":"","tag":"type","type":"string"}]}},{"kind":"let","name":"readonly","optional":true,"value":false,"jsDoc":{"description":"When true, the user cannot edit the value of the input","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}},{"kind":"let","name":"required","optional":true,"value":false,"jsDoc":{"description":"When true, indicates that the user must input a value before the parent form can be submitted.","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}},{"kind":"let","name":"value","optional":true,"value":"","jsDoc":{"description":"The initial value of the component.","tags":[{"description":"","name":"","tag":"type","type":"string | undefined"}]}}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[]}');function be(i,e,t){let n,{$$slots:l={},$$scope:a}=e,{autocomplete:v=""}=e,{autofocus:w=!1}=e,{error:p=void 0}=e,{form:f=void 0}=e,{invalid:d=void 0}=e,{list:c=""}=e,{maxlength:D=-1}=e,{minlength:T=-1}=e,{name:j=""}=e,{placeholder:m=""}=e,{readonly:q=!1}=e,{required:h=!1}=e,{value:b=""}=e;const o=ce(),r=fe("");ie(i,r,s=>t(13,n=s));function g(){b=this.value,t(0,b)}return i.$$set=s=>{"autocomplete"in s&&t(1,v=s.autocomplete),"autofocus"in s&&t(2,w=s.autofocus),"error"in s&&t(3,p=s.error),"form"in s&&t(4,f=s.form),"invalid"in s&&t(5,d=s.invalid),"list"in s&&t(6,c=s.list),"maxlength"in s&&t(7,D=s.maxlength),"minlength"in s&&t(8,T=s.minlength),"name"in s&&t(9,j=s.name),"placeholder"in s&&t(10,m=s.placeholder),"readonly"in s&&t(11,q=s.readonly),"required"in s&&t(12,h=s.required),"value"in s&&t(0,b=s.value),"$$scope"in s&&t(16,a=s.$$scope)},[b,v,w,p,f,d,c,D,T,j,m,q,h,n,o,r,a,l,g]}class ye extends X{constructor(e){super(),z(this,e,be,_e,Q,{autocomplete:1,autofocus:2,error:3,form:4,invalid:5,list:6,maxlength:7,minlength:8,name:9,placeholder:10,readonly:11,required:12,value:0})}}const ke={main:ve};function we(i){let e;return{c(){e=A("I label inputs like no one else!")},l(t){e=H(t,"I label inputs like no one else!")},m(t,n){F(t,e,n)},d(t){t&&_(e)}}}function De(i){let e,t;return e=new ye({props:{placeholder:"I can say anything!",$$slots:{label:[we]},$$scope:{ctx:i}}}),{c(){O(e.$$.fragment)},l(n){S(e.$$.fragment,n)},m(n,l){W(e,n,l),t=!0},p(n,l){const a={};l&1&&(a.$$scope={dirty:l,ctx:n}),e.$set(a)},i(n){t||(k(e.$$.fragment,n),t=!0)},o(n){y(e.$$.fragment,n),t=!1},d(n){Y(e,n)}}}function je(i){let e,t,n;return t=new se({props:{language:re,code:`
<div class="element">
    <Input value="Karen">
        <svelte:fragment slot="label">
            First name
        </svelte:fragment>
    </Input>
</div>

<style>
    .element {
        --br-input-text-label-position: absolute;
        --br-input-text-label-height: 1px;
        --br-input-text-label-width: 1px;
        --br-input-text-label-overflow: hidden;
    }
</style>
`}}),{c(){e=A(`You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        `),O(t.$$.fragment)},l(l){e=H(l,`You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        `),S(t.$$.fragment,l)},m(l,a){F(l,e,a),W(t,l,a),n=!0},p:L,i(l){n||(k(t.$$.fragment,l),n=!0)},o(l){y(t.$$.fragment,l),n=!1},d(l){l&&_(e),Y(t,l)}}}function Ie(i){let e,t;return e=new ue({props:{docs:ke,$$slots:{accessibility:[je],inline:[De]},$$scope:{ctx:i}}}),{c(){O(e.$$.fragment)},l(n){S(e.$$.fragment,n)},m(n,l){W(e,n,l),t=!0},p(n,[l]){const a={};l&1&&(a.$$scope={dirty:l,ctx:n}),e.$set(a)},i(n){t||(k(e.$$.fragment,n),t=!0)},o(n){y(e.$$.fragment,n),t=!1},d(n){Y(e,n)}}}class Ae extends X{constructor(e){super(),z(this,e,null,Ie,Q,{})}}export{Ae as default};
