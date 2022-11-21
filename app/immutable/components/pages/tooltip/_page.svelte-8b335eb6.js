import{S as D,i as k,s as E,k as d,l as y,m as b,h as u,n as $,b as _,A as v,B as j,F,G as U,H as x,f as h,t as g,a as L,c as Q,C as W,E as ot,N as st,P as rt,v as S,w as I,x as q,y as C,g as lt,d as nt,U as it,q as w,r as P,D as R}from"../../../chunks/index-080106d6.js";/* empty css                              */import{d as at,o as pt,f as ct,s as ft,l as ut,h as mt,e as _t,g as ht,C as gt}from"../../../chunks/component-950925f6.js";function $t(i){let t;return{c(){t=d("div"),this.h()},l(r){t=y(r,"DIV",{class:!0}),b(t).forEach(u),this.h()},h(){$(t,"class","br-arrow svelte-13uqkxo")},m(r,s){_(r,t,s)},p:v,i:v,o:v,d(r){r&&u(t)}}}class dt extends D{constructor(t){super(),k(this,t,null,$t,E,{})}}function yt(i){let t,r;const s=i[1].default,e=j(s,i,i[0],null);return{c(){t=d("div"),e&&e.c(),this.h()},l(l){t=y(l,"DIV",{class:!0});var n=b(t);e&&e.l(n),n.forEach(u),this.h()},h(){$(t,"class","svelte-15pxthj")},m(l,n){_(l,t,n),e&&e.m(t,null),r=!0},p(l,[n]){e&&e.p&&(!r||n&1)&&F(e,s,l,l[0],r?x(s,l[0],n,null):U(l[0]),null)},i(l){r||(h(e,l),r=!0)},o(l){g(e,l),r=!1},d(l){l&&u(t),e&&e.d(l)}}}function bt(i,t,r){let{$$slots:s={},$$scope:e}=t;return i.$$set=l=>{"$$scope"in l&&r(0,e=l.$$scope)},[e,s]}class vt extends D{constructor(t){super(),k(this,t,bt,yt,E,{})}}const wt=i=>({}),z=i=>({});function Pt(i){let t,r,s,e,l,n;const p=i[4].trigger,o=j(p,i,i[3],z),f=i[4].default,c=j(f,i,i[3],null);return{c(){o&&o.c(),t=L(),r=d("div"),c&&c.c(),this.h()},l(a){o&&o.l(a),t=Q(a),r=y(a,"DIV",{class:!0});var m=b(r);c&&c.l(m),m.forEach(u),this.h()},h(){$(r,"class","svelte-fw5f96"),W(r,"has-trigger",i[2].trigger)},m(a,m){o&&o.m(a,m),_(a,t,m),_(a,r,m),c&&c.m(r,null),e=!0,l||(n=ot(s=i[1].call(null,r,{placement:i[0]})),l=!0)},p(a,[m]){o&&o.p&&(!e||m&8)&&F(o,p,a,a[3],e?x(p,a[3],m,wt):U(a[3]),z),c&&c.p&&(!e||m&8)&&F(c,f,a,a[3],e?x(f,a[3],m,null):U(a[3]),null),s&&st(s.update)&&m&1&&s.update.call(null,{placement:a[0]}),m&4&&W(r,"has-trigger",a[2].trigger)},i(a){e||(h(o,a),h(c,a),e=!0)},o(a){g(o,a),g(c,a),e=!1},d(a){o&&o.d(a),a&&u(t),a&&u(r),c&&c.d(a),l=!1,n()}}}function Dt(i){return i.split("-")[0]}function kt(i,t,r){let{$$slots:s={},$$scope:e}=t;const l=rt(s);let{placement:n="bottom"}=t;function p(o,f){let c=()=>{};function a(m){const{placement:A}=m,T=o.firstElementChild,B=o.previousElementSibling;A&&T&&B?(c(),c=at(B,T,async()=>{const V=o.querySelector(".br-arrow"),H=[pt(5),ct(),ft({limiter:ut({offset:5})}),mt()];V&&H.push(_t({element:V}));const{placement:X,middlewareData:N,x:Y,y:Z}=await ht(B,T,{placement:A,middleware:H}),{referenceHidden:tt}=N.hide||{};if(o.style.setProperty("--br-tooltip-popup-left",`${Y}px`),o.style.setProperty("--br-tooltip-popup-top",`${Z}px`),o.style.setProperty("--br-tooltip-popup-visibility",tt?"hidden":"visible"),V){const{x:G,y:M}=N.arrow||{},O=Dt(X),et={top:"bottom",right:"left",bottom:"top",left:"right"}[O];o.style.setProperty("--br-tooltip-arrow-left",typeof G=="number"?`${G}px`:""),o.style.setProperty("--br-tooltip-arrow-top",typeof M=="number"?`${M}px`:""),o.style.setProperty("--br-tooltip-arrow-bottom",""),o.style.setProperty("--br-tooltip-arrow-right",""),o.style.setProperty(`--br-tooltip-arrow-${et}`,"var(--br-tooltip-arrow-bulge)"),o.style.setProperty("--br-tooltip-arrow-side-top","initial"),o.style.setProperty("--br-tooltip-arrow-side-bottom","initial"),o.style.setProperty("--br-tooltip-arrow-side-left","initial"),o.style.setProperty("--br-tooltip-arrow-side-right","initial"),o.style.setProperty(`--br-tooltip-arrow-side-${O}`," ")}})):(o.style.setProperty("--br-tooltip-popup-visibility","hidden"),c())}return a(f),{update:a,destroy(){c()}}}return i.$$set=o=>{"placement"in o&&r(0,n=o.placement),"$$scope"in o&&r(3,e=o.$$scope)},[n,p,l,e,s]}class Et extends D{constructor(t){super(),k(this,t,kt,Pt,E,{placement:0})}}var St="Tooltip",It=[{name:"trigger",htmlDoc:null},{name:"default",htmlDoc:null}],qt=`Tooltip displays informative text when users hover over, focus on, or tap
	an element.`,Ct="src/lib/components/tooltip/tooltip.svelte",Tt=[{kind:"let",name:"placement",optional:!0,value:"bottom",jsDoc:{description:"Where to position the popup relative to the reference element.",tags:[{description:"",name:"",tag:"type",type:'"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"'}]}}],Bt=[],Vt=[];const jt={name:St,slots:It,description:qt,workingDirectoryFilepath:Ct,props:Tt,exports:Bt,customProperties:Vt},Ft={main:jt};function J(i,t,r){const s=i.slice();return s[3]=t[r],s}function Ut(i){let t,r,s,e=i[3]+"",l,n,p;return t=new dt({}),{c(){S(t.$$.fragment),r=w(`
                        I'm a `),s=d("b"),l=w(e),n=w(" tooltip!")},l(o){I(t.$$.fragment,o),r=P(o,`
                        I'm a `),s=y(o,"B",{});var f=b(s);l=P(f,e),f.forEach(u),n=P(o," tooltip!")},m(o,f){q(t,o,f),_(o,r,f),_(o,s,f),R(s,l),_(o,n,f),p=!0},p:v,i(o){p||(h(t.$$.fragment,o),p=!0)},o(o){g(t.$$.fragment,o),p=!1},d(o){C(t,o),o&&u(r),o&&u(s),o&&u(n)}}}function xt(i){let t,r,s;return t=new vt({props:{$$slots:{default:[Ut]},$$scope:{ctx:i}}}),{c(){S(t.$$.fragment),r=L()},l(e){I(t.$$.fragment,e),r=Q(e)},m(e,l){q(t,e,l),_(e,r,l),s=!0},p(e,l){const n={};l&64&&(n.$$scope={dirty:l,ctx:e}),t.$set(n)},i(e){s||(h(t.$$.fragment,e),s=!0)},o(e){g(t.$$.fragment,e),s=!1},d(e){C(t,e),e&&u(r)}}}function At(i){let t,r=i[3]+"",s;return{c(){t=d("button"),s=w(r),this.h()},l(e){t=y(e,"BUTTON",{class:!0,slot:!0});var l=b(t);s=P(l,r),l.forEach(u),this.h()},h(){$(t,"class","br-primary"),$(t,"slot","trigger")},m(e,l){_(e,t,l),R(t,s)},p:v,d(e){e&&u(t)}}}function K(i){let t,r;return t=new Et({props:{placement:i[3],$$slots:{trigger:[At],default:[xt]},$$scope:{ctx:i}}}),{c(){S(t.$$.fragment)},l(s){I(t.$$.fragment,s)},m(s,e){q(t,s,e),r=!0},p(s,e){const l={};e&64&&(l.$$scope={dirty:e,ctx:s}),t.$set(l)},i(s){r||(h(t.$$.fragment,s),r=!0)},o(s){g(t.$$.fragment,s),r=!1},d(s){C(t,s)}}}function Ht(i){let t,r,s=i[0],e=[];for(let n=0;n<s.length;n+=1)e[n]=K(J(i,s,n));const l=n=>g(e[n],1,1,()=>{e[n]=null});return{c(){t=d("div");for(let n=0;n<e.length;n+=1)e[n].c();this.h()},l(n){t=y(n,"DIV",{class:!0});var p=b(t);for(let o=0;o<e.length;o+=1)e[o].l(p);p.forEach(u),this.h()},h(){$(t,"class","properties examples svelte-jq2pvc")},m(n,p){_(n,t,p);for(let o=0;o<e.length;o+=1)e[o].m(t,null);r=!0},p(n,p){if(p&1){s=n[0];let o;for(o=0;o<s.length;o+=1){const f=J(n,s,o);e[o]?(e[o].p(f,p),h(e[o],1)):(e[o]=K(f),e[o].c(),h(e[o],1),e[o].m(t,null))}for(lt(),o=s.length;o<e.length;o+=1)l(o);nt()}},i(n){if(!r){for(let p=0;p<s.length;p+=1)h(e[p]);r=!0}},o(n){e=e.filter(Boolean);for(let p=0;p<e.length;p+=1)g(e[p]);r=!1},d(n){n&&u(t),it(e,n)}}}function Nt(i){let t,r;return t=new gt({props:{docs:Ft,$$slots:{block:[Ht]},$$scope:{ctx:i}}}),{c(){S(t.$$.fragment)},l(s){I(t.$$.fragment,s)},m(s,e){q(t,s,e),r=!0},p(s,[e]){const l={};e&64&&(l.$$scope={dirty:e,ctx:s}),t.$set(l)},i(s){r||(h(t.$$.fragment,s),r=!0)},o(s){g(t.$$.fragment,s),r=!1},d(s){C(t,s)}}}function Gt(i){const t=["top","right","bottom","left"],r=["","-start","-end"],s=["left-end"];for(const e of t)s.push(...r.map(l=>e+l));return[s]}class zt extends D{constructor(t){super(),k(this,t,Gt,Nt,E,{})}}export{zt as default};
