import{S as C,i as E,s as w,j as y,m as j,o as L,x as m,u as b,v as P,O as N,B as $,P as z,e as D,t as S,c as I,a as F,g as J,d as p,b as O,f as g,H as T,h as A,U as K,a8 as U,an as V,k as Q,l as W,n as R,L as q,M as k,ao as B,_ as G,N as H,p as X,Y as x,r as ee,w as te,Z as se,D as ae,E as le,F as ne,G as ie}from"../../../chunks/vendor-fab38dda.js";import{C as oe}from"../../../chunks/component-b40fa36f.js";import{C as re}from"../../../chunks/Container-cf165cf3.js";import{c as ue}from"../../../chunks/forward-events-b24822df.js";import{f as ce}from"../../../chunks/actions-f8e73d02.js";import"../../../chunks/JavaScript.svelte_svelte_type_style_lang-99e8b40e.js";const fe=l=>({}),M=l=>({slot:"label"});function Y(l){let t,s,e,a;return{c(){t=D("div"),s=S(l[4]),this.h()},l(n){t=I(n,"DIV",{class:!0});var u=F(t);s=J(u,l[4]),u.forEach(p),this.h()},h(){O(t,"class","invalid svelte-1k498mk")},m(n,u){g(n,t,u),T(t,s),a=!0},p(n,u){(!a||u&16)&&A(s,n[4])},i(n){a||(K(()=>{e||(e=U(t,V,{},!0)),e.run(1)}),a=!0)},o(n){e||(e=U(t,V,{},!1)),e.run(0),a=!1},d(n){n&&p(t),n&&e&&e.end()}}}function de(l){let t,s,e,a,n,u,f,h,d,v=[{class:"text-input"},{type:"password"},{id:e=l[12]},l[6]],_={};for(let i=0;i<v.length;i+=1)_=$(_,v[i]);let o=l[4]&&Y(l);return{c(){t=D("div"),s=D("input"),n=Q(),o&&o.c(),u=W(),this.h()},l(i){t=I(i,"DIV",{class:!0});var r=F(t);s=I(r,"INPUT",{class:!0,type:!0,id:!0}),r.forEach(p),n=R(i),o&&o.l(i),u=W(),this.h()},h(){q(s,_),k(s,"svelte-1k498mk",!0),O(t,"class","container svelte-1k498mk"),k(t,"invalid",l[4])},m(i,r){g(i,t,r),T(t,s),s.autofocus&&s.focus(),B(s,l[0]),g(i,n,r),o&&o.m(i,r),g(i,u,r),f=!0,h||(d=[G(s,"input",l[9]),G(s,"blur",l[10]),H(l[5].call(null,s)),H(a=ce.call(null,s,l[2]))],h=!0)},p(i,r){q(s,_=X(v,[{class:"text-input"},{type:"password"},(!f||r&4096&&e!==(e=i[12]))&&{id:e},r&64&&i[6]])),r&1&&s.value!==i[0]&&B(s,i[0]),a&&x(a.update)&&r&4&&a.update.call(null,i[2]),k(s,"svelte-1k498mk",!0),r&16&&k(t,"invalid",i[4]),i[4]?o?(o.p(i,r),r&16&&m(o,1)):(o=Y(i),o.c(),m(o,1),o.m(u.parentNode,u)):o&&(ee(),b(o,1,1,()=>{o=null}),te())},i(i){f||(m(o),f=!0)},o(i){b(o),f=!1},d(i){i&&p(t),i&&p(n),o&&o.d(i),i&&p(u),h=!1,se(d)}}}function _e(l){let t;const s=l[8].label,e=ae(s,l,l[11],M);return{c(){e&&e.c()},l(a){e&&e.l(a)},m(a,n){e&&e.m(a,n),t=!0},p(a,n){e&&e.p&&(!t||n&2048)&&le(e,s,a,a[11],t?ie(s,a[11],n,fe):ne(a[11]),M)},i(a){t||(m(e,a),t=!0)},o(a){b(e,a),t=!1},d(a){e&&e.d(a)}}}function me(l){let t,s;return t=new re({props:{hideLabel:l[1],$$slots:{label:[_e,({labelId:e})=>({12:e}),({labelId:e})=>e?4096:0],default:[de,({labelId:e})=>({12:e}),({labelId:e})=>e?4096:0]},$$scope:{ctx:l}}}),{c(){y(t.$$.fragment)},l(e){j(t.$$.fragment,e)},m(e,a){L(t,e,a),s=!0},p(e,[a]){const n={};a&2&&(n.hideLabel=e[1]),a&6237&&(n.$$scope={dirty:a,ctx:e}),t.$set(n)},i(e){s||(m(t.$$.fragment,e),s=!0)},o(e){b(t.$$.fragment,e),s=!1},d(e){P(t,e)}}}const pe=JSON.parse('{"name":"Password","slots":[{"name":"label","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"hideLabel","optional":true,"value":false,"jsDoc":{"description":"Whether to hide the input label.","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}},{"kind":"let","name":"value","optional":true,"value":"","jsDoc":{"description":"The initial value of the component.","tags":[{"description":"","name":"","tag":"type","type":"string | undefined"}]}},{"kind":"let","name":"focus","optional":true,"value":false,"jsDoc":{"description":"Whether the input is focused.","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}},{"kind":"let","name":"invalid","optional":true}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[]}');function he(l,t,s){let e;const a=["hideLabel","value","focus","invalid"];let n=N(t,a),{$$slots:u={},$$scope:f}=t,{hideLabel:h=!1}=t,{value:d=""}=t,{focus:v=!1}=t,{invalid:_=()=>!1}=t;const o=ue();let i=!1;function r(){d=this.value,s(0,d)}const Z=()=>{s(3,i=!0)};return l.$$set=c=>{t=$($({},t),z(c)),s(6,n=N(t,a)),"hideLabel"in c&&s(1,h=c.hideLabel),"value"in c&&s(0,d=c.value),"focus"in c&&s(2,v=c.focus),"invalid"in c&&s(7,_=c.invalid),"$$scope"in c&&s(11,f=c.$$scope)},l.$$.update=()=>{l.$$.dirty&137&&s(4,e=i&&_(d))},[d,h,v,i,e,o,n,_,u,r,Z,f]}class ve extends C{constructor(t){super();E(this,t,he,me,w,{hideLabel:1,value:0,focus:2,invalid:7})}}const be={main:pe};function ge(l){let t;return{c(){t=S("I label secrets!")},l(s){t=J(s,"I label secrets!")},m(s,e){g(s,t,e)},d(s){s&&p(t)}}}function ke(l){let t,s;return t=new ve({props:{placeholder:"I can say anything!",$$slots:{label:[ge]},$$scope:{ctx:l}}}),{c(){y(t.$$.fragment)},l(e){j(t.$$.fragment,e)},m(e,a){L(t,e,a),s=!0},p(e,a){const n={};a&1&&(n.$$scope={dirty:a,ctx:e}),t.$set(n)},i(e){s||(m(t.$$.fragment,e),s=!0)},o(e){b(t.$$.fragment,e),s=!1},d(e){P(t,e)}}}function ye(l){let t,s;return t=new oe({props:{docs:be,$$slots:{inline:[ke]},$$scope:{ctx:l}}}),{c(){y(t.$$.fragment)},l(e){j(t.$$.fragment,e)},m(e,a){L(t,e,a),s=!0},p(e,[a]){const n={};a&1&&(n.$$scope={dirty:a,ctx:e}),t.$set(n)},i(e){s||(m(t.$$.fragment,e),s=!0)},o(e){b(t.$$.fragment,e),s=!1},d(e){P(t,e)}}}class Ce extends C{constructor(t){super();E(this,t,null,ye,w,{})}}export{Ce as default};
