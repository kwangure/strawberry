function $(){}function H(t,e){for(const n in e)t[n]=e[n];return t}function W(t){return t&&typeof t=="object"&&typeof t.then=="function"}function T(t){return t()}function O(){return Object.create(null)}function y(t){t.forEach(T)}function q(t){return typeof t=="function"}function dt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function G(t){return Object.keys(t).length===0}function J(t,...e){if(t==null)return $;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function _t(t,e,n){t.$$.on_destroy.push(J(e,n))}function ht(t,e,n,c){if(t){const r=L(t,e,n,c);return t[0](r)}}function L(t,e,n,c){return t[1]&&c?H(n.ctx.slice(),t[1](c(e))):n.ctx}function mt(t,e,n,c){if(t[2]&&c){const r=t[2](c(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const l=[],s=Math.max(e.dirty.length,r.length);for(let u=0;u<s;u+=1)l[u]=e.dirty[u]|r[u];return l}return e.dirty|r}return e.dirty}function pt(t,e,n,c,r,l){if(r){const s=L(e,n,c,l);t.p(s,r)}}function yt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let c=0;c<n;c++)e[c]=-1;return e}return-1}function bt(t){const e={};for(const n in t)e[n]=!0;return e}function gt(t){return t&&q(t.destroy)?t.destroy:$}let v=!1;function K(){v=!0}function Q(){v=!1}function R(t,e,n,c){for(;t<e;){const r=t+(e-t>>1);n(r)<=c?t=r+1:e=r}return t}function U(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const i=[];for(let o=0;o<e.length;o++){const f=e[o];f.claim_order!==void 0&&i.push(f)}e=i}const n=new Int32Array(e.length+1),c=new Int32Array(e.length);n[0]=-1;let r=0;for(let i=0;i<e.length;i++){const o=e[i].claim_order,f=(r>0&&e[n[r]].claim_order<=o?r+1:R(1,r,_=>e[n[_]].claim_order,o))-1;c[i]=n[f]+1;const a=f+1;n[a]=i,r=Math.max(a,r)}const l=[],s=[];let u=e.length-1;for(let i=n[r]+1;i!=0;i=c[i-1]){for(l.push(e[i-1]);u>=i;u--)s.push(e[u]);u--}for(;u>=0;u--)s.push(e[u]);l.reverse(),s.sort((i,o)=>i.claim_order-o.claim_order);for(let i=0,o=0;i<s.length;i++){for(;o<l.length&&s[i].claim_order>=l[o].claim_order;)o++;const f=o<l.length?l[o]:null;t.insertBefore(s[i],f)}}function xt(t,e){t.appendChild(e)}function V(t,e){if(v){for(U(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function $t(t,e,n){v&&!n?V(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function X(t){t.parentNode.removeChild(t)}function vt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function Y(t){return document.createElement(t)}function Z(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function N(t){return document.createTextNode(t)}function kt(){return N(" ")}function wt(){return N("")}function Et(t,e,n,c){return t.addEventListener(e,n,c),()=>t.removeEventListener(e,n,c)}function tt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function At(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const c in e)e[c]==null?t.removeAttribute(c):c==="style"?t.style.cssText=e[c]:c==="__value"?t.value=t[c]=e[c]:n[c]&&n[c].set?t[c]=e[c]:tt(t,c,e[c])}function et(t){return Array.from(t.childNodes)}function nt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function B(t,e,n,c,r=!1){nt(t);const l=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const u=t[s];if(e(u)){const i=n(u);return i===void 0?t.splice(s,1):t[s]=i,r||(t.claim_info.last_index=s),u}}for(let s=t.claim_info.last_index-1;s>=0;s--){const u=t[s];if(e(u)){const i=n(u);return i===void 0?t.splice(s,1):t[s]=i,r?i===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,u}}return c()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function D(t,e,n,c){return B(t,r=>r.nodeName===e,r=>{const l=[];for(let s=0;s<r.attributes.length;s++){const u=r.attributes[s];n[u.name]||l.push(u.name)}l.forEach(s=>r.removeAttribute(s))},()=>c(e))}function St(t,e,n){return D(t,e,n,Y)}function Nt(t,e,n){return D(t,e,n,Z)}function ct(t,e){return B(t,n=>n.nodeType===3,n=>{const c=""+e;if(n.data.startsWith(c)){if(n.data.length!==c.length)return n.splitText(c.length)}else n.data=c},()=>N(e),!0)}function jt(t){return ct(t," ")}function Ct(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Mt(t,e,n,c){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,c?"important":"")}function Ot(t,e){for(let n=0;n<t.options.length;n+=1){const c=t.options[n];if(c.__value===e){c.selected=!0;return}}t.selectedIndex=-1}function Pt(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}function Tt(t,e,n){t.classList[n?"add":"remove"](e)}function rt(t,e,{bubbles:n=!1,cancelable:c=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,c,e),r}function qt(t,e=document.body){return Array.from(e.querySelectorAll(t))}let p;function d(t){p=t}function k(){if(!p)throw new Error("Function called outside component initialization");return p}function Lt(t){k().$$.on_mount.push(t)}function Bt(t){k().$$.after_update.push(t)}function Dt(){const t=k();return(e,n,{cancelable:c=!1}={})=>{const r=t.$$.callbacks[e];if(r){const l=rt(e,n,{cancelable:c});return r.slice().forEach(s=>{s.call(t,l)}),!l.defaultPrevented}return!0}}function It(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(c=>c.call(this,e))}const m=[],P=[],g=[],E=[],I=Promise.resolve();let A=!1;function z(){A||(A=!0,I.then(j))}function zt(){return z(),I}function S(t){g.push(t)}function Ft(t){E.push(t)}const w=new Set;let b=0;function j(){const t=p;do{for(;b<m.length;){const e=m[b];b++,d(e),it(e.$$)}for(d(null),m.length=0,b=0;P.length;)P.pop()();for(let e=0;e<g.length;e+=1){const n=g[e];w.has(n)||(w.add(n),n())}g.length=0}while(m.length);for(;E.length;)E.pop()();A=!1,w.clear(),d(t)}function it(t){if(t.fragment!==null){t.update(),y(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(S)}}const x=new Set;let h;function st(){h={r:0,c:[],p:h}}function lt(){h.r||y(h.c),h=h.p}function F(t,e){t&&t.i&&(x.delete(t),t.i(e))}function ut(t,e,n,c){if(t&&t.o){if(x.has(t))return;x.add(t),h.c.push(()=>{x.delete(t),c&&(n&&t.d(1),c())}),t.o(e)}else c&&c()}function Ht(t,e){const n=e.token={};function c(r,l,s,u){if(e.token!==n)return;e.resolved=u;let i=e.ctx;s!==void 0&&(i=i.slice(),i[s]=u);const o=r&&(e.current=r)(i);let f=!1;e.block&&(e.blocks?e.blocks.forEach((a,_)=>{_!==l&&a&&(st(),ut(a,1,1,()=>{e.blocks[_]===a&&(e.blocks[_]=null)}),lt())}):e.block.d(1),o.c(),F(o,1),o.m(e.mount(),e.anchor),f=!0),e.block=o,e.blocks&&(e.blocks[l]=o),f&&j()}if(W(t)){const r=k();if(t.then(l=>{d(r),c(e.then,1,e.value,l),d(null)},l=>{if(d(r),c(e.catch,2,e.error,l),d(null),!e.hasCatch)throw l}),e.current!==e.pending)return c(e.pending,0),!0}else{if(e.current!==e.then)return c(e.then,1,e.value,t),!0;e.resolved=t}}function Wt(t,e,n){const c=e.slice(),{resolved:r}=t;t.current===t.then&&(c[t.value]=r),t.current===t.catch&&(c[t.error]=r),t.block.p(c,n)}function Gt(t,e){const n={},c={},r={$$scope:1};let l=t.length;for(;l--;){const s=t[l],u=e[l];if(u){for(const i in s)i in u||(c[i]=1);for(const i in u)r[i]||(n[i]=u[i],r[i]=1);t[l]=u}else for(const i in s)r[i]=1}for(const s in c)s in n||(n[s]=void 0);return n}function Jt(t,e,n){const c=t.$$.props[e];c!==void 0&&(t.$$.bound[c]=n,n(t.$$.ctx[c]))}function Kt(t){t&&t.c()}function Qt(t,e){t&&t.l(e)}function ot(t,e,n,c){const{fragment:r,on_mount:l,on_destroy:s,after_update:u}=t.$$;r&&r.m(e,n),c||S(()=>{const i=l.map(T).filter(q);s?s.push(...i):y(i),t.$$.on_mount=[]}),u.forEach(S)}function at(t,e){const n=t.$$;n.fragment!==null&&(y(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ft(t,e){t.$$.dirty[0]===-1&&(m.push(t),z(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Rt(t,e,n,c,r,l,s,u=[-1]){const i=p;d(t);const o=t.$$={fragment:null,ctx:null,props:l,update:$,not_equal:r,bound:O(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(i?i.$$.context:[])),callbacks:O(),dirty:u,skip_bound:!1,root:e.target||i.$$.root};s&&s(o.root);let f=!1;if(o.ctx=n?n(t,e.props||{},(a,_,...C)=>{const M=C.length?C[0]:_;return o.ctx&&r(o.ctx[a],o.ctx[a]=M)&&(!o.skip_bound&&o.bound[a]&&o.bound[a](M),f&&ft(t,a)),_}):[],o.update(),f=!0,y(o.before_update),o.fragment=c?c(o.ctx):!1,e.target){if(e.hydrate){K();const a=et(e.target);o.fragment&&o.fragment.l(a),a.forEach(X)}else o.fragment&&o.fragment.c();e.intro&&F(t.$$.fragment),ot(t,e.target,e.anchor,e.customElement),Q(),j()}d(i)}class Ut{$destroy(){at(this,1),this.$destroy=$}$on(e,n){const c=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return c.push(n),()=>{const r=c.indexOf(n);r!==-1&&c.splice(r,1)}}$set(e){this.$$set&&!G(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{q as $,$ as A,ht as B,Tt as C,gt as D,pt as E,yt as F,mt as G,V as H,_t as I,k as J,Et as K,It as L,vt as M,H as N,At as O,Gt as P,qt as Q,Ht as R,Ut as S,Wt as T,S as U,Ot as V,y as W,Pt as X,Z as Y,Nt as Z,bt as _,kt as a,P as a0,Jt as a1,Ft as a2,Dt as a3,xt as a4,$t as b,jt as c,lt as d,wt as e,F as f,st as g,X as h,Rt as i,Bt as j,Y as k,St as l,et as m,tt as n,Lt as o,Mt as p,N as q,ct as r,dt as s,ut as t,Ct as u,Kt as v,Qt as w,ot as x,at as y,zt as z};
