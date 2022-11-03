import{S as G,i as H,s as J,F as B,l as z,a as j,m as C,p as E,c as A,h,q as W,G as O,b as v,L as M,H as co,I as F,J as I,K as V,f as k,t as D,_ as io,P as q,$ as N,x as K,y as Q,z as X,C as Y,a0 as Z,u as L,v as R,a1 as x,T as uo,R as oo,n as fo}from"../chunks/index-8333b970.js";/* empty css                        */import{C as po}from"../chunks/component-85bd3def.js";import"../chunks/language-e15a231f.js";import"../chunks/forward-events-ac79da41.js";const mo=t=>({context:t&4}),to=t=>({context:t[2]}),_o=t=>({context:t&4}),eo=t=>({context:t[2]}),ho=t=>({context:t&4}),no=t=>({context:t[2]});function go(t){let o,e,l,s,n,i,g;const b=t[10].header,p=B(b,t,t[9],no),$=t[10].content,d=B($,t,t[9],eo),m=t[10].footer,f=B(m,t,t[9],to);return{c(){o=z("dialog"),e=z("form"),p&&p.c(),l=j(),d&&d.c(),s=j(),f&&f.c(),this.h()},l(a){o=C(a,"DIALOG",{inert:!0,class:!0});var u=E(o);e=C(u,"FORM",{method:!0,class:!0});var r=E(e);p&&p.l(r),l=A(r),d&&d.l(r),s=A(r),f&&f.l(r),r.forEach(h),u.forEach(h),this.h()},h(){W(e,"method","dialog"),W(e,"class","svelte-1orqh4z"),W(o,"inert",""),W(o,"class","svelte-1orqh4z"),O(o,"modal",t[3]),O(o,"non-modal",!t[3])},m(a,u){v(a,o,u),M(o,e),p&&p.m(e,null),M(e,l),d&&d.m(e,null),M(e,s),f&&f.m(e,null),t[11](e),t[12](o),n=!0,i||(g=co(t[4].call(null,o)),i=!0)},p(a,[u]){p&&p.p&&(!n||u&516)&&F(p,b,a,a[9],n?V(b,a[9],u,ho):I(a[9]),no),d&&d.p&&(!n||u&516)&&F(d,$,a,a[9],n?V($,a[9],u,_o):I(a[9]),eo),f&&f.p&&(!n||u&516)&&F(f,m,a,a[9],n?V(m,a[9],u,mo):I(a[9]),to),u&8&&O(o,"modal",a[3]),u&8&&O(o,"non-modal",!a[3])},i(a){n||(k(p,a),k(d,a),k(f,a),n=!0)},o(a){D(p,a),D(d,a),D(f,a),n=!1},d(a){a&&h(o),p&&p.d(a),d&&d.d(a),f&&f.d(a),t[11](null),t[12](null),i=!1,g()}}}function bo(t,o,e){let{$$slots:l={},$$scope:s}=o;const n=io();let{context:i=void 0}=o;function g(c){m.close(c)}const b=p;function p(c){e(3,u=!1),m.showModal(),_(c)}const $=d;function d(c){e(3,u=!0),m.showModal(),_(c)}let m,f,a=i,u=!1;function r(c){n(c,{returnValue:m.returnValue,formData:new FormData(f)})}function _(c={}){var T,P;e(2,a=(T=c.target)==null?void 0:T.value),m.removeAttribute("inert");const S=m.querySelector("[autofocus]");S?S.focus():(P=m.querySelector("button"))==null||P.focus(),r("open")}function w(c){const S=[],T=Array.prototype.push.bind(S),P=c.firstElementChild;function U(y){n(y,{returnValue:c.returnValue,formData:new FormData(P)})}function ao(y){c.close(y),P.reset(),e(2,a=i)}return T(q(c,"click",y=>{u||!c.isSameNode(y.target)||(q(document,"close",ro=>{ro.stopPropagation()},{once:!0,capture:!0}),ao(""),U("cancel"),U("close"))})),T(q(c,"close",()=>{U("close")})),{destroy(){var y;for(;S.length;)(y=S.pop())==null||y()}}}function so(c){N[c?"unshift":"push"](()=>{f=c,e(1,f)})}function lo(c){N[c?"unshift":"push"](()=>{m=c,e(0,m)})}return t.$$set=c=>{"context"in c&&e(5,i=c.context),"$$scope"in c&&e(9,s=c.$$scope)},[m,f,a,u,w,i,g,b,$,s,l,so,lo]}class $o extends G{constructor(o){super(),H(this,o,bo,go,J,{context:5,close:6,show:7,showModal:8})}get close(){return this.$$.ctx[6]}get show(){return this.$$.ctx[7]}get showModal(){return this.$$.ctx[8]}}function wo(t){let o,e;const l=t[1].default,s=B(l,t,t[0],null);return{c(){o=z("article"),s&&s.c(),this.h()},l(n){o=C(n,"ARTICLE",{class:!0});var i=E(o);s&&s.l(i),i.forEach(h),this.h()},h(){W(o,"class","svelte-1nclbw")},m(n,i){v(n,o,i),s&&s.m(o,null),e=!0},p(n,[i]){s&&s.p&&(!e||i&1)&&F(s,l,n,n[0],e?V(l,n[0],i,null):I(n[0]),null)},i(n){e||(k(s,n),e=!0)},o(n){D(s,n),e=!1},d(n){n&&h(o),s&&s.d(n)}}}function yo(t,o,e){let{$$slots:l={},$$scope:s}=o;return t.$$set=n=>{"$$scope"in n&&e(0,s=n.$$scope)},[s,l]}class vo extends G{constructor(o){super(),H(this,o,yo,wo,J,{})}}const ko={name:"Dialog",slots:[{name:"header",htmlDoc:null},{name:"content",htmlDoc:null},{name:"footer",htmlDoc:null}],description:"",workingDirectoryFilepath:"src/lib/components/dialog/dialog.svelte",props:[{kind:"let",name:"context",optional:!0,jsDoc:{description:"The default context to render the unopened modal",tags:[{description:"",name:"",tag:"type",type:"any"}]}},{kind:"function",name:"close",jsDoc:{description:"",tags:[{description:"",name:"returnValue",tag:"param",type:"string | undefined"}]}},{kind:"const",name:"show",optional:!0,jsDoc:{description:"When called, the function opens the dialog in non-modal mode",tags:[{description:"",name:"",tag:"type",type:"(options: { target?: { value: any }; }) => void"}]}},{kind:"const",name:"showModal",optional:!0,jsDoc:{description:"When called, the function opens the dialog in modal mode",tags:[{description:"",name:"",tag:"type",type:"(options: { target?: { value: any }; }) => void"}]}}],exports:[],customProperties:[{customProperty:"--br-dialog-root-max-inline-size",end:{offset:3629,line:175,column:57},location:"https://developer.mozilla.org/docs/Web/CSS/max-inline-size",property:"max-inline-size",start:{offset:3575,line:175,column:3},syntax:"<'max-width'>",cssDoc:null},{customProperty:"--br-dialog-root-max-block-size",end:{offset:3685,line:176,column:55},location:"https://developer.mozilla.org/docs/Web/CSS/max-block-size",property:"max-block-size",start:{offset:3633,line:176,column:3},syntax:"<'max-width'>",cssDoc:null},{customProperty:"--br-dialog-root-box-shadow",end:{offset:3783,line:180,column:47},location:"https://developer.mozilla.org/docs/Web/CSS/box-shadow",property:"box-shadow",start:{offset:3739,line:180,column:3},syntax:"none | <shadow>#",cssDoc:null},{customProperty:"--br-dialog-root-background-color",end:{offset:3937,line:184,column:59},location:"https://developer.mozilla.org/docs/Web/CSS/background-color",property:"background-color",start:{offset:3881,line:184,column:3},syntax:"<color>",cssDoc:null},{customProperty:"--br-dialog-root-font-color",end:{offset:3980,line:185,column:42},location:"https://developer.mozilla.org/docs/Web/CSS/color",property:"color",start:{offset:3941,line:185,column:3},syntax:"<color>",cssDoc:null},{customProperty:"--br-dialog-backdrop-background-color",end:{offset:5113,line:237,column:63},location:"https://developer.mozilla.org/docs/Web/CSS/background-color",property:"background-color",start:{offset:5053,line:237,column:3},syntax:"<color>",cssDoc:null}]},Do={main:ko};function So(t){let o,e,l;return{c(){o=L(`I have value
                `),e=z("button"),l=L("Submit"),this.h()},l(s){o=R(s,`I have value
                `),e=C(s,"BUTTON",{});var n=E(e);l=R(n,"Submit"),n.forEach(h),this.h()},h(){e.value="submit"},m(s,n){v(s,o,n),v(s,e,n),M(e,l)},p:fo,d(s){s&&h(o),s&&h(e)}}}function Mo(t){let o,e;return o=new vo({props:{slot:"content",$$slots:{default:[So]},$$scope:{ctx:t}}}),{c(){K(o.$$.fragment)},l(l){Q(o.$$.fragment,l)},m(l,s){X(o,l,s),e=!0},p(l,s){const n={};s&16&&(n.$$scope={dirty:s,ctx:l}),o.$set(n)},i(l){e||(k(o.$$.fragment,l),e=!0)},o(l){D(o.$$.fragment,l),e=!1},d(l){Y(o,l)}}}function zo(t){let o,e,l,s,n,i,g,b,p,$,d,m;function f(r){t[2](r)}function a(r){t[3](r)}let u={$$slots:{content:[Mo]},$$scope:{ctx:t}};return t[0]!==void 0&&(u.showModal=t[0]),t[1]!==void 0&&(u.show=t[1]),o=new $o({props:u}),N.push(()=>Z(o,"showModal",f)),N.push(()=>Z(o,"show",a)),{c(){K(o.$$.fragment),s=j(),n=z("button"),i=L("Show"),g=j(),b=z("button"),p=L("Show modal")},l(r){Q(o.$$.fragment,r),s=A(r),n=C(r,"BUTTON",{});var _=E(n);i=R(_,"Show"),_.forEach(h),g=A(r),b=C(r,"BUTTON",{});var w=E(b);p=R(w,"Show modal"),w.forEach(h)},m(r,_){X(o,r,_),v(r,s,_),v(r,n,_),M(n,i),v(r,g,_),v(r,b,_),M(b,p),$=!0,d||(m=[q(n,"click",function(){oo(t[1])&&t[1].apply(this,arguments)}),q(b,"click",function(){oo(t[0])&&t[0].apply(this,arguments)})],d=!0)},p(r,_){t=r;const w={};_&16&&(w.$$scope={dirty:_,ctx:t}),!e&&_&1&&(e=!0,w.showModal=t[0],x(()=>e=!1)),!l&&_&2&&(l=!0,w.show=t[1],x(()=>l=!1)),o.$set(w)},i(r){$||(k(o.$$.fragment,r),$=!0)},o(r){D(o.$$.fragment,r),$=!1},d(r){Y(o,r),r&&h(s),r&&h(n),r&&h(g),r&&h(b),d=!1,uo(m)}}}function Co(t){let o,e;return o=new po({props:{docs:Do,$$slots:{block:[zo]},$$scope:{ctx:t}}}),{c(){K(o.$$.fragment)},l(l){Q(o.$$.fragment,l)},m(l,s){X(o,l,s),e=!0},p(l,[s]){const n={};s&19&&(n.$$scope={dirty:s,ctx:l}),o.$set(n)},i(l){e||(k(o.$$.fragment,l),e=!0)},o(l){D(o.$$.fragment,l),e=!1},d(l){Y(o,l)}}}function Eo(t,o,e){let l,s;function n(g){l=g,e(0,l)}function i(g){s=g,e(1,s)}return[l,s,n,i]}class Fo extends G{constructor(o){super(),H(this,o,Eo,Co,J,{})}}export{Fo as default};
