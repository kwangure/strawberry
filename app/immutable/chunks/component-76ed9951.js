import{k as y,a7 as H,L as b,S as R,i as T,s as C,w as M,x as E,y as N,f as L,t as O,z as P,l as V,m as A,h as v,b as D,E as W,B as j}from"./index-d04d3429.js";import{b as u}from"./style-fdf094c4.js";import{C as k}from"./container-173dfcac.js";/* empty css                */function q(t,e=166){let r;function o(...i){const n=()=>{t.apply(this,i)};clearTimeout(r),r=setTimeout(n,e)}return o.clear=()=>{clearTimeout(r)},o}function B(t){return(t==null?void 0:t.ownerDocument)||document}function I(t){return B(t).defaultView||window}function X(t,e={}){const r=I(t),{minrows:o=2,maxrows:i=10}=e,n=y("textarea");n.style.cssText=["visibility: hidden;","position: absolute;","overflow: hidden;","height: 0;","top: 0;","left: 0;","transform: translateZ(0);"].join(""),H(t.parentNode,n);let f,h;function m(){const a=r.getComputedStyle(t);if(a.width==="0px")return;n.style.width=a.width,n.value=t.value||t.placeholder||"x",n.value.slice(-1)===`
`&&(n.value+=" ");const x=a.getPropertyValue("box-sizing"),S=u(a,"padding-bottom")+u(a,"padding-top"),z=u(a,"border-bottom-width")+u(a,"border-top-width"),g=n.scrollHeight;n.value="x";const p=n.scrollHeight;let s=g;o&&(s=Math.max(Number(o)*p,s)),i&&(s=Math.min(Number(i)*p,s)),s=Math.max(s,p);const c=s+(x==="border-box"?S+z:0),w=Math.abs(s-g)<=1;(c>0&&Math.abs((f||0)-c)>1||h!==w)&&(h=w,f=c,t.style.setProperty("height",`${c}px`))}const d=q(m),$=b(r,"resize",d);let l;typeof ResizeObserver<"u"&&(l=new ResizeObserver(d),l.observe(t));const _=b(t,"input",m);return m(),{destroy(){_(),$(),d.clear(),l==null||l.disconnect(),n.remove()}}}function Z(t){let e,r,o;return{c(){e=y("textarea")},l(i){e=V(i,"TEXTAREA",{}),A(e).forEach(v)},m(i,n){D(i,e,n),r||(o=W(X.call(null,e)),r=!0)},p:j,d(i){i&&v(e),r=!1,o()}}}function F(t){let e,r;return e=new k({props:{$$slots:{default:[Z]},$$scope:{ctx:t}}}),{c(){M(e.$$.fragment)},l(o){E(e.$$.fragment,o)},m(o,i){N(e,o,i),r=!0},p(o,[i]){const n={};i&1&&(n.$$scope={dirty:i,ctx:o}),e.$set(n)},i(o){r||(L(e.$$.fragment,o),r=!0)},o(o){O(e.$$.fragment,o),r=!1},d(o){P(e,o)}}}class U extends R{constructor(e){super(),T(this,e,null,F,C,{})}}export{U as default};
