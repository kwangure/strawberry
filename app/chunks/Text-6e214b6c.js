import{S as R,i as Z,s as w,j as x,m as $,o as ee,x as d,u as b,v as te,O as P,P as le,B as E,Q as se,e as j,c as D,a as I,d as h,b as T,f as y,E as V,F as S,G as B,t as ae,g as ie,H as C,h as ne,V as oe,a3 as F,ai as O,k as W,l as q,n as A,L as G,M as L,aj as H,X as N,N as J,p as ue,a7 as fe,r as M,w as Q,ad as re,D as U,Y as ce}from"./vendor-9f6e7ae3.js";import{C as _e}from"./Container-357fcbe7.js";import{c as de}from"./forward-events-77cf227d.js";import{f as pe}from"./actions-f8e73d02.js";const me=i=>({}),X=i=>({}),he=i=>({}),Y=i=>({slot:"label"});function z(i){let e,l;const t=i[9].postfix,s=U(t,i,i[12],X);return{c(){e=j("div"),s&&s.c(),this.h()},l(a){e=D(a,"DIV",{class:!0});var u=I(e);s&&s.l(u),u.forEach(h),this.h()},h(){T(e,"class","postfix-wrapper svelte-ufgo2k")},m(a,u){y(a,e,u),s&&s.m(e,null),l=!0},p(a,u){s&&s.p&&(!l||u&4096)&&V(s,t,a,a[12],l?B(t,a[12],u,me):S(a[12]),X)},i(a){l||(d(s,a),l=!0)},o(a){b(s,a),l=!1},d(a){a&&h(e),s&&s.d(a)}}}function K(i){let e,l,t,s;return{c(){e=j("div"),l=ae(i[3]),this.h()},l(a){e=D(a,"DIV",{class:!0});var u=I(e);l=ie(u,i[3]),u.forEach(h),this.h()},h(){T(e,"class","invalid svelte-ufgo2k")},m(a,u){y(a,e,u),C(e,l),s=!0},p(a,u){(!s||u&8)&&ne(l,a[3])},i(a){s||(oe(()=>{t||(t=F(e,O,{},!0)),t.run(1)}),s=!0)},o(a){t||(t=F(e,O,{},!1)),t.run(0),s=!1},d(a){a&&h(e),a&&t&&t.end()}}}function ve(i){let e,l,t,s,a,u,p,m,_,k,v=[{class:"text-input"},{type:"text"},{id:t=i[13]},i[6]],g={};for(let n=0;n<v.length;n+=1)g=E(g,v[n]);let f=i[7].postfix&&z(i),o=i[3]&&K(i);return{c(){e=j("div"),l=j("input"),a=W(),f&&f.c(),u=W(),o&&o.c(),p=q(),this.h()},l(n){e=D(n,"DIV",{class:!0});var r=I(e);l=D(r,"INPUT",{class:!0,type:!0,id:!0}),a=A(r),f&&f.l(r),r.forEach(h),u=A(n),o&&o.l(n),p=q(),this.h()},h(){G(l,g),L(l,"isInvalid",i[3]),L(l,"svelte-ufgo2k",!0),T(e,"class","container svelte-ufgo2k")},m(n,r){y(n,e,r),C(e,l),l.autofocus&&l.focus(),H(l,i[0]),C(e,a),f&&f.m(e,null),y(n,u,r),o&&o.m(n,r),y(n,p,r),m=!0,_||(k=[N(l,"input",i[11]),N(l,"blur",i[5]),J(i[4].call(null,l)),N(l,"keydown",i[10]),J(s=pe.call(null,l,i[2]))],_=!0)},p(n,r){G(l,g=ue(v,[{class:"text-input"},{type:"text"},(!m||r&8192&&t!==(t=n[13]))&&{id:t},r&64&&n[6]])),r&1&&l.value!==n[0]&&H(l,n[0]),s&&fe(s.update)&&r&4&&s.update.call(null,n[2]),L(l,"isInvalid",n[3]),L(l,"svelte-ufgo2k",!0),n[7].postfix?f?(f.p(n,r),r&128&&d(f,1)):(f=z(n),f.c(),d(f,1),f.m(e,null)):f&&(M(),b(f,1,1,()=>{f=null}),Q()),n[3]?o?(o.p(n,r),r&8&&d(o,1)):(o=K(n),o.c(),d(o,1),o.m(p.parentNode,p)):o&&(M(),b(o,1,1,()=>{o=null}),Q())},i(n){m||(d(f),d(o),m=!0)},o(n){b(f),b(o),m=!1},d(n){n&&h(e),f&&f.d(),n&&h(u),o&&o.d(n),n&&h(p),_=!1,re(k)}}}function be(i){let e;const l=i[9].label,t=U(l,i,i[12],Y);return{c(){t&&t.c()},l(s){t&&t.l(s)},m(s,a){t&&t.m(s,a),e=!0},p(s,a){t&&t.p&&(!e||a&4096)&&V(t,l,s,s[12],e?B(l,s[12],a,he):S(s[12]),Y)},i(s){e||(d(t,s),e=!0)},o(s){b(t,s),e=!1},d(s){t&&t.d(s)}}}function ge(i){let e,l;return e=new _e({props:{hideLabel:i[1],$$slots:{label:[be,({labelId:t})=>({13:t}),({labelId:t})=>t?8192:0],default:[ve,({labelId:t})=>({13:t}),({labelId:t})=>t?8192:0]},$$scope:{ctx:i}}}),{c(){x(e.$$.fragment)},l(t){$(e.$$.fragment,t)},m(t,s){ee(e,t,s),l=!0},p(t,[s]){const a={};s&2&&(a.hideLabel=t[1]),s&12493&&(a.$$scope={dirty:s,ctx:t}),e.$set(a)},i(t){l||(d(e.$$.fragment,t),l=!0)},o(t){b(e.$$.fragment,t),l=!1},d(t){te(e,t)}}}const Ee=JSON.parse('{"name":"Text","slots":[{"name":"label","htmlDoc":null},{"name":"postfix","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"hideLabel","optional":true,"value":false,"jsDoc":{"description":"Whether to hide the input label.","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}},{"kind":"let","name":"value","optional":true,"value":"","jsDoc":{"description":"The initial value of the component.","tags":[{"description":"","name":"","tag":"type","type":"string | undefined"}]}},{"kind":"let","name":"focus","optional":true,"value":false,"jsDoc":{"description":"Whether the input is focused.","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}},{"kind":"let","name":"invalid","optional":true,"jsDoc":{"description":"A function to check whether the \\"value\\" is valid.","tags":[{"description":"","name":"","tag":"type","type":"(value: string) => boolean"}]}}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[]}');function ke(i,e,l){const t=["hideLabel","value","focus","invalid"];let s=P(e,t),{$$slots:a={},$$scope:u}=e;const p=le(a);let{hideLabel:m=!1}=e,{value:_=""}=e,{focus:k=!1}=e,{invalid:v=c=>!1}=e;const g=de();function f(){l(3,o=v(_))}let o=!1;function n(c){ce.call(this,i,c)}function r(){_=this.value,l(0,_)}return i.$$set=c=>{e=E(E({},e),se(c)),l(6,s=P(e,t)),"hideLabel"in c&&l(1,m=c.hideLabel),"value"in c&&l(0,_=c.value),"focus"in c&&l(2,k=c.focus),"invalid"in c&&l(8,v=c.invalid),"$$scope"in c&&l(12,u=c.$$scope)},[_,m,k,o,g,f,s,p,v,a,n,r,u]}class Ie extends R{constructor(e){super();Z(this,e,ke,ge,w,{hideLabel:1,value:0,focus:2,invalid:8})}}export{Ie as T,Ee as d};
