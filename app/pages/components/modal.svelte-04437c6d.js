var G=Object.getOwnPropertySymbols;var de=Object.prototype.hasOwnProperty,_e=Object.prototype.propertyIsEnumerable;var H=(n,t)=>{var s={};for(var e in n)de.call(n,e)&&t.indexOf(e)<0&&(s[e]=n[e]);if(n!=null&&G)for(var e of G(n))t.indexOf(e)<0&&_e.call(n,e)&&(s[e]=n[e]);return s};import{at as me,S as T,i as z,s as A,e as I,k as P,c as C,a as E,d as v,n as U,b as M,M as K,f as S,H as V,_ as pe,au as he,E as L,F as Q,G as X,x as b,j as O,m as R,o as F,I as ve,u as y,v as J,r as Y,w as Z,U as x,av as $e,a8 as ee,aw as ge,l as te,aa as be,D as se,ax as ne,ab as ke,ac as ye,ad as we,ae as je,t as oe,g as le}from"../../chunks/vendor-fab38dda.js";import{B as ae}from"../../chunks/Tabs.svelte_svelte_type_style_lang-cf5ee00e.js";import{C as De}from"../../chunks/component-34fb119c.js";import"../../chunks/forward-events-b24822df.js";import"../../chunks/JavaScript.svelte_svelte_type_style_lang-2840d63e.js";function ie(n,t){for(const s in t)({}).hasOwnProperty.call(t,s)&&(n[s]=t[s]);return n}function Ie(n){return typeof n=="function"}function Ce(s){var e=s,{fallback:n}=e,t=H(e,["fallback"]);const o=new Map,a=new Map;function h(l,c,p){const{delay:u=0,duration:f=g=>Math.sqrt(g)*30,easing:w=me,fade:k=!0}=ie(ie({},t),p),j=c.getBoundingClientRect(),d=l.left-j.left,r=l.top-j.top,B=l.width/j.width,m=l.height/j.height,i=Math.sqrt(d*d+r*r),_=getComputedStyle(c),N=_.transform==="none"?"":_.transform,D=Number(_.opacity);return{delay:u,duration:Ie(f)?f(i):f,easing:w,css:(g,q)=>`
				opacity: ${k?g*1.5*D:D};
				transform-origin: top left;
				transform: ${N} translate(${q*d}px,${q*r}px) scale(${g+(1-g)*B}, ${g+(1-g)*m});
			`}}function $(l,c,p){return(u,f)=>(l.set(f.key,{rect:u.getBoundingClientRect()}),()=>{if(c.has(f.key)){const{rect:w}=c.get(f.key);return c.delete(f.key),h(w,u,f)}return l.delete(f.key),n&&n(u,f,p)})}return[$(a,o,!1),$(o,a,!0)]}const Ee=Ce({duration:300,fade:!1});const Me=n=>({}),re=n=>({}),Ve=n=>({}),ce=n=>({});function fe(n){let t,s,e,o,a,h,$,l,c,p,u,f,w,k;const j=n[7].header,d=se(j,n,n[6],ce);let r=n[1]&&ue(n);const B=n[7].content,m=se(B,n,n[6],re);return{c(){t=I("div"),s=I("div"),e=I("div"),o=I("div"),a=I("div"),d&&d.c(),h=P(),r&&r.c(),$=P(),l=I("div"),m&&m.c(),this.h()},l(i){t=C(i,"DIV",{class:!0});var _=E(t);s=C(_,"DIV",{class:!0});var N=E(s);e=C(N,"DIV",{class:!0});var D=E(e);o=C(D,"DIV",{class:!0});var g=E(o);a=C(g,"DIV",{class:!0});var q=E(a);d&&d.l(q),q.forEach(v),h=U(g),r&&r.l(g),g.forEach(v),$=U(D),l=C(D,"DIV",{class:!0});var W=E(l);m&&m.l(W),W.forEach(v),D.forEach(v),N.forEach(v),_.forEach(v),this.h()},h(){M(a,"class","header-content svelte-3rj6d0"),M(o,"class","header svelte-3rj6d0"),M(l,"class","content svelte-3rj6d0"),M(e,"class","modal svelte-3rj6d0"),K(e,"closable",n[1]),M(s,"class","wrapper svelte-3rj6d0"),M(t,"class","berry-modal overlay svelte-3rj6d0")},m(i,_){S(i,t,_),V(t,s),V(s,e),V(e,o),V(o,a),d&&d.m(a,null),V(o,h),r&&r.m(o,null),V(e,$),V(e,l),m&&m.m(l,null),f=!0,w||(k=pe(t,"click",he(n[9])),w=!0)},p(i,_){d&&d.p&&(!f||_&64)&&L(d,j,i,i[6],f?X(j,i[6],_,Ve):Q(i[6]),ce),i[1]?r?(r.p(i,_),_&2&&b(r,1)):(r=ue(i),r.c(),b(r,1),r.m(o,null)):r&&(Y(),y(r,1,1,()=>{r=null}),Z()),m&&m.p&&(!f||_&64)&&L(m,B,i,i[6],f?X(B,i[6],_,Me):Q(i[6]),re),_&2&&K(e,"closable",i[1])},i(i){f||(b(d,i),b(r),b(m,i),x(()=>{p&&p.end(1),c=$e(e,n[3],{key:"modal"}),c.start()}),x(()=>{u||(u=ee(t,ne,{},!0)),u.run(1)}),f=!0)},o(i){y(d,i),y(r),y(m,i),c&&c.invalidate(),p=ge(e,n[2],{key:"modal"}),u||(u=ee(t,ne,{},!1)),u.run(0),f=!1},d(i){i&&v(t),d&&d.d(i),r&&r.d(),m&&m.d(i),i&&p&&p.end(),i&&u&&u.end(),w=!1,k()}}}function ue(n){let t,s,e;return s=new ae({props:{icon:ke}}),s.$on("click",n[8]),{c(){t=I("div"),O(s.$$.fragment),this.h()},l(o){t=C(o,"DIV",{class:!0});var a=E(t);R(s.$$.fragment,a),a.forEach(v),this.h()},h(){M(t,"class","close svelte-3rj6d0")},m(o,a){S(o,t,a),F(s,t,null),e=!0},p:ve,i(o){e||(b(s.$$.fragment,o),e=!0)},o(o){y(s.$$.fragment,o),e=!1},d(o){o&&v(t),J(s)}}}function Se(n){let t,s,e=n[0]&&fe(n);return{c(){e&&e.c(),t=te()},l(o){e&&e.l(o),t=te()},m(o,a){e&&e.m(o,a),S(o,t,a),s=!0},p(o,[a]){o[0]?e?(e.p(o,a),a&1&&b(e,1)):(e=fe(o),e.c(),b(e,1),e.m(t.parentNode,t)):e&&(Y(),y(e,1,1,()=>{e=null}),Z())},i(o){s||(b(e),s=!0)},o(o){y(e),s=!1},d(o){e&&e.d(o),o&&v(t)}}}const Be=JSON.parse('{"name":"Modal","slots":[{"name":"header","htmlDoc":null},{"name":"content","htmlDoc":null}],"description":"","props":[{"kind":"let","name":"visible","optional":true,"value":false,"jsDoc":{"description":"Whether to show the modal or not","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}},{"kind":"let","name":"closable","optional":true,"value":true,"jsDoc":{"description":"Whether to show a close button and allow the user to close the modal by clicking the overlay. Useful if you want to implement your own closing mechanism.","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}},{"kind":"function","name":"open"},{"kind":"function","name":"close"}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[]}');function qe(n,t,s){let{$$slots:e={},$$scope:o}=t,{visible:a=!1}=t,{closable:h=!0}=t;const $=be(),[l,c]=Ee;function p(){s(0,a=!0)}function u(){s(0,a=!1)}const f=()=>{s(0,a=!1)},w=()=>{s(0,a=h?!1:a)};return n.$$set=k=>{"visible"in k&&s(0,a=k.visible),"closable"in k&&s(1,h=k.closable),"$$scope"in k&&s(6,o=k.$$scope)},n.$$.update=()=>{n.$$.dirty&1&&$(a?"open":"close")},[a,h,l,c,p,u,o,e,f,w]}class Ne extends T{constructor(t){super();z(this,t,qe,Se,A,{visible:0,closable:1,open:4,close:5})}get open(){return this.$$.ctx[4]}get close(){return this.$$.ctx[5]}}const Oe={main:Be};function Re(n){let t;return{c(){t=oe("Click to show modal")},l(s){t=le(s,"Click to show modal")},m(s,e){S(s,t,e)},d(s){s&&v(t)}}}function Fe(n){let t;return{c(){t=oe("I am a modal hear me cry!")},l(s){t=le(s,"I am a modal hear me cry!")},m(s,e){S(s,t,e)},d(s){s&&v(t)}}}function Je(n){let t,s,e,o,a;t=new ae({props:{primary:!0,$$slots:{default:[Re]},$$scope:{ctx:n}}}),t.$on("click",n[1]);function h(l){n[2](l)}let $={$$slots:{content:[Fe]},$$scope:{ctx:n}};return n[0]!==void 0&&($.visible=n[0]),e=new Ne({props:$}),ye.push(()=>we(e,"visible",h)),{c(){O(t.$$.fragment),s=P(),O(e.$$.fragment)},l(l){R(t.$$.fragment,l),s=U(l),R(e.$$.fragment,l)},m(l,c){F(t,l,c),S(l,s,c),F(e,l,c),a=!0},p(l,c){const p={};c&8&&(p.$$scope={dirty:c,ctx:l}),t.$set(p);const u={};c&8&&(u.$$scope={dirty:c,ctx:l}),!o&&c&1&&(o=!0,u.visible=l[0],je(()=>o=!1)),e.$set(u)},i(l){a||(b(t.$$.fragment,l),b(e.$$.fragment,l),a=!0)},o(l){y(t.$$.fragment,l),y(e.$$.fragment,l),a=!1},d(l){J(t,l),l&&v(s),J(e,l)}}}function Pe(n){let t,s;return t=new De({props:{docs:Oe,$$slots:{inline:[Je]},$$scope:{ctx:n}}}),{c(){O(t.$$.fragment)},l(e){R(t.$$.fragment,e)},m(e,o){F(t,e,o),s=!0},p(e,[o]){const a={};o&9&&(a.$$scope={dirty:o,ctx:e}),t.$set(a)},i(e){s||(b(t.$$.fragment,e),s=!0)},o(e){y(t.$$.fragment,e),s=!1},d(e){J(t,e)}}}function Ue(n,t,s){let e=!1;const o=()=>s(0,e=!0);function a(h){e=h,s(0,e)}return[e,o,a]}class Ke extends T{constructor(t){super();z(this,t,Ue,Pe,A,{})}}export{Ke as default};
