import{S as e,i as a,s as t,j as n,m as s,o as l,x as r,u as i,v as o,ai as p,ae as c,e as u,k as d,l as m,c as h,a as $,n as f,d as v,b,L as g,f as y,G as w,ah as x,W as k,M as j,aj as D,a6 as I,r as N,w as U,ab as E,D as L,E as T,a7 as P,t as W,g as A,h as C,U as S,a2 as V,ag as M}from"../../../chunks/vendor-60cb395e.js";import{C as O}from"../../../chunks/component-68462293.js";import{C as z}from"../../../chunks/Container-8580a7b3.js";import{c as G}from"../../../chunks/forward-events-13fb088f.js";import{f as J}from"../../../chunks/actions-f8e73d02.js";import{I as q}from"../../../chunks/Path-a25a428a.js";import"../../../chunks/Code-1d083102.js";import"../../../chunks/preload-helper-13c00eaa.js";const B=e=>({}),F=e=>({slot:"label"});function H(e){let a,t,n,s,l,r;return{c(){a=u("div"),t=W("Use a number smaller than "),n=W(e[5]),s=W("."),this.h()},l(l){a=h(l,"DIV",{class:!0});var r=$(a);t=A(r,"Use a number smaller than "),n=A(r,e[5]),s=A(r,"."),r.forEach(v),this.h()},h(){b(a,"class","invalid svelte-4swri1")},m(e,l){y(e,a,l),w(a,t),w(a,n),w(a,s),r=!0},p(e,a){(!r||32&a)&&C(n,e[5])},i(e){r||(S((()=>{l||(l=V(a,M,{},!0)),l.run(1)})),r=!0)},o(e){l||(l=V(a,M,{},!1)),l.run(0),r=!1},d(e){e&&v(a),e&&l&&l.end()}}}function K(e){let a,t,n,s,l,r;return{c(){a=u("div"),t=W("Use a number larger than "),n=W(e[4]),s=W("."),this.h()},l(l){a=h(l,"DIV",{class:!0});var r=$(a);t=A(r,"Use a number larger than "),n=A(r,e[4]),s=A(r,"."),r.forEach(v),this.h()},h(){b(a,"class","invalid svelte-4swri1")},m(e,l){y(e,a,l),w(a,t),w(a,n),w(a,s),r=!0},p(e,a){(!r||16&a)&&C(n,e[4])},i(e){r||(S((()=>{l||(l=V(a,M,{},!0)),l.run(1)})),r=!0)},o(e){l||(l=V(a,M,{},!1)),l.run(0),r=!1},d(e){e&&v(a),e&&l&&l.end()}}}function Q(e){let a,t,L,T,P,W,A,C,S,V,M,O,z,G,B,F,Q,R;C=new q({props:{path:p}}),M=new q({props:{path:c}});const X=[K,H],Y=[];function Z(e,a){return e[9]?0:e[10]?1:-1}return~(z=Z(e))&&(G=Y[z]=X[z](e)),{c(){a=u("div"),t=u("input"),P=d(),W=u("div"),A=u("span"),n(C.$$.fragment),S=d(),V=u("span"),n(M.$$.fragment),O=d(),G&&G.c(),B=m(),this.h()},l(e){a=h(e,"DIV",{class:!0});var n=$(a);t=h(n,"INPUT",{class:!0,id:!0,placeholder:!0,step:!0,type:!0}),P=f(n),W=h(n,"DIV",{class:!0});var l=$(W);A=h(l,"SPAN",{class:!0});var r=$(A);s(C.$$.fragment,r),r.forEach(v),S=f(l),V=h(l,"SPAN",{class:!0});var i=$(V);s(M.$$.fragment,i),i.forEach(v),l.forEach(v),n.forEach(v),O=f(e),G&&G.l(e),B=m(),this.h()},h(){b(t,"class","text-input svelte-4swri1"),b(t,"id",L=e[21]),b(t,"placeholder",e[7]),t.readOnly=e[8],b(t,"step",e[6]),b(t,"type","number"),b(A,"class","postfix-up svelte-4swri1"),b(V,"class","postfix-down svelte-4swri1"),b(W,"class","postfix-wrapper svelte-4swri1"),b(a,"class","container svelte-4swri1"),g(a,"invalid",!e[2])},m(n,s){y(n,a,s),w(a,t),e[16](t),x(t,e[0]),w(a,P),w(a,W),w(W,A),l(C,A,null),w(W,S),w(W,V),l(M,V,null),y(n,O,s),~z&&Y[z].m(n,s),y(n,B,s),F=!0,Q||(R=[k(t,"input",e[17]),k(t,"blur",e[18]),j(T=J.call(null,t,e[1])),j(e[12].call(null,t)),k(A,"click",e[13]),k(V,"click",e[14])],Q=!0)},p(e,n){(!F||2097152&n&&L!==(L=e[21]))&&b(t,"id",L),(!F||128&n)&&b(t,"placeholder",e[7]),(!F||256&n)&&(t.readOnly=e[8]),(!F||64&n)&&b(t,"step",e[6]),1&n&&D(t.value)!==e[0]&&x(t,e[0]),T&&I(T.update)&&2&n&&T.update.call(null,e[1]),4&n&&g(a,"invalid",!e[2]);let s=z;z=Z(e),z===s?~z&&Y[z].p(e,n):(G&&(N(),i(Y[s],1,1,(()=>{Y[s]=null})),U()),~z?(G=Y[z],G?G.p(e,n):(G=Y[z]=X[z](e),G.c()),r(G,1),G.m(B.parentNode,B)):G=null)},i(e){F||(r(C.$$.fragment,e),r(M.$$.fragment,e),r(G),F=!0)},o(e){i(C.$$.fragment,e),i(M.$$.fragment,e),i(G),F=!1},d(t){t&&v(a),e[16](null),o(C),o(M),t&&v(O),~z&&Y[z].d(t),t&&v(B),Q=!1,E(R)}}}function R(e){let a;const t=e[15].label,n=L(t,e,e[19],F);return{c(){n&&n.c()},l(e){n&&n.l(e)},m(e,t){n&&n.m(e,t),a=!0},p(e,s){n&&n.p&&(!a||524288&s)&&T(n,t,e,e[19],a?s:-1,B,F)},i(e){a||(r(n,e),a=!0)},o(e){i(n,e),a=!1},d(e){n&&n.d(e)}}}function X(e){let a,t;return a=new z({props:{class:"berry-input-number",hideLabel:e[3],$$slots:{label:[R,({labelId:e})=>({21:e}),({labelId:e})=>e?2097152:0],default:[Q,({labelId:e})=>({21:e}),({labelId:e})=>e?2097152:0]},$$scope:{ctx:e}}}),{c(){n(a.$$.fragment)},l(e){s(a.$$.fragment,e)},m(e,n){l(a,e,n),t=!0},p(e,[t]){const n={};8&t&&(n.hideLabel=e[3]),2625527&t&&(n.$$scope={dirty:t,ctx:e}),a.$set(n)},i(e){t||(r(a.$$.fragment,e),t=!0)},o(e){i(a.$$.fragment,e),t=!1},d(e){o(a,e)}}}function Y(e,a,t){let n,s,{$$slots:l={},$$scope:r}=a,{hideLabel:i=!1}=a,{min:o}=a,{max:p}=a,{value:c}=a,{step:u=1}=a,{focus:d=!1}=a,{placeholder:m=""}=a,{valid:h=!0}=a,{readonly:$=!1}=a;const f=G();let v={stepUp(){},stepDown(){}};function b(){v.dispatchEvent(new Event("change"))}return e.$$set=e=>{"hideLabel"in e&&t(3,i=e.hideLabel),"min"in e&&t(4,o=e.min),"max"in e&&t(5,p=e.max),"value"in e&&t(0,c=e.value),"step"in e&&t(6,u=e.step),"focus"in e&&t(1,d=e.focus),"placeholder"in e&&t(7,m=e.placeholder),"valid"in e&&t(2,h=e.valid),"readonly"in e&&t(8,$=e.readonly),"$$scope"in e&&t(19,r=e.$$scope)},e.$$.update=()=>{17&e.$$.dirty&&t(9,n=o&&Number(c)<o),33&e.$$.dirty&&t(10,s=p&&Number(c)>p),1537&e.$$.dirty&&t(2,h=isNaN(Number(c))||!n&&!s)},[c,d,h,i,o,p,u,m,$,n,s,v,f,function(){v.stepUp(),b()},function(){v.stepDown(),b()},l,function(e){P[e?"unshift":"push"]((()=>{v=e,t(11,v)}))},function(){c=D(this.value),t(0,c)},()=>t(1,d=!1),r]}class Z extends e{constructor(e){super(),a(this,e,Y,X,t,{hideLabel:3,min:4,max:5,value:0,step:6,focus:1,placeholder:7,valid:2,readonly:8})}}const _={main:JSON.parse('{"name":"Number","slots":[{"name":{"start":2168,"end":2180,"type":"Attribute","name":"name","value":[{"start":2174,"end":2179,"type":"Text","raw":"label","data":"label"}]}}],"description":"","props":[{"kind":"let","name":"hideLabel","optional":true,"value":false,"jsDoc":{"description":"Whether to hide the input label.","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}},{"kind":"let","name":"min","optional":true,"jsDoc":{"description":"The minimum value to accept.","tags":[{"description":"","name":"","tag":"type","type":"number | undefined"}]}},{"kind":"let","name":"max","optional":true,"jsDoc":{"description":"The maximum value to accept.","tags":[{"description":"","name":"","tag":"type","type":"number | undefined"}]}},{"kind":"let","name":"value","optional":true,"jsDoc":{"description":"The initial value of the component.","tags":[{"description":"","name":"","tag":"type","type":"number | undefined"}]}},{"kind":"let","name":"step","optional":true,"value":1,"jsDoc":{"description":"A stepping interval to use when using up and down arrows to adjust the value, as well as for validation.","tags":[{"description":"","name":"","tag":"type","type":"number"}]}},{"kind":"let","name":"focus","optional":true,"value":false,"jsDoc":{"description":"Whether the input is focused.","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}},{"kind":"let","name":"placeholder","optional":true,"value":"","jsDoc":{"description":"Text that appears in the form control when it has no value set","tags":[{"description":"","name":"","tag":"type","type":"string"}]}},{"kind":"let","name":"valid","optional":true,"value":true,"jsDoc":{"description":"Whether \\"value\\" is a number between \\"min\\" and \\"max\\".","tags":[{"description":"","name":"","tag":"type","type":"boolean"},{"description":"","name":"","tag":"readonly","type":""}]}},{"kind":"let","name":"readonly","optional":true,"value":false,"jsDoc":{"description":"Whether the input is readonly","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}}],"exports":[],"customProperties":[{"name":"--br-icon-size","value":"21px"}]}')};function ee(e){let a;return{c(){a=W("Mi label numeros!")},l(e){a=A(e,"Mi label numeros!")},m(e,t){y(e,a,t)},d(e){e&&v(a)}}}function ae(e){let a,t;return a=new Z({props:{placeholder:"Use keyboard or UI arrows!",$$slots:{label:[ee]},$$scope:{ctx:e}}}),{c(){n(a.$$.fragment)},l(e){s(a.$$.fragment,e)},m(e,n){l(a,e,n),t=!0},p(e,t){const n={};1&t&&(n.$$scope={dirty:t,ctx:e}),a.$set(n)},i(e){t||(r(a.$$.fragment,e),t=!0)},o(e){i(a.$$.fragment,e),t=!1},d(e){o(a,e)}}}function te(e){let a,t;return a=new O({props:{docs:_,$$slots:{inline:[ae]},$$scope:{ctx:e}}}),{c(){n(a.$$.fragment)},l(e){s(a.$$.fragment,e)},m(e,n){l(a,e,n),t=!0},p(e,[t]){const n={};1&t&&(n.$$scope={dirty:t,ctx:e}),a.$set(n)},i(e){t||(r(a.$$.fragment,e),t=!0)},o(e){i(a.$$.fragment,e),t=!1},d(e){o(a,e)}}}export default class extends e{constructor(e){super(),a(this,e,null,te,t,{})}}
