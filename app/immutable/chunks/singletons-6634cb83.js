import{A as f,s as m}from"./index-27172a48.js";const c=[];function d(n,e=f){let t;const r=new Set;function o(a){if(m(n,a)&&(n=a,t)){const u=!c.length;for(const i of r)i[1](),c.push(i,n);if(u){for(let i=0;i<c.length;i+=2)c[i][0](c[i+1]);c.length=0}}}function l(a){o(a(n))}function s(a,u=f){const i=[a,u];return r.add(i),r.size===1&&(t=e(o)||f),a(n),()=>{r.delete(i),r.size===0&&(t(),t=null)}}return{set:o,update:l,subscribe:s}}let p="",g="";function w(n){p=n.base,g=n.assets||p}function A(n){let e=n.baseURI;if(!e){const t=n.getElementsByTagName("base");e=t.length?t[0].href:n.URL}return e}function U(){return{x:pageXOffset,y:pageYOffset}}function y(n){let e,t=null,r=null,o=null;for(const s of n.composedPath())s instanceof Element&&(!e&&s.nodeName.toUpperCase()==="A"&&(e=s),t===null&&(t=b(s,"data-sveltekit-noscroll")),r===null&&(r=b(s,"data-sveltekit-prefetch")),o===null&&(o=b(s,"data-sveltekit-reload")));const l=e&&new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI);return{a:e,url:l,options:{noscroll:t,prefetch:r,reload:o},has:e?{rel_external:(e.getAttribute("rel")||"").split(/\s+/).includes("external"),download:e.hasAttribute("download"),target:!!(e instanceof SVGAElement?e.target.baseVal:e.target)}:{}}}function b(n,e){const t=n.getAttribute(e);return t===null?t:t===""?!0:(t==="off",!1)}function h(n){const e=d(n);let t=!0;function r(){t=!0,e.update(s=>s)}function o(s){t=!1,e.set(s)}function l(s){let a;return e.subscribe(u=>{(a===void 0||t&&u!==a)&&s(a=u)})}return{notify:r,set:o,subscribe:l}}function _(){const{set:n,subscribe:e}=d(!1);let t;async function r(){clearTimeout(t);const o=await fetch(`${g}/app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(o.ok){const{version:l}=await o.json(),s=l!=="1668771477722";return s&&(n(!0),clearTimeout(t)),s}else throw new Error(`Version check failed: ${o.status}`)}return{subscribe:e,check:r}}function E(n){n.client}const R={url:h({}),page:h({}),navigating:d(null),updated:_()};export{U as a,w as b,p as c,y as f,A as g,E as i,R as s};
