import{S as s,i as a,s as e,j as l,m as t,o as n,v as i,r,w as c,W as o,A as d,X as u,e as p,t as $,c as f,a as m,g as h,d as v,b,f as k,H as x,h as I,O as g,P as w,k as j,l as y,n as L,V as S,E as D,a3 as E,K as V,F as N,p as P,Q as T,B as _,u as A,$ as B,D as C,G as F}from"../../chunks/index-f035eec9.js";import"../../chunks/index-8ba9bb0d.js";import{C as G,f as H}from"../../chunks/Textarea.svelte-4089f91c.js";/* empty css                               */import{c as K}from"../../chunks/forward-events-b23ffd0e.js";import{s as O}from"../../chunks/index-b859a8b0.js";const Q=s=>({}),U=s=>({slot:"label"});function W(s){let a,e,l,t;return{c(){a=p("div"),e=$(s[4]),this.h()},l(l){a=f(l,"DIV",{class:!0});var t=m(a);e=h(t,s[4]),t.forEach(v),this.h()},h(){b(a,"class","invalid svelte-5nkv2r")},m(s,l){k(s,a,l),x(a,e),t=!0},p(s,a){(!t||16&a)&&I(e,s[4])},i(s){t||(g((()=>{l||(l=w(a,O,{},!0)),l.run(1)})),t=!0)},o(s){l||(l=w(a,O,{},!1)),l.run(0),t=!1},d(s){s&&v(a),s&&l&&l.end()}}}function X(s){let a,e,l,t,n,c,o,u,$,h=[{type:"password"},{id:l=s[12]},s[6]],I={};for(let i=0;i<h.length;i+=1)I=d(I,h[i]);let g=s[4]&&W(s);return{c(){a=p("div"),e=p("input"),n=j(),g&&g.c(),c=y(),this.h()},l(s){a=f(s,"DIV",{class:!0});var l=m(a);e=f(l,"INPUT",{type:!0,id:!0}),l.forEach(v),n=L(s),g&&g.l(s),c=y(),this.h()},h(){S(e,I),D(e,"is_invalid",s[4]),D(e,"svelte-5nkv2r",!0),b(a,"class","container svelte-5nkv2r")},m(l,i){k(l,a,i),x(a,e),E(e,s[0]),k(l,n,i),g&&g.m(l,i),k(l,c,i),o=!0,u||($=[V(e,"input",s[9]),V(e,"blur",s[10]),N(s[5].call(null,e)),N(t=H.call(null,e,s[2]))],u=!0)},p(s,a){S(e,I=P(h,[{type:"password"},(!o||4096&a&&l!==(l=s[12]))&&{id:l},64&a&&s[6]])),1&a&&e.value!==s[0]&&E(e,s[0]),t&&T(t.update)&&4&a&&t.update.call(null,s[2]),D(e,"is_invalid",s[4]),D(e,"svelte-5nkv2r",!0),s[4]?g?(g.p(s,a),16&a&&i(g,1)):(g=W(s),g.c(),i(g,1),g.m(c.parentNode,c)):g&&(_(),r(g,1,1,(()=>{g=null})),A())},i(s){o||(i(g),o=!0)},o(s){r(g),o=!1},d(s){s&&v(a),s&&v(n),g&&g.d(s),s&&v(c),u=!1,B($)}}}function q(s){let a;const e=s[8].label,l=C(e,s,s[11],U);return{c(){l&&l.c()},l(s){l&&l.l(s)},m(s,e){l&&l.m(s,e),a=!0},p(s,a){l&&l.p&&2048&a&&F(l,e,s,s[11],a,Q,U)},i(s){a||(i(l,s),a=!0)},o(s){r(l,s),a=!1},d(s){l&&l.d(s)}}}function z(s){let a,e;return a=new G({props:{class:"berry-input-password",hideLabel:s[1],$$slots:{label:[q,({labelId:s})=>({12:s}),({labelId:s})=>s?4096:0],default:[X,({labelId:s})=>({12:s}),({labelId:s})=>s?4096:0]},$$scope:{ctx:s}}}),{c(){l(a.$$.fragment)},l(s){t(a.$$.fragment,s)},m(s,l){n(a,s,l),e=!0},p(s,[e]){const l={};2&e&&(l.hideLabel=s[1]),6237&e&&(l.$$scope={dirty:e,ctx:s}),a.$set(l)},i(s){e||(i(a.$$.fragment,s),e=!0)},o(s){r(a.$$.fragment,s),e=!1},d(s){c(a,s)}}}function J(s,a,e){let l;const t=["hideLabel","value","focus","invalid"];let n=o(a,t),{$$slots:i={},$$scope:r}=a,{hideLabel:c=!1}=a,{value:p=""}=a,{focus:$=!1}=a,{invalid:f=(()=>!1)}=a;const m=K();let h=!1;return s.$$set=s=>{a=d(d({},a),u(s)),e(6,n=o(a,t)),"hideLabel"in s&&e(1,c=s.hideLabel),"value"in s&&e(0,p=s.value),"focus"in s&&e(2,$=s.focus),"invalid"in s&&e(7,f=s.invalid),"$$scope"in s&&e(11,r=s.$$scope)},s.$$.update=()=>{137&s.$$.dirty&&e(4,l=h&&f(p))},[p,c,$,h,l,m,n,f,i,function(){p=this.value,e(0,p)},()=>{e(3,h=!0)},r]}class M extends s{constructor(s){super(),a(this,s,J,z,e,{hideLabel:1,value:0,focus:2,invalid:7})}}function R(s){let a;return{c(){a=$("Steal me! I'm password")},l(s){a=h(s,"Steal me! I'm password")},m(s,e){k(s,a,e)},d(s){s&&v(a)}}}function Y(s){let a,e;return a=new M({props:{placeholder:"Steal me! I'm password",$$slots:{label:[R]},$$scope:{ctx:s}}}),{c(){l(a.$$.fragment)},l(s){t(a.$$.fragment,s)},m(s,l){n(a,s,l),e=!0},p(s,[e]){const l={};1&e&&(l.$$scope={dirty:e,ctx:s}),a.$set(l)},i(s){e||(i(a.$$.fragment,s),e=!0)},o(s){r(a.$$.fragment,s),e=!1},d(s){c(a,s)}}}export default class extends s{constructor(s){super(),a(this,s,null,Y,e,{})}}
