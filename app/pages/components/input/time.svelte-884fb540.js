import{S as P,i as U,s as V,j as D,m as I,o as k,x as b,u as v,v as w,a8 as te,ap as ne,T as x,aq as se,e as E,t as A,k as ae,c as j,a as H,g as O,n as re,d as T,b as p,M as ie,f as q,H as $,am as C,_,ao as N,Z as ue,D as oe,E as le,F as ce,G as pe,ah as me,aa as F}from"../../../chunks/vendor-d49c0083.js";import{C as fe}from"../../../chunks/component-649a662c.js";import{C as de}from"../../../chunks/Container-4191741d.js";import{I as _e}from"../../../chunks/Path-fb573547.js";import"../../../chunks/JavaScript.svelte_svelte_type_style_lang-7c4d7229.js";import"../../../chunks/forward-events-e4dd3255.js";const he=a=>({}),J=a=>({slot:"label"});function ge(a){let t,s,e,n,i,m,f,l,c,d;return f=new _e({props:{path:se}}),{c(){t=E("div"),s=E("input"),e=A(`:
        `),n=E("input"),i=ae(),m=E("div"),D(f.$$.fragment),this.h()},l(u){t=j(u,"DIV",{class:!0});var o=H(t);s=j(o,"INPUT",{class:!0,type:!0,min:!0,max:!0,placeholder:!0}),e=O(o,`:
        `),n=j(o,"INPUT",{class:!0,type:!0,min:!0,max:!0,placeholder:!0}),i=re(o),m=j(o,"DIV",{class:!0});var h=H(m);I(f.$$.fragment,h),h.forEach(T),o.forEach(T),this.h()},h(){p(s,"class","text-input svelte-1dnl6g"),p(s,"type","number"),p(s,"min","0"),p(s,"max","23"),p(s,"placeholder","--"),p(n,"class","text-input svelte-1dnl6g"),p(n,"type","number"),p(n,"min","0"),p(n,"max","59"),p(n,"placeholder","--"),p(m,"class","postfix-wrapper svelte-1dnl6g"),p(t,"class","container svelte-1dnl6g"),ie(t,"invalid",!1)},m(u,o){q(u,t,o),$(t,s),a[12](s),C(s,a[3].hours),$(t,e),$(t,n),a[14](n),C(n,a[3].minutes),$(t,i),$(t,m),k(f,m,null),l=!0,c||(d=[_(s,"input",M),_(s,"inputend",a[6]),_(s,"input",a[13]),_(s,"input",z),_(n,"input",M),_(n,"inputend",a[7]),_(n,"input",a[15]),_(n,"input",z),_(m,"click",a[8])],c=!0)},p(u,o){o&8&&N(s.value)!==u[3].hours&&C(s,u[3].hours),o&8&&N(n.value)!==u[3].minutes&&C(n,u[3].minutes)},i(u){l||(b(f.$$.fragment,u),l=!0)},o(u){v(f.$$.fragment,u),l=!1},d(u){u&&T(t),a[12](null),a[14](null),w(f),c=!1,ue(d)}}}function be(a){let t;const s=a[11].label,e=oe(s,a,a[16],J);return{c(){e&&e.c()},l(n){e&&e.l(n)},m(n,i){e&&e.m(n,i),t=!0},p(n,i){e&&e.p&&(!t||i&65536)&&le(e,s,n,n[16],t?pe(s,n[16],i,he):ce(n[16]),J)},i(n){t||(b(e,n),t=!0)},o(n){v(e,n),t=!1},d(n){e&&e.d(n)}}}function ve(a){let t,s;return t=new de({props:{hideLabel:a[0],$$slots:{label:[be,({labelId:e})=>({21:e}),({labelId:e})=>e?2097152:0],default:[ge,({labelId:e})=>({21:e}),({labelId:e})=>e?2097152:0]},$$scope:{ctx:a}}}),{c(){D(t.$$.fragment)},l(e){I(t.$$.fragment,e)},m(e,n){k(t,e,n),s=!0},p(e,[n]){const i={};n&1&&(i.hideLabel=e[0]),n&65550&&(i.$$scope={dirty:n,ctx:e}),t.$set(i)},i(e){s||(b(t.$$.fragment,e),s=!0)},o(e){v(t.$$.fragment,e),s=!1},d(e){w(t,e)}}}const $e=JSON.parse('{"name":"Time","slots":[{"name":"label","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"hideLabel","optional":true,"value":false,"jsDoc":{"description":"Whether to hide the input label.","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}},{"kind":"let","name":"value","optional":true,"jsDoc":{"description":"The initial value of the input. An ISO 8601 dateString or Date.","tags":[{"description":"","name":"","tag":"type","type":"string | Date"}]}}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[{"property":"--br-input-time-icon-size","value":" ","cssDoc":null},{"property":"--br-input-time-number-input-background-color","value":" ","cssDoc":null},{"property":"--br-input-time-number-input-border-radius","value":" ","cssDoc":null}]}');function K(a){return parseFloat(a)%1==0}function L(a){return String(a).padStart(2,"0")}function M(a){const{target:t}=a,s=Number(t.max.slice(0,-1));!!a.inputType&&Number(t.value)>s&&t.dispatchEvent(new Event("inputend"))}function z(a){const{target:t}=a;if(t.value.length===0)return;const s=Number(t.max),e=Number(t.min);let n=Number(t.value);n<e?n=s:n>s&&(n=e),t.value=L(n)}function ye(a,t,s){let e,n,{$$slots:i={},$$scope:m}=t,{hideLabel:f=!1}=t,{value:l=void 0}=t,c,d;const u=te(),o={name:"date",transforms:{time:{from(r){return r?{hours:L(r.getHours()),minutes:L(r.getMinutes())}:{hours:"",minutes:""}},to(r){const g=new Date;return g.setHours(r.hours,r.minutes,0,0),g},validate(r){const{hours:g,minutes:S}=r;return!K(g)||!K(S)?!1:g>=0&&g<=23&&S>=0&&S<=59}}},validate(r){return r instanceof Date}},{date:h,time:y}=ne(o,l);x(a,h,r=>s(10,e=r)),x(a,y,r=>s(3,n=r));function G(r){e!==r&&me(h,e=r,e)}function W(r){l!==r&&(s(9,l=r),u("change",l))}function Z(){d.value||d.focus()}function B(){c.value||c.focus()}function Q(){if(!c.value)return c.focus();if(!d.value)return d.focus();c.focus()}function R(r){F[r?"unshift":"push"](()=>{c=r,s(1,c)})}function X(){n.hours=N(this.value),y.set(n)}function Y(r){F[r?"unshift":"push"](()=>{d=r,s(2,d)})}function ee(){n.minutes=N(this.value),y.set(n)}return a.$$set=r=>{"hideLabel"in r&&s(0,f=r.hideLabel),"value"in r&&s(9,l=r.value),"$$scope"in r&&s(16,m=r.$$scope)},a.$$.update=()=>{a.$$.dirty&512&&G(l),a.$$.dirty&1024&&W(e)},[f,c,d,n,h,y,Z,B,Q,l,e,i,R,X,Y,ee,m]}class De extends P{constructor(t){super();U(this,t,ye,ve,V,{hideLabel:0,value:9})}}const Ie={main:$e};function ke(a){let t;return{c(){t=A("I label your time!")},l(s){t=O(s,"I label your time!")},m(s,e){q(s,t,e)},d(s){s&&T(t)}}}function we(a){let t,s;return t=new De({props:{value:new Date,$$slots:{label:[ke]},$$scope:{ctx:a}}}),{c(){D(t.$$.fragment)},l(e){I(t.$$.fragment,e)},m(e,n){k(t,e,n),s=!0},p(e,n){const i={};n&1&&(i.$$scope={dirty:n,ctx:e}),t.$set(i)},i(e){s||(b(t.$$.fragment,e),s=!0)},o(e){v(t.$$.fragment,e),s=!1},d(e){w(t,e)}}}function Ee(a){let t,s;return t=new fe({props:{docs:Ie,$$slots:{inline:[we]},$$scope:{ctx:a}}}),{c(){D(t.$$.fragment)},l(e){I(t.$$.fragment,e)},m(e,n){k(t,e,n),s=!0},p(e,[n]){const i={};n&1&&(i.$$scope={dirty:n,ctx:e}),t.$set(i)},i(e){s||(b(t.$$.fragment,e),s=!0)},o(e){v(t.$$.fragment,e),s=!1},d(e){w(t,e)}}}class Pe extends P{constructor(t){super();U(this,t,null,Ee,V,{})}}export{Pe as default};
