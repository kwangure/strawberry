import{S as P,i as V,s as U,j as D,m as k,o as I,x as b,u as v,v as w,a6 as te,an as ne,V as x,ao as se,e as j,t as A,k as ae,c as E,a as H,g as O,n as re,d as C,b as p,M as ie,f as F,H as $,ak as N,W as _,am as T,ae as oe,D as ue,E as le,F as ce,G as pe,ag as me,a9 as K}from"../../../chunks/vendor-b5868662.js";import{C as fe}from"../../../chunks/component-4bbb066d.js";import{C as de}from"../../../chunks/Container-ccea33b1.js";import{I as _e}from"../../../chunks/Path.svelte_svelte_type_style_lang-e3edcd28.js";import"../../../chunks/Code-568b752d.js";import"../../../chunks/preload-helper-9f4c7634.js";import"../../../chunks/forward-events-9906ae8e.js";const he=JSON.parse('{"name":"Time","slots":[null],"description":"","props":[{"kind":"let","name":"hideLabel","optional":true,"value":false,"jsDoc":{"description":"Whether to hide the input label.","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}},{"kind":"let","name":"value","optional":true,"jsDoc":{"description":"The initial value of the input. An ISO 8601 dateString or Date.","tags":[{"description":"","name":"","tag":"type","type":"string | Date"}]}}],"exports":[],"customProperties":[{"property":"--br-input-time-icon-size","value":" ","cssDoc":null},{"property":"--br-input-time-number-input-background-color","value":" ","cssDoc":null},{"property":"--br-input-time-number-input-border-radius","value":" ","cssDoc":null},{"property":"--br-input-padding-block","value":" ","cssDoc":null},{"property":"--br-input-padding-inline","value":" ","cssDoc":null}]}'),ge={main:he};const be=a=>({}),M=a=>({slot:"label"});function ve(a){let t,s,e,n,i,m,f,l,c,d;return f=new _e({props:{path:se}}),{c(){t=j("div"),s=j("input"),e=A(`:
        `),n=j("input"),i=ae(),m=j("div"),D(f.$$.fragment),this.h()},l(o){t=E(o,"DIV",{class:!0});var u=H(t);s=E(u,"INPUT",{class:!0,type:!0,min:!0,max:!0,placeholder:!0}),e=O(u,`:
        `),n=E(u,"INPUT",{class:!0,type:!0,min:!0,max:!0,placeholder:!0}),i=re(u),m=E(u,"DIV",{class:!0});var h=H(m);k(f.$$.fragment,h),h.forEach(C),u.forEach(C),this.h()},h(){p(s,"class","text-input svelte-1o39lyo"),p(s,"type","number"),p(s,"min","0"),p(s,"max","23"),p(s,"placeholder","--"),p(n,"class","text-input svelte-1o39lyo"),p(n,"type","number"),p(n,"min","0"),p(n,"max","59"),p(n,"placeholder","--"),p(m,"class","postfix-wrapper svelte-1o39lyo"),p(t,"class","container svelte-1o39lyo"),ie(t,"invalid",!1)},m(o,u){F(o,t,u),$(t,s),a[12](s),N(s,a[3].hours),$(t,e),$(t,n),a[14](n),N(n,a[3].minutes),$(t,i),$(t,m),I(f,m,null),l=!0,c||(d=[_(s,"input",q),_(s,"inputend",a[6]),_(s,"input",a[13]),_(s,"input",z),_(n,"input",q),_(n,"inputend",a[7]),_(n,"input",a[15]),_(n,"input",z),_(m,"click",a[8])],c=!0)},p(o,u){u&8&&T(s.value)!==o[3].hours&&N(s,o[3].hours),u&8&&T(n.value)!==o[3].minutes&&N(n,o[3].minutes)},i(o){l||(b(f.$$.fragment,o),l=!0)},o(o){v(f.$$.fragment,o),l=!1},d(o){o&&C(t),a[12](null),a[14](null),w(f),c=!1,oe(d)}}}function $e(a){let t;const s=a[11].label,e=ue(s,a,a[16],M);return{c(){e&&e.c()},l(n){e&&e.l(n)},m(n,i){e&&e.m(n,i),t=!0},p(n,i){e&&e.p&&(!t||i&65536)&&le(e,s,n,n[16],t?pe(s,n[16],i,be):ce(n[16]),M)},i(n){t||(b(e,n),t=!0)},o(n){v(e,n),t=!1},d(n){e&&e.d(n)}}}function ye(a){let t,s;return t=new de({props:{hideLabel:a[0],$$slots:{label:[$e,({labelId:e})=>({21:e}),({labelId:e})=>e?2097152:0],default:[ve,({labelId:e})=>({21:e}),({labelId:e})=>e?2097152:0]},$$scope:{ctx:a}}}),{c(){D(t.$$.fragment)},l(e){k(t.$$.fragment,e)},m(e,n){I(t,e,n),s=!0},p(e,[n]){const i={};n&1&&(i.hideLabel=e[0]),n&65550&&(i.$$scope={dirty:n,ctx:e}),t.$set(i)},i(e){s||(b(t.$$.fragment,e),s=!0)},o(e){v(t.$$.fragment,e),s=!1},d(e){w(t,e)}}}function W(a){return parseFloat(a)%1==0}function S(a){return String(a).padStart(2,"0")}function q(a){const{target:t}=a,s=Number(t.max.slice(0,-1));!!a.inputType&&Number(t.value)>s&&t.dispatchEvent(new Event("inputend"))}function z(a){const{target:t}=a;if(t.value.length===0)return;const s=Number(t.max),e=Number(t.min);let n=Number(t.value);n<e?n=s:n>s&&(n=e),t.value=S(n)}function De(a,t,s){let e,n,{$$slots:i={},$$scope:m}=t,{hideLabel:f=!1}=t,{value:l=void 0}=t,c,d;const o=te(),u={name:"date",transforms:{time:{from(r){return r?{hours:S(r.getHours()),minutes:S(r.getMinutes())}:{hours:"",minutes:""}},to(r){const g=new Date;return g.setHours(r.hours,r.minutes,0,0),g},validate(r){const{hours:g,minutes:L}=r;return!W(g)||!W(L)?!1:g>=0&&g<=23&&L>=0&&L<=59}}},validate(r){return r instanceof Date}},{date:h,time:y}=ne(u,l);x(a,h,r=>s(10,e=r)),x(a,y,r=>s(3,n=r));function G(r){e!==r&&me(h,e=r,e)}function J(r){l!==r&&(s(9,l=r),o("change",l))}function B(){d.value||d.focus()}function Q(){c.value||c.focus()}function R(){if(!c.value)return c.focus();if(!d.value)return d.focus();c.focus()}function X(r){K[r?"unshift":"push"](()=>{c=r,s(1,c)})}function Y(){n.hours=T(this.value),y.set(n)}function Z(r){K[r?"unshift":"push"](()=>{d=r,s(2,d)})}function ee(){n.minutes=T(this.value),y.set(n)}return a.$$set=r=>{"hideLabel"in r&&s(0,f=r.hideLabel),"value"in r&&s(9,l=r.value),"$$scope"in r&&s(16,m=r.$$scope)},a.$$.update=()=>{a.$$.dirty&512&&G(l),a.$$.dirty&1024&&J(e)},[f,c,d,n,h,y,B,Q,R,l,e,i,X,Y,Z,ee,m]}class ke extends P{constructor(t){super();V(this,t,De,ye,U,{hideLabel:0,value:9})}}function Ie(a){let t;return{c(){t=A("I label your time!")},l(s){t=O(s,"I label your time!")},m(s,e){F(s,t,e)},d(s){s&&C(t)}}}function we(a){let t,s;return t=new ke({props:{value:new Date,$$slots:{label:[Ie]},$$scope:{ctx:a}}}),{c(){D(t.$$.fragment)},l(e){k(t.$$.fragment,e)},m(e,n){I(t,e,n),s=!0},p(e,n){const i={};n&1&&(i.$$scope={dirty:n,ctx:e}),t.$set(i)},i(e){s||(b(t.$$.fragment,e),s=!0)},o(e){v(t.$$.fragment,e),s=!1},d(e){w(t,e)}}}function je(a){let t,s;return t=new fe({props:{docs:ge,$$slots:{inline:[we]},$$scope:{ctx:a}}}),{c(){D(t.$$.fragment)},l(e){k(t.$$.fragment,e)},m(e,n){I(t,e,n),s=!0},p(e,[n]){const i={};n&1&&(i.$$scope={dirty:n,ctx:e}),t.$set(i)},i(e){s||(b(t.$$.fragment,e),s=!0)},o(e){v(t.$$.fragment,e),s=!1},d(e){w(t,e)}}}class Ve extends P{constructor(t){super();V(this,t,null,je,U,{})}}export{Ve as default};
