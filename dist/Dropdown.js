!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).Dropdown=e()}(this,(function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function i(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e){t.appendChild(e)}function s(t,e,n){t.insertBefore(e,n||null)}function l(t){t.parentNode.removeChild(t)}function u(t){return document.createElement(t)}function a(){return t=" ",document.createTextNode(t);var t}function d(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function f(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function p(t,e,n){t.classList[n?"add":"remove"](e)}let m;function h(t){m=t}function $(t){(function(){if(!m)throw new Error("Function called outside component initialization");return m})().$$.on_destroy.push(t)}const g=[],b=[],v=[],x=[],y=Promise.resolve();let w=!1;function k(t){v.push(t)}let E=!1;const L=new Set;function _(){if(!E){E=!0;do{for(let t=0;t<g.length;t+=1){const e=g[t];h(e),M(e.$$)}for(g.length=0;b.length;)b.pop()();for(let t=0;t<v.length;t+=1){const e=v[t];L.has(e)||(L.add(e),e())}v.length=0}while(g.length);for(;x.length;)x.pop()();w=!1,E=!1,L.clear()}}function M(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(k)}}const R=new Set;let T,A;function C(){T={r:0,c:[],p:T}}function H(){T.r||o(T.c),T=T.p}function z(t,e){t&&t.i&&(R.delete(t),t.i(e))}function N(t,e,n,o){if(t&&t.o){if(R.has(t))return;R.add(t),T.c.push(()=>{R.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}}function S(t,n,r){const{fragment:c,on_mount:s,on_destroy:l,after_update:u}=t.$$;c&&c.m(n,r),k(()=>{const n=s.map(e).filter(i);l?l.push(...n):o(n),t.$$.on_mount=[]}),u.forEach(k)}function j(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function B(t,e){-1===t.$$.dirty[0]&&(g.push(t),w||(w=!0,y.then(_)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function I(e,i,r,c,s,u,a=[-1]){const d=m;h(e);const f=i.props||{},p=e.$$={fragment:null,ctx:null,props:u,update:t,not_equal:s,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:n(),dirty:a};let $=!1;if(p.ctx=r?r(e,f,(t,n,...o)=>{const i=o.length?o[0]:n;return p.ctx&&s(p.ctx[t],p.ctx[t]=i)&&(p.bound[t]&&p.bound[t](i),$&&B(e,t)),n}):[],p.update(),$=!0,o(p.before_update),p.fragment=!!c&&c(p.ctx),i.target){if(i.hydrate){const t=function(t){return Array.from(t.childNodes)}(i.target);p.fragment&&p.fragment.l(t),t.forEach(l)}else p.fragment&&p.fragment.c();i.intro&&z(e.$$.fragment),S(e,i.target,i.anchor),_()}h(d)}function O(e){let n,o;return{c(){n=u("div"),n.innerHTML="<slot></slot>",this.c=t,f(n,"class","menu-item"),p(n,"active",e[0])},m(t,i,r){s(t,n,i),r&&o(),o=d(n,"click",e[1])},p(t,[e]){1&e&&p(n,"active",t[0])},i:t,o:t,d(t){t&&l(n),o()}}}function P(t,e,n){let{active:o=!1}=e;return t.$set=t=>{"active"in t&&n(0,o=t.active)},[o,function(e){!function(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(t=>t(e))}(t,e)}]}"function"==typeof HTMLElement&&(A=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){for(const t in this.$$.slotted)this.appendChild(this.$$.slotted[t])}attributeChangedCallback(t,e,n){this[t]=n}$destroy(){j(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}});class q extends A{constructor(t){super(),this.shadowRoot.innerHTML="<style>*,:host *{box-sizing:border-box}.menu-item{font-weight:400;font-size:14px;line-height:22px;white-space:nowrap;cursor:pointer;transition:all .3s;display:flex;align-items:center;min-width:130px;background-color:#fff}.menu-item:not(.linked){padding:8px 16px}.menu-item :global(a){display:flex;padding:8px 12px;margin:calc(-1*8px) calc(-1*12px);text-decoration:none;color:inherit}.menu-item.active{color:#196eff;background-color:#dcebff}.menu-item:hover{color:#196eff;background-color:#dcebff}</style>",I(this,{target:this.shadowRoot},P,O,r,{active:0}),t&&(t.target&&s(t.target,this,t.anchor),t.props&&(this.$set(t.props),_()))}static get observedAttributes(){return["active"]}get active(){return this.$$.ctx[0]}set active(t){this.$set({active:t}),_()}}function D(t,e,n){const o=t.slice();return o[16]=e[n],o[18]=n,o}function F(t){let e,n,o,i=t[1],r=[];for(let e=0;e<i.length;e+=1)r[e]=K(D(t,i,e));const c=t=>N(r[t],1,1,()=>{r[t]=null});let a=null;return i.length||(a=G()),{c(){e=u("div");for(let t=0;t<r.length;t+=1)r[t].c();a&&a.c(),f(e,"class","dropdown-menu"),p(e,"bottom",t[7]),p(e,"left",t[8]),p(e,"right",t[9]),p(e,"top",t[6])},m(i,c,l){s(i,e,c);for(let t=0;t<r.length;t+=1)r[t].m(e,null);a&&a.m(e,null),n=!0,l&&o(),o=d(e,"click",t[3])},p(t,n){if(34&n){let o;for(i=t[1],o=0;o<i.length;o+=1){const c=D(t,i,o);r[o]?(r[o].p(c,n),z(r[o],1)):(r[o]=K(c),r[o].c(),z(r[o],1),r[o].m(e,null))}for(C(),o=i.length;o<r.length;o+=1)c(o);H(),i.length?a&&(a.d(1),a=null):a||(a=G(),a.c(),a.m(e,null))}128&n&&p(e,"bottom",t[7]),256&n&&p(e,"left",t[8]),512&n&&p(e,"right",t[9]),64&n&&p(e,"top",t[6])},i(t){if(!n){for(let t=0;t<i.length;t+=1)z(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)N(r[t]);n=!1},d(t){t&&l(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(r,t),a&&a.d(),o()}}}function G(t){let e;return{c(){e=u("slot")},m(t,n){s(t,e,n)},d(t){t&&l(e)}}}function J(t){let e,n,o;return{c(){e=u("slot"),o=a(),f(e,"name","menu"),f(e,"item",n={...t[16],index:t[18]})},m(t,n){s(t,e,n),s(t,o,n)},p(t,o){2&o&&n!==(n={...t[16],index:t[18]})&&f(e,"item",n)},d(t){t&&l(e),t&&l(o)}}}function K(t){let e;const n=new q({props:{active:t[5](t[18]),$$slots:{default:[J]},$$scope:{ctx:t}}});return n.$on("click",(function(){i(t[16].onclick)&&t[16].onclick.apply(this,arguments)})),{c(){var t;(t=n.$$.fragment)&&t.c()},m(t,o){S(n,t,o),e=!0},p(e,o){t=e;const i={};32&o&&(i.active=t[5](t[18])),524290&o&&(i.$$scope={dirty:o,ctx:t}),n.$set(i)},i(t){e||(z(n.$$.fragment,t),e=!0)},o(t){N(n.$$.fragment,t),e=!1},d(t){j(n,t)}}}function Q(e){let n,o,i,r,p,m=e[0]&&F(e);return{c(){n=u("div"),o=u("div"),o.innerHTML='<slot name="button"></slot>',i=a(),m&&m.c(),this.c=t,f(o,"class","dropdown-button"),f(n,"class","berry-dropdown")},m(t,l,u){var a;s(t,n,l),c(n,o),c(n,i),m&&m.m(n,null),e[15](n),r=!0,u&&p(),p=d(o,"click",(a=e[2],function(t){return t.stopPropagation(),a.call(this,t)}))},p(t,[e]){t[0]?m?(m.p(t,e),z(m,1)):(m=F(t),m.c(),z(m,1),m.m(n,null)):m&&(C(),N(m,1,1,()=>{m=null}),H())},i(t){r||(z(m),r=!0)},o(t){N(m),r=!1},d(t){t&&l(n),m&&m.d(),e[15](null),p()}}}function U(t){return["topLeft","topRight","bottomLeft","bottomRight"].includes(t)}function V(t,e,n){let o,i,r,c,s,l,{items:u=[]}=e,{active:a=[]}=e,{placement:d="bottomLeft"}=e,{visible:f=!1}=e,p=null;function m(t){p.contains(t.target)||n(0,f=!1)}return $(()=>{document.removeEventListener("click",m)}),t.$set=t=>{"items"in t&&n(1,u=t.items),"active"in t&&n(10,a=t.active),"placement"in t&&n(11,d=t.placement),"visible"in t&&n(0,f=t.visible)},t.$$.update=()=>{1024&t.$$.dirty&&n(10,a=Number.isInteger(a)?[a]:a),1024&t.$$.dirty&&n(13,o=new Set(a)),8192&t.$$.dirty&&n(5,i=t=>o.has(t)),2048&t.$$.dirty&&n(6,r=U(d)&&d.includes("top")),2048&t.$$.dirty&&n(7,c=U(d)&&d.includes("bottom")),2048&t.$$.dirty&&n(8,s=U(d)&&d.includes("Left")),2048&t.$$.dirty&&n(9,l=U(d)&&d.includes("Right")),1&t.$$.dirty&&(f?document.addEventListener("click",m):document.removeEventListener("click",m))},[f,u,function(){n(0,f=!f)},function(){n(0,f=!1)},p,i,r,c,s,l,a,d,function(){n(0,f=!0)},o,m,function(t){b[t?"unshift":"push"](()=>{n(4,p=t)})}]}customElements.define("berry-dropdown-item",q);class W extends A{constructor(t){super(),this.shadowRoot.innerHTML="<style>*,:host *{box-sizing:border-box}.berry-dropdown{position:relative}.berry-dropdown,.dropdown-button{display:inline-block}.dropdown-menu{position:absolute;margin-top:5px;background-color:#fff;border-radius:4px;outline:none;box-shadow:0 2px 8px rgba(0,0,0,.15);z-index:100;overflow:hidden}.dropdown-menu.top{margin-bottom:5px;bottom:100%}.dropdown-menu.bottom{margin-top:5px;top:100%}.dropdown-menu.left{left:0}.dropdown-menu.right{right:0}.menu-item>*{display:block}</style>",I(this,{target:this.shadowRoot},V,Q,r,{items:1,active:10,placement:11,visible:0,toggle:2,open:12,close:3}),t&&(t.target&&s(t.target,this,t.anchor),t.props&&(this.$set(t.props),_()))}static get observedAttributes(){return["items","active","placement","visible","toggle","open","close"]}get items(){return this.$$.ctx[1]}set items(t){this.$set({items:t}),_()}get active(){return this.$$.ctx[10]}set active(t){this.$set({active:t}),_()}get placement(){return this.$$.ctx[11]}set placement(t){this.$set({placement:t}),_()}get visible(){return this.$$.ctx[0]}set visible(t){this.$set({visible:t}),_()}get toggle(){return this.$$.ctx[2]}get open(){return this.$$.ctx[12]}get close(){return this.$$.ctx[3]}}return customElements.define("berry-dropdown",W),W.Item=q,W}));
