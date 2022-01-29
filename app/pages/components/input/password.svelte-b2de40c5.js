import{S as C,i as E,s as q,j as y,m as j,o as L,x as p,u as b,v as P,O as w,B as $,P as z,e as D,t as N,c as I,a as S,g as F,d as m,b as J,f as g,H as O,h as A,U as K,a6 as T,al as U,k as Q,l as V,n as R,L as W,M as k,am as B,_ as G,N as H,p as X,Y as x,r as ee,w as te,Z as se,D as ae,E as le,F as ne,G as ie}from"../../../chunks/vendor-d49c0083.js";import{C as oe}from"../../../chunks/component-ea704966.js";import{C as re}from"../../../chunks/Container-4191741d.js";import{c as ue}from"../../../chunks/forward-events-e4dd3255.js";import{f as ce}from"../../../chunks/actions-f8e73d02.js";import"../../../chunks/JavaScript.svelte_svelte_type_style_lang-fa257c46.js";const fe=l=>({}),M=l=>({slot:"label"});function Y(l){let t,s,e,a;return{c(){t=D("div"),s=N(l[4]),this.h()},l(n){t=I(n,"DIV",{class:!0});var u=S(t);s=F(u,l[4]),u.forEach(m),this.h()},h(){J(t,"class","invalid svelte-1qrx6nf")},m(n,u){g(n,t,u),O(t,s),a=!0},p(n,u){(!a||u&16)&&A(s,n[4])},i(n){a||(K(()=>{e||(e=T(t,U,{},!0)),e.run(1)}),a=!0)},o(n){e||(e=T(t,U,{},!1)),e.run(0),a=!1},d(n){n&&m(t),n&&e&&e.end()}}}function de(l){let t,s,e,a,n,u,f,h,d,v=[{class:"text-input"},{type:"password"},{id:e=l[12]},l[6]],_={};for(let i=0;i<v.length;i+=1)_=$(_,v[i]);let o=l[4]&&Y(l);return{c(){t=D("div"),s=D("input"),n=Q(),o&&o.c(),u=V(),this.h()},l(i){t=I(i,"DIV",{class:!0});var r=S(t);s=I(r,"INPUT",{class:!0,type:!0,id:!0}),r.forEach(m),n=R(i),o&&o.l(i),u=V(),this.h()},h(){W(s,_),k(s,"svelte-1qrx6nf",!0),J(t,"class","container svelte-1qrx6nf"),k(t,"invalid",l[4])},m(i,r){g(i,t,r),O(t,s),s.autofocus&&s.focus(),B(s,l[0]),g(i,n,r),o&&o.m(i,r),g(i,u,r),f=!0,h||(d=[G(s,"input",l[9]),G(s,"blur",l[10]),H(l[5].call(null,s)),H(a=ce.call(null,s,l[2]))],h=!0)},p(i,r){W(s,_=X(v,[{class:"text-input"},{type:"password"},(!f||r&4096&&e!==(e=i[12]))&&{id:e},r&64&&i[6]])),r&1&&s.value!==i[0]&&B(s,i[0]),a&&x(a.update)&&r&4&&a.update.call(null,i[2]),k(s,"svelte-1qrx6nf",!0),r&16&&k(t,"invalid",i[4]),i[4]?o?(o.p(i,r),r&16&&p(o,1)):(o=Y(i),o.c(),p(o,1),o.m(u.parentNode,u)):o&&(ee(),b(o,1,1,()=>{o=null}),te())},i(i){f||(p(o),f=!0)},o(i){b(o),f=!1},d(i){i&&m(t),i&&m(n),o&&o.d(i),i&&m(u),h=!1,se(d)}}}function _e(l){let t;const s=l[8].label,e=ae(s,l,l[11],M);return{c(){e&&e.c()},l(a){e&&e.l(a)},m(a,n){e&&e.m(a,n),t=!0},p(a,n){e&&e.p&&(!t||n&2048)&&le(e,s,a,a[11],t?ie(s,a[11],n,fe):ne(a[11]),M)},i(a){t||(p(e,a),t=!0)},o(a){b(e,a),t=!1},d(a){e&&e.d(a)}}}function pe(l){let t,s;return t=new re({props:{hideLabel:l[1],$$slots:{label:[_e,({labelId:e})=>({12:e}),({labelId:e})=>e?4096:0],default:[de,({labelId:e})=>({12:e}),({labelId:e})=>e?4096:0]},$$scope:{ctx:l}}}),{c(){y(t.$$.fragment)},l(e){j(t.$$.fragment,e)},m(e,a){L(t,e,a),s=!0},p(e,[a]){const n={};a&2&&(n.hideLabel=e[1]),a&6237&&(n.$$scope={dirty:a,ctx:e}),t.$set(n)},i(e){s||(p(t.$$.fragment,e),s=!0)},o(e){b(t.$$.fragment,e),s=!1},d(e){P(t,e)}}}const me=JSON.parse('{"name":"Password","slots":[{"name":"label","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"hideLabel","optional":true,"value":false,"jsDoc":{"description":"Whether to hide the input label.","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}},{"kind":"let","name":"value","optional":true,"value":"","jsDoc":{"description":"The initial value of the component.","tags":[{"description":"","name":"","tag":"type","type":"string | undefined"}]}},{"kind":"let","name":"focus","optional":true,"value":false,"jsDoc":{"description":"Whether the input is focused.","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}},{"kind":"let","name":"invalid","optional":true}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[]}');function he(l,t,s){let e;const a=["hideLabel","value","focus","invalid"];let n=w(t,a),{$$slots:u={},$$scope:f}=t,{hideLabel:h=!1}=t,{value:d=""}=t,{focus:v=!1}=t,{invalid:_=()=>!1}=t;const o=ue();let i=!1;function r(){d=this.value,s(0,d)}const Z=()=>{s(3,i=!0)};return l.$$set=c=>{t=$($({},t),z(c)),s(6,n=w(t,a)),"hideLabel"in c&&s(1,h=c.hideLabel),"value"in c&&s(0,d=c.value),"focus"in c&&s(2,v=c.focus),"invalid"in c&&s(7,_=c.invalid),"$$scope"in c&&s(11,f=c.$$scope)},l.$$.update=()=>{l.$$.dirty&137&&s(4,e=i&&_(d))},[d,h,v,i,e,o,n,_,u,r,Z,f]}class ve extends C{constructor(t){super();E(this,t,he,pe,q,{hideLabel:1,value:0,focus:2,invalid:7})}}const be={main:me};function ge(l){let t;return{c(){t=N("I label secrets!")},l(s){t=F(s,"I label secrets!")},m(s,e){g(s,t,e)},d(s){s&&m(t)}}}function ke(l){let t,s;return t=new ve({props:{placeholder:"I can say anything!",$$slots:{label:[ge]},$$scope:{ctx:l}}}),{c(){y(t.$$.fragment)},l(e){j(t.$$.fragment,e)},m(e,a){L(t,e,a),s=!0},p(e,a){const n={};a&1&&(n.$$scope={dirty:a,ctx:e}),t.$set(n)},i(e){s||(p(t.$$.fragment,e),s=!0)},o(e){b(t.$$.fragment,e),s=!1},d(e){P(t,e)}}}function ye(l){let t,s;return t=new oe({props:{docs:be,$$slots:{inline:[ke]},$$scope:{ctx:l}}}),{c(){y(t.$$.fragment)},l(e){j(t.$$.fragment,e)},m(e,a){L(t,e,a),s=!0},p(e,[a]){const n={};a&1&&(n.$$scope={dirty:a,ctx:e}),t.$set(n)},i(e){s||(p(t.$$.fragment,e),s=!0)},o(e){b(t.$$.fragment,e),s=!1},d(e){P(t,e)}}}class Ce extends C{constructor(t){super();E(this,t,null,ye,q,{})}}export{Ce as default};
